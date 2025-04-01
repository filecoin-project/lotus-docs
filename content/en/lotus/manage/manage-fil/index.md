---
title: 'Manage FIL'
description: "This guide will show you how to create and manage a Lotus wallet and how to use it to send some Filecoin to a different address. Each node can have multiple addresses."
lead: "This guide will show you how to create and manage a Lotus wallet and how to use it to send some Filecoin to a different address. Each node can have multiple addresses."
draft: false
menu:
    lotus:
        parent: "lotus-management"
aliases:
    - /docs/set-up/manage-fil/
    - /get-started/lotus/send-and-receive-fil
weight: 405
toc: true
---

To receive and send FIL with Lotus, you will need to have a Lotus node installed and running.

## About Wallet Addresses

When using a wallet, an account is identified by its [address](https://docs.filecoin.io/basics/what-is-filecoin/overview/). A Filecoin address always starts with the letter `f` (`t` for testnets) and a digit that indicates what type of address it is.

Filecoin accounts have two kinds of address, longer **public key** addresses, and shorter **ID** addresses. Both addresses refer to the same account and can be used to send and receive FIL using a wallet.

### Public Key Address

A [public key address](https://docs.filecoin.io/basics/the-blockchain/addresses/#public-keys) is derived directly from a cryptographic key. Public key addresses start with the characters `f1` (secp256k1) or `f3` (BLS), depending on the type of encryption key used.

Here's an example of a secp256k1 public key address: `f1abjxfbp274xpdqcpuaykwkfb43omjotacm2p3za`.

Public key addresses are the most common way to refer to Filecoin accounts, and they are supported by hardware wallets like [Ledger](https://ledger.com).

Because a public key address does not depend on any blockchain state, they are considered [robust](https://docs.filecoin.io/basics/the-blockchain/addresses/#actor-ids) and are recommended for most use cases involving transfers of FIL, for example, when sending FIL to another user through an exchange.

### ID Address

ID addresses are a compact and more "human friendly" way to refer to an account than public key addresses. ID addresses always start with the characters `f0` (or `t0` for testnets), followed by a sequence of digits, for example: `f033259`.

Every ID address for a Filecoin account has an alternative public key address that corresponds to the same account. You can find the ID address for any public key address by searching for the public key address on [FilFox](https://filfox.info/), a Filecoin block explorer.

Because they are more compact than public key addresses, ID addresses are often used when referring to storage providers and other long-lived Filecoin [Actors](https://docs.filecoin.io/basics/the-blockchain/actors/). As these actors receive a large volume of messages, the compact address can result in meaningful savings in gas fees. A multisig wallet is a type of Actor.

While you can send FIL to an ID address using a wallet, you should first check the details for the account on [FilFox](https://filfox.info/) to see when the account was created, as well as the corresponding public key address. If the address was created very recently (within the [finality period](https://docs.filecoin.io/reference/glossary/#finality)) there is a small chance that it could be re-assigned as the network reaches consensus, and the public key address should be used instead.

More information about addresses can be found in the [Filecoin address docs](https://docs.filecoin.io/basics/the-blockchain/addresses/).

## Creating a wallet

Creating wallets using Lotus is very simple. There are multiple wallet types to choose from.

{{< alert icon="warning">}}
The information for the addresses in your wallet is stored in the `~/.lotus/keystore` (or `$LOTUS_PATH/keystore`). Removing these folders will also remove the keys, and you will lose control of any funds in those wallets. We recommend [backing up your wallets](#exporting-and-importing-addresses) as soon as they have been created or using a 
[hardware wallet]({{< relref "../../manage/ledger" >}}).
{{< /alert >}}

### Create a BLS wallet

```shell with-output
lotus wallet new bls
```
```
f3ryb26aqsxkq6cj6bs5inp5ssxkkw24l3st2uojcc5kh3vhtdqjt67zdhougqwrsvm4baagm7bclhmxs5crbq
```

### Create a secp256k1 wallet

```shell with-output
lotus wallet new
```
```
f1x37y5ekmq2yq5phcine3jvtrqgaxsjrdhpvmksa
```

### Create a multisig wallet

A multi-signature (multisig) wallet refers to a wallet that requires multiple keys to authorize a `FIL` transactions.

```shell with-output
lotus msig create address1 address2..
```
```
sent create in message:  bafy2bzaceagbn6eb643pirmqvuvy23pbhi6reh3yr6wtlqr2ywetomlo2giku
waiting for confirmation..
Created new multisig:  t01004 t2ff7ch2h7qr6f4q5lmvq3ajo6lxucei46attp3ai
```

If you want to read more about multisignature wallets and how they function, you can go to the [multisig page]({{< relref "../../manage/multisig" >}}).

## Listing addresses

You can create as many addresses as you need. One of them will be the _default address_.

You can see a list of all addresses for your current node:

```shell with-output
lotus wallet list
```
```
Address                                                                                 Balance  Nonce  Default  
f1x37y5ekmq2yq5phcine3jvtrqgaxsjrdhpvmksa                                               100 FIL    1               
f3ryb26aqsxkq6cj6bs5inp5ssxkkw24l3st2uojcc5kh3vhtdqjt67zdhougqwrsvm4baagm7bclhmxs5crbq  10 FIL     4      X        
```

You can see that your default address is marked with an X in the `lotus wallet list` output. You can also check it with:

```shell with-output
lotus wallet default
```
```
f3ryb26aqsxkq6cj6bs5inp5ssxkkw24l3st2uojcc5kh3vhtdqjt67zdhougqwrsvm4baagm7bclhmxs5crbq
```

If you wish, you can change the default address to a different one with the `set-default` command:

```shell with-output
lotus wallet set-default <address>
```
```
Default address set to: t1ehwusalfn3wrng3zis4rhybdexgrtgsj6vp7fly
```

## Obtaining FIL

For non-mainnet networks like Calibration, `FIL` can be obtained from several faucets. You can find a list of Calibration network faucets in the [Calibration network resources section in the Filecoin](https://docs.filecoin.io/networks/calibration#resources) documentation.

For mainnet, there is a [Forest faucet available](https://docs.filecoin.io/networks/mainnet#resources) that distributes very small amounts of FIL (0.01 FIL). For larger amounts, the easiest way is to buy `FIL` from an exchange. Not all exchanges support `FIL`, so do your research before signing up.

Once you have received some `FIL`, use `wallet balance` to check your balance:

```shell with-output
lotus wallet balance <address>
```
```
100 FIL
```

{{< alert icon="tip">}}
Remember that you will only see the latest balance when your daemon is fully synced.
{{< /alert >}}

## Sending FIL

Use the `send` command followed by the receiving address and the amount of `FIL` you want to send

```shell with-output
# lotus send <target address> <FIL amount>
lotus send f1zp2... 3
```
```
bafy1...
```

Lotus will output a transaction hash after a successful transaction. You can view details of this transaction using a [Filecoin explorer](https://docs.filecoin.io/get-started/explore-the-network/#block-explorers).

Lotus assumes you want to send `FIL` from the _default address_. To send FIL from a specific address, use `--from` followed by the address you want to send `FIL` from. This address must have been created or imported to your Lotus node.

```shell with-output
# lotus send --from=<sender address> <target address> <FIL amount>
lotus send --from f1zp2... f15zt... 3.141
```
```
bafy2...
```

For more advanced sending options you can always check out the command line helptext by adding `--help` or `-h` after the command:

```shell with-output
lotus send --help
```
```
NAME:
   lotus send - Send funds between accounts

USAGE:
   lotus send [command options] [targetAddress] [amount]

CATEGORY:
   BASIC

OPTIONS:
   --force              Deprecated: use global 'force-send' (default: false)
   --from value         optionally specify the account to send funds from
   --gas-feecap value   specify gas fee cap to use in AttoFIL (default: "0")
   --gas-limit value    specify gas limit (default: 0)
   --gas-premium value  specify gas price to use in AttoFIL (default: "0")
   --method value       specify method to invoke (default: 0)
   --nonce value        specify the nonce to use (default: 0)
   --params-hex value   specify invocation parameters in hex
   --params-json value  specify invocation parameters in json
```

### Specify Invocation Parameters

If you want specify invocation parameters using `lotus send`, you can use the following code-snippet to get the encoded parameters

```shell
lotus chain encode params --encoding=hex <toAddr> <method id> <params>
```

Mapped method <> method id can be found in the [Filecoin GitHub repository](https://github.com/filecoin-project/specs-actors/blob/master/actors/builtin/methods.go).

Then to send it, run:

```shell
lotus send --params-hex=<encoded output from the previous step>
```

### Transaction fees

Every transaction that sends `FIL` pays an additional fee based on its _gas_ usage. Gas and fees are explained in the [How Filecoin Works guide](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#the-network). By default, Lotus automatically sets all the necessary values. However, you may want to use the `--gas-feecap` flag in the `send` command to avoid surprises when network congestion is high. For more information about messages and fees, see the [Message Pool guide]({{< relref "message-pool" >}}) and [Gas fees](https://docs.filecoin.io/smart-contracts/filecoin-evm-runtime/how-gas-works/) sections.

### Transfer FIL from/to ETH addresses

Lotus users can use the Lotus CLI to transfer FIL from an `f1...` address to a `0xb...` address using the following process:

1. Get the f04 address from an Ethereum-style address:

```shell with-output
lotus evm stat 0xb....
```
```
Filecoin address:  f410fx...
Eth address:  0xb...
Actor lookup failed for faddr f410fx... with error: resolution lookup failed (f410fx...): resolve address f410fx...: actor not found
```

The above error is because the `f410fx...` address doesn't exist on-chain yet.

2. Send FIL to initialize the address on-chain:

```shell with-output
lotus send --from f1... f410... 1.00 
```
```
bafy2bza...
```

3. Check the chain info to see the new actor for 0xb...

```shell with-output
lotus evm stat 0xb...
```
```
Filecoin address:  f410fx...
Eth address:  0xb...
ID address:  f02...
Code cid:  bafk2bz...
Actor Type:  fil/11/placeholder
```

## Exporting and importing addresses

{{< alert icon="warning">}}
Keep your addresses' private keys safe! Do not share them with anyone! Store them in a secure location!
{{< /alert >}}

You can export a wallet from a Lotus node, and re-import it to a different Lotus node. Use `wallet export` to export an address from a node:

```shell
lotus wallet export <address> > <address>.key
```

Use `wallet import` to import an address into a node:

```shell with-output
lotus wallet import /path/to/<address>.key
```
```
imported key t1x37y5ekmq2yq5phcine3jvtrqgaxsjrdhpvmksa successfully!
```

### Offline nodes

If your Lotus nodes is offline and not synced, you can still import the addresses to another Lotus node. Each Lotus node stores its wallet in `~/.lotus/keystore`:

```
~/.lotus/keystore/
├── MF2XI2...
├── MRSWMYLVNR...
├── NRUWE4BSOA...
├── O5QWY3DFOQWWMM3RNZSXI6TKOJYHQYTMMQZHQNDBNRY...
└── O5QWY3DFOQWWMM3VOBZHAZLCOIZGINLDMRZWWNLMNJS...
```

The filename for the keys are base32 encoded, so you can find which address is which by decoding the string.

To export a wallet when a node is offline, copy these files _from_ `~/.lotus/keystore` to another location. To import this wallet, copy these files _into_ `~/.lotus/keystore`. The Lotus node will automatically use these keys when it next starts.

### Deleting addresses

{{< alert icon="warning" >}}
Please note that Lotus only performs a soft deletion of the address with the `delete` command, marking the address as unusable, without erasing the data itself from the database. You will have to manually go into `~/.lotus/keystore` and actually deleting the address itself for permanent removal. 
{{< /alert >}}

You can delete an address in your wallet with the `lotus wallet delete` command.

```shell with-output
lotus wallet delete <address>
```
```
Soft deleting address: t1ceuikq3zsznu5tghv3ft7j6mmtdygqx7sjpezlq
Hard deletion of the address in `~/.lotus/keystore` is needed for permanent removal
```

{{< alert icon="warning" >}}
Please note that Lotus only performs a soft deletion of the address with the `delete` command, marking the address as unusable, without erasing the data itself from the database. You will have to manually go into `~/.lotus/keystore` and actually deleting the address itself for permanent removal. 
{{< /alert >}}