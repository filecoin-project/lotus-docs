---
title: 'Manage FIL'
description: "This guide will show you how to create and manage a Lotus wallet and how to use it to send some Filecoin to a different address. Each node can have multiple addresses."
lead: "This guide will show you how to create and manage a Lotus wallet and how to use it to send some Filecoin to a different address. Each node can have multiple addresses."
draft: false
menu:
    docs:
        parent: "node-management"
weight: 260
toc: true
---

To receive and send FIL with Lotus, you will need to have a [Lotus node installed and running]({{< relref "install" >}}).

## About Wallet Addresses

When using a wallet, an account is identified by its [address](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#addresses). A Filecoin address always starts with the letter `f` and a digit that indicates what type of address it is.

Filecoin accounts have two kinds of address, longer **public key** addresses, and shorter **ID** addresses. Both addresses refer to the same account and can be used to send and receive FIL using a wallet.

### Public Key Address

A [public key address](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#public-key-addresses-f1-and-f3) is derived directly from a cryptographic key. Public key addresses start with the characters `f1` (secp256k1) or `f3` (BLS), depending on the type of encryption key used.

Here's an example of a secp256k1 public key address: `f1abjxfbp274xpdqcpuaykwkfb43omjotacm2p3za`.

Public key addresses are the most common way to refer to Filecoin accounts, and they are supported by hardware wallets like [Ledger](https://ledger.com).

Because a public key address does not depend on any blockchain state, they are considered [robust](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#robust-addresses-versus-id-addresses) and are recommended for most use cases involving transfers of FIL, for example, when sending FIL to another user through an exchange.

### ID Address

ID addresses are a compact and more "human friendly" way to refer to an account than public key addresses. ID addresses always start with the characters `f0`, followed by a sequence of digits, for example: `f033259`.

Every ID address for a Filecoin account has an alternative public key address that corresponds to the same account. You can find the ID address for any public key address by searching for the public key address on [FilFox](https://filfox.info/), a Filecoin block explorer.

Because they are more compact than public key addresses, ID addresses are often used when refering to miners and other long-lived Filecoin [Actors](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#actors). As these actors receive a large volume of messages, the compact address can result in meaningful savings in gas fees. A multisig wallet is a type of Actor.

While you can send FIL to an ID address using a wallet, you should first check the details for the account on [FilFox](https://filfox.info/) to see when the account was created, as well as the corresponding public key address. If the address was created very recently (within the [finality period](https://docs.filecoin.io/reference/glossary/#finality)) there is a small chance that it could be re-assigned as the network reaches consensus, and the public key address should be used instead.

More information about Addresses can be found in the [How Filecoin works](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#addresses) section.

## Creating a wallet

Creating wallets using Lotus is very simple. There are mutliple wallet types to choose from.

### Create a BLS wallet

```shell
lotus wallet new bls
```

### Create a secp256k1 wallet

```shell
lotus wallet new
```

### Create a multisig wallet

```shell
lotus msig create address1 address2..
```

This will create a new address and print it. You can distinguish mainnet from testnet addresses because they start with `f` for mainnet and `t` for testnets.

{{< alert icon="warning">}}
The information for the addresses in your wallet is stored in the `~/.lotus/keystore` (or `$LOTUS_PATH/keystore`). Removing these folders will also remove the keys, and you will lose control of any funds in those wallets. We recommend [backing up your wallets](#exporting-and-importing-addresses) as soon as they have been created or using a [hardware wallet](#ledger).
{{< /alert >}}

## Listing addresses

You can create as many addresses as you need. One of them will be the _default address_.

You can see a list of all addresses for your current node:

```shell
lotus wallet list
```

You can see the default address with:

```shell
lotus wallet default
```

If you wish, you can change the default address to a different one:

```shell
lotus wallet set-default <address>
```

## Obtaining FIL

For non-mainnet networks, `FIL` can be obtained from a faucet. A list of faucets is available on the [networks dashboard](https://network.filecoin.io). For mainnet, the easiest is to buy `FIL` from an exchange. Not all exchanges support `FIL`, so do your research before signing up.

Once you have received some `FIL`, use `wallet balance` to check your balance:

```shell
lotus wallet balance
```

Remember that you will only see the latest balance when your daemon is fully synced.

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

For advanced sending options:

```shell
lotus send --help
```

#### Specify Invocation Parameters

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

Every transaction that sends `FIL` pays an additional fee based on its _gas_ usage. Gas and fees are explained in the [How Filecoin Works guide](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#the-network). By default, Lotus automatically sets all the necessary values. However, you may want to use the `--gas-feecap` flag in the `send` command to avoid surprises when network congestion is high. For more information about messages and fees, see the [Message Pool guide]({{< relref "message-pool" >}}) and [Gas fees](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#gas-fees) sections.

## Exporting and importing addresses

{{< alert icon="warning">}}
Keep your addresses' private keys safe! Do not share them with anyone! Store them in a secure location!
{{< /alert >}}

You can export and re-import a wallet, including a different Lotus node. Use `wallet export` to export an address from a node:

```shell
lotus wallet export <address> > <address>.key
```

Use `wallet import` to import an address into a node:

```shell
lotus wallet import <address>.key
```

and:

### Offline nodes

Each node stores its wallet in `~/.lotus/keystore`:

```
~/.lotus/keystore/
├── MF2XI2...
├── MRSWMYLVNR...
├── NRUWE4BSOA...
├── O5QWY3DFOQWWMM3RNZSXI6TKOJYHQYTMMQZHQNDBNRY...
└── O5QWY3DFOQWWMM3VOBZHAZLCOIZGINLDMRZWWNLMNJS...
```

To export a wallet when a node is offline, copy these files _from_ `~/.lotus/keystore` to another location. To import this wallet, copy these files _into_ `~/.lotus/keystore`. The Lotus node will automatically use these keys when it next starts.

## Ledger

### Setup your Ledger device

1. Install [Ledger Live](https://www.ledger.com/start/) and follow the instructions to set up your device. Linux users may need to add the [necessary udev rules](https://support.ledger.com/hc/en-us/articles/115005165269-Fix-USB-connection-issues-with-Ledger-Live?support=true).
1. Enable **Developer mode** in the Ledger live settings:

   ![ledger-enable-dev-mode](ledger.png)

1. You should now be able to search and install the **Filecoin** app in the **Manager** section of Ledger Live.


### Ledger Wallet UI Options

You can either use the [browser-based Glif wallet](#glif-wallet) or manually manage your funds using the [Lotus node and Ledger integration](#lotus).

#### Glif Wallet

Filecoin is not accessible directly through the Ledger Live application. However, you can use your Ledger hardware with the Glif wallet at [glif.io](https://glif.io). Glif is an open-source Filecoin wallet you can use in the browser. It uses the [Filecoin Ledger integration library](https://github.com/Zondax/ledger-filecoin/), which has been security audited by a third-party.

#### Lotus

You can use a Filecoin Lotus node with Ledger hardware to manage your funds.

##### Add your Ledger to a Lotus node

Make sure you fully trust the Lotus node you are connecting to.

1. In the [Lotus configuration]({{ relref configuration-and-advanced-usage }}) (`~/.lotus/config.toml`), add `EnableLedger = true` into to `[Wallet]` section:

   ```toml
   [Wallet]
     EnableLedger = true
   ```

1. Unlock your Ledger device.
1. Open the Filecoin app on your Ledger device and keep it connected to your computer.
1. Use `wallet new secp256k1-ledger` to create a Ledger-backed wallet:

   ```shell
   lotus wallet new secp256k1-ledger
   ```

   You will have to confirm creation on your Ledger device.

   {{< alert icon="warning" >}}Calling `lotus wallet new secp256k1-ledger` will provide a new Ledger-backed key whenever called. When called on a different Lotus node or in one that has been reset, the same keys will be generated as they are based on the Ledger device master key.{{< /alert >}}

1. From this point, any [FIL send operation](#sending-fil) from a Ledger wallet will have to be approved on the Ledger device. Make sure it is connected, unlocked, and running the Filecoin app.


{{< alert icon="warning" >}}
The `lotus-shed` application provides additional Ledger functionality, like listing the keys in the device and providing information about them.
{{< /alert >}}
