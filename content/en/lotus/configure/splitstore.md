---
title: "SplitStore"
description: "SplitStore, an actively scalable blockstore for the Filecoin chain which reduces the performance impact of large blockstores."
lead: "Version 1.19.0 introduces SplitStore, an actively scalable blockstore for the Filecoin chain which reduces the performance impact of large blockstores."
draft: false
menu:
    lotus:
        parent: "lotus-configure"
aliases:
    - "/lotus/manage/chain-management"
weight: 315
toc: true
---

SplitStore is a freestanding compacting blockstore that allows you to keep a small 60 GiB to 275 GiB working set in a hot blockstore and reliably archive out-of-scope objects in a coldstore. The coldstore can also be a _discard_ store, whereby out-of-scope objects are discarded, a _universal_ store, which will store all chain data or a  _messages_ store which will only store on-chain messages. The _messages_ badger blockstore is the default storage type.

### Preparing for SplitStore

{{< alert icon="warning" >}}From Lotus version 1.21.0 SplitStore is automatically activated by default on new nodes. However, for existing Lotus users, you need to explicitly configure SplitStore by uncommenting the `EnableSplitstore` option in your `config.toml` file. To enable SplitStore, set `EnableSplitstore=true`, and to disable it, set `EnableSplitstore=false`.

**It's important to note that your Lotus node will not start unless this configuration is properly set. If you are running a full archival node you will need to disable SplitStore as shown above!**{{< /alert >}}

{{< alert icon="warning" >}}Always enable or manually prune your SplitStore on a fully prepared `/.lotus/datastore` folder!{{< /alert >}}

