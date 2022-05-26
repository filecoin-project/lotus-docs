---
title: "Configuration"
description: "This guide covers configurations that are needed after initializing your storage provider."
lead: "This guide covers configurations that are needed after initializing your storage provider. It also highlights some optional configurations you might want to consider."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-setup"
        identifier: "storage-providers-setup-configuration"
aliases:
    - /docs/storage-providers/config/
    - storage-providers/configure/configuration/
weight: 215
toc: true
---

{{< alert >}}
For any configuration in the config.toml file to take effect, the storage provider must be [restarted]({{< relref "../../storage-providers/operate/maintenance/" >}}).
{{< /alert >}}

## Required configurations

Since we initialized the storage provider with the `--no-local-storage` in the [initialize]({{< relref "../../storage-providers/setup/initialize/" >}} page, we need to specify the disk locations for long-term storage and sealing (fast SSDs recommended).

The `lotus-miner` keeps track of defined storage locations in in `~/.lotusminer/storage.json` (or `$LOTUS_MINER_PATH/storage.json`) and uses `~/.lotusminer` path as default.

Upon initialization of a storage location, a `<path-to-storage>/sectorstorage.json` file is created that contains the UUID assigned to this location, along with whether it can be used for sealing or storing.

### Adding sealing storage location

Before adding your sealing storage location you will need to consider where the sealing tasks are going to be performed. While the `lotus-miner` can run all of the sealing phases, and is configured to do so by defualt, using [seal workers]({{< relref "../../storage-providers/seal-workers/seal-workers/" >}} to offload computational heavy sealing tasks to separate machines or processes is recommended. Depending on how you architecture your system you will either need to add the sealing location to the `lotus-worker`, the `lotus-miner` or both depending on where you want the sealing tasks to be performed.

Under the storage-section in your `~/.lotusminer/config.toml` or `$LOTUS_MINER_PATH/config.toml` file, you can configure which sealing process you would like your `lotus-miner` to perform. If you want to fully delegate any of these operations to workers, set them to false.

```toml
[Storage]
  AllowAddPiece = true
  AllowPreCommit1 = true
  AllowPreCommit2 = true
  AllowCommit = true
  AllowUnseal = true
  AllowReplicaUpdate = true
  AllowProveReplicaUpdate2 = true
```

If you want some or all of the sealing tasks to be perfomed on the `lotus-miner` you will need to add a **custom sealing location** for the tasks. The _seal_ storage location should be a really fast storage medium so that the disk does not become the bottleneck that delays the sealing process. It can be specified with:

```sh
lotus-miner storage attach --init --seal <PATH_FOR_SEALING_STORAGE>
```

If you want to offload all the sealing tasks to `lotus-workers` you only need to add the sealing location on the workers and not on the `lotus-miner`. To setup seal workers follow the [seal worker]({{< relref "../../storage-providers/seal-workers/seal-workers/" >}} guide.

### Adding long-term storage location

**Custom location for storing:** After the _sealing_ process is completed, sealed sectors are moved to the _store_ location, which can be specified as follow:

```sh
lotus-miner storage attach --init --store <PATH_FOR_LONG_TERM_STORAGE>
```

This location can be made of large capacity, albeit slower, spinning-disks.

## Optional configurations

These prerequisites are optional and can be used on a case by case basis. Please make sure to understand the use case before performing these steps.

### Using OpenCL instead of CUDA

This step is only necessary if you are running an Nvidia GPU and would prefer to use OpenCL instead of CUDA. Please note that Cuda is recommended over OpenCL for sealing and proving workload. Most Linux distributions contain this package in their package manager:

```shell
sudo apt update -y && sudo apt install -y nvidia-opencl-icd -y
```

If you want to use OpenCL you do not need to compile FFI to use CUDA, so you can discard the `FFI_USE_CUDA` environment variable.

### Sealing performance

It is recommended to set the following environment variables in the environment so that they are defined every time any of the lotus daemons are launched:

```shell
 # See https://github.com/filecoin-project/rust-fil-proofs/
 export FIL_PROOFS_MAXIMIZE_CACHING=1 # More speed at RAM cost (1x sector-size of RAM - 32 GB).
 export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # precommit2 GPU acceleration
 export FIL_PROOFS_USE_GPU_TREE_BUILDER=1

 # The following increases speed of PreCommit1 at the cost of using a full
 # CPU Core-Complex rather than a single core. Should be used with CPU affinities set!
 # See https://github.com/filecoin-project/rust-fil-proofs/ and the seal workers guide.
 export FIL_PROOFS_USE_MULTICORE_SDR=1
 ```

 Depending on your GPU, you might want to experiment with the optional `BELLMAN_CPU_UTILIZATION` variable to designate a proportion of the multi-exponentiation calculation to be moved to a CPU in parallel to the GPU. But omitting this environment variable is probably optimal if you have a newer GPU card.

 ```shell
 # See https://github.com/filecoin-project/bellman
 export BELLMAN_CPU_UTILIZATION=0.875
 ```

The interval must be a number between `0` and `1`. The value `0.875` is a good starting point, but you should experiment with it if you want an optimal setting.


The Lotus Miner configutation is created after the [initialization step]({{< relref "../../storage-providers/setup/initialize/" >}}) during setup and placed in `~/.lotusminer/config.toml` or `$LOTUS_MINER_PATH/config.toml` when defined.

The _default configuration_ has all the items commented. To customize one of the items, you must remove the leading `#`.

## API section

The API section controls the settings of the [miner API]({{< relref "../../reference/basics/overview" >}}):

```toml
[API]
  # Binding address for the miner API
  ListenAddress = "/ip4/127.0.0.1/tcp/2345/http"
  # This should be set to the miner API address as seen externally
  RemoteListenAddress = "127.0.0.1:2345"
  # General network timeout value
  Timeout = "30s"
```

As you see, the listen address is bound to the local loopback interface by default. To open access to the miner API for other machines, set this to the IP address of the network interface you want to use. You can also set it to `0.0.0.0` to allow all interfaces. API access is protected by JWT tokens, but it should not be open to the internet.

Configure `RemoteListenAddress` to the value that a different node would have to use to reach this API. Usually, it is the miner's IP address and API port, but depending on your setup (proxies, public IPs, etc.), it might be a different IP.

## Subsystem section

This section allows you to disable subsystems of the `lotus-miner`.

```toml
[Subsystems]
  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLEMINING
  #EnableMining = true

  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLESEALING
  #EnableSealing = true

  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLESECTORSTORAGE
  #EnableSectorStorage = true

  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLEMARKETS
  #EnableMarkets = true

  # type: string
  # env var: LOTUS_SUBSYSTEMS_SEALERAPIINFO
  #SealerApiInfo = ""

  # type: string
  # env var: LOTUS_SUBSYSTEMS_SECTORINDEXAPIINFO
  #SectorIndexApiInfo = ""
```

## Addresses section

The addresses section allows users to specify additional addresses to send messages from. This helps mitigate head-of-line blocking for important messages when network fees are high. For more details see the [Miner addresses]({{< relref "addresses" >}}) section.

```toml
[Addresses]
  # Addresses to send PreCommit messages from
  PreCommitControl = []
  # Addresses to send Commit messages from
  CommitControl = []
  # Addresses to send Terminate Sector messages from
  TerminateControl = []
  # Addresses to send PublishStorageDeals from
  DealPublishControl = []
  # Disable the use of the owner address for messages which are sent automatically.
  # This is useful when the owner address is an offline/hardware key
  DisableOwnerFallback = false
  # Disable the use of the worker address for messages for which it's possible to use other control addresses
  DisableWorkerFallback = false
```

## Default configuration

The default configuration for a Lotus storage provider can be found in the [Lotus GitHub repository](https://raw.githubusercontent.com/filecoin-project/lotus/master/documentation/en/default-lotus-miner-config.toml).

```toml
[API]
  # Binding address for the Lotus API
  #
  # type: string
  # env var: LOTUS_API_LISTENADDRESS
  #ListenAddress = "/ip4/127.0.0.1/tcp/2345/http"

  # type: string
  # env var: LOTUS_API_REMOTELISTENADDRESS
  #RemoteListenAddress = "127.0.0.1:2345"

  # type: Duration
  # env var: LOTUS_API_TIMEOUT
  #Timeout = "30s"


[Backup]
  # Note that in case of metadata corruption it might be much harder to recover
  # your node if metadata log is disabled
  #
  # type: bool
  # env var: LOTUS_BACKUP_DISABLEMETADATALOG
  #DisableMetadataLog = false


[Libp2p]
  # Binding address for the libp2p host - 0 means random port.
  # Format: multiaddress; see https://multiformats.io/multiaddr/
  #
  # type: []string
  # env var: LOTUS_LIBP2P_LISTENADDRESSES
  #ListenAddresses = ["/ip4/0.0.0.0/tcp/0", "/ip6/::/tcp/0"]

  # Addresses to explicitally announce to other peers. If not specified,
  # all interface addresses are announced
  # Format: multiaddress
  #
  # type: []string
  # env var: LOTUS_LIBP2P_ANNOUNCEADDRESSES
  #AnnounceAddresses = []

  # Addresses to not announce
  # Format: multiaddress
  #
  # type: []string
  # env var: LOTUS_LIBP2P_NOANNOUNCEADDRESSES
  #NoAnnounceAddresses = []

  # When not disabled (default), lotus asks NAT devices (e.g., routers), to
  # open up an external port and forward it to the port lotus is running on.
  # When this works (i.e., when your router supports NAT port forwarding),
  # it makes the local lotus node accessible from the public internet
  #
  # type: bool
  # env var: LOTUS_LIBP2P_DISABLENATPORTMAP
  #DisableNatPortMap = false

  # ConnMgrLow is the number of connections that the basic connection manager
  # will trim down to.
  #
  # type: uint
  # env var: LOTUS_LIBP2P_CONNMGRLOW
  #ConnMgrLow = 150

  # ConnMgrHigh is the number of connections that, when exceeded, will trigger
  # a connection GC operation. Note: protected/recently formed connections don't
  # count towards this limit.
  #
  # type: uint
  # env var: LOTUS_LIBP2P_CONNMGRHIGH
  #ConnMgrHigh = 180

  # ConnMgrGrace is a time duration that new connections are immune from being
  # closed by the connection manager.
  #
  # type: Duration
  # env var: LOTUS_LIBP2P_CONNMGRGRACE
  #ConnMgrGrace = "20s"


[Pubsub]
  # Run the node in bootstrap-node mode
  #
  # type: bool
  # env var: LOTUS_PUBSUB_BOOTSTRAPPER
  #Bootstrapper = false

  # type: string
  # env var: LOTUS_PUBSUB_REMOTETRACER
  #RemoteTracer = ""


[Subsystems]
  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLEMINING
  #EnableMining = true

  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLESEALING
  #EnableSealing = true

  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLESECTORSTORAGE
  #EnableSectorStorage = true

  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLEMARKETS
  #EnableMarkets = true

  # type: string
  # env var: LOTUS_SUBSYSTEMS_SEALERAPIINFO
  #SealerApiInfo = ""

  # type: string
  # env var: LOTUS_SUBSYSTEMS_SECTORINDEXAPIINFO
  #SectorIndexApiInfo = ""


[Dealmaking]
  # When enabled, the miner can accept online deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDERONLINESTORAGEDEALS
  #ConsiderOnlineStorageDeals = true

  # When enabled, the miner can accept offline deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDEROFFLINESTORAGEDEALS
  #ConsiderOfflineStorageDeals = true

  # When enabled, the miner can accept retrieval deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDERONLINERETRIEVALDEALS
  #ConsiderOnlineRetrievalDeals = true

  # When enabled, the miner can accept offline retrieval deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDEROFFLINERETRIEVALDEALS
  #ConsiderOfflineRetrievalDeals = true

  # When enabled, the miner can accept verified deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDERVERIFIEDSTORAGEDEALS
  #ConsiderVerifiedStorageDeals = true

  # When enabled, the miner can accept unverified deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDERUNVERIFIEDSTORAGEDEALS
  #ConsiderUnverifiedStorageDeals = true

  # A list of Data CIDs to reject when making deals
  #
  # type: []cid.Cid
  # env var: LOTUS_DEALMAKING_PIECECIDBLOCKLIST
  #PieceCidBlocklist = []

  # Maximum expected amount of time getting the deal into a sealed sector will take
  # This includes the time the deal will need to get transferred and published
  # before being assigned to a sector
  #
  # type: Duration
  # env var: LOTUS_DEALMAKING_EXPECTEDSEALDURATION
  #ExpectedSealDuration = "24h0m0s"

  # Maximum amount of time proposed deal StartEpoch can be in future
  #
  # type: Duration
  # env var: LOTUS_DEALMAKING_MAXDEALSTARTDELAY
  #MaxDealStartDelay = "336h0m0s"

  # When a deal is ready to publish, the amount of time to wait for more
  # deals to be ready to publish before publishing them all as a batch
  #
  # type: Duration
  # env var: LOTUS_DEALMAKING_PUBLISHMSGPERIOD
  #PublishMsgPeriod = "1h0m0s"

  # The maximum number of deals to include in a single PublishStorageDeals
  # message
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_MAXDEALSPERPUBLISHMSG
  #MaxDealsPerPublishMsg = 8

  # The maximum collateral that the provider will put up against a deal,
  # as a multiplier of the minimum collateral bound
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_MAXPROVIDERCOLLATERALMULTIPLIER
  #MaxProviderCollateralMultiplier = 2

  # The maximum allowed disk usage size in bytes of staging deals not yet
  # passed to the sealing node by the markets service. 0 is unlimited.
  #
  # type: int64
  # env var: LOTUS_DEALMAKING_MAXSTAGINGDEALSBYTES
  #MaxStagingDealsBytes = 0

  # The maximum number of parallel online data transfers for storage deals
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_SIMULTANEOUSTRANSFERSFORSTORAGE
  #SimultaneousTransfersForStorage = 20

  # The maximum number of simultaneous data transfers from any single client
  # for storage deals.
  # Unset by default (0), and values higher than SimultaneousTransfersForStorage
  # will have no effect; i.e. the total number of simultaneous data transfers
  # across all storage clients is bound by SimultaneousTransfersForStorage
  # regardless of this number.
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_SIMULTANEOUSTRANSFERSFORSTORAGEPERCLIENT
  #SimultaneousTransfersForStoragePerClient = 0

  # The maximum number of parallel online data transfers for retrieval deals
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_SIMULTANEOUSTRANSFERSFORRETRIEVAL
  #SimultaneousTransfersForRetrieval = 20

  # Minimum start epoch buffer to give time for sealing of sector with deal.
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_STARTEPOCHSEALINGBUFFER
  #StartEpochSealingBuffer = 480

  # A command used for fine-grained evaluation of storage deals
  # see https://docs.filecoin.io/mine/lotus/miner-configuration/#using-filters-for-fine-grained-storage-and-retrieval-deal-acceptance for more details
  #
  # type: string
  # env var: LOTUS_DEALMAKING_FILTER
  #Filter = ""

  # A command used for fine-grained evaluation of retrieval deals
  # see https://docs.filecoin.io/mine/lotus/miner-configuration/#using-filters-for-fine-grained-storage-and-retrieval-deal-acceptance for more details
  #
  # type: string
  # env var: LOTUS_DEALMAKING_RETRIEVALFILTER
  #RetrievalFilter = ""

  [Dealmaking.RetrievalPricing]
    # env var: LOTUS_DEALMAKING_RETRIEVALPRICING_STRATEGY
    #Strategy = "default"

    [Dealmaking.RetrievalPricing.Default]
      # env var: LOTUS_DEALMAKING_RETRIEVALPRICING_DEFAULT_VERIFIEDDEALSFREETRANSFER
      #VerifiedDealsFreeTransfer = true

    [Dealmaking.RetrievalPricing.External]
      # env var: LOTUS_DEALMAKING_RETRIEVALPRICING_EXTERNAL_PATH
      #Path = ""


[Sealing]
  # Upper bound on how many sectors can be waiting for more deals to be packed in it before it begins sealing at any given time.
  # If the miner is accepting multiple deals in parallel, up to MaxWaitDealsSectors of new sectors will be created.
  # If more than MaxWaitDealsSectors deals are accepted in parallel, only MaxWaitDealsSectors deals will be processed in parallel
  # Note that setting this number too high in relation to deal ingestion rate may result in poor sector packing efficiency
  # 0 = no limit
  #
  # type: uint64
  # env var: LOTUS_SEALING_MAXWAITDEALSSECTORS
  #MaxWaitDealsSectors = 2

  # Upper bound on how many sectors can be sealing at the same time when creating new CC sectors (0 = unlimited)
  #
  # type: uint64
  # env var: LOTUS_SEALING_MAXSEALINGSECTORS
  #MaxSealingSectors = 0

  # Upper bound on how many sectors can be sealing at the same time when creating new sectors with deals (0 = unlimited)
  #
  # type: uint64
  # env var: LOTUS_SEALING_MAXSEALINGSECTORSFORDEALS
  #MaxSealingSectorsForDeals = 0

  # Prefer creating new sectors even if there are sectors Available for upgrading.
  # This setting combined with MaxUpgradingSectors set to a value higher than MaxSealingSectorsForDeals makes it
  # possible to use fast sector upgrades to handle high volumes of storage deals, while still using the simple sealing
  # flow when the volume of storage deals is lower.
  #
  # type: bool
  # env var: LOTUS_SEALING_PREFERNEWSECTORSFORDEALS
  PreferNewSectorsForDeals = false

  # Upper bound on how many sectors can be sealing+upgrading at the same time when upgrading CC sectors with deals (0 = MaxSealingSectorsForDeals)
  #
  # type: uint64
  # env var: LOTUS_SEALING_MAXUPGRADINGSECTORS
  MaxUpgradingSectors = 0

  # CommittedCapacitySectorLifetime is the duration a Committed Capacity (CC) sector will
  # live before it must be extended or converted into sector containing deals before it is
  # terminated. Value must be between 180-540 days inclusive
  #
  # type: Duration
  # env var: LOTUS_SEALING_COMMITTEDCAPACITYSECTORLIFETIME
  #CommittedCapacitySectorLifetime = "12960h0m0s"

  # Period of time that a newly created sector will wait for more deals to be packed in to before it starts to seal.
  # Sectors which are fully filled will start sealing immediately
  #
  # type: Duration
  # env var: LOTUS_SEALING_WAITDEALSDELAY
  #WaitDealsDelay = "6h0m0s"

  # Whether to keep unsealed copies of deal data regardless of whether the client requested that. This lets the miner
  # avoid the relatively high cost of unsealing the data later, at the cost of more storage space
  #
  # type: bool
  # env var: LOTUS_SEALING_ALWAYSKEEPUNSEALEDCOPY
  #AlwaysKeepUnsealedCopy = true

  # Run sector finalization before submitting sector proof to the chain
  #
  # type: bool
  # env var: LOTUS_SEALING_FINALIZEEARLY
  #FinalizeEarly = false

  # Whether to use available miner balance for sector collateral instead of sending it with each message
  #
  # type: bool
  # env var: LOTUS_SEALING_COLLATERALFROMMINERBALANCE
  #CollateralFromMinerBalance = false

  # Minimum available balance to keep in the miner actor before sending it with messages
  #
  # type: types.FIL
  # env var: LOTUS_SEALING_AVAILABLEBALANCEBUFFER
  #AvailableBalanceBuffer = "0 FIL"

  # Don't send collateral with messages even if there is no available balance in the miner actor
  #
  # type: bool
  # env var: LOTUS_SEALING_DISABLECOLLATERALFALLBACK
  #DisableCollateralFallback = false

  # enable / disable precommit batching (takes effect after nv13)
  #
  # type: bool
  # env var: LOTUS_SEALING_BATCHPRECOMMITS
  #BatchPreCommits = true

  # maximum precommit batch size - batches will be sent immediately above this size
  #
  # type: int
  # env var: LOTUS_SEALING_MAXPRECOMMITBATCH
  #MaxPreCommitBatch = 256

  # how long to wait before submitting a batch after crossing the minimum batch size
  #
  # type: Duration
  # env var: LOTUS_SEALING_PRECOMMITBATCHWAIT
  #PreCommitBatchWait = "24h0m0s"

  # time buffer for forceful batch submission before sectors/deal in batch would start expiring
  #
  # type: Duration
  # env var: LOTUS_SEALING_PRECOMMITBATCHSLACK
  #PreCommitBatchSlack = "3h0m0s"

  # enable / disable commit aggregation (takes effect after nv13)
  #
  # type: bool
  # env var: LOTUS_SEALING_AGGREGATECOMMITS
  #AggregateCommits = true

  # maximum batched commit size - batches will be sent immediately above this size
  #
  # type: int
  # env var: LOTUS_SEALING_MINCOMMITBATCH
  #MinCommitBatch = 4

  # type: int
  # env var: LOTUS_SEALING_MAXCOMMITBATCH
  #MaxCommitBatch = 819

  # how long to wait before submitting a batch after crossing the minimum batch size
  #
  # type: Duration
  # env var: LOTUS_SEALING_COMMITBATCHWAIT
  #CommitBatchWait = "24h0m0s"

  # time buffer for forceful batch submission before sectors/deals in batch would start expiring
  #
  # type: Duration
  # env var: LOTUS_SEALING_COMMITBATCHSLACK
  #CommitBatchSlack = "1h0m0s"

  # network BaseFee below which to stop doing precommit batching, instead
  # sending precommit messages to the chain individually
  #
  # type: types.FIL
  # env var: LOTUS_SEALING_BATCHPRECOMMITABOVEBASEFEE
  #BatchPreCommitAboveBaseFee = "0.00000000032 FIL"

  # network BaseFee below which to stop doing commit aggregation, instead
  # submitting proofs to the chain individually
  #
  # type: types.FIL
  # env var: LOTUS_SEALING_AGGREGATEABOVEBASEFEE
  #AggregateAboveBaseFee = "0.00000000032 FIL"

  # type: uint64
  # env var: LOTUS_SEALING_TERMINATEBATCHMAX
  #TerminateBatchMax = 100

  # type: uint64
  # env var: LOTUS_SEALING_TERMINATEBATCHMIN
  #TerminateBatchMin = 1

  # type: Duration
  # env var: LOTUS_SEALING_TERMINATEBATCHWAIT
  #TerminateBatchWait = "5m0s"


[Storage]
  # env var: LOTUS_STORAGE_PARALLELFETCHLIMIT
  #ParallelFetchLimit = 10

  # env var: LOTUS_STORAGE_ALLOWADDPIECE
  #AllowAddPiece = true

  # env var: LOTUS_STORAGE_ALLOWPRECOMMIT1
  #AllowPreCommit1 = true

  # env var: LOTUS_STORAGE_ALLOWPRECOMMIT2
  #AllowPreCommit2 = true

  # env var: LOTUS_STORAGE_ALLOWCOMMIT
  #AllowCommit = true

  # env var: LOTUS_STORAGE_ALLOWUNSEAL
  #AllowUnseal = true

  # env var: LOTUS_STORAGE_ALLOWREPLICAUPDATE
  #AllowReplicaUpdate = true

  # env var: LOTUS_STORAGE_ALLOWPROVEREPLICAUPDATE2
  #AllowProveReplicaUpdate2 = true

  # env var: LOTUS_STORAGE_RESOURCEFILTERING
  #ResourceFiltering = "hardware"


[Fees]
  # type: types.FIL
  # env var: LOTUS_FEES_MAXPRECOMMITGASFEE
  #MaxPreCommitGasFee = "0.025 FIL"

  # type: types.FIL
  # env var: LOTUS_FEES_MAXCOMMITGASFEE
  #MaxCommitGasFee = "0.05 FIL"

  # type: types.FIL
  # env var: LOTUS_FEES_MAXTERMINATEGASFEE
  #MaxTerminateGasFee = "0.5 FIL"

  # WindowPoSt is a high-value operation, so the default fee should be high.
  #
  # type: types.FIL
  # env var: LOTUS_FEES_MAXWINDOWPOSTGASFEE
  #MaxWindowPoStGasFee = "5 FIL"

  # type: types.FIL
  # env var: LOTUS_FEES_MAXPUBLISHDEALSFEE
  #MaxPublishDealsFee = "0.05 FIL"

  # type: types.FIL
  # env var: LOTUS_FEES_MAXMARKETBALANCEADDFEE
  #MaxMarketBalanceAddFee = "0.007 FIL"

  [Fees.MaxPreCommitBatchGasFee]
    # type: types.FIL
    # env var: LOTUS_FEES_MAXPRECOMMITBATCHGASFEE_BASE
    #Base = "0 FIL"

    # type: types.FIL
    # env var: LOTUS_FEES_MAXPRECOMMITBATCHGASFEE_PERSECTOR
    #PerSector = "0.02 FIL"

  [Fees.MaxCommitBatchGasFee]
    # type: types.FIL
    # env var: LOTUS_FEES_MAXCOMMITBATCHGASFEE_BASE
    #Base = "0 FIL"

    # type: types.FIL
    # env var: LOTUS_FEES_MAXCOMMITBATCHGASFEE_PERSECTOR
    #PerSector = "0.03 FIL"


[Addresses]
  # Addresses to send PreCommit messages from
  #
  # type: []string
  # env var: LOTUS_ADDRESSES_PRECOMMITCONTROL
  #PreCommitControl = []

  # Addresses to send Commit messages from
  #
  # type: []string
  # env var: LOTUS_ADDRESSES_COMMITCONTROL
  #CommitControl = []

  # type: []string
  # env var: LOTUS_ADDRESSES_TERMINATECONTROL
  #TerminateControl = []

  # type: []string
  # env var: LOTUS_ADDRESSES_DEALPUBLISHCONTROL
  #DealPublishControl = []

  # DisableOwnerFallback disables usage of the owner address for messages
  # sent automatically
  #
  # type: bool
  # env var: LOTUS_ADDRESSES_DISABLEOWNERFALLBACK
  #DisableOwnerFallback = false

  # DisableWorkerFallback disables usage of the worker address for messages
  # sent automatically, if control addresses are configured.
  # A control address that doesn't have enough funds will still be chosen
  # over the worker address if this flag is set.
  #
  # type: bool
  # env var: LOTUS_ADDRESSES_DISABLEWORKERFALLBACK
  #DisableWorkerFallback = false
```