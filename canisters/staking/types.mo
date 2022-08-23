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
        approve: (spender: Principal, value: Nat) -> async TxReceipt;
        getMetadata: () -> async Metadata;
        symbol: () -> async Text;
    };

    public type StakingPackageCreate = {
        lockTime: Time.Time;
        minStaking: Nat;
        fee: Float;
    };

    public type StakingPackage= {
        id: Nat;
        lockTime: Time.Time;
        minStaking: Nat;
        fee: Float;
        isOff: Bool;
    };

    public type StakingInfo = {
        owner: Principal;
        startTime: Time.Time;
        timePoint: Time.Time;
        amount: Nat;
        totalProfit: Nat;
    };

    public type ApiError = {
        #Unauthorized;
        #StakingPackageDoesNotExist;
        #AmountIsLessThanMinStake;
        #NotApproveForStakingOrNotEnoughtToken;
        #NotStaked;
        #ErrorServer;
        #Other;
    };

    public type Result<T, E> = {
        #Ok: T;
        #Err: E;
    };

    public type DeleteStakingPackage = Result<Bool, ApiError>;
    public type StakeResult = Result<Bool, ApiError>;
    public type UnStakeResult = Result<Bool, ApiError>;
}