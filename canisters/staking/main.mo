import Array "mo:base/Array";
import Error "mo:base/Error";
import Float "mo:base/Float";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Int64 "mo:base/Int64";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import P "mo:base/Prelude";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

import Types "./types";

// Do frontend khi connect ví xong không thể call tới backend motoko, 
// nên chúng em sẽ để frontend tự lấy địa chỉ ví của người dùng và truyền bằng parameter caller, thay vì lấy caller từ msg.

shared({caller}) actor class Staking(dip20: Principal) = Self {
    private var owner = caller;
    private stable var idCounter: Nat = 1;

    private var tokenProvider: Types.IDIP20 = actor(Principal.toText(dip20)) : Types.IDIP20;

    private stable var stakings: [(Nat, Types.StakingPackage)] = [];
    private stable var stakingInfo: [(Principal, [(Nat, Types.StakingInfo)])] = [];

    private var idToStakingPackage: HashMap.HashMap<Nat, Types.StakingPackage> = HashMap.fromIter(stakings.vals(), 10, Nat.equal, Hash.hash);
    private var addressToStaking = HashMap.HashMap<Principal, HashMap.HashMap<Nat, Types.StakingInfo>>(1, Principal.equal, Principal.hash);

    public shared({caller}) func AddPackage(data: Types.StakingPackageCreate): async Nat {
        if (caller != owner) {
            return throw Error.reject("Only owner can add staking package");
        };

        var id = idCounter;
        var stakingPackage: Types.StakingPackage = {
            id = id;
            lockTime = data.lockTime;
            minStaking = data.minStaking;
            fee = data.fee;
            isOff = false;
        };

        idToStakingPackage.put(id, stakingPackage);

        idCounter := idCounter + 1;
        return id;
    };

    public query func GetStakingPackage(): async [Types.StakingPackage] {
        return Iter.toArray(idToStakingPackage.vals());
    };

    public shared({caller}) func DeleteStakingPackage(id: Nat): async Types.DeleteStakingPackage {
        switch (idToStakingPackage.get(id)) {
            case null{
                return #Err(#StakingPackageDoesNotExist);
            };
            case (?package){
                idToStakingPackage.put(id, {
                    id = id;
                    lockTime = package.lockTime;
                    minStaking = package.minStaking;
                    fee = package.fee;
                    isOff = true;
                });
                return #Ok(true)
            };
        };
    }; 

    public shared(msg) func Stake(caller: Principal, pId: Nat64, am: Nat64): async Types.StakeResult {
        let packageId = Nat64.toNat(pId);
        let amount = Nat64.toNat(am);
        switch (idToStakingPackage.get(packageId)) {
            case null{
                return #Err(#StakingPackageDoesNotExist);
            };
            case (?package){
                if (amount < package.minStaking) {
                    return #Err(#AmountIsLessThanMinStake);
                };

                var result = await _transferToken(caller, Principal.fromActor(Self), amount);
                if (not result) {
                    return #Err(#NotApproveForStakingOrNotEnoughtToken);
                };

                switch (addressToStaking.get(caller)) {
                    case null {
                        var stakingInfo: HashMap.HashMap<Nat, Types.StakingInfo> = HashMap.fromIter(Iter.fromArray([]), 10, Nat.equal, Hash.hash);
                        stakingInfo.put(packageId, {
                            owner = caller;
                            startTime = Time.now();
                            amount = amount;
                            timePoint = Time.now();
                            totalProfit = 0;
                        });
                        addressToStaking.put(caller, stakingInfo);
                        return #Ok(true);
                    };
                    case (?listStaking) {
                        switch(listStaking.get(packageId)) {
                            case null {
                                listStaking.put(packageId, {
                                    owner = caller;
                                    startTime = Time.now();
                                    amount = amount;
                                    timePoint = Time.now();
                                    totalProfit = 0;
                                });
                                addressToStaking.put(caller, listStaking);
                                return #Ok(true);
                            };
                            case (?stakingInfo) {
                                var profit = await _calculateProfit(stakingInfo.startTime, package.lockTime, stakingInfo.amount, package.fee);
                                listStaking.put(packageId, {
                                    owner = stakingInfo.owner;
                                    startTime = stakingInfo.startTime;
                                    amount = stakingInfo.amount + amount;
                                    timePoint = Time.now();
                                    totalProfit = profit;
                                });
                                addressToStaking.put(caller, listStaking);
                                return #Ok(true);
                            }
                        };
                    };
                };
            };
        };
    };

    public shared(msg) func Unstake(caller: Principal, packageId: Nat): async Types.UnStakeResult {
        switch (idToStakingPackage.get(packageId)) {
            case null{
                return #Err(#StakingPackageDoesNotExist);
            };
            case (?package){
                switch (addressToStaking.get(caller)) {
                    case null {
                        return #Err(#NotStaked);
                    };
                    case (?listStaking) {
                        switch(listStaking.get(packageId)) {
                            case null {
                                return #Err(#NotStaked);
                            };
                            case (?stakingInfo) {
                                var profit = await _calculateProfit(stakingInfo.timePoint, package.lockTime, stakingInfo.amount, package.fee);
                                var totalProfit = profit + stakingInfo.totalProfit + stakingInfo.amount;
                                
                                var result = await _transferToken(Principal.fromActor(Self), caller, totalProfit);
                                if (not result) {
                                    return #Err(#ErrorServer);
                                };
                                var x = listStaking.remove(packageId);
                                addressToStaking.put(caller, listStaking);
                                return #Ok(true);
                            }
                        };
                    };
                };
            };
        };
    };

    public shared query(msg) func GetMyStaking(caller: Principal): async [Types.StakingInfoResp] {
        switch (addressToStaking.get(caller)) {
            case null {
                return [];
            };
            case (?listStaking) {
                return Iter.toArray(Iter.map(listStaking.entries(), func ((id: Nat, auction: Types.StakingInfo)) : Types.StakingInfoResp {
                    return {
                        owner = auction.owner;
                        startTime = auction.startTime;
                        amount = auction.amount;
                        timePoint = auction.timePoint;
                        totalProfit = auction.totalProfit;
                        packageId = id;
                    };
                }))
            };
        };
    };

    public query func isStake(address: Principal): async Bool {
        switch (addressToStaking.get(address)) {
            case null{
                return false;
            };
            case (?listStaking) {
                return true;
            };
        };
    };

	private func _transferToken(from: Principal, to: Principal, amount: Nat) : async Bool {
		try{
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

    private func _calculateProfit(
        timeStart: Time.Time, 
        timeLock: Time.Time,
        amount: Nat,
        fee: Float,
    ): async Nat {
        if (fee == 0) {
            return amount;
        };
        var profit = Nat64.div(
                        Nat64.mul(
                            Nat64.fromIntWrap(Time.now() - timeStart), 
                            Nat64.mul(
                                Nat64.fromNat(amount), 
                                Nat64.fromIntWrap(Float.toInt(fee)))), 
                    Nat64.fromIntWrap(timeLock));

        return Nat64.toNat(profit);
    };

    private func _unwrap<T>(x : ?T) : T =
        switch x {
            case null { P.unreachable() };
            case (?x_) { x_ };
    };

    public shared query func getCanisterPrincipal() : async Principal {
		return Principal.fromActor(Self);
	};


    system func preupgrade() {
		stakings := Iter.toArray(idToStakingPackage.entries());

        var addressToStakeInfo = Iter.toArray(addressToStaking.entries());
		var size : Nat = addressToStakeInfo.size();
		var temp : [var (Principal, [(Nat, Types.StakingInfo)])] = Array.init<(Principal, [(Nat, Types.StakingInfo)])>(size, (owner,[]));
		size := 0;
		for ((k, v) in addressToStaking.entries()) {
			temp[size] := (k, Iter.toArray(v.entries()));
			size += 1;
		};
		stakingInfo := Array.freeze(temp);
	};
	
	system func postupgrade() {
		stakings := [];

        for ((k, v) in stakingInfo.vals()) {
			let allowed_temp = HashMap.fromIter<Nat, Types.StakingInfo>(v.vals(), 1, Nat.equal, Hash.hash);
			addressToStaking.put(k, allowed_temp);
		};
        stakingInfo := [];
	};

    system func heartbeat() : async () {

    }
}