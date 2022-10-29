---
title: "Chain management"
description: "The Lotus chain carries the information necessary to compute the current state of the Filecoin network. This guide explains how to manage several aspects of the chain, including how to decrease your node's sync time by loading the chain from a snapshot."
lead: "The Lotus chain carries the information necessary to compute the current state of the Filecoin network. This guide explains how to manage several aspects of the chain, including how to decrease your node's sync time by loading the chain from a snapshot."
draft: false
menu:
    lotus:
        parent: "lotus-management"
aliases:
    - /docs/set-up/chain-management/
weight: 415
toc: true
---

## Syncing

Lotus will automatically sync to the latest _chain head_ by fetching the block headers from the current _head_ down to the last synced epoch. The node then retrieves and verifies all the blocks from the last synced epoch to the current head. Once Lotus is synced, it will learn about new blocks as they are mined for every epoch and verify them accordingly. Every epoch might see a variable number of mined blocks.

Filecoin's blockchain is complex and grows relatively fast. It takes about 4 seconds to verify a tipset, which in turn means it takes about 1 month to validate 700,000 tipsets. As syncing the chain from genesis is no longer practical, an alternative is to obtain a collection of all IPLD blocks one needs to continue validating the chain state going forward. Such a collection is called a snapshot. Current;y one such snapshot is available

| Name                                 | End height   | Message start height       | State start height          |
| ------------------------------------ | ------------ | -------------------------- | --------------------------- |
| [Lightweight](#lightweight-snapshot) | Recent block | Recent block - 1802 blocks | Current block - 1802 blocks |

### Lightweight snapshot

We recommend most users perform the initial node sync from a lightweight snapshot. These snapshots do not contain the full states of the chain and are not suitable for nodes that need to perform queries against historical state information, such as block explorers. However, they are significantly smaller than full chain snapshots and should be sufficient for most use-cases.

{{< alert icon="warning" >}}
These lightweight state snapshots **do not contain any message receipts**. To get message receipts, you need to sync your Lotus node from the genesis block without using any of these snapshots.
{{< /alert >}}

1. Download the most recent lightweight snapshot and its checksum:

    a. For **mainnet**, command always contains the latest snapshot available for mainnet:

    ```shell
    curl -sI https://snapshots.mainnet.filops.net/minimal/latest | perl -ne '/Location:\s(.+)\.car/ && print "$1.sha256sum\n$1.car"' | xargs wget
    ```

    a. For **testnet**, command always contains the latest snapshot available for testnet:


    ```shell
    curl -sI https://snapshots.calibrationnet.filops.net/minimal/latest | perl -ne '/Location:\s(.+)\.car/ && print "$1.sha256sum\n$1.car"' | xargs wget
    ```

1. Check the `sha256sum` of the downloaded snapshot:

    ```shell with-output
    # Replace the filename based on the snapshot you downloaded.
    sha256sum -c 1419120_2022_10_24T18_00_00Z.sha256sum
    ```

    This will output something like:

    ```shell
    1419120_2022_10_24T18_00_00Z.car: OK
    ```

1. Start the Lotus daemon using `--import-snapshot`:

    ```shell
    # Replace the filename for the `.car` file based on the snapshot you downloaded.
    lotus daemon --import-snapshot 1419120_2022_10_24T18_00_00Z.car
    ```

{{< alert icon="tip" >}}
We strongly recommend that you download and verify the checksum of the snapshot before importing. However, you can skip the `sha256sum` check and use the snapshot URL directly if you prefer:

```shell
lotus daemon --import-snapshot https://snapshots.mainnet.filops.net/minimal/latest
```

{{< /alert >}}

#### Sync wait

Use `sync wait` to output the state of your current chain as an ongoing process:

```shell
lotus sync wait
```

This will output something like:

```shell
Worker: 0; Base: 0; Target: 414300 (diff: 414300)
State: header sync; Current Epoch: 410769; Todo: 3531
Validated 0 messages (0 per second)
...
```

Use `chain getblock` to check when the last synced block was mined:

```shell
date -d @$(./lotus chain getblock $(./lotus chain head) | jq .Timestamp)
```

This will output something like:

```shell
Mon 24 Aug 2020 06:00:00 PM EDT
```

## Creating a snapshot

A lightweight chain CAR-snapshot can be created with `chain export`:

```shell
lotus chain export --recent-stateroots=2000 --skip-old-msgs <filename>
```

{{< alert icon="warning" >}} This is a resource demanding task for the node. It will take over an hour to create the CAR-snapshot, and the process will use around 100GB of RAM. {{< /alert >}}

## Restoring a custom snapshot

You can restore snapshots by starting the daemon with the `--import-snapshot` option:

```shell
lotus daemon --import-snapshot <filename>
```

If you do not want the daemon to start once the snapshot has finished, add the `--halt-after-import` flag:

```shell
lotus daemon --halt-after-import --import-snapshot <filename>
```

## Compacting the chain data

It is possible to _prune_ the current chain data used by Lotus to reduce the node's disk footprint by resyncing from a minimal snapshot.

1. Export the chain data:

    ```shell
    lotus chain export --recent-stateroots=901 --skip-old-msgs my-snapshot.car
    ```

1. Stop the Lotus daemon:

    ```shell
    lotus daemon stop
    ```

1. Back up the chain data and create a directory  for chain data:

    ```shell
    mv ~/.lotus/datastore/chain ~/.lotus/datastore/chain_backup
    mkdir ~/.lotus/datastore/chain 
    ```

1. Import the chain data:

    ```shell
    lotus daemon --import-snapshot my-snapshot.car --halt-after-import
    ```

1. Start the daemon:

    ```shell
    lotus daemon 
    ```

1. Open another ssh connection or terminal to check sync status :

    ```shell
    lotus sync status 
    lotus sync wait 
    ```

1. That's it!
