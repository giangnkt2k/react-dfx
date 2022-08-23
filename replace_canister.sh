#!/usr/bin/env bash
dip721Canister=$(cat env.sh | grep dip721Canister);
dip20Canister=$(cat env.sh | grep dip20Canister);
assetCanister=$(cat env.sh | grep assetCanister);
marketplaceCanister=$(cat env.sh | grep marketplaceCanister);
stakingCanister=$(cat env.sh | grep stakingCanister);

dip721Canister=$(echo $dip721Canister | cut -d'"' -f 2)
dip20Canister=$(echo $dip20Canister | cut -d'"' -f 2)
assetCanister=$(echo $assetCanister | cut -d'"' -f 2)
marketplaceCanister=$(echo $marketplaceCanister | cut -d'"' -f 2)
stakingCanister=$(echo $stakingCanister | cut -d'"' -f 2)

mv .dfx/local/canister_ids.json .dfx/local/canister_ids_old.json
echo "{
  \"assets\": {
    \"local\": \"$assetCanister\"
  },
  \"dip20\": {
    \"local\": \"$dip20Canister\"
  },
  \"dip721\": {
    \"local\": \"$dip721Canister\"
  },
  \"marketplace_auction\": {
    \"local\": \"$marketplaceCanister\"
  },
  \"staking\": {
    \"local\": \"$stakingCanister\"
  }
}
" > .dfx/local/canister_ids.json
