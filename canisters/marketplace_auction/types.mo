import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
module {
    // ledger types
    public type Operation = {
        #approve;
        #mint;
        #transfer;
        #transferFrom;
    };

 
    public type TransactionStatus = {
        #succeeded;
        #failed;
    };

    public type TxReceipt = {
        #Ok: Nat;
        #Err: {
            #InsufficientAllowance;
            #InsufficientBalance;
            #ErrorOperationStyle;
            #Unauthorized;
            #LedgerTrap;
            #ErrorTo;
            #Other;
            #BlockUsed;
            #AmountTooSmall;
        };
    };

    public type Metadata = {
        logo : Text; // base64 encoded logo or logo url
        name : Text; // token name
        symbol : Text; // token symbol
        decimals : Nat8; // token decimal
        totalSupply : Nat; // token total supply
        owner : Principal; // token owner
        fee : Nat; // fee for update calls
    };

    // Dip20 token interface
    public type IDIP20 = actor {
        transfer : (Principal,Nat) ->  async TxReceipt;
        transferFrom : (Principal,Principal,Nat) -> async TxReceipt;
        approve: (caller: Principal, spender: Principal, value: Nat) -> async TxReceipt;
        getMetadata: () -> async Metadata;
        symbol: () -> async Text;
        logo:() -> async Text;
    };

    public type SupportPaymentResp = {
        id: Principal;
        title: Text;
        logo: Text;
    };

    public type dip721Metadata = {
        name: Text;
        url: Text;
        description: Text;
    };
    
    //Dip721 interface
    public type IDIP721 = actor {
       isApprovedForAll: (Principal, Principal) -> async Bool;
       getApproved: (Nat) ->  async Principal;
       ownerOf: (Nat) -> async ?Principal;
       transferFrom: (Principal, Principal, Nat) -> async ();
       transfer: (tokenId: Nat, to: Principal) -> async TxReceipt;
       getTokenInfo: (tokenId: Nat) -> async ?dip721Metadata;
    };

    public type IStaking = actor {
        isStake: (Principal) -> async Bool;
    };

    //========================================================== Auction

    public type AuctionPending = {
        id: Nat;
        title:Text;
        description:Text;
        seller: Principal;
        stepBid: Nat;
        startPrice: Nat;
        tokenPayment: Principal;
        auctionTime: Time.Time;
        metadataAuction: ?MetadataAuction;
        voteUp: Nat;
        voteDown: Nat;
        timePending: Time.Time;
        timeStart: Time.Time;
        picture: Text;
        currencyUnit: Text;
    };

    public type VoteMetadata = {
        auctionPendingId: Nat;
        vote: Vote;
    };

    public type Vote = {
       #Up;
       #Down;
    };

    public type Auction = {
        id: Nat;
        title:Text;
        description:Text;
        tokenId: ?Nat;
        seller: Principal;
        winner: Principal;
        stepBid: Nat;
        currentPrice: Nat;
        startPrice: Nat;
        tokenPayment: Principal;
        startTime: Time.Time;
        auctionTime: Time.Time;
        highestBidId: Nat;
        auctionState: AuctionState;
        typeAuction: TypeAuction;
        metadataAuction: ?MetadataAuction;
        isSend: Bool;
        isReceived: Bool;
        picture: ?Text;
        currencyUnit: Text;
    };

    public type AuctionResp = {
        product: Auction;
        seller: Seller;
    };

    public type AuctionPendingResp = {
        product: AuctionPending;
        seller: Seller;
    };

    public type AuctionCreate = {
        tokenId: ?Nat;
        title:Text;
        description:Text;
        stepBid: Nat;
        startPrice: Nat;
        tokenPayment: Principal;
        auctionTime: Time.Time;
        typeAuction: TypeAuction;
        metadataAuction: ?MetadataAuction;
        picture: ?Text;
    };

    public type MetadataAuction = {
        file: [Text];
        description: Text;
    };

    public type TypeAuction = {
        #AuctionNFT;
        #AuctionRealProduct;
    };

    public type Bid = {
        id: Nat;
        bider: Principal;
        amount: Nat;
        status: BidState;
    };

    public type AuctionBid = {
        amount: Nat;
        auctionId: Nat;
    };

    public type AuctionState = {
        #AuctionStarted;
        #AuctionFinished;
        #AuctionCancelled;
    };
    public type BidState = {
        #Deposited;
        #Withdrawn;
    };



    //========================================================== Become seller
    public type Seller = {
        id: Principal;
        username: Text;
        email: Text;
        locationTime: Text;
        description: Text;
        social: Text;
        avatar: Text;
    };

    public type SellerCreate = {
        username: Text;
        email: Text;
        locationTime: Text;
        description: Text;
        social: Text;
        avatar: Text;
    };

    public type SellerUpdate = {
        username: Text;
        locationTime: Text;
        description: Text;
        social: Text;
        avatar: Text;
    };

    public type ApiSellerError = {
        #Unauthorized;
        #InvalidData;
        #AlreadySeller;
        #NotSeller;
    };

    //========================================================== Error

    //Error
    public type ApiError = {
        #Unauthorized;
        #InvalidTokenId;
        #InvalidAddress;
        #AddressPaymentAllreadyExist;
        #AddressPaymentNotExist;
        #InvalidAuctionType;
        #Other;
    };

    public type Result<T, E> = {
        #Ok: T;
        #Err: E;
    };

    public type AuctionError = {
        #Unauthorized;
        #InvalidTokenId;
        #InvalidAddress;
        #PrincipalIsAnonymous;
        #AlreadyManager;
        #InvalidAuctionType;
        #NotOwnerOfToken;
        #NotOwnerOfOrder;
        #NotOwnerOrApprovedForToken;
        #AuctionNotExist;
        #AddressPaymentNotExist;
        #NotSeller;
        #CannotCancelOrder;
        #OrderAlreadyFinish;
        #TimeAuctionNotEnd;
        #NftAlreadyClaimed;
        #NotOwnerOfBid;
        #CannotClaimRealProduct;
        #BidNotExist;
        #BidAlreadyRefund;
        #ErrCannotRefundHighestBid;
        #NotEnoughtBalanceOrNotApprovedYet;
        #NotSend;
        #CustomerNotReceived;
        #NotWinner;
        #ErrorSystem;
        #NoBidYet;
        #Other;
    };

    public type AuctionPendingError = {
        #Unauthorized;
        #NotValidator;
        #InvalidTokenId;
        #InvalidAddress;
        #AuctionPendingNotExist;
        #AlreadyVoted;
        #TimeVoteIsExpired;
        #NotSeller;
        #CannotCancelOrder;
        #AuctionAlreadyStarted;
        #MarketNotEnoughtToken;
        #NotManager;
        #Other;
    };

    public type AuctionBidError = {
        #Unauthorized;
        #InvalidTokenId;
        #InvalidAddress;
        #AuctionNotExist;
        #TimeBidIsExpired;
        #BidIsLessThanHighestBid;
        #BidIsLessThanLowestPrice;
        #NotEnoughtBalanceOrNotApprovedYet;
        #YouAreHighestBidNow;
    };

    public type SupportedPaymentResult = Result<Bool, ApiError>;
    public type AddAuctionResult = Result<Nat, AuctionError>;
    public type CancelOrderResult = Result<Bool, AuctionError>;
    public type GetAuctionResult = Result<AuctionResp, AuctionError>;
    public type ClaimAuctionResult = Result<Bool, AuctionError>;
    public type UpdateAuctionResult = Result<Bool, AuctionError>;
    public type ManageResult = Result<Bool, AuctionError>;

    public type AuctionBidResult = Result<Nat, AuctionBidError>;

    public type GetAuctionPendingResult = Result<AuctionPending, AuctionPendingError>;
    public type VoteAuctionPendingResult = Result<Bool, AuctionPendingError>;
    public type ApproveAuctionPendingResult = Result<Bool, AuctionPendingError>;
    public type GetVotedAuctionPendingResult = Result<[(Principal, Vote)], AuctionPendingError>;
    public type CancelAuctionPendingResult = Result<Bool, AuctionPendingError>;

    public type SellerErrorResult = Result<Bool, ApiSellerError>;
}