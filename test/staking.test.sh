#!/usr/local/bin/ic-repl

load "../env.sh";

identity account1 "../config/account1.pem";

"Become validator";
"Owner add package";
" - Should add package correctly 3 months";
let resp = call stakingCanister.AddPackage(record {
    lockTime=46656000000000000; 
    minStaking=100_000; 
    fee=2.0; 
});
resp;

" - Should add package correctly 6 months";
let resp = call stakingCanister.AddPackage(record {
    lockTime=7776000000000000; 
    minStaking=100_000; 
    fee=4.0; 
});
resp;

" - Should add package correctly 9 months";
let resp = call stakingCanister.AddPackage(record {
    lockTime=15552000000000000; 
    minStaking=100_000; 
    fee=6.0; 
});
resp;

" - Should add package correctly 12 months";
let resp = call stakingCanister.AddPackage(record {
    lockTime=31104000000000000; 
    minStaking=100_000; 
    fee=10.0; 
});
resp;

"- User Stake";
identity account2 "../config/account2.pem";
let amountStake = 120_000;
" -- Should revert if package not exist";
let resp = call stakingCanister.Stake(account2, 4, amountStake);
assert resp == variant { Err = variant { StakingPackageDoesNotExist } };
" -- Should take correctly 1";
call dip20Canister.approve(account2, stakingCanister, amountStake);
let resp = call stakingCanister.Stake(account2, 1, amountStake);
assert resp == variant { Ok = true : bool };

" -- Should take correctly 2";
call dip20Canister.approve(account2, stakingCanister, amountStake);
let resp = call stakingCanister.Stake(account2, 2, amountStake);
assert resp == variant { Ok = true : bool };

" -- Should take correctly 3";
call dip20Canister.approve(account2, stakingCanister, amountStake);
let resp = call stakingCanister.Stake(account2, 3, amountStake);
assert resp == variant { Ok = true : bool };

" - Should work correctly - check isStake";
let resp = call stakingCanister.isStake(account2);
assert resp == true;

let resp = call stakingCanister.isStake(account1);
assert resp == false;