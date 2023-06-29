---
title: "Switch networks"
description: "This guide will show you how to switch between various Filecoin networks with Lotus, depending on your testing or development needs."
lead: "This guide will show you how to switch between various Filecoin networks with Lotus, depending on your testing or development needs."
draft: false
menu:
    lotus:
        parent: "lotus-management"
aliases:
    - /docs/set-up/switch-networks/
weight: 430
toc: true
---

Lotus is compiled to operate on a single network, and the information in the configuration folder corresponds to that network.

- Local devnet - [You can run a local devnet]({{< relref "../developers/local-network/">}})
- Testnets
    - [Calibnet](https://network.filecoin.io/#calibration) - The calibration network is a testnetwork that mimics the properties of the mainnet. It is planned to be long-running, and will only be reset in case of critical bugs that are uncovered during network upgrade testing.
- [Mainnet](https://network.filecoin.io/#mainnet)

You can choose one of the following methods to switch to a different network on your setup:

## Clean, rebuild, reinstall

The first method is the simplest. In this approach, you remove or change the path for the data related to the network you were running on before and launch a Lotus binary built to run on the new one:

{{< alert icon="warning">}}**Switching from Mainnet to Calibnet?**

This process deletes everything from the old network, including wallets. If you are on `mainnet` and are switching to `calibnet` but you want to keep all your `mainnet` data intact for when you switch back, make sure to change your `$LOTUS_PATH` before running `lotus daemon`:

To change your `$LOTUS_PATH` run: `export LOTUS_PATH=~/.new-lotus-path`.
{{< /alert >}}

1. Shut down the Lotus daemon if it is currently running.
1. Remove the `~/.lotus` folder, or whatever you set `$LOTUS_PATH` to. The default is `~/.lotus`.
1. Clone the Lotus repository and move into the `lotus` folder:

    ```shell
    git clone https://github.com/filecoin-project/lotus
    cd lotus
    ```

1. Build the `lotus` executable using `make clean ...` to specify which network you want to join:

    | Network | Build command | Description |
    | --- | --- | --- |
    | Mainnet | `make clean all` | The production Filecoin network. FIL has real-world value on this network. |
    | Calibnet | `make clean calibnet` | A test network with a minimum sector size of 32 GiB. FIL has no real-world value on this network. |

2. Start the Lotus daemon again and let it sync to the new network:

    ```shell
    lotus daemon
    ```

## Backing up Lotus data

If you wish to backup Lotus data, copy the `~/.lotus` (or `$LOTUS_PATH`) folder somewhere. This will take quite a while if the Lotus node has synced the whole network.

Another alternative is to [export your wallets]({{< relref "../../lotus/manage/manage-fil/#exporting-and-importing-addresses" >}}) and also [export the chain]({{< relref "../../lotus/manage/chain-management/#creating-a-snapshot" >}}) for later re-import on a newly installed Lotus Node.
