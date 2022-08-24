#!/usr/local/bin/ic-repl -r https://mainnet.dfinity.network

load "../env_ic.sh";

"Become seller";
"- Should work correctly 1";
identity default "../config/default.pem";
let resp = call marketplaceCanister.BecomeTheSeller(record {
    username="duongptryu"; 
    social="asdasdasd"; 
    description="adasdasdd"; 
    email="asdasdasd"; 
    locationTime="asdasdasd";
    avatar="https://picsum.photos/seed/picsum/200/300";
});
assert resp == variant { Ok = true : bool };

" - Should work correctly 2";
identity account2 "../config/account2.pem";
let resp = call marketplaceCanister.BecomeTheSeller(record {
    username="duongptryu"; 
    social="asdasdasd"; 
    description="adasdasdd"; 
    email="asdasdasd"; 
    locationTime="asdasdasd";
    avatar="https://picsum.photos/seed/picsum/200/300";
});
assert resp == variant { Ok = true : bool };

" - Should revert if account already is a seller";
let resp = call marketplaceCanister.BecomeTheSeller(record {
    username="duongptryu"; 
    social="asdasdasd"; 
    description="adasdasdd"; 
    email="asdasdasd"; 
    locationTime="asdasdasd";
    avatar="https://picsum.photos/seed/picsum/200/300";
});
assert resp == variant { Err = variant { AlreadySeller } };