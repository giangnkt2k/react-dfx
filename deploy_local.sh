#!/usr/local/bin/ic-repl
function deploy(wasm) {
  let id = call ic.provisional_create_canister_with_cycles(record { settings = null; amount = null });
  call ic.install_code(
    record {
      arg = encode ();
      wasm_module = wasm;
      mode = variant { install };
      canister_id = id.canister_id;
    },
  );
  id
};

function deployArgs(wasm, addressToken, addressNft, addressStaking) {
  let id = call ic.provisional_create_canister_with_cycles(record { settings = null; amount = null });
  call ic.install_code(
    record {
      arg = encode (addressToken, addressNft, addressStaking);
      wasm_module = wasm;
      mode = variant { install };
      canister_id = id.canister_id;
    },
  );
  id
};

function deployStaking(wasm, addressToken) {
  let id = call ic.provisional_create_canister_with_cycles(record { settings = null; amount = null });
  call ic.install_code(
    record {
      arg = encode (addressToken);
      wasm_module = wasm;
      mode = variant { install };
      canister_id = id.canister_id;
    },
  );
  id
};

identity account1 "./config/account1.pem";
let dip20 = deploy(file(".dfx/local/canisters/dip20/dip20.wasm"));
let dip20Canister = dip20.canister_id;
"dip20 ===========================================================";
dip20Canister;

let nftSc = deploy(file(".dfx/local/canisters/dip721/dip721.wasm"));
let dip721Canister = nftSc.canister_id;
"dip721 ===========================================================";
dip721Canister;

let stakingSc = deployStaking(file(".dfx/local/canisters/staking/staking.wasm"), dip20Canister);
let stakingCanister = stakingSc.canister_id;
"Staking ===========================================================";
stakingCanister;

let assetSc = deploy(file(".dfx/local/canisters/assets/assets.wasm"));
let assetCanister = assetSc.canister_id;
"assertSc ===========================================================";
assetCanister;

let assetStore = deploy(file(".dfx/local/canisters/assets/assetstorage.wasm"));
let assetStoreCanister = assetStore.canister_id;
"assertStoreSc ===========================================================";
assetStoreCanister;

let marketplace = deployArgs(file(".dfx/local/canisters/marketplace_auction/marketplace_auction.wasm"), dip20Canister, dip721Canister, stakingCanister);
let marketplaceCanister = marketplace.canister_id;
"marketplace ===========================================================";
marketplaceCanister;

"Mint DAU token 1000000";
let resp = call dip20Canister.mint(account1, 1000000);
assert resp == variant { Ok = 1 : nat };

identity account2 "./config/account2.pem";
identity account3 "./config/account3.pem";
identity account1 "./config/account1.pem";
let resp = call dip20Canister.mint(account2, 1000000);
assert resp == variant { Ok = 2 : nat };

let resp = call dip20Canister.mint(account3, 1000000);
assert resp == variant { Ok = 3 : nat };

let resp = call dip20Canister.mint(marketplaceCanister, 1000000);
assert resp == variant { Ok = 4 : nat };

let resp = call dip20Canister.mint(stakingCanister, 1000000);
assert resp == variant { Ok = 5 : nat };

export "env.sh";