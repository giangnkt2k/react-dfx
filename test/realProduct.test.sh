#!/usr/local/bin/ic-repl
load "../env.sh";

identity account1 "../config/account1.pem";
"Daction real NFT";
"- Should create product correctly";
let resp = call marketplaceCanister.AddOrder(
    record {
        title="test product"; 
        tokenId=null; 
        auctionTime=60000000000; 
        description="test"; 
        picture=opt "https://asdasdasd"; 
        stepBid=1000; 
        tokenPayment=dip20Canister;
        typeAuction=variant {AuctionRealProduct}; 
        metadataAuction=opt record {
            file=vec {"asdasdasdasd"}; 
            description="asdasdasdasd";
        }; 
        startPrice=2000;
    }
);
resp;
assert resp != variant { Err };

identity account2 "../config/account2.pem";
"- Should create product correctly 2";
let resp = call marketplaceCanister.AddOrder(
    record {
        title="test product 2"; 
        tokenId=null; 
        auctionTime=60000000000; 
        description="test 2"; 
        picture=opt "https://asdasdasd"; 
        stepBid=1000; 
        tokenPayment=dip20Canister;
        typeAuction=variant {AuctionRealProduct}; 
        metadataAuction=opt record {
            file=vec {"asdasdasdasd"}; 
            description="asdasdasdasd";
        }; 
        startPrice=2000;
    }
);
resp;
assert resp != variant { Err };

"- Should create product correctly 2";
let resp = call marketplaceCanister.AddOrder(
    record {
        title="test product 3"; 
        tokenId=null; 
        auctionTime=60000000000; 
        description="test 3"; 
        picture=opt "https://asdasdasd"; 
        stepBid=1000; 
        tokenPayment=dip20Canister;
        typeAuction=variant {AuctionRealProduct}; 
        metadataAuction=opt record {
            file=vec {"asdasdasdasd"}; 
            description="asdasdasdasd";
        }; 
        startPrice=2000;
    }
);
resp;
assert resp != variant { Err };


"Voting";
" - Should voting correctly 1";
identity account2 "../config/account2.pem";
let resp = call marketplaceCanister.VoteAuctionPending(record {auctionPendingId=1; vote=variant {Up}});
resp;

" - Should voting correctly 2";
identity account2 "../config/account2.pem";
let resp = call marketplaceCanister.VoteAuctionPending(record {auctionPendingId=2; vote=variant {Up}});
resp;

" - Should voting correctly 3";
identity account2 "../config/account2.pem";
let resp = call marketplaceCanister.VoteAuctionPending(record {auctionPendingId=3; vote=variant {Up}});
resp;


"- Approve auction pending";
identity account3 "../config/account3.pem";
let resp = call marketplaceCanister.ApproveAuctionPending(1);
resp;

let resp = call marketplaceCanister.ApproveAuctionPending(2);
resp;

let resp = call marketplaceCanister.ApproveAuctionPending(3);
resp;

