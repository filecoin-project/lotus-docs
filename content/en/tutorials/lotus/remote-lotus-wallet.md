---
title: "Remote lotus-wallet management"
description: "This is a step-by-step guide on how to set up the lotus-wallet for remote wallet management."
lead: "This is a step-by-step guide on how to set up the lotus-wallet for remote wallet management. This tutorial is for experienced Lotus users."
draft: false
menu:
    tutorials:
        parent: "tutorials-lotus"
weight: 145
toc: true
---

This tutorial is based on a setup with two different servers, one to run the `lotus daemon` while the other runs the `lotus-wallet` application. 

## Prerequisites

- [lotus-wallet]({{< relref "../../kb/install-lotus-wallet/" >}}) installed on a separate server.
- Backup of your [addresses private keys]({{< relref "../../lotus/manage/manage-fil/index.md#exporting-and-importing-addresses/" >}}).

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
  RemoteBackend = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJhZG1pbiJdLCJDcmVhdGVkIjoiMjAyMi0wOC0xMlQxMjo1Njo1My44MTc0MTUzMzlaIiwiUnVsZXMiOm51bGx9.bS-6hLG1csJu8Pa8c8AQ_5IUX98iAfyxlMRiO61X1_g:http://123.123.12.123:1777"
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

On your `lotus-wallet` node you should now see a prompt, asking you if you want to import the private key. Authorize the import to finalize the address import on the `lotus-wallet`.

```shell
-----
ACTION: WalletImport - Import private key
TYPE: bls

Accept the above? (Authorize/No): Authorize
approved
```

Repeat the process for all the addresses you want to be managed by the `lotus-wallet`. After importing all the keys stop the `lotus-wallet` process and restart the lotus daemon with the RemoteBackend config turned off:

```shell
[Wallet]
  # type: string
  # env var: LOTUS_WALLET_REMOTEBACKEND
  #RemoteBackend = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJhZG1pbiJdLCJDcmVhdGVkIjoiMjAyMi0wOC0xMlQxMjo1Njo1My44MTc0MTUzMzlaIiwiUnVsZXMiOm51bGx9.bS-6hLG1csJu8Pa8c8AQ_5IUX98iAfyxlMRiO61X1_g:http://123.123.12.123:1777"
```
Now you can start removing the addresses on the lotus daemon node with `lotus wallet delete`.

{{< alert icon="warning">}}
The `lotus wallet delete` cmd is just a soft-deletion of your addresses' private keys in the Lotus database. A hard deletion of the private keys in the `~/.lotus/keystore` folder is needed to make them non-retrievable. NB! Make sure that you have a backup of your addresses' private keys in a safe and secure place before you hard-delete them.
{{< /alert >}}

After all that is done, you can now restart the `lotus-wallet` without the `--interactive` mode. When you run the `lotus wallet list` on the lotus daemon node you should be able to see all your keys. You have now successfully set up the `lotus-wallet` binary to handle your keys and addresses.

## Extra steps

If you want to create any new wallets that you **do not want** to be on the remote `lotus-wallet` service (such as PoSt-control addresses for example) will require you to turn of the RemoteBackend config, restart the daemon and create them such that they land on the server running `lotus-daemon` and not the `lotus-wallet`.