1. Manually delete the contents of your `/.lotus/datastore/chain` folder.
2. If you are already running a SplitStore enabled node, you will also need to clear your existing SplitStore folders. You can do this by either running [`./lotus-shed splitstore clear --repo <lotus-repo-folder>`](https://lotus.filecoin.io/lotus/configure/splitstore/#utilities) or by manually deleting the contents of your `/.lotus/datastore/splitstore` folder.
3. Now that the old chain is removed, you must download a fresh copy, normally a [minimal snapshot](https://lotus.filecoin.io/lotus/manage/chain-management/#lightweight-snapshot) and then reimport.

### Enabling SplitStore

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
  # It can be "discard" (default) for discarding cold blocks, "messages" to store only messages or "universal" to store all chain state..
  #
  # type: string
  # env var: LOTUS_CHAINSTORE_SPLITSTORE_COLDSTORETYPE
  #ColdStoreType = "discard"
```

### Configuration Options

```toml
[Chainstore.Splitstore]
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

    # HotStoreMaxSpaceTarget sets a target max disk size for the hotstore. Splitstore GC
    # will run moving GC if disk utilization gets within a threshold (150 GB) of the target.
    # Splitstore GC will NOT run moving GC if the total size of the move would get
    # within 50 GB of the target, and instead will run a more aggressive online GC.
    # If both HotStoreFullGCFrequency and HotStoreMaxSpaceTarget are set then splitstore
    # GC will trigger moving GC if either configuration condition is met.
    # A reasonable minimum is 2x fully GCed hotstore size + 50 G buffer.
    # At this minimum size moving GC happens every time, any smaller and moving GC won't
    # be able to run. In spring 2023 this minimum is ~550 GB.
    #
    # type: uint64
    # env var: LOTUS_CHAINSTORE_SPLITSTORE_HOTSTOREMAXSPACETARGET
    HotStoreMaxSpaceTarget = 650000000000

    # When HotStoreMaxSpaceTarget is set Moving GC will be triggered when total moving size
    # exceeds HotstoreMaxSpaceTarget - HotstoreMaxSpaceThreshold
    #
    # type: uint64
    # env var: LOTUS_CHAINSTORE_SPLITSTORE_HOTSTOREMAXSPACETHRESHOLD
    HotStoreMaxSpaceThreshold = 150000000000

    # Safety buffer to prevent moving GC from overflowing disk when HotStoreMaxSpaceTarget
    # is set.  Moving GC will not occur when total moving size exceeds
    # HotstoreMaxSpaceTarget - HotstoreMaxSpaceSafetyBuffer
    #
    # type: uint64
    # env var: LOTUS_CHAINSTORE_SPLITSTORE_HOTSTOREMAXSPACESAFETYBUFFER
    HotstoreMaxSpaceSafetyBuffer = 50000000000
  ```

### Manual Chain Store Garbage Collection

Lotus version 1.21.0 also introudecs 3 new manual prune options:

- `lotus chain prune hot-moving` - This command will perform a full GC of the `hotstore` folder and is the most resource-intensive of the three. The `hot-moving` option creates the new `hotstore` before it removes the old one so **it is essential that there is adequate disk space available for the GC to succeed**. At the time of writing, a fully GC'd `hotstore` represenets approximately 295 GiB. Please ensure you have at least the minimum available when using this option. In the event of limited available disk space, you will need to use the `lotus chain prune hot` command as detailed below.
- `lotus chain prune hot` - This option is a recommended for situations where spare disk space is limited, as it is much less resource-intensive. The intended use of this command is to gradually decrease the size of the `hotstore` until it reaches a level where you can safely run a full GC using `lotus chain prune hot-moving`.
Please note that you may need to run this command several times to successfully decrease the `hotstore` footprint. We recommend starting with the following flags and values - `lotus chain prune hot --periodic --threshold 0.00000001`. The threshold setting is system and hotstore specific so you may need to experiment with different values in order to achieve the required outcome.
- `lotus chain prune compact-cold` - This command is used exclusively to manage the size of the coldstore and is only relevant for a non-discard SplitStore.

### Operation

When the splitstore is first enabled, the existing blockstore becomes the coldstore and a fresh hotstore is initialized.

The hotstore is warmed up on the first startup to load all chain headers and state roots in the current head. This process allows us to immediately gain the performance benefits of a smaller blockstore, which can be substantial for full archival nodes.

All new writes are directed to the hotstore, while reads first hit the hotstore with fallback to the coldstore.

Once five finalities have elapsed and every subsequent finality, the blockstore _compacts_. Compaction is the process of moving all unreachable objects within the last four finalities from the hotstore to the coldstore. These objects are discarded if the system is configured with a discard coldstore. Chain headers are considered reachable all the way to the genesis block. Stateroots and messages are considered reachable only within the last four finalities unless there is a live reference to them.

### Compaction

Compaction works transactionally with the following algorithm:

- We prepare a transaction whereby all i/o referenced objects through the API are tracked.
- We walk the chain and mark reachable objects, keeping four finalities of state roots and messages and all headers all the way to genesis.
- Once the chain walk is complete, we begin full transaction protection with concurrent marking; we walk and mark all references created during the chain walk. At the same time, all I/O through the API concurrently marks objects as live references.
- We collect cold objects by iterating through the hotstore and checking the mark set; if an object is not marked, then it is a candidate for purge.
- When running with a coldstore, we next copy all cold objects to the coldstore.
- At this point, we are ready to begin purging
- We then end the transaction and compact/garbage collect the hotstore.

### Relocating the Coldstore

Following successful configuration and activation of the SplitStore it is now also possible to further optimise daemon chain storage by relocating the coldstore data to slower and potentially less critical standard spinning disks. This can be accomplished by simply symlinking the current `/<lotus-repo>/datastore/chain` folder to a new folder located in your standard storage path.

```shell
mkdir /<standard-storage-path>/chain
ln -s /<lotus-repo>/datastore/chain /<standard-storage-path>/chain
```

### Utilities

`lotus-shed` has a `splitstore` command which provides some utilities:

- `rollback` -- rolls back a splitstore installation. This command copies the hotstore on top of the coldstore, and then deletes the splitstore directory and associated metadata keys. It can also optionally compact/gc the coldstore after the copy (with the `--gc-coldstore` flag) and automatically rewrite the lotus config to disable splitstore (with the `--rewrite-config` flag). The node *must be stopped* before running this command.
- `clear` -- clears a splitstore installation for restart from snapshot.
- `check` -- asynchronously runs a basic healthcheck on the splitstore.
  The results are appended to `<lotus-repo>/datastore/splitstore/check.txt`.
- `info` -- prints some basic information about the splitstore.
