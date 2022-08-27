import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Int = "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Option "mo:base/Option";
import P "mo:base/Prelude";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

import Types "./types";

// Do frontend khi connect ví xong không thể call tới backend motoko, 
// nên chúng em sẽ để frontend tự lấy địa chỉ ví của người dùng và truyền bằng parameter caller, thay vì lấy caller từ msg.

shared(msg) actor class Dacution(dip20: Principal, dip721: Principal, staking: Principal) = Self {
	public type Time = Time.Time;

    private var owner = msg.caller;
	private var dauTokenProvider: Types.IDIP20 = actor(Principal.toText(dip20)) : Types.IDIP20;
	private var nftProvider: Types.IDIP721 = actor(Principal.toText(dip721)) : Types.IDIP721;
	private var stakeProvider: Types.IStaking = actor(Principal.toText(staking)) : Types.IStaking;

    private stable var auctionIdCount: Nat = 0;
	private stable var auctionPendingIdCount: Nat = 0;
    private stable var bitIdCount: Nat = 0;
    private stable var fee = 10;
	private stable var timePending = 8600000000;

    private stable var supportedPaymentStore: [(Principal, Types.SupportPaymentResp)] = [];
    private stable var auctionStore: [(Nat, Types.Auction)] = [];
    private stable var bidStore: [(Nat, Types.Bid)] = [];
	private stable var listSeller: [(Principal, Types.Seller)] = [];
    private stable var auctionTobidsStore: [(Nat, [(Nat, Types.Bid)])] = [];
	private stable var auctionPendingStore: [(Nat, Types.AuctionPending)] = [];
	private stable var auctionToVotesStore: [(Nat, [(Principal, Types.Vote)])] = [];
	private stable var managerStore: [(Principal, Bool)] = [];

    private var idToAuction: HashMap.HashMap<Nat, Types.Auction> = HashMap.fromIter(auctionStore.vals(), 10, Nat.equal, Hash.hash);
    private var idToBid: HashMap.HashMap<Nat, Types.Bid> = HashMap.fromIter(bidStore.vals(), 10, Nat.equal, Hash.hash);
    private var paymentExist: HashMap.HashMap<Principal, Types.SupportPaymentResp> = HashMap.fromIter(supportedPaymentStore.vals(), 10, Principal.equal, Principal.hash);
    private var auctionToBids = HashMap.HashMap<Nat, HashMap.HashMap<Nat, Types.Bid>>(1, Nat.equal, Hash.hash);
	private var idToSeller: HashMap.HashMap<Principal, Types.Seller> = HashMap.fromIter(listSeller.vals(), 10, Principal.equal, Principal.hash);
	private var addressManage: HashMap.HashMap<Principal, Bool> = HashMap.fromIter(managerStore.vals(), 10, Principal.equal, Principal.hash);

	private var idToAuctionPending: HashMap.HashMap<Nat, Types.AuctionPending> = HashMap.fromIter(auctionPendingStore.vals(), 10, Nat.equal, Hash.hash);
	private var auctionPendingToVotes = HashMap.HashMap<Nat, HashMap.HashMap<Principal, Types.Vote>>(1, Nat.equal, Hash.hash);

	//SupportedPayment
	public query func GetSupportedPayment() : async [Types.SupportPaymentResp] {
		return Iter.toArray(Iter.map(paymentExist.entries(), func ((address: Principal, value: Types.SupportPaymentResp)): Types.SupportPaymentResp{
			return value;
		}));
	};

	public shared({caller}) func AddSupportedPayment(address: Principal) : async Types.SupportedPaymentResult {
		if (caller != owner) {
			return #Err(#Unauthorized);
		};

		if (Option.isSome(paymentExist.get(address))) {
			return #Err(#AddressPaymentAllreadyExist);
		};

		let symbol = await dauTokenProvider.symbol();
		let logo = await dauTokenProvider.logo();


		paymentExist.put(address, {
			id=address;
			title=symbol;
			logo=logo;
		});

		#Ok(true)
	};

	public shared query func IsSupportPayment(address: Principal) : async Bool {
		assert not Principal.isAnonymous(address);
		return Option.isSome(paymentExist.get(address));
	};

	public shared({caller}) func RemoveSupportedPayment(address: Principal) : async Types.SupportedPaymentResult {
		assert caller == owner;
		assert not Principal.isAnonymous(address);

		if (Option.isNull(paymentExist.get(address))) {
			return #Err(#AddressPaymentNotExist);
		};

		paymentExist.delete(address);

		#Ok(true)
	};

	private func _isSupportedPayment(address: Principal) : Bool {
		return Option.isSome(paymentExist.get(address));
	};

	
	//ORDER
	public shared(msg) func AddOrder(caller: Principal, data: Types.AuctionCreate): async Types.AddAuctionResult {
		if (not _isSeller(caller)) {
			return #Err(#NotSeller);
		};
		if(not _isSupportedPayment(data.tokenPayment)) {
			return #Err(#AddressPaymentNotExist);
		};

		let tokenProvider: Types.IDIP20 = actor(Principal.toText(dip20)) : Types.IDIP20;
		var currencyUnit = await tokenProvider.symbol();

		// need transfer nft to market
		if (data.typeAuction == #AuctionNFT) {
			if (Option.isNull(data.tokenId)) {
				return #Err(#InvalidTokenId);
			};

			let ownerToken = await nftProvider.ownerOf(_unwrap(data.tokenId));
			if (Option.isNull(ownerToken)) {
				return #Err(#NotOwnerOfToken);
			};

			if (_unwrap(ownerToken) != caller) {
				try {
					let approvedFor = await nftProvider.getApproved(_unwrap(data.tokenId));
					if (approvedFor != caller) {
						return #Err(#NotOwnerOrApprovedForToken);
					};
				}catch(e) {
					return #Err(#NotOwnerOrApprovedForToken);
				};
			};

			let tokenInfo = await nftProvider.getTokenInfo(_unwrap(data.tokenId));

			await nftProvider.transferFrom(caller, Principal.fromActor(Self), _unwrap(data.tokenId));

			auctionIdCount += 1;

			let auctionId = auctionIdCount;
			var auction: Types.Auction = {
				id= auctionId;
				tokenId = data.tokenId;
				seller = caller;
				winner = Principal.fromText("2vxsx-fae");
				stepBid = data.stepBid;
				startPrice = data.startPrice;
				currentPrice = data.startPrice;
				tokenPayment = data.tokenPayment;
				startTime = Time.now();
				auctionTime = data.auctionTime;
				highestBidId = 0;
				auctionState = #AuctionStarted;
				isSend= true;
				isReceived= false;
				metadataAuction = null;
				typeAuction = data.typeAuction;
				picture=?_unwrap(tokenInfo).url;
				currencyUnit=currencyUnit;
				title=data.title;
				description=data.description;
			};
			idToAuction.put(auctionIdCount, auction);
			auctionToBids.put(auctionIdCount, HashMap.fromIter<Nat, Types.Bid>(Iter.fromArray([]), 1, Nat.equal, Hash.hash));
			return #Ok(auctionId);
		}else if (data.typeAuction == #AuctionRealProduct) {
			auctionPendingIdCount += 1;

			let auctionPendingId = auctionPendingIdCount;
			var auctionPending: Types.AuctionPending = {
				id= auctionPendingIdCount;
				seller = caller;
				stepBid = data.stepBid;
				startPrice = data.startPrice;
				tokenPayment = data.tokenPayment;
				auctionTime = data.auctionTime;
				metadataAuction = data.metadataAuction;
				voteUp = 0;
        		voteDown = 0;
				timePending = timePending;
				timeStart = Time.now();
				picture = _unwrap(data.picture);
				currencyUnit=currencyUnit;
				title=data.title;
				description=data.description;
			};
			idToAuctionPending.put(auctionPendingIdCount, auctionPending);
			auctionPendingToVotes.put(auctionPendingIdCount, HashMap.fromIter<Principal, Types.Vote>(Iter.fromArray([]), 1, Principal.equal, Principal.hash));
			return #Ok(auctionPendingIdCount);
		}else {
			return #Err(#InvalidAuctionType);
		};
	};

	public shared(msg) func CancelOrder(caller: Principal, auctionId: Nat): async Types.CancelOrderResult{
		switch(idToAuction.get(auctionId)) {
			case null {
				return #Err(#AuctionNotExist);
			};
			case (?auction) {
				if (auction.seller != caller) {
					return #Err(#NotOwnerOfOrder);
				};
				if (auction.auctionState != #AuctionStarted) {
					return #Err(#CannotCancelOrder);
				};
				if (auction.startTime + auction.auctionTime < Time.now()) {
					return #Err(#OrderAlreadyFinish);
				};
				if(_unwrap(auctionToBids.get(auctionId)).size() > 0){
					return #Err(#CannotCancelOrder);
				};
				//need transfer nft to owner
				if (auction.typeAuction == #AuctionNFT) {
					try {
						await nftProvider.transferFrom(Principal.fromActor(Self), auction.seller, _unwrap(auction.tokenId));
					} catch(e) {
						return throw Error.reject("Something went wrong when cancel order, please contact with administrator");
					}
				};

				let newAuction: Types.Auction = {
					id = auction.id;
					tokenId = auction.tokenId;
					seller = auction.seller;
					winner = auction.winner;
					stepBid = auction.stepBid;
					startPrice = auction.startPrice;
					currentPrice = auction.startPrice;
					tokenPayment = auction.tokenPayment;
					startTime = auction.startTime;
					auctionTime = auction.auctionTime;
					highestBidId = auction.highestBidId;
					auctionState = #AuctionCancelled;
					isSend= auction.isSend;
					isReceived= auction.isReceived;
					metadataAuction = auction.metadataAuction;
					typeAuction = auction.typeAuction;
					picture = auction.picture;
					currencyUnit=auction.currencyUnit;
					title=auction.title;
					description=auction.description;
				};

				idToAuction.put(auctionId, newAuction);
				return #Ok(true);
			};
		};
		return #Ok(true)
	};

	public query func GetAuctions() : async [Types.AuctionResp] {
		return Iter.toArray(Iter.map(idToAuction.entries(), func ((id: Nat, auction: Types.Auction)) : Types.AuctionResp {
			let seller = idToSeller.get(auction.seller); 
			return {
				product= auction;
				seller=_unwrap(seller);
			};
		}));
	};

	public query func GetAuction(id: Nat) : async Types.GetAuctionResult {
		switch (idToAuction.get(id)) {
			case null {
				return #Err(#AuctionNotExist);
			};
			case (?auction) {
				return #Ok({
					product= auction;
					seller=_unwrap(idToSeller.get(auction.seller));
				});
			};
		};
	};

	public shared(msg) func SetAlreadySentProduct(caller: Principal, idAuction: Nat): async Types.UpdateAuctionResult {
		switch(idToAuction.get(idAuction)) {
			case null {
				return #Err(#AuctionNotExist);
			};
			case (?auction) {
				if (auction.seller != caller) {
					return #Err(#NotSeller);
				};

				if (auction.typeAuction != #AuctionRealProduct) {
					return #Err(#InvalidAuctionType);
				};

				if (auction.auctionTime + auction.startTime < Time.now()) {
					return #Err(#TimeAuctionNotEnd);
				};
		
				let newAuction: Types.Auction = {
					id = auction.id;
					tokenId = auction.tokenId;
					seller = auction.seller;
					winner = auction.winner;
					stepBid = auction.stepBid;
					startPrice = auction.startPrice;
					currentPrice = auction.startPrice;
					tokenPayment = auction.tokenPayment;
					startTime = auction.startTime;
					auctionTime = auction.auctionTime;
					highestBidId = auction.highestBidId;
					auctionState = auction.auctionState;
					isSend= true;
					isReceived= auction.isReceived;
					metadataAuction = auction.metadataAuction;
					typeAuction = auction.typeAuction;
					picture = auction.picture;
					currencyUnit=auction.currencyUnit;
					title=auction.title;
					description=auction.description;
				};
				
				idToAuction.put(idAuction, newAuction);
				return #Ok(true);
			};
		};
	};

	public shared(msg) func SetAlreadyReceiveProduct(caller: Principal, idAuction: Nat): async  Types.UpdateAuctionResult {
		switch(idToAuction.get(idAuction)) {
			case null {
				return #Err(#AuctionNotExist);
			};
			case (?auction) {
				if (auction.typeAuction != #AuctionRealProduct) {
					return #Err(#InvalidAuctionType);
				};

				if (auction.auctionTime + auction.startTime < Time.now()) {
					return #Err(#TimeAuctionNotEnd);
				};

				switch(_unwrap(auctionToBids.get(idAuction)).get(auction.highestBidId)) {
					case null {
						return #Err(#BidNotExist);
					};
					case (?bid) {
						if (bid.bider != caller) {
							return #Err(#NotWinner);
						};
						
						let newAuction: Types.Auction = {
							id = auction.id;
							tokenId = auction.tokenId;
							seller = auction.seller;
							winner = auction.winner;
							stepBid = auction.stepBid;
							startPrice = auction.startPrice;
							currentPrice = auction.startPrice;
							tokenPayment = auction.tokenPayment;
							startTime = auction.startTime;
							auctionTime = auction.auctionTime;
							highestBidId = auction.highestBidId;
							auctionState = auction.auctionState;
							isSend= auction.isSend;
							isReceived= true;
							metadataAuction = auction.metadataAuction;
							typeAuction = auction.typeAuction;
							picture = auction.picture;
							currencyUnit=auction.currencyUnit;
							title=auction.title;
							description=auction.description;
						};
						
						idToAuction.put(idAuction, newAuction);
						return #Ok(true);
					};
				};
			};
		};
	};

	public shared query(msg) func GetMyProduct(caller: Principal): async [Types.Auction] {
		let filters = Iter.filter(idToAuction.entries(), func ((id: Nat, auction: Types.Auction)) : Bool { 
			caller == auction.seller;
		});
		return Iter.toArray(Iter.map(filters, func ((id: Nat, auction: Types.Auction)) : Types.Auction {
			return auction;
		}));
	};

	//=============================================================================================================================================
	//AUCTION BIDs
	public shared(msg) func BidAuction(caller: Principal, data: Types.AuctionBid): async Types.AuctionBidResult {
		// assert not Principal.isAnonymous(caller);
		switch(idToAuction.get(data.auctionId)) {
			case null {
				return #Err(#AuctionNotExist);
			};
			case (?auction) {
				if (auction.auctionTime + auction.startTime < Time.now()) {
					Debug.print(debug_show(auction.auctionTime + auction.startTime));
					Debug.print(debug_show(Time.now()));
					return #Err(#TimeBidIsExpired);
				};
				if (auction.highestBidId > 0) {
					let highestBid = _unwrap(_unwrap(auctionToBids.get(data.auctionId)).get(auction.highestBidId));
					if (highestBid.bider == caller) {
						return #Err(#YouAreHighestBidNow);
					};
					if (highestBid.amount + auction.stepBid > data.amount) {
						return #Err(#BidIsLessThanHighestBid);
					};
					//transfer token to highest to this owner
				};
				if (data.amount < auction.stepBid + auction.currentPrice) {
					return #Err(#BidIsLessThanLowestPrice);
				};

				//transfer token of this bid to market;
				let check = await _transferToken(auction.tokenPayment, caller, Principal.fromActor(Self), data.amount);
				if (not check) {
					return #Err(#NotEnoughtBalanceOrNotApprovedYet);
				};

				let bidId = auction.highestBidId + 1;
				let bid: Types.Bid = {
					id = bidId;
					amount = data.amount;
					bider = caller;
					status = #Deposited;
				};

				let newAuction: Types.Auction = {
					id = auction.id;
					tokenId = auction.tokenId;
					seller = auction.seller;
					winner = auction.winner;
					stepBid = auction.stepBid;
					startPrice = auction.startPrice;
					currentPrice =  data.amount;
					tokenPayment = auction.tokenPayment;
					startTime = auction.startTime;
					auctionTime = auction.auctionTime;
					highestBidId = bidId;
					auctionState = auction.auctionState;
					isSend= auction.isSend;
					isReceived= auction.isReceived;
					metadataAuction = auction.metadataAuction;
					typeAuction = auction.typeAuction;
					picture = auction.picture;
					currencyUnit=auction.currencyUnit;
					title=auction.title;
					description=auction.description;
				};
				
				idToAuction.put(data.auctionId, newAuction);
				_unwrap(auctionToBids.get(data.auctionId)).put(bidId, bid);
				return #Ok(bidId)
				}
			};
	};

	public query func GetBids(auctionId: Nat) : async [Types.Bid] {
		switch (auctionToBids.get(auctionId)) {
			case null {
				return []
			};
			case (?bids) {
				return Iter.toArray(Iter.map(bids.entries(), func ((id: Nat, bid: Types.Bid)) : Types.Bid {
					bid
				}));
			};
		};
	};

	public shared(msg) func ClaimNft(caller: Principal, id: Nat64): async Types.ClaimAuctionResult {
		// assert not Principal.isAnonymous(caller);
		let auctionId = Nat64.toNat(id);
		switch(idToAuction.get(auctionId)) {
			case null {
				return #Err(#AuctionNotExist);
			};
			case (?auction) {
				if (auction.typeAuction != #AuctionNFT) {
					return #Err(#CannotClaimRealProduct);
				};
				if (auction.auctionTime + auction.startTime < Time.now()) {
					return #Err(#TimeAuctionNotEnd);
				};
				if (not Principal.isAnonymous(auction.winner)) {
					return #Err(#NftAlreadyClaimed);
				};
				let highestBidId = auction.highestBidId;

				if (_unwrap(_unwrap(auctionToBids.get(auctionId)).get(highestBidId)).bider != caller) {
					return #Err(#NotOwnerOfBid);
				};

				//need to be transfer NFT to winner
				try {
					let resp = await nftProvider.transfer(_unwrap(auction.tokenId), caller);
					switch(resp) {
						case (#Ok(id)) {
							
						};
						case (_) {
							return #Err(#ErrorSystem);
						};
					}
				}catch(e) {
					return #Err(#ErrorSystem);
				};
				
				let newAuction: Types.Auction = {
					id = auction.id;
					tokenId = auction.tokenId;
					seller = auction.seller;
					winner = caller;
					stepBid = auction.stepBid;
					startPrice = auction.startPrice;
					currentPrice =  auction.currentPrice;
					tokenPayment = auction.tokenPayment;
					startTime = auction.startTime;
					auctionTime = auction.auctionTime;
					highestBidId = auction.highestBidId;
					auctionState = #AuctionFinished;
					isSend= auction.isSend;
					isReceived= true;
					metadataAuction = auction.metadataAuction;
					typeAuction = auction.typeAuction;
					picture = auction.picture;
					currencyUnit=auction.currencyUnit;
					title=auction.title;
					description=auction.description;
				};
				
				idToAuction.put(auctionId, newAuction);

				return #Ok(true)

			};
		};
	};

	public shared(msg) func RefundToken(caller: Principal, _idAuction: Nat64, _idBid: Nat64) : async Types.ClaimAuctionResult {
		// assert not Principal.isAnonymous(caller);
		let idAuction = Nat64.toNat(_idAuction);
		let idBid = Nat64.toNat(_idBid);
		switch(idToAuction.get(idAuction)) {
			case null {
				return #Err(#AuctionNotExist);
			};
			case (?auction) {
				// Owner of order claim token
				if (auction.highestBidId == idBid) {
					return #Err(#ErrCannotRefundHighestBid)
				};

				switch(_unwrap(auctionToBids.get(idAuction)).get(idBid)){
					case null {
						return #Err(#BidNotExist); 
					};
					case (?bid) {
						if (bid.bider != caller) {
							return #Err(#NotOwnerOfBid);
						};
						if (bid.status != #Deposited) {
							return #Err(#BidAlreadyRefund);
						};

						//approve
						// let checkApprove = await _approveTokenForMarketplace(bid.amount);
						// if (not checkApprove) {
						// 	return #Err(#ErrorSystem);
						// };
						// transfer token to this caller
						let check = await _transferTokenFromMarket(auction.tokenPayment, bid.bider, bid.amount);
						if (not check) {
							return #Err(#NotEnoughtBalanceOrNotApprovedYet);
						};
						//delete this bid
						let newBid = {
							id = bid.id;
							amount = bid.amount;
							bider = bid.bider;
							status = #Withdrawn;
						};
						_unwrap(auctionToBids.get(idAuction)).put(idBid, newBid);
						};
					};

				return #Ok(true)
			};
		};
	};

	public shared(msg) func ClaimToken(caller: Principal, id: Nat64) : async Types.ClaimAuctionResult {
		// assert not Principal.isAnonymous(caller);
		let idAuction = Nat64.toNat(id);
		switch(idToAuction.get(idAuction)) {
			case null {
				return #Err(#AuctionNotExist);
			};
			case (?auction) {
				if (auction.auctionTime + auction.startTime < Time.now()) {
					Debug.print(debug_show(auction.auctionTime + auction.startTime));
					Debug.print(debug_show(Time.now()));
					return #Err(#TimeAuctionNotEnd);
				};

				// Owner of order claim token
				if (auction.seller != caller) {
					return #Err(#NotSeller)
				};

				if (auction.highestBidId == 0) {
					return #Err(#NoBidYet);
				};

				if (auction.typeAuction == #AuctionNFT) {
					//transfer token to this caller
					let realAmount = await _chargeFee(auction.tokenPayment, auction.currentPrice);
					let check = await _transferTokenFromMarket(auction.tokenPayment, auction.winner, realAmount); 
					if (not check) {
						return #Err(#ErrorSystem);
					};
					_convertAutionToFinish(auction);
				}else if (auction.typeAuction == #AuctionRealProduct) {
					if (not auction.isSend) {
						return #Err(#NotSend)
					};
					if (not auction.isReceived) {
						return #Err(#CustomerNotReceived)
					};
					//transfer token to this caller
					//remove offer
					_unwrap(auctionToBids.get(idAuction)).delete(auction.highestBidId)
				};
				return #Ok(true)
			};
		};
	};

	//=============================================================================================================================================

	//AuctionPending
	public query func GetAuctionPending() : async [Types.AuctionPendingResp] {
		return Iter.toArray(Iter.map(idToAuctionPending.entries(), func ((id: Nat, auction: Types.AuctionPending)) : Types.AuctionPendingResp {
			let seller = idToSeller.get(auction.seller); 
			return {
				product= auction;
				seller=_unwrap(seller);
			};
		}));
	};

	public query func GetAAuctionPending(id: Nat) : async Types.GetAuctionPendingResult {
		switch (idToAuctionPending.get(id)) {
			case null {
				return #Err(#AuctionPendingNotExist);
			};
			case (?auctionPending) {
				return #Ok(auctionPending);
			};
		};
	};

	public shared(msg) func VoteAuctionPending(caller: Principal, data: Types.VoteMetadata) : async Types.VoteAuctionPendingResult{
		if (Principal.isAnonymous(caller)) {
			return #Err(#Unauthorized);
		};

		//check if caller steak token
		let check = await stakeProvider.isStake(caller);
		if (not check) {
			return #Err(#NotValidator);
		};

		switch(idToAuctionPending.get(data.auctionPendingId)){
			case null{
				return #Err(#AuctionPendingNotExist);
			};
			case (?auctionPendingData){
				if (auctionPendingData.timeStart + auctionPendingData.timePending > Time.now()) {
					return #Err(#TimeVoteIsExpired);
				};
				if (Option.isSome(_unwrap(auctionPendingToVotes.get(data.auctionPendingId)).get(caller))) {
					return #Err(#AlreadyVoted);
				};

				switch(data.vote){
					case (#Up){
						let newAuctionPending = {
							id = auctionPendingData.id;
							seller = auctionPendingData.seller;
							stepBid = auctionPendingData.stepBid;
							startPrice = auctionPendingData.startPrice;
							tokenPayment = auctionPendingData.tokenPayment;
							auctionTime = auctionPendingData.auctionTime;
							metadataAuction = auctionPendingData.metadataAuction;
							voteUp = auctionPendingData.voteUp + 1;
							voteDown = auctionPendingData.voteDown;
							timePending = auctionPendingData.timePending;
							timeStart = auctionPendingData.timeStart;
							picture = auctionPendingData.picture;
							currencyUnit= auctionPendingData.currencyUnit;
							title=auctionPendingData.title;
							description=auctionPendingData.description;
						};
						idToAuctionPending.put(data.auctionPendingId, newAuctionPending);
					};
					case(#Down){
						let newAuctionPending = {
							id = auctionPendingData.id;
							seller = auctionPendingData.seller;
							stepBid = auctionPendingData.stepBid;
							startPrice = auctionPendingData.startPrice;
							tokenPayment = auctionPendingData.tokenPayment;
							auctionTime = auctionPendingData.auctionTime;
							metadataAuction = auctionPendingData.metadataAuction;
							voteUp = auctionPendingData.voteUp;
							voteDown = auctionPendingData.voteDown + 1;
							timePending = auctionPendingData.timePending;
							timeStart = auctionPendingData.timeStart;
							picture = auctionPendingData.picture;
							currencyUnit= auctionPendingData.currencyUnit;
							title=auctionPendingData.title;
							description=auctionPendingData.description;
						};
						idToAuctionPending.put(data.auctionPendingId, newAuctionPending);
					};
				};

				_unwrap(auctionPendingToVotes.get(data.auctionPendingId)).put(caller, data.vote);

				let check = await _transferTokenFromMarket(dip20, caller, 1000);
				if (not check) {
					return #Err(#MarketNotEnoughtToken);
				};
				return #Ok(true);
			};
		};
	};

	public shared query(msg) func IsVotedAuction(caller: Principal, idAuctionPending: Nat): async Bool {
		return _isVotedAuctionPending(idAuctionPending, caller);
	};

	private func _isVotedAuctionPending(idAuctionPending: Nat, address: Principal) : Bool {
		switch(auctionPendingToVotes.get(idAuctionPending)) {
			case null {return false};
			case (?votes) {
				switch(votes.get(address)) {
					case null {return false};
					case (?vote) {return true};
				};
			};
		}
	};

	public shared(msg) func ApproveAuctionPending(caller: Principal, idAuctionPending: Nat) : async Types.ApproveAuctionPendingResult {
		if(not _isManager(caller)) {
			return #Err(#NotManager);
		};
		switch (idToAuctionPending.get(idAuctionPending)) {
			case null {
				return #Err(#AuctionPendingNotExist);
			};
			case (?auctionPendingData){
				if (auctionPendingData.timeStart + auctionPendingData.timePending < Time.now()) {
					return #Err(#TimeVoteIsExpired);	
				};

				auctionIdCount += 1;
				let id = auctionIdCount;

				let auction: Types.Auction = {
					id = auctionIdCount;
					tokenId = null;
					seller = auctionPendingData.seller;
					winner = Principal.fromText("2vxsx-fae");
					stepBid = auctionPendingData.stepBid;
					currentPrice = auctionPendingData.startPrice;	
					startPrice = auctionPendingData.startPrice;
					tokenPayment = auctionPendingData.tokenPayment;
					startTime = Time.now();
					auctionTime = auctionPendingData.auctionTime;
					highestBidId = 0;
					auctionState = #AuctionStarted;
					metadataAuction = auctionPendingData.metadataAuction;
					isSend= false;
					isReceived= false;
					typeAuction = #AuctionRealProduct;
					picture = ?auctionPendingData.picture;
					currencyUnit=auctionPendingData.currencyUnit;
					title=auctionPendingData.title;
					description=auctionPendingData.description;
				};
				idToAuction.put(id, auction);
				auctionToBids.put(auctionIdCount, HashMap.fromIter<Nat, Types.Bid>(Iter.fromArray([]), 1, Nat.equal, Hash.hash));
				idToAuctionPending.delete(idAuctionPending);
				return #Ok(true);
			};
		};
	};

	public shared(msg) func CancelAuctionPending(caller: Principal, id: Nat) : async Types.CancelAuctionPendingResult {
		switch(idToAuctionPending.get(id)) {
			case null {
				return #Err(#AuctionPendingNotExist);
			};
			case (?auction) {
				if (auction.seller != caller) {
					return #Err(#NotSeller);
				};
				if(auction.timeStart + auction.auctionTime > Time.now()) {
					return #Err(#AuctionAlreadyStarted);
				};
				//need transfer nft to owner
				idToAuctionPending.delete(id);
				auctionPendingToVotes.delete(id);
				return #Ok(true);
			};
		};
	};

	public query func GetVotedAuctionPending(idAuctionPending: Nat) : async Types.GetVotedAuctionPendingResult {
		switch (idToAuctionPending.get(idAuctionPending)) {
			case null {
				return #Err(#AuctionPendingNotExist);
			};
			case (?auctionPending){
				return #Ok(Iter.toArray(_unwrap(auctionPendingToVotes.get(idAuctionPending)).entries()));
			};
		};
	};

	public shared query(msg) func GetMyPendingProduct(caller: Principal): async [Types.AuctionPending] {
		let filters = Iter.filter(idToAuctionPending.entries(), func ((id: Nat, auction: Types.AuctionPending)) : Bool { 
			caller == auction.seller;
		});
		return Iter.toArray(Iter.map(filters, func ((id: Nat, auction: Types.AuctionPending)) : Types.AuctionPending {
			return auction;
		}));
	};

	//========================================================== seller ==========================================================================
	public shared(msg) func BecomeTheSeller(caller: Principal, data: Types.SellerCreate): async Types.SellerErrorResult {
		if (Principal.isAnonymous(caller)) {
			return #Err(#Unauthorized);
		};

		if (Option.isSome(idToSeller.get(caller))) {
			return #Err(#AlreadySeller);
		};

		let newSeller: Types.Seller = {
			id = caller;
			username = data.username;
			description = data.description;
			locationTime = data.locationTime;
			social = data.social;
			email = data.email;
			avatar=data.avatar;
		};
		idToSeller.put(caller, newSeller);

		return #Ok(true)
	};

	public shared(msg) func UpdateSeller(caller: Principal, data: Types.SellerUpdate): async Types.SellerErrorResult {
		if (Principal.isAnonymous(caller)) {
			return #Err(#Unauthorized);
		};
		switch (idToSeller.get(caller)) {
			case null {
				return #Err(#NotSeller);
			};
			case (?seller) {
				let newSeller: Types.Seller = {
					id = caller;
					username = data.username;
					description = data.description;
					social = data.social;
					locationTime = data.locationTime;
					email = seller.email;
					avatar=data.avatar;
				};
				return #Ok(true);
			};
		};
	};

	public shared(msg) func GetSeller(): async [Types.Seller] {
		Iter.toArray(Iter.map(idToSeller.entries(), func ((id: Principal, value: Types.Seller)): Types.Seller {
			return value;
		}));
	};

	public shared query(msg) func isSeller(caller: Principal): async Bool {
		return _isSeller(caller);
	};

	public shared({caller}) func setManager(address: Principal): async Types.ManageResult {
		if (Principal.isAnonymous(caller)) {
			return #Err(#PrincipalIsAnonymous);
		};
		if (caller != owner) {
			return #Err(#Unauthorized);
		};
		switch(addressManage.get(address)) {
			case null {
				addressManage.put(address, true);
				return #Ok(true);
			};
			case (?address) {
				return #Err(#AlreadyManager);
			};
		}
	};

	public shared query func getManager(): async [Principal] {
		return Iter.toArray(Iter.map(addressManage.entries(), func ((id: Principal, value: Bool)): Principal {
			return id;
		}));
	};

	public shared query(msg) func isManager(caller: Principal): async Bool {
		return _isManager(caller);
	};

	public shared query func getCanisterPrincipal() : async Principal {
		return Principal.fromActor(Self);
	};

	private func _isSeller(address: Principal) : Bool {
		return Option.isSome(idToSeller.get(address));
	};

	private func _isManager(address: Principal) : Bool {
		return Option.isSome(addressManage.get(address));
	};

	//=============================================================================================================================================

	//Helper

	private func _transferToken(tokenAddress: Principal, from: Principal, to: Principal, amount: Nat) : async Bool {
		try{
			let tokenProvider: Types.IDIP20 = actor(Principal.toText(dip20)) : Types.IDIP20;
			var resp = await tokenProvider.transferFrom(from, to, amount);
			switch (resp) {
				case (#Ok(id)) {
					return true
				};
				case (_) {
					return false;
				};
			};
		}catch(e) {
			return false;
		};
	};
 
	private func _transferTokenFromMarket(tokenAddress: Principal, to: Principal, amount: Nat) : async Bool {
		try{
			let tokenProvider: Types.IDIP20 = actor(Principal.toText(dip20)) : Types.IDIP20;
			var resp = await tokenProvider.transfer(to, amount);
			switch (resp) {
				case (#Ok(id)) {
					return true
				};
				case (_) {
					return false;
				};
			};
		}catch(e) {
			return false;
		};
	};

	private func _convertAutionToFinish(auction: Types.Auction) : () {
		let bid = _unwrap(auctionToBids.get(auction.id)).get(auction.highestBidId);
		switch(bid) {
			case null {
				let newAuction: Types.Auction = {
					id = auction.id;
					tokenId = auction.tokenId;
					seller = auction.seller;
					winner = auction.winner;
					stepBid = auction.stepBid;
					startPrice = auction.startPrice;
					currentPrice =  auction.currentPrice;
					tokenPayment = auction.tokenPayment;
					startTime = auction.startTime;
					auctionTime = auction.auctionTime;
					highestBidId = auction.highestBidId;
					auctionState = #AuctionFinished;
					isSend= auction.isSend;
					isReceived= auction.isReceived;
					metadataAuction = auction.metadataAuction;
					typeAuction = auction.typeAuction;
					picture = auction.picture;
					currencyUnit=auction.currencyUnit;
					title=auction.title;
					description=auction.description;
				};
				
				idToAuction.put(auction.id, newAuction);
				return
			};
			case (?bid) {
				let newAuction: Types.Auction = {
					id = auction.id;
					tokenId = auction.tokenId;
					seller = auction.seller;
					winner = bid.bider;
					stepBid = auction.stepBid;
					startPrice = auction.startPrice;
					currentPrice =  auction.currentPrice;
					tokenPayment = auction.tokenPayment;
					startTime = auction.startTime;
					auctionTime = auction.auctionTime;
					highestBidId = auction.highestBidId;
					auctionState = #AuctionFinished;
					isSend= auction.isSend;
					isReceived= auction.isReceived;
					metadataAuction = auction.metadataAuction;
					typeAuction = auction.typeAuction;
					picture = auction.picture;
					currencyUnit=auction.currencyUnit;
					title=auction.title;
					description=auction.description;
				};
				
				idToAuction.put(auction.id, newAuction);
				return
			}
		}
	};
 
	// private func _approveTokenForMarketplace(amount: Nat) : async Bool {
	// 	try{
	// 		let tokenProvider: Types.IDIP20 = actor(Principal.toText(dip20)) : Types.IDIP20;
	// 		var resp = await tokenProvider.approve(Principal.fromActor(Self), amount);
	// 		switch (resp) {
	// 			case (#Ok(id)) {
	// 				return true
	// 			};
	// 			case (_) {
	// 				return false;
	// 			};
	// 		};
	// 	}catch(e) {
	// 		return false;
	// 	};
	// };

	private func _chargeFee(token: Principal, amount: Nat): async Nat {
		if (token == dip20) {
			return amount - (amount*7/100);
		}else {
			return amount - (amount*7/100);
		};
	};
	
	private func _unwrap<T>(x : ?T) : T =
        switch x {
            case null { P.unreachable() };
            case (?x_) { x_ };
    };

	private func _automaticAcceptAuctionPending(auctionPendingData: Types.AuctionPending): async () {
				auctionIdCount += 1;
				let id = auctionIdCount;

				let auction: Types.Auction = {
					id = auctionIdCount;
					tokenId = null;
					seller = auctionPendingData.seller;
					winner = Principal.fromText("2vxsx-fae");
					stepBid = auctionPendingData.stepBid;
					currentPrice = auctionPendingData.startPrice;	
					startPrice = auctionPendingData.startPrice;
					tokenPayment = auctionPendingData.tokenPayment;
					startTime = Time.now();
					auctionTime = auctionPendingData.auctionTime;
					highestBidId = 0;
					auctionState = #AuctionStarted;
					metadataAuction = auctionPendingData.metadataAuction;
					isSend= false;
					isReceived= false;
					typeAuction = #AuctionRealProduct;
					picture = ?auctionPendingData.picture;
					currencyUnit=auctionPendingData.currencyUnit;
					title=auctionPendingData.title;
					description=auctionPendingData.description;
				};
				idToAuction.put(id, auction);
				auctionToBids.put(auctionIdCount, HashMap.fromIter<Nat, Types.Bid>(Iter.fromArray([]), 1, Nat.equal, Hash.hash));
				idToAuctionPending.delete(auctionPendingData.id);
	};

    system func preupgrade() {
		supportedPaymentStore := Iter.toArray(paymentExist.entries());
		auctionStore := Iter.toArray(idToAuction.entries());
		bidStore := Iter.toArray(idToBid.entries());
		auctionPendingStore := Iter.toArray(idToAuctionPending.entries());
		listSeller := Iter.toArray(idToSeller.entries());

        var auctionBids = Iter.toArray(auctionToBids.entries());
		var size : Nat = auctionBids.size();
		var temp : [var (Nat, [(Nat, Types.Bid)])] = Array.init<(Nat, [(Nat, Types.Bid)])>(size, (0,[]));
		size := 0;
		for ((k, v) in auctionToBids.entries()) {
			temp[size] := (k, Iter.toArray(v.entries()));
			size += 1;
		};
		auctionTobidsStore := Array.freeze(temp);

		var auctionVotes = Iter.toArray(auctionPendingToVotes.entries());
		var sizeVotes : Nat = auctionVotes.size();
		var tempVotes : [var (Nat, [(Principal, Types.Vote)])] = Array.init<(Nat, [(Principal, Types.Vote)])>(sizeVotes, (0,[]));
		sizeVotes := 0;
		for ((k, v) in auctionPendingToVotes.entries()) {
			tempVotes[sizeVotes] := (k, Iter.toArray(v.entries()));
			sizeVotes += 1;
		};
		auctionToVotesStore := Array.freeze(tempVotes);
		
	};
	
	system func postupgrade() {
		supportedPaymentStore := [];
		auctionStore := [];
		bidStore := [];
		auctionPendingStore := [];
		listSeller := [];

        for ((k, v) in auctionTobidsStore.vals()) {
			let allowed_temp = HashMap.fromIter<Nat, Types.Bid>(v.vals(), 1, Nat.equal, Hash.hash);
			auctionToBids.put(k, allowed_temp);
		};
        auctionTobidsStore := [];

		for ((k, v) in auctionToVotesStore.vals()) {
			let allowed_temp = HashMap.fromIter<Principal, Types.Vote>(v.vals(), 1, Principal.equal, Principal.hash);
			auctionPendingToVotes.put(k, allowed_temp);
		};
		auctionToVotesStore := [];
	};

	// system func heartbeat() : async () {
	// 	Iter.iterate(
	// 		idToAuctionPending.entries(),func ((tokenId: Nat, pendingAution: Types.AuctionPending)) {
	// 			if (Time.now() <= pendingAution.timeStart + pendingAution.auctionTime) {
	// 				await _automaticAcceptAuctionPending(pendingAution);
	// 			}
	// 	});
	// }
}