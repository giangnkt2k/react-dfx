#!/usr/local/bin/ic-repl

load "../env.sh";

identity account1 "../config/account1.pem";

"Become validator";
"Owner add package";
" - Should add package correctly 1";
let resp = call stakingCanister.AddPackage(record {
    lockTime=900000000000; 
    minStaking=100_000; 
    fee=0.1; 
});

" - Should add package correctly 2";
let resp = call stakingCanister.AddPackage(record {
    lockTime=900000000000; 
    minStaking=100_000; 
    fee=10.0; 
});

" - Should add package correctly 3";
let resp = call stakingCanister.AddPackage(record {
    lockTime=900000000000; 
    minStaking=100_000; 
    fee=5.0; 
});

"- User Stake";
identity account2 "../config/account2.pem";
let amountStake = 120_000;
" -- Should revert if package not exist";
let resp = call stakingCanister.Stake(4, amountStake);
assert resp == variant { Err = variant { StakingPackageDoesNotExist } };
" -- Should take correctly 1";
call dip20Canister.approve(stakingCanister, amountStake);
let resp = call stakingCanister.Stake(1, amountStake);
assert resp == variant { Ok = true : bool };

" -- Should take correctly 2";
call dip20Canister.approve(stakingCanister, amountStake);
let resp = call stakingCanister.Stake(2, amountStake);
assert resp == variant { Ok = true : bool };

" -- Should take correctly 3";
call dip20Canister.approve(stakingCanister, amountStake);
let resp = call stakingCanister.Stake(3, amountStake);
assert resp == variant { Ok = true : bool };

" - Should work correctly - check isStake";
let resp = call stakingCanister.isStake(account2);
assert resp == true;

let resp = call stakingCanister.isStake(account1);
assert resp == false;