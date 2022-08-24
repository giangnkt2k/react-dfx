dfx deploy dip20 --network=ic --with-cycles 200000000000
dfx deploy dip721 --network=ic --with-cycles 200000000000
dfx deploy staking --network=ic --with-cycles 200000000000 --argument '(principal "kyxfv-waaaa-aaaao-aaj2a-cai")'
dfx deploy marketplace_auction --network=ic --with-cycles 200000000000 --argument '(principal "kyxfv-waaaa-aaaao-aaj2a-cai", principal "kruoj-aiaaa-aaaao-aaj3q-cai", principal "l42kh-paaaa-aaaao-aaj4a-cai")'

