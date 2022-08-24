#!/usr/local/bin/ic-repl -r https://mainnet.dfinity.network

load "../env_ic.sh";

identity account2 "../config/account2.pem";
identity account3 "../config/account3.pem";
identity account1 "../config/account1.pem";

"Mint DAU token 1000000";
identity default "../config/default.pem";
let resp = call dip20Canister.mint(account1, 1000000);
assert resp == variant { Ok = 1 : nat };

let resp = call dip20Canister.mint(account2, 1000000);
assert resp == variant { Ok = 2 : nat };

let resp = call dip20Canister.mint(account3, 1000000);
assert resp == variant { Ok = 3 : nat };

let resp = call dip20Canister.mint(marketplaceCanister, 1000000);
assert resp == variant { Ok = 4 : nat };

let resp = call dip20Canister.mint(stakingCanister, 1000000);
assert resp == variant { Ok = 5 : nat };

let resp = call dip20Canister.mint(principal "r2py7-l7bqq-erdn6-y6n33-o3z2p-5olpt-6w67h-q4gcv-zowo3-zsyfw-pae", 1000000);
assert resp == variant { Ok = 6 : nat };
