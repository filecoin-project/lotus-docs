---
title: "Using Ledger on a remote machine"
description: "This is a step-by-step guide on how to use Ledger on a remote machine"
lead: "This is a step-by-step guide on how to use Ledger on a remote machine"
draft: false
menu:
    tutorials:
        parent: "tutorials-lotus"
weight: 230
toc: true
---

Lotus users might want to use a Ledger device for the owner-address of an SPs for higher security. Often This tutorial is based on a setup with two different servers, one to run the `lotus daemon` while the other runs the `lotus-wallet` application. 

## Prerequisites

- A lotus daemon running and being in-sync on a separate server, hereafter called `lotus-node operator`.
- A machine where you plan to plug in and use the Ledger device, hereafter called `ledger-provider`.

## As the "Ledger-provider" (Linux specific)

1. Install `lotus-shed` and `lotus-wallet` (Linux specific):

```shell
sudo apt install
```

## As the "Ledger-provider" (Mac specific)

1. Install `lotus-shed` and `lotus-wallet` (Mac specific):

Install the required depencies with:

```shell
brew install go jq pkg-config hwloc
```

Clone the Lotus-repo with:

```shell
git clone https://github.com/filecoin-project/lotus
```

Change directory to Lotus with:

```shell
cd lotus
```

Install `lotus-shed` and `lotus-wallet`

```shell
make lotus-shed lotus-wallet
```

## As the “lotus-node operator”

1. On your node that is in sync with the chain, setup a remote wallet backend:

In your `.lotus/config.toml` file:

```shell
[Wallet]
  RemoteBackend = "http://127.0.0.1:1777"
```

2. Import the wallet:

```shell
lotus wallet import --format json-lotus
```

And paste the JSON-line that was given to you in the third step in the `As the "Ledger-provider"` section.

3. That is it! 🚀

As long as the ssh reverse-tunnel is alive, you will be required to confirm transactions on the Ledger whenever the Lotus node makes them.