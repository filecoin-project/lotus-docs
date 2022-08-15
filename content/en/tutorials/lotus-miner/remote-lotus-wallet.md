---
title: "Remote lotus-wallet management"
description: "This is a step-by-step guide on how to set up the lotus-wallet for remote wallet management of the lotus-miner."
lead: "This is a step-by-step guide on how to set up the lotus-wallet for remote wallet management of the lotus-miner. This tutorial is for experienced Lotus users."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 225
toc: true
---

This tutorial is based on a setup with two different servers, one to run the `lotus daemon` while the other runs the `lotus-wallet` application. 

## Prerequisites

- [lotus-wallet] installed on a separate server.
- Backup of your [addresses private keys](../../lotus/manage/manage-fil/index.md#exporting-and-importing-addresses).

## Initial setup

On the server that is going to run the `lotus-wallet` binary. Run `lotus-wallet get-api-key` to initialize the `~/.lotuswallet` repo and generate the API key for it. If you want to create the .lotuswallet repo in a custom location, you can specify the repo with the `--wallet-repo` option, or by exporting a `WALLET_PATH=/path/to/lotuswallet` environment variable.

```shell
2022-08-12T12:56:53.817Z        INFO    repo    repo/fsrepo.go:267      Initializing repo at '/home/server/.lotuswallet'
2022-08-12T12:56:53.817Z        WARN    modules modules/core.go:148     Generating new API secret
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJhZG1pbiJdLCJDcmVhdGVkIjoiMjAyMi0wOC0xMlQxMjo1Njo1My44MTc0MTUzMzlaIiwiUnVsZXMiOm51bGx9.bS-6hLG1csJu8Pa8c8AQ_5IUX98iAfyxlMRiO61X1_g
```

After that you can run the lotus-wallet with `lotus-wallet run`. Depending on your network setup and where you are planning to run the `lotus-wallet` you might want to specify the host address and port the wallet api will listen on with the `--listen` option.

```shell
./lotus-wallet run --listen 123.123.12.123:1777
2022-08-12T13:26:46.976Z        INFO    main    lotus-wallet/main.go:286        Starting lotus wallet
2022-08-12T13:26:46.977Z        INFO    main    lotus-wallet/main.go:331        Setting up API endpoint at 123.123.12.123:1777
2022-08-12T13:26:46.978Z        INFO    main    lotus-wallet/main.go:378        API auth enabled, use 'lotus-wallet get-api-key' to get API key
```

Now we need to configure our lotus daemon node. Edit your lotus config (~/.lotus/config.toml), and locate the [Wallet] section. Set the the `RemoteBackend` to `[api key]:http://[wallet ip]:[wallet port]` (the default port is 1777).

So in our example that would be:

```shell
[Wallet]
  # type: string
  # env var: LOTUS_WALLET_REMOTEBACKEND
  RemoteBackend = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJhZG1pbiJdLCJDcmVhdGVkIjoiMjAyMi0wOC0xMlQxMjo1Njo1My44MTc0MTUzMzlaIiwiUnVsZXMiOm51bGx9.bS-6hLG1csJu8Pa8c8AQ_5IUX98iAfyxlMRiO61X1_g:http://123.123.12.123:177"
```

Then restart (or run) your lotus daemon node. You can confirm that your `lotus-wallet` remote backend is properly set up by running the `lotus wallet list` command on the lotus daemon. On the server that is running `lotus wallet` you should be able to see that action being logged:

```shell
2022-08-12T13:44:10.181Z        INFO    main    lotus-wallet/logged.go:35       WalletList
```

### Importing addresses

For now stop the `lotus-wallet` and restart it in the `interactive` mode while we import the addresses.

```shell
lotus-wallet run --interactive=true --listen 123.123.12.123:1777
```

On your lotus daemon node start importing the backup keys for the addresses you want to have on the `lotus-wallet`.

```shell
lotus wallet import /path/to/backup/lotus-wallet.key
```

On your `lotus-wallet` node you should now see a prompt, asking you if you want to import the private key. Authorize the import to finialize the address import on the `lotus-wallet`.

```shell
-----
ACTION: WalletImport - Import private key
TYPE: bls

Accept the above? (Authorize/No): Authorize
approved
```

Repeat the process for all the addresses you want to be managed by the `lotus-wallet`. After importing all the keys stop the `lotus-wallet` and start removing the addresses on the lotus daemon node with `lotus wallet delete`. Your `lotus-wallet` will have to be turned off for it to not remove the keys on the `lotus-wallet` itself.

{{< alert icon="warning">}}
The `lotus wallet delete` cmd is just a soft-deletion of your addresses' private keys in the Lotus database. A hard deletion of the private keys in the `~/.lotus/keystore` folder are needed to make the not retrievable. NB! Make sure that you have a backup of your addresses' private keys in a safe and secure place before you hard-delete them.
{{< /alert >}}

After all that is done, you can now restart the `lotus-wallet` without the `--interactive` mode. When you run the `lotus wallet list` on the lotus daemon node you should be able to see all your keys. You have now successfully set up the `lotus-wallet` binary to handle your keys and addresses.

## Filtering rules

{{< alert icon="warning">}}
Please note that the per token filtering rules are currently experimental. Please test these filtering rules in a testing environment before running any of it in production.
{{< /alert >}}

`lotus-wallet` api tokens can carry filtering rules, limiting what actions can be performed with the token. The rule is a json object (map) with a single entry, where the key is specifying an action, and the value contains action parameter. Some actions may take additional sub-rules as parameters.

Rule execution can halt with `Accept` or `Reject` or finish without either of those things happening, in which case the filter will accept or reject based on the value of the --rule-must-accept flag.

### Setup rules token

Start by creating a `.json` file and add your desired rules. In this example we will show how you can disallow `ExtendSectorExpiration`,`TerminateSectors` and `DeclareFaults` messages from the addresses in the `lotus-wallet`.

```json
[
{"Sign": {"Message": {"Method":
{"Method": [8,9,10], "Next":{"Reject":{}}}
}}}
]
```

Then generate a new API-key with the filtering rules. 

```shell
 ./lotus-wallet get-api-key --rules-file /home/server/wallet-filter.json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJhZG1pbiJdLCJDcmVhdGVkIjoiMjAyMi0wOC0xNVQxMDozMToxMi4xNjMwOTAwMzlaIiwiUnVsZXMiOnsiU2lnbiI6eyJNZXNzYWdlIjp7Ik1ldGhvZCI6eyJNZXRob2QiOls4LDksMTAsMTFdLCJOZXh0Ijp7IlJlamVjdCI6e319fX19fX0.L3zjRPufiC2DqLz7BRPsNmhcoqTKIcY2VBRNdVRxScc
```

Take the generated API-key that carries the filtering rules and change the [api key] part in the config.toml file on your lotus daemon, `[api key]:http://[wallet ip]:[wallet port]`.

```shell
[Wallet]
  # type: string
  # env var: LOTUS_WALLET_REMOTEBACKEND
  RemoteBackend = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJhZG1pbiJdLCJDcmVhdGVkIjoiMjAyMi0wOC0xNVQxMDo0MDoxMC44MTAxOTYxMzVaIiwiUnVsZXMiOlt7IlNpZ24iOnsiTWVzc2FnZSI6eyJNZXRob2QiOnsiTWV0aG9kIjpbOCw5LDEwLDExXSwiTmV4dCI6eyJSZWplY3QiOnt9fX19fX1dfQ.SOAFu4dLSWXYF27g0zc1TxNbESDoxcHRfCw4hCO52qg:http://123.123.12.123:177"
```

After changing the API-key, you need to restart the lotus daemon for the changes to take effect. Now we can test that the rules functions. Lets try to extend the expiration of a sector, with `lotus-miner sectors renew --from <Epoch> --to <Epoch>`.

```shell
lotus-miner sectors renew --from 1666389 --to 1666400 --really-do-it
Renewing 1 sectors: ERROR: mpool push message: failed to sign message: filter error: filter reject
```

We can see that our message got reject by the filter, which we can also confirm by looking in the logs for the `lotus-wallet`:

```shell
"message", "from": "f3qgjnfnvza3ttb53p4e2qxmodoaqmqh4rk46blaqu6afokprh2vtxjo2oj6ii3mgd5n3g6gdcdwsfbaejy34a", "to": "f01024", "value": "0 FIL", "feecap": "0.00000549805303614 FIL", "method": "9", "params": "81818300004118"}
2022-08-15T12:38:06.660Z        WARN    rpc     go-jsonrpc@v0.1.5/handler.go:279        error in RPC call to 'Filecoin.WalletSign': filter error:
    main.(*FilteredWallet).applyRules
        /home/misty/wallet/lotus/cmd/lotus-wallet/filtered.go:47
  - filter reject
```

## All filtering rules

This section documents all the possible rules you can filter your keys with, and also shows a couple of examples.

### Special rules

These rules are valid anywhere

- `{"Accept":{}}` - Finish rule execution, accept action
- `{"Reject":{}}` - Finish rule execution, reject action
- `[Rule...], {"First": [Rule...]}` - Accepts when at least one sub-rule accepts; Stops on first Accept or Reject

### Action rules

These rules

- `{"New": Rule}` - If WalletNew is called, execute the sub-rule
- `{"Sign": Rule}` - If WalletSign is called, execute the sub-rule

### Sign rules

- `{"Signer": {"Addr":["fXXX",..], "Next": Rule}}` - Check that the signer address is one of the specified addresses
- `{"Message": Rule}` - WalletSign signing a chain message
- `{"Block": Rule}` - WalletSign signing a block header
- `{"DealProposal": Rule}` - WalletSign signing a deal proposal

### Messages rules

- `{"Source": {"Addr":["fXXX",..], "Next": Rule}}` - Check that the source address is one of the specified addresses
- `{"Destination": {"Addr":["fXXX",..], "Next": Rule}}` - Check that the destination address is one of the specified addresses
- `{"Method": {"Method":[number..], "Next": Rule}}` - Check that the method number is one of the specified numbers
- `{"Value":{("LessThan"|"MoreThan"): "[fil]", "Next": Rule}}` - Check that message value is less/more that the specified value
- `{"MaxFee":{("LessThan"|"MoreThan"): "[fil]", "Next": Rule}}` - Check that maximum message fees are less/more that the specified value.

### Block rules

- `{"Miner": {"Addr":["fXXX",..], "Next": Rule}}` - Check that the block miner address is one of the specified addresses

### Example rules

Only allow signing messages from f3aaa
```json
[
{"Sign": {"Signer":{"Addr":["f3aaa"], "Next": {"Accept":{}}}}},
{"Reject": {}}
]
```

Disallow ExtendSectorExpiration, TerminateSectors, DeclareFaults, DeclareFaultsRecovered (Methods 8, 9, 10, 11):
```json
[
{"Sign": {"Message": {"Method":
{"Method": [8,9,10,11], "Next":{"Reject":{}}}
}}}
]
```