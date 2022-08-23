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

Filecoin's blockchain grows relatively fast and a full sync will take a long time. Lotus offers a faster way to sync by using trusted state snapshots. There are two types of snapshot available:

| Name                                 | End height    | Message start height        | State start height          |
| ------------------------------------ | ------------- | --------------------------- | --------------------------- |
| [Lightweight](#lightweight-snapshot) | Current block | Current block - 2000 blocks | Current block - 2000 blocks |
| [Full chain](#full-chain-snapshot)   | Current block | Genesis block               | Current block - 2000 blocks |

### Lightweight snapshot

We recommend most users perform the initial node sync from a lightweight snapshot. These snapshots do not contain the full states of the chain and are not suitable for nodes that need to perform queries against historical state information, such as block explorers. However, they are significantly smaller than full chain snapshots and should be sufficient for most use-cases.

{{< alert icon="warning" >}}
These lightweight state snapshots **do not contain any message receipts**. To get message receipts, you need to sync your Lotus node from the genesis block without using any of these snapshots.
{{< /alert >}}

1. Download the most recent lightweight snapshot and its checksum:

    a. For **mainnet**, command always contains the latest snapshot available for mainnet:

    ```shell
    curl -sI https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car | perl -ne '/x-amz-website-redirect-location:\s(.+)\.car/ && print "$1.sha256sum\n$1.car"' | xargs wget
    ```

    b. For **testnet**, use the [latest calibration network snapshot](https://www.mediafire.com/file/gquphc7qw0ffzdk/lotus_cali_snapshot_2022_05_18_high_959844.car.tar.gz/file). Testnet snapshots are maintained by Filecoin community voluntarily, and may not be up-to-date. Please double check before using them.

    ```shell
    curl -sI https://www.mediafire.com/file/gquphc7qw0ffzdk/lotus_cali_snapshot_2022_05_18_high_959844.car.tar.gz/file
    ```

1. Check the `sha256sum` of the downloaded snapshot:

    ```shell with-output
    # Replace the filenames for both `.sha256sum` and `.car` files based on the snapshot you downloaded.
    echo "$(cut -c 1-64 minimal_finality_stateroots_517061_2021-02-20_11-00-00.sha256sum) minimal_finality_stateroots_517061_2021-02-20_11-00-00.car" | sha256sum --check
    ```

    This will output something like:

    ```shell
    minimal_finality_stateroots_517061_2021-02-20_11-00-00.car: OK
    ```

1. Start the Lotus daemon using `--import-snapshot`:

    ```shell
    # Replace the filename for the `.car` file based on the snapshot you downloaded.
    lotus daemon --import-snapshot minimal_finality_stateroots_517061_2021-02-20_11-00-00.car
    ```

{{< alert icon="tip" >}}
We strongly recommend that you download and verify the checksum of the snapshot before importing. However, you can skip the `sha256sum` check and use the snapshot URL directly if you prefer:

```shell
lotus daemon --import-snapshot https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/minimal_finality_stateroots_latest.car
```

{{< /alert >}}

#### New Lightweight Snapshot Service

We have soft launched a new Lightweight chain snapshot service which will be replacing the snapshots above in the future. More information about these snapshots can be found in [Notion](https://pl-strflt.notion.site/Lightweight-Filecoin-Chain-Snapshots-17e4c386f35c44548f5863afb7b5e024). These snapshots should be considered experimental during the soft launch and avoided for critical systems.

**Mainnet**
```shell
lotus daemon --import-snapshot https://snapshots.mainnet.filops.net/minimal/latest
```

**Calibrationnet**
```shell
lotus daemon --import-snapshot https://snapshots.calibrationnet.filops.net/minimal/latest
```

### Full chain snapshot

Full chain snapshots contain every block from genesis until the current tipset. You can trustlessly import these complete snapshots by supplying the `--import-chain` option to recalculate the entire state during import:

```shell
lotus daemon --import-chain https://fil-chain-snapshots-fallback.s3.amazonaws.com/mainnet/complete_chain_with_finality_stateroots_latest.car
```

This operation will take multiple days due to the size and complexity of the Filecoin blockchain.

### Checking sync status

There are two ways to check your Lotus daemon's chain synching progress.

#### Sync status

Use `sync status` to output the current state of your local chain:

```shell
lotus sync status
```

This will output something like:

```shell
sync status:
worker 0:
        Base:   [bafy2bzacecnamqgqmifpluoeldx7zzglxcljo6oja4vrmtj7432rphldpdmm2]
        Target: [bafy2bzaceb4b3ionbbxz4uqoehzkjlt4ayta7bneh2bh5xatnwypeuqypebmw bafy2bzaceb2uct4pawanule5bt2ivepcgqls6e6f52lccofvdyfynyfnsa3aa bafy2bzacealylayv2mpgx7wkf54diu6vqmw5yubdgkauii7q2fb7hvwk4343i] (414300)
        Height diff:    414300
        Stage: header sync
        Height: 414300
        Elapsed: 765.267091ms
```

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

A full chain CAR-snapshot can be created with `chain export`:

```shell
lotus chain export <filename>
```

To back up a certain number of the most recent state roots, use the `--recent-stateroots` option, along with how many state roots you would like to backup:

```shell
lotus chain export --recent-stateroots=2000 <filename>
```

To create a _pruned_ snapshot and only include blocks directly referenced by the exported state roots, add the `skip-old-msgs` option:

```shell
lotus chain export --recent-stateroots=2000 --skip-old-msgs <filename>
```

{{< alert icon="warning" >}} This is a resource demanding task for the node. It may take up to 8 hours to create the CAR-snapshot, and the process will use around 70GB of RAM. {{< /alert >}}

## Restoring a custom snapshot

You can restore snapshots by starting the daemon with the `--import-snapshot` option:

```shell
# Without verification
lotus daemon --import-snapshot <filename>

# With verification
lotus daemon --import-chain <filename>
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

## SplitStore

Version 1.17.1 introduces SplitStore, an actively scalable blockstore for the Filecoin chain which reduces the performance impact of large blockstores.

SplitStore is a freestanding compacting blockstore that allows you to keep a small 60 GiB to 275 GiB working set in a hot blockstore and reliably archive out-of-scope objects in a coldstore. The coldstore can also be a _discard-store_, whereby out-of-scope objects are discarded, or a universal badger blockstore, which can be periodically garbage collected according to configurable user retention policies. The universal badger blockstore is the default storage type.

To enable the splitstore, edit `.lotus/config.toml` and add the following:

```toml
[Chainstore]
  # type: bool
  # env var: LOTUS_CHAINSTORE_ENABLESPLITSTORE
  EnableSplitstore = true
```

If you intend to use the discard-store you also need to add the following:

```toml
[Chainstore.Splitstore]
  # ColdStoreType specifies the type of the coldstore.
  # It can be "universal" (default) or "discard" for discarding cold blocks.
  #
  # type: string
  # env var: LOTUS_CHAINSTORE_SPLITSTORE_COLDSTORETYPE
  ColdStoreType = "discard"
```

### Configuration Options

```toml
[Chainstore.Splitstore]
  # ColdStoreType specifies the type of the coldstore.
  # It can be "universal" (default) or "discard" for discarding cold blocks.
  #
  # type: string
  # env var: LOTUS_CHAINSTORE_SPLITSTORE_COLDSTORETYPE
  ColdStoreType = "universal"

  # HotStoreType specifies the type of the hotstore.
  # Only currently supported value is "badger".
  #
  # type: string
  # env var: LOTUS_CHAINSTORE_SPLITSTORE_HOTSTORETYPE
  HotStoreType = "badger"

  # MarkSetType specifies the type of the markset.
  # It can be "map" for in memory marking or "badger" (default) for on-disk marking.
  #
  # type: string
  # env var: LOTUS_CHAINSTORE_SPLITSTORE_MARKSETTYPE
  MarkSetType = "badger"

  # HotStoreMessageRetention specifies the retention policy for messages, in finalities beyond
  # the compaction boundary; default is 0.
  #
  # type: uint64
  # env var: LOTUS_CHAINSTORE_SPLITSTORE_HOTSTOREMESSAGERETENTION
  HotStoreMessageRetention = 0

  # HotStoreFullGCFrequency specifies how often to perform a full (moving) GC on the hotstore.
  # A value of 0 disables, while a value 1 will do full GC in every compaction.
  # Default is 20 (about once a week).
  #
  # type: uint64
  # env var: LOTUS_CHAINSTORE_SPLITSTORE_HOTSTOREFULLGCFREQUENCY
  HotStoreFullGCFrequency = 20

  # EnableColdStoreAutoPrune turns on compaction of the cold store i.e. pruning
  # where hotstore compaction occurs every finality epochs pruning happens every 3 finalities
  # Default is false
  #
  # type: bool
  # env var: LOTUS_CHAINSTORE_SPLITSTORE_ENABLECOLDSTOREAUTOPRUNE
  EnableColdStoreAutoPrune = false

  # ColdStoreFullGCFrequency specifies how often to performa a full (moving) GC on the coldstore.
  # Only applies if auto prune is enabled.  A value of 0 disables while a value of 1 will do
  # full GC in every prune.
  # Default is 7 (about once every a week)
  #
  # type: uint64
  # env var: LOTUS_CHAINSTORE_SPLITSTORE_COLDSTOREFULLGCFREQUENCY
  ColdStoreFullGCFrequency = 7

  # ColdStoreRetention specifies the retention policy for data reachable from the chain, in
  # finalities beyond the compaction boundary, default is 0, -1 retains everything
  #
  # type: int64
  # env var: LOTUS_CHAINSTORE_SPLITSTORE_COLDSTORERETENTION
  ColdStoreRetention = 0
  ```

### Operation

When the splitstore is first enabled, the existing blockstore becomes the coldstore and a fresh hotstore is initialized.

The hotstore is warmed up on the first startup to load all chain headers and state roots in the current head. This process allows us to immediately gain the performance benefits of a smaller blockstore, which can be substantial for full archival nodes.

All new writes are directed to the hotstore, while reads first hit the hotstore with fallback to the coldstore.

Once five finalities have elapsed and every subsequent finality, the blockstore _compacts_. Compaction is the process of moving all unreachable objects within the last four finalities from the hotstore to the coldstore. These objects are discarded if the system is configured with a discard coldstore. Chain headers are considered reachable all the way to the genesis block. Stateroots and messages are considered reachable only within the last four finalities unless there is a live reference to them.

## Compaction

Compaction works transactionally with the following algorithm:

- We prepare a transaction whereby all i/o referenced objects through the API are tracked.
- We walk the chain and mark reachable objects, keeping four finalities of state roots and messages and all headers all the way to genesis.
- Once the chain walk is complete, we begin full transaction protection with concurrent marking; we walk and mark all references created during the chain walk. At the same time, all I/O through the API concurrently marks objects as live references.
- We collect cold objects by iterating through the hotstore and checking the mark set; if an object is not marked, then it is a candidate for purge.
- When running with a coldstore, we next copy all cold objects to the coldstore.
- At this point, we are ready to begin purging
- We then end the transaction and compact/garbage collect the hotstore.

## Cold Store Garbage Collection

Garbage collection can be performed manually by running the `lotus chain prune <flags>` command or automatically by setting the `EnableColdStoreAutoPrune` in your `.lotus/config.toml` as follows:

```toml
# EnableColdStoreAutoPrune turns on compaction of the cold store i.e. pruning
# where hotstore compaction occurs every finality epochs pruning happens every 3 finalities
# Default is false
#
# type: bool
# env var: LOTUS_CHAINSTORE_SPLITSTORE_ENABLECOLDSTOREAUTOPRUNE
EnableColdStoreAutoPrune = true
```

## Utilities

`lotus-shed` has a `splitstore` command which provides some utilities:

- `rollback` -- rolls back a splitstore installation.
  This command copies the hotstore on top of the coldstore, and then deletes the splitstore
  directory and associated metadata keys.
  It can also optionally compact/gc the coldstore after the copy (with the `--gc-coldstore` flag)
  and automatically rewrite the lotus config to disable splitstore (with the `--rewrite-config` flag).
  Note: the node *must be stopped* before running this command.
- `clear` -- clears a splitstore installation for restart from snapshot.
- `check` -- asynchronously runs a basic healthcheck on the splitstore.
  The results are appended to `<lotus-repo>/datastore/splitstore/check.txt`.
- `info` -- prints some basic information about the splitstore.
