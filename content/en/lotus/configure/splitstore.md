---
title: "SplitStore"
description: "SplitStore, an actively scalable blockstore for the Filecoin chain which reduces the performance impact of large blockstores."
lead: "Version 1.17.1 introduces SplitStore, an actively scalable blockstore for the Filecoin chain which reduces the performance impact of large blockstores."
draft: false
menu:
    lotus:
        parent: "lotus-configure"
aliases:
    - /lotus/manage/chain-management/#splitstore
weight: 310
toc: true
---

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

  # EnableColdStoreAutoPrune turns on compaction of the coldstore i.e. pruning
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

### Compaction

Compaction works transactionally with the following algorithm:

- We prepare a transaction whereby all i/o referenced objects through the API are tracked.
- We walk the chain and mark reachable objects, keeping four finalities of state roots and messages and all headers all the way to genesis.
- Once the chain walk is complete, we begin full transaction protection with concurrent marking; we walk and mark all references created during the chain walk. At the same time, all I/O through the API concurrently marks objects as live references.
- We collect cold objects by iterating through the hotstore and checking the mark set; if an object is not marked, then it is a candidate for purge.
- When running with a coldstore, we next copy all cold objects to the coldstore.
- At this point, we are ready to begin purging
- We then end the transaction and compact/garbage collect the hotstore.

### Cold Store Garbage Collection

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