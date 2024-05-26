---
title: "Payment channels"
description: "Payment channels are used to transfer funds between two actors. This guide explains how payment channels work in Lotus and provides some examples about how to operate with them."
lead: "Payment channels are used to transfer funds between two actors. This guide explains how payment channels work in Lotus and provides some examples about how to operate with them."
draft: true
menu:
    tutorials:
        parent: "tutorials-lotus"
aliases:
    - /docs/developers/payment-channels/
weight: 130
toc: true
---

In Lotus a payment channel is created when a client wants to fetch data from a provider. The client sends vouchers for the payment channel, and the provider sends data in response. Payment channels and vouchers can be used for any situation in which two parties need to incrementally transfer value between each other off-chain.

## Working principles

- The payment channel is created on-chain with an initial amount.
- Vouchers allow the client and the provider to exchange funds incrementally off-chain. The provider can submit vouchers to chain at any stage.
- Either party to the payment channel can settle the payment channel on chain.
- After a settlement period (currently 12 hours) either party to the payment channel can call collect on chain.
- Collect sends the value of submitted vouchers to the channel recipient (the provider), and refunds the remaining channel balance to the channel creator (the client).
- Vouchers have a lane, a nonce and a value, where vouchers with a higher nonce supersede vouchers with a lower nonce in the same lane. Each deal is created on a different lane.

## CLI example

For quick understanding, we can use the Lotus CLI to show how payment channels work. The Lotus CLI is a client to the Lotus daemon, and therefore each command run here corresponds to an API call to Lotus.

A client creates a payment channel to a provider with value 10 FIL:

```shell
$ lotus paych add-funds <from_addr> <to_addr> 10
<channel addr>
```

The client creates a voucher in lane 0 (implied) with nonce 1 (implied) and value 2:

```shell
lotus paych voucher create <channel addr> 2
```

The client sends the voucher to the provider and the provider adds the voucher to their local store:

```shell
lotus paych voucher add <channel addr> <voucher>
```

The provider sends some data to the client.

The client creates a voucher in lane 0 (implied) with nonce 2 (implied) and value 4:

```shell
lotus paych voucher create <channel addr> 4
```

The client sends the voucher to the provider and the provider adds the voucher and sends back more data.
etc.

The client can add value to the channel after it has been created by calling `paych add-funds` with the same client and provider addresses:

```shell
lotus paych add-funds <client addr> <provider addr> 5
<channel addr> # Same address as above. Channel now has 15
```

Once the client has received all their data, they may settle the channel. Note that settlement doesn't have to be done immediately. For example the client may keep the channel open as long as it wants to continue making deals with the provider.

```shell
lotus paych settle <channel addr>
```

The provider can submit vouchers to chain (note that lotus does this automatically when it sees a settle message appear on chain). The provider may have received many vouchers with incrementally higher values. The provider should submit the best vouchers. Note that there will be one best voucher for each lane:

```shell
lotus paych voucher best-spendable <channel addr>

<voucher>
<voucher>
<voucher>

lotus paych voucher submit <channel addr> <voucher>
```

Once the settlement period is over, either the client or provider can call collect to disburse funds.

```shell
lotus paych collect <channel addr>
```

