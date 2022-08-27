#!/usr/local/bin/ic-repl

load "../env.sh";

identity account1 "../config/account1.pem";
"Daction Product NFT";
"- Should revert if token not exist";
let resp = call marketplaceCanister.AddOrder(
    account1,
    record {
        stepBid=1000;
        startPrice=20000;
        tokenId=opt 1; 
        auctionTime=8640000000000; 
        tokenPayment=dip20Canister; 
        typeAuction=variant {AuctionNFT}; 
        metadataAuction=null;
        title="Bộ sưu tập của Dương";
        description="Đây là những ảnh mà Dương đã chụp trong thời gian du lịch"
    }
);
assert resp == variant { Err = variant { NotOwnerOfToken } };

"- Account 1 Mint NFT token 1";
identity account1 "../config/account1.pem";
let resp = call dip721Canister.mint(account1, record {url="https://picsum.photos/600/400"; name="Duong"; description="Day la anh cua Duong"});
assert resp == variant { Ok = 1 : nat };

"- Account 2 Mint NFT token 2";
identity account2 "../config/account2.pem";
let resp = call dip721Canister.mint(account2, record {url="https://picsum.photos/600/400"; name="Duong2"; description="Day la anh cua Duong2"});
assert resp == variant { Ok = 2 : nat };

"- Account 2 mint NFT token 3";
let resp = call dip721Canister.mint(account2, record {url="https://picsum.photos/600/400"; name="Duong3"; description="Day la anh cua Duong3"});
assert resp == variant { Ok = 3 : nat };
let resp = call marketplaceCanister.AddOrder(
    account2, 
    record {
        stepBid=1000;
        startPrice=20000;
        tokenId=opt 3; 
        auctionTime=0; 
        tokenPayment=dip20Canister; 
        typeAuction=variant {AuctionNFT}; 
        metadataAuction=null;
        title="title";
        description="description"
    }
);
assert resp == variant { Ok = 1 : nat };
" - Should revert if not seller";
identity account3 "../config/account3.pem";
identity account1 "../config/account1.pem";
call dip721Canister.approve(1, account3);
identity account3 "../config/account3.pem";
let resp = call marketplaceCanister.AddOrder(
    account3,
    record {
        stepBid=1000;
        startPrice=10000;
        tokenId=opt 1; 
        auctionTime=86400; 
        tokenPayment=dip20Canister; 
        typeAuction=variant {AuctionNFT}; 
        metadataAuction=null;
        title="title";
        description="description"
    }
);
assert resp == variant { Err = variant { NotSeller } };

"- Should revert if not owner of token 2";
identity account1 "../config/account1.pem";
let resp = call marketplaceCanister.AddOrder(
    account1,
    record {
        stepBid=1000;
        startPrice=10000;
        tokenId=opt 2; 
        auctionTime=86400; 
        tokenPayment=dip20Canister; 
        typeAuction=variant {AuctionNFT}; 
        metadataAuction=null;
        title="title";
        description="description"
    }
);
assert resp == variant { Err = variant { NotOwnerOrApprovedForToken } };

"- Should work correctly when create product with token 1";
identity account1 "../config/account1.pem";
let resp = call marketplaceCanister.AddOrder(
    account1,
    record {
        stepBid=1000;
        startPrice=20000;
        tokenId=opt 1; 
        auctionTime=86400000000000; 
        tokenPayment=dip20Canister; 
        typeAuction=variant {AuctionNFT}; 
        metadataAuction=null;
        title="title";
        description="description"
    }
);
assert resp == variant { Ok = 2 : nat };

"- Should work correctly when create product with token 2 was approved by account 2";
" -- Approve token 2 for account 1";
identity account2 "../config/account2.pem";
call dip721Canister.approve(2, account1);
" -- create nft product with token 2";
identity account1 "../config/account1.pem";
let resp = call marketplaceCanister.AddOrder(
    account1,
    record {
        stepBid=1000;
        startPrice=20000;
        tokenId=opt 2; 
        auctionTime=60000000000; 
        tokenPayment=dip20Canister; 
        typeAuction=variant {AuctionNFT}; 
        metadataAuction=null;
        title="title";
        description="description"
    }
);
assert resp == variant { Ok = 3 : nat };
let resp = call dip721Canister.ownerOf(2);
assert resp == opt marketplaceCanister;

"Bid product";
let amountBid1 = 25000;
let amountBid2 = 30000;
let amountBid3 = 35000;
let amountLarge = 2000000;
let amountSmall = 500;
" - Should revert if auction not exist";
let resp = call marketplaceCanister.BidAuction(account1,record {auctionId=4; amount=amountBid1});
assert resp == variant { Err = variant { AuctionNotExist } };

" - Should revert if bid amount not approved yet";
let resp = call marketplaceCanister.BidAuction(account1,record {auctionId=2; amount=amountBid1});
assert resp == variant { Err = variant { NotEnoughtBalanceOrNotApprovedYet } };

" - Should revert if bid amount not enought";
let resp = call dip20Canister.approve(account1, marketplaceCanister, amountBid1);
assert resp != variant { Err = variant { NotEnoughtBalanceOrNotApprovedYet } };
let resp = call marketplaceCanister.BidAuction(account1, record {auctionId=2; amount=amountLarge});
assert resp == variant { Err = variant { NotEnoughtBalanceOrNotApprovedYet } };

" - Should revert if bid amount smaller than highest bid amount plus lowest ";
let resp = call marketplaceCanister.BidAuction(account1, record {auctionId=2; amount=amountSmall});
assert resp == variant { Err = variant { BidIsLessThanLowestPrice } };

" - Should work correctly";
let resp = call marketplaceCanister.BidAuction(account1, record {auctionId=2; amount=amountBid1});
assert resp == variant { Ok = 1 : nat };

