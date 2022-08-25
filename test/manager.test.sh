#!/usr/local/bin/ic-repl
load "../env.sh";

identity account1 "../config/account1.pem";
let resp = call marketplaceCanister.setManager(account3);
resp;