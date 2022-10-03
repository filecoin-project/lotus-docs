---
title: 'Using Ledger'
description: "This guide will show you how to use Lotus with a Ledger hardware wallet.
You can either use the Glif wallet or manually manage your funds using the Lotus node with Ledger integration."
lead: "This guide will show you how to use Lotus with a Ledger hardware wallet.
You can either use the Glif wallet or manually manage your funds using the Lotus node with Ledger integration."
draft: false
menu:
    lotus:
        parent: "lotus-management"
aliases:
    - /docs/set-up/manage-fil-with-ledger/
weight: 407
toc: true
---

Before you select a wallet, setup your Ledger device.

## Setup your Ledger device

1. Install [Ledger Live](https://www.ledger.com/start/) and follow the instructions to set up your device.

   {{< alert icon="warning" >}}
   Linux users may need to add the [necessary udev rules](https://support.ledger.com/hc/en-us/articles/115005165269-Fix-USB-connection-issues-with-Ledger-Live?support=true)
   {{< /alert >}}

1. Navigate to the Ledger Live dashboard.

1. Under **Settings**, enable **Developer mode**:

   ![ledger-enable-dev-mode](ledger.png)

1. Under **Manager**, search for and install the **Filecoin** app.


Now that you've setup your ledger device, select your wallet UI option.

## Ledger Wallet UI Options

You can either use the [browser-based Glif wallet](#glif-wallet) or manually manage your funds using the [Lotus node and Ledger integration](#lotus).

### Using Glif Wallet

Filecoin is not accessible directly through the Ledger Live application. However, you can use your Ledger hardware with the Glif wallet at [glif.io](https://glif.io). Glif is an open-source, browser-based Filecoin wallet. It uses the [Filecoin Ledger integration library](https://github.com/Zondax/ledger-filecoin/), which has been security audited by a third-party.

### Using Lotus

To use a Filecoin Lotus node with Ledger hardware to manage your funds, add your Ledger to a Lotus node.

#### Add your Ledger to a Lotus node

{{< alert icon="warning" >}}
Ensure that you fully trust the Lotus node you are connecting to.
{{< /alert >}}

1. Navigate to `~/.lotus/config.toml`.
1. In the Lotus configuration file, add `EnableLedger = true` to the `[Wallet]` section:

   ```toml
   [Wallet]
     EnableLedger = true
   ```

1. Unlock your Ledger device.
1. Open the Filecoin app on your Ledger device and keep it connected to your computer.
1. Create a Ledger-backed (`secp256k1-ledger`) wallet using the `lotus wallet` command:

   ```shell
   lotus wallet new secp256k1-ledger
   ```

   {{< alert icon="warning" >}}Calling `lotus wallet new secp256k1-ledger` will provide a new Ledger-backed key whenever called. When called on a different Lotus node or in one that has been reset, the same keys will be generated as they are based on the Ledger device master key.{{< /alert >}}

1.  On your Ledger device, confirm the creation of the wallet.

**From this point, any [FIL send operation](#sending-fil) from a Ledger wallet must be approved on the Ledger device.** Ensure that the Ledger device is connected, unlocked, and running the Filecoin app when performing any FIL send operation.


{{< alert icon="warning" >}}
The `lotus-shed` application provides additional Ledger functionality, like listing the keys in the device and providing information about them.
{{< /alert >}}