" - Should work correctly 2";
identity account2 "../config/account2.pem";
let resp = call dip20Canister.approve(account2, marketplaceCanister, amountBid2);
assert resp != variant { Err = variant { NotEnoughtBalanceOrNotApprovedYet } };
let resp = call marketplaceCanister.BidAuction(account2, record {auctionId=2; amount=amountBid2});
assert resp == variant { Ok = 2 : nat };
" - Should work correctly 3";
let resp = call dip20Canister.approve(account2, marketplaceCanister, amountBid1);
assert resp != variant { Err = variant { NotEnoughtBalanceOrNotApprovedYet } };
let resp = call marketplaceCanister.BidAuction(account2, record {auctionId=3; amount=amountBid1});
assert resp == variant { Ok = 1 : nat };



"Cancel order";
identity account2 "../config/account2.pem";
" - Should revert if order not exist";
let resp = call marketplaceCanister.CancelOrder(account2, 4);
assert resp == variant { Err = variant { AuctionNotExist } };
" - Should revert if not owner of order";
let resp = call marketplaceCanister.CancelOrder(account2, 2);
assert resp == variant { Err = variant { NotOwnerOfOrder } };
" - Should revert if order already has bid";
identity account1 "../config/account1.pem";
let resp = call marketplaceCanister.CancelOrder(account1, 2);
assert resp == variant { Err = variant { CannotCancelOrder } };
" - Should revert if order already finish";
identity account2 "../config/account2.pem";
let resp = call marketplaceCanister.CancelOrder(account2, 1);
assert resp == variant { Err = variant { OrderAlreadyFinish } };
" - Should work correctly";

identity account1 "../config/account1.pem";
let resp = call dip721Canister.mint(account1, record {url="http://groupbar.me/4"; name="Duong4"; description="Day la anh cua Duong4"});
assert resp == variant { Ok = 4 : nat };
let resp = call marketplaceCanister.AddOrder(
    account1,
    record {
        stepBid=1000;
        startPrice=20000;
        tokenId=opt 4; 
        auctionTime=50000000000; 
        tokenPayment=dip20Canister; 
        typeAuction=variant {AuctionNFT}; 
        metadataAuction=null;
        title="title";
        description="description"
    }
);
assert resp == variant { Ok = 4 : nat };

let resp = call marketplaceCanister.CancelOrder(account1, 4);
assert resp == variant { Ok = true : bool };
let resp = call dip721Canister.ownerOf(4);
assert resp == opt account1;

"Refund token";
identity account3 "../config/account3.pem";
let resp = call dip20Canister.approve(account3, marketplaceCanister, amountBid3);
assert resp != variant { Err = variant { AuctionNotExist } };
let resp = call marketplaceCanister.BidAuction(account3, record {auctionId=2; amount=amountBid3});
assert resp == variant { Ok = 3 : nat };
" - should revert if auction not exist";
let resp = call marketplaceCanister.RefundToken(account3, 67, 2);
assert resp == variant { Err = variant { AuctionNotExist } };
" - Should revert if bid of auction not exist";
let resp = call marketplaceCanister.RefundToken(account3, 2, 67);
assert resp == variant { Err = variant { BidNotExist } };
" - Should revert if not owner of offer";
let resp = call marketplaceCanister.RefundToken(account3, 2, 2);
assert resp == variant { Err = variant { NotOwnerOfBid } };
" - Should revert if the bid is the highest bid";
let resp = call marketplaceCanister.RefundToken(account3, 2, 3);
assert resp == variant { Err = variant { ErrCannotRefundHighestBid } };
" - Should work correctly";
identity account2 "../config/account2.pem";
let beforeBalance = call dip20Canister.balanceOf(marketplaceCanister);
beforeBalance;
let resp = call marketplaceCanister.RefundToken(account2, 2, 2);
assert resp == variant { Ok = true : bool };
let resp = call dip20Canister.balanceOf(account2);
resp;
" - Should revert if already refund bid";
let resp = call marketplaceCanister.RefundToken(account2, 2, 2);
assert resp == variant { Err = variant { BidAlreadyRefund } };

"Claim token";
identity account3 "../config/account3.pem";
"- Should revert if auction not exist";
let resp = call marketplaceCanister.ClaimToken(account3, 67);
assert resp == variant { Err = variant { AuctionNotExist } };
"- Should revert if time is not finish";
identity account2 "../config/account2.pem";
let resp = call marketplaceCanister.ClaimToken(account2, 2);
assert resp == variant { Err = variant { NotSeller } };
"- Should revert if not owner of auction";
identity account3 "../config/account3.pem";
let resp = call marketplaceCanister.ClaimToken(account3, 2);
assert resp == variant { Err = variant { NotSeller } };
"- Should work correctly";
identity account2 "../config/account2.pem";
let resp = call marketplaceCanister.ClaimToken(account2, 3);
assert resp == variant { Ok = true : bool };
let resp = call dip20Canister.balanceOf(account2);
resp;

"Claim NFT";
identity account2 "../config/account2.pem";
" - Should revert if auction not exist";
let resp = call marketplaceCanister.ClaimToken(account2, 67);
assert resp == variant { Err = variant { AuctionNotExist } };
" - Should revert if time is not finish";
let resp = call marketplaceCanister.ClaimToken(account2, 2);
assert resp == variant { Err = variant { TimeAuctionNotEnd } };
" - Should revert if not winner";
identity account1 "../config/account1.pem";
let resp = call marketplaceCanister.ClaimToken(account1, 3);
assert resp == variant { Err = variant { NotSeller } };
" - Should work correctly";
identity account3 "../config/account3.pem";
let resp = call marketplaceCanister.ClaimToken(account3, 3);
assert resp == variant { Ok = true : bool };

