---
title: "Configuration"
description: "This guide covers the Lotus Miner configuration files, detailing the meaning of the options contained in them."
lead: "This guide covers the Lotus Miner configuration files, detailing the meaning of the options contained in them."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-configure"
        identifier: "storage-providers-configure-configuration"
aliases:
    - /docs/storage-providers/config/
weight: 110
toc: true
---

The Lotus Miner configutation is created after the [initialization step]({{< relref "setup" >}}) during setup and placed in `~/.lotusminer/config.toml` or `$LOTUS_MINER_PATH/config.toml` when defined.

The _default configuration_ has all the items commented. To customize one of the items, you must remove the leading `#`.

{{< alert >}}
For any configuration changes to take effect, the miner must be [restarted]({{< relref "lifecycle" >}}).
{{< /alert >}}

## API section

The API section controls the settings of the [miner API]({{< relref "../../developers/apis/json-rpc" >}}):

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

## Libp2p section

This section configures the miner's embedded Libp2p node. As noted in the [setup instructions]({{< relref "setup" >}}), it is very important to adjust this section with the miner's public IP and a fixed port:

```toml
[Libp2p]
  # Binding address for the libp2p host. 0 means random port.
  # Type: Array of multiaddress strings
  ListenAddresses = ["/ip4/0.0.0.0/tcp/0", "/ip6/::/tcp/0"]
  # Insert any addresses you want to explicitally
  # announce to other peers here. Otherwise, they are
  # guessed.
  # Type: Array of multiaddress strings
  AnnounceAddresses = []
  # Insert any addresses to avoid announcing here.
  # Type: Array of multiaddress strings
  NoAnnounceAddresses = []
  # Connection manager settings, decrease if your
  # machine is overwhelmed by connections.
  ConnMgrLow = 150
  ConnMgrHigh = 180
  ConnMgrGrace = "20s"
```

The connection manager will start to prune the existing connections if the number of established crosses the value set for `ConnMgrHigh` until it hits the value set for `ConnMgrLow`. Connections younger than `ConnMgrGrace` will be kept.

## Pubsub section

This section controls some Pubsub settings. Pubsub is used to distribute messages in the network:

```toml
[Pubsub]
  # Usually, you will not run a pubsub bootstrapping node, so leave this as false
  Bootstrapper = false
  # FIXME
  RemoteTracer = ""
  # DirectPeers specifies peers with direct peering agreements. These peers are
  # connected outside of the mesh, with all (valid) message unconditionally
  # forwarded to them. The router will maintain open connections to these peers.
  # Note that the peering agreement should be reciprocal with direct peers
  # symmetrically configured at both ends.
  # Type: Array of multiaddress peerinfo strings, must include peerid (/p2p/12D3K...)
  DirectPeers = []
```

## Subsystems

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

## Dealmaking section

This section controls parameters for making storage and retrieval deals:

```toml
[Dealmaking]
  # When enabled, the miner can accept online deals
  ConsiderOnlineStorageDeals = true
  # When enabled, the miner can accept offline deals
  ConsiderOfflineStorageDeals = true
  # When enabled, the miner can accept retrieval deals
  ConsiderOnlineRetrievalDeals = true
  # When enabled, the miner can accept offline retrieval deals
  ConsiderOfflineRetrievalDeals = true
  # When enabled, the miner can accept verified deals
  ConsiderVerifiedStorageDeals = true
  # When enabled, the miner can accept unverified deals
  ConsiderUnverifiedStorageDeals = true
  # A list made of Data CIDs to reject when making deals
  PieceCidBlocklist = []
  # Maximum expected amount of time getting the deal into a sealed sector will take
  # This includes the time the deal will need to get transferred and published
  # before being assigned to a sector
  # for more info, see below.
  ExpectedSealDuration = "24h0m0s"
  # When a deal is ready to publish, the amount of time to wait for more
  # deals to be ready to publish before publishing them all as a batch
  PublishMsgPeriod = "1h0m0s"
  # The maximum number of deals to include in a single publish deals message
  MaxDealsPerPublishMsg = 8

  # A command used for fine-grained evaluation of storage deals (see below)
  Filter = "/absolute/path/to/storage_filter_program"

  # A command used for fine-grained evaluation of retrieval deals (see below)
  RetrievalFilter = "/absolute/path/to/retrieval_filter_program"
```

`ExpectedSealDuration` is an estimate of how long sealing will take and is used to reject deals whose start epoch might be earlier than the expected completion of sealing. It can be estimated by [benchmarking]({{< relref "benchmarks" >}}) or by [pledging a sector]({{< relref "sector-pledging" >}}).

{{< alert icon="warning" >}}
The final value of `ExpectedSealDuration` should equal `(TIME_TO_SEAL_A_SECTOR + WaitDealsDelay) * 1.5`. This equation ensures that the miner does not commit to having the sector sealed too soon.
{{< /alert >}}

`StartEpochSealingBuffer` allows `lotus-miner` to seal a sector before a certain epoch. For example: if the current epoch is 1000 and a deal within a sector must start on epoch 1500, then `lotus-miner` must wait until the current epoch is 1500 before it can start sealing that sector. However, if `lotus-miner` sets `StartEpochSealingBuffer` to 500, the `lotus-miner` can start sealing the sector at epoch 1000. 

If there are multiple deals in a sector, the deal with a start time closest to the current epoch is what `StartEpochSealingBuffer` will be based off. So, if the sector in our example has three deals that start on epoch 1000, 1200, and 1400, then we `lotus-miner` will start sealing the sector at epoch 500.

### Disabling New Sector for Deal

If `MakeNewSectorForDeals` is set to `true` then `lotus-miner` will create new sectors for incoming deals. This option can set to `false` to ensure that all new deals are sealed as snap-deals into CC sectors. This can help reduce the sealing time for the new deals as long as CC sectors are ready for the snap-deals.

### Publishing several deals in one message

The `PublishStorageDeals` message can publish many deals in a single message.
When a deal is ready to be published, Lotus will wait up to `PublishMsgPeriod`
for other deals to be ready before sending the `PublishStorageDeals` message.

However, once `MaxDealsPerPublishMsg` is ready, Lotus will immediately publish all the deals.

For example, if `PublishMsgPeriod` is 1 hour:

- At 1:00 pm, deal 1 is ready to publish. Lotus will wait until 2:00 pm for other deals to be ready before sending `PublishStorageDeals`.
- At 1:30 pm, Deal 2 is ready to publish
- At 1:45 pm, Deal 3 is ready to publish
- At 2:00pm, lotus publishes Deals 1, 2, and 3 in a single `PublishStorageDeals` message.

If `MaxDealsPerPublishMsg` is 2, then in the above example, when deal 2 is ready to be published at 1:30, Lotus would immediately publish Deals 1 & 2 in a single `PublishStorageDeals` message. Deal 3 would be published in a subsequent `PublishStorageDeals` message.

> If any of the deals in the `PublishStorageDeals` fails validation upon execution, or if the start epoch has passed, all deals will fail to be published.

## Using filters for fine-grained storage and retrieval deal acceptance

Your use case might demand very precise and dynamic control over a combination of deal parameters.

Lotus provides two IPC hooks allowing you to name a command to execute for every deal before the miner accepts it:

- `Filter` for storage deals.
- `RetrievalFilter` for retrieval deals.

The executed command receives a JSON representation of the deal parameters on standard input, and upon completion, its exit code is interpreted as:

- `0`: success, proceed with the deal.
- `non-0`: failure, reject the deal.

The most trivial filter rejecting any retrieval deal would be something like:
`RetrievalFilter = "/bin/false"`. `/bin/false` is binary that immediately exits with a code of `1`.

[This Perl script](https://gist.github.com/ribasushi/53b7383aeb6e6f9b030210f4d64351d5/9bd6e898f94d20b50e7c7586dc8b8f3a45dab07c#file-dealfilter-pl) lets the miner deny specific clients and only accept deals that are set to start relatively soon.

You can also use a third party content policy framework like `bitscreen` by Murmuration Labs:

```shell
# grab filter program
go get -u -v github.com/Murmuration-Labs/bitscreen

# add it to both filters
Filter = "/path/to/go/bin/bitscreen"
RetrievalFilter = "/path/to/go/bin/bitscreen"
```

## Sealing section

This section controls some of the behavior around sector sealing:

```toml
[Sealing]
  # Upper bound on how many sectors can be waiting for more deals to be packed in it before it begins sealing at any given time.
  # If the miner is accepting multiple deals in parallel, up to MaxWaitDealsSectors of new sectors will be created.
  # If more than MaxWaitDealsSectors deals are accepted in parallel, only MaxWaitDealsSectors deals will be processed in parallel
  # Note that setting this number too high in relation to deal ingestion rate may result in poor sector packing efficiency
  MaxWaitDealsSectors = 2
  # Upper bound on how many sectors can be sealing at the same time when creating new CC sectors (0 = unlimited)
  MaxSealingSectors = 0
  # Upper bound on how many sectors can be sealing at the same time when creating new sectors with deals (0 = unlimited)
  MaxSealingSectorsForDeals = 0
  # CommittedCapacitySectorLifetime is the duration a Committed Capacity (CC) sector will
  # live before it must be extended or converted into sector containing deals before it is
  # terminated. Value must be between 180-540 days inclusive
  #
  # type: Duration
  CommittedCapacitySectorLifetime = "12960h0m0s"

  # Period of time that a newly created sector will wait for more deals to be packed in to before it starts to seal.
  # Sectors which are fully filled will start sealing immediately
  WaitDealsDelay = "6h0m0s"
  # Whether to keep unsealed copies of deal data regardless of whether the client requested that. This lets the miner
  # avoid the relatively high cost of unsealing the data later, at the cost of more storage space
  AlwaysKeepUnsealedCopy = true
  # Run sector finalization before submitting sector proof to the chain
  FinalizeEarly = false
  # Whether to use available miner balance for sector collateral instead of sending it with each message
  CollateralFromMinerBalance = false
  # Minimum available balance to keep in the miner actor before sending it with messages
  AvailableBalanceBuffer = 0
  # Don't send collateral with messages even if there is no available balance in the miner actor
  DisableCollateralFallback = false
  # enable / disable precommit batching (takes effect after nv13)
  BatchPreCommits = true
  # maximum precommit batch size up to 256 sectors - batches will be sent immediately above this size
  MaxPreCommitBatch = 256
  # how long to wait before submitting a batch after crossing the minimum batch size
  PreCommitBatchWait = "24h0m0s"
  # time buffer for forceful batch submission before sectors/deal in batch would start expiring
  PreCommitBatchSlack = "3h0m0s"

  # enable / disable commit aggregation (takes effect after nv13)
  AggregateCommits = true
  # minimum batched commit size, no less than 4
  MinCommitBatch = 4
  # maximum batched commit size up to 819 sectors - batches will be sent immediately above this size
  MaxCommitBatch = 819
  # how long to wait before submitting a batch after crossing the minimum batch size
  CommitBatchWait = "24h0m0s"
  # time buffer for forceful batch submission before sectors/deals in batch would start expiring
  CommitBatchSlack = "1h0m0s"

  # network BaseFee below which to stop doing commit aggregation, instead submitting proofs to the chain individually
  AggregateAboveBaseFee = 0.00000000015 #0.15nano


  TerminateBatchMax = 100
  TerminateBatchMin = 1
  TerminateBatchWait = "5m0s"

```

### PreCommitSectorsBatch

`PreCommitSectorsBatch` introduced by [FIP-0008 ](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0008.md) supports a miner to pre-commit a number of sectors at once.

In lotus v1.10.0 and up, if `BatchPreCommit` is set to false, pre-commitments will be sent to the chain via `PreCommitSector` messages once they are ready. If `BatchPreCommit` is set to true, lotus will batch pre-commitments until any of `MaxPreCommitBatch`, `PreCommitBatchWait` or `PreCommitBatchSlack` is hit:
- `MaxPreCommitBatch` is the maximum amount of sectors' pre-commitments to batch in one `PreCommitSectorsBatch` message. According to FIP-0008, this values is up to 256.
- `PreCommitBatchWait` is how long to wait before submitting the current batch. Note: the ticket of pre-commitment has an expiration of approximately **31.5 hours**, one sector's pre-commit ticket expires **WILL** cause the whole message to fail. Therefore, **we recommend miners to set this value lower than 30 hours.**
- `PreCommitBatchSlack` is the time buffer to forcefully submit the current batch before any of the sector's pre-commit ticket or a deal will expire. For example, if this value is set to 1 hour, which is 120 epochs, then a `PreCommitSectorsBatch` message will be submitted for the existing batch 120 epochs before the earliest epoch among precommits' tickets and deal's start epochs in this batch. **We recommend you to set a longer slack to prevent message failures due to expirations.**

> Note, the current batch will be sent if any of `MaxPreCommitBatch`, `PreCommitBatchWait` or `PreCommitBatchSlack` is hit.

To check the list of the sectors pre-commitments that are in the batching queue, run:

```shell
./lotus-miner sectors batching precommit
```

This will output the sector IDs:

```shell
14
15
16
```

To ignore the configuration and force push the current batch, run:

```shell
./lotus-miner sectors batching precommit --publish-now=true
```

Then in the output, the message CID of the `PreCommitSectorsBatch` message and the sector number of the sectors' pre-commitments that are being submitted is listed:

```shell
Batch 0:
	Message: bafy2bzacecgihnlvbsqu7yksco3vs5tzk3ublbcnkedlofr6nhbq55k5ye3ci
	Sectors:
		14	OK
		15	OK
		16	OK
```

### ProveCommitAggregate

`ProveCommitAggregate` introduced by [FIP-0013](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0013.md) supports a miner to prove-commit a number of sectors at ones.

In Lotus v1.10.0 and up, if `AggregateCommits` is set to false, prove-commitments will be sent to the chain via `ProveCommitSector` messages once they are ready. If `AggregateCommits` is set to true, lotus will aggregate and batch pre-commitments until any of `MaxCommitBatch`, `CommitBatchWait` or `CommitBatchSlack` is hit:
- `MaxCommitBatch` is the maximum amount of sectors' prove-commitments to batch in one `ProveCommitAggregate` message. According to FIP-0013, this value is up to 819.
- `CommitBatchWait` is how long to wait before submitting the current batch **after** crossing `MinCommitBatch`. Note: a prove-commitment must be submitted **within 30 days** after the pre-commit has landed on-chain. It is recommended to set this value lower than 30 days to prevent collateral loss.
- `CommitBatchSlack` is the time buffer to forcefully submit the current batch before any of the sector's pre-commitment or a deal will expire. For example, if this value is set to 1 hour, which is 120 epochs, then a `ProveCommitAggregate` message will be submitted for the existing batch 120 epochs before the earliest epoch among precommits' expirations and deals' start epochs in this batch. **We recommend you to set a longer slack to prevent message failures due to deal expirations or loss of collateral**
- `AggregateAboveBaseFee` is the network base fee to start aggregating proofs. When the network base fee is lower than this value, the prove commits will be submitted individually via `ProveCommitSector`. **According to the [Batch Incentive Alignment](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0013.md#batch-incentive-alignment) introduced in FIP-0013, we recommend you to set this value to 0.15 nanoFIL to avoid unexpected aggregation fee in burn.**

`MinCommitBatch` is the minimum amount of sectors' prove-commitment to be batched in one `ProveCommitAggregate` message. According to FIP-0013, this value cannot be less than 4, which is the cross-over point where prove-commit aggregation wins out on single prove-commit gas costs. If any of `MaxCommitBatch`, `CommitBatchWait` or `CommitBatchSlack` is hit by the amount of prove-commit is the batching queue is less than `MinCommitBatch`, then prove-commitments in this batch will be proceeded individually via `ProveCommitSector`.

> Note: Aggregated proofs will incur a discounted Gas Charge, so overall, it will be less gas usage than the same number of proofs on-chain, but a minimum fee will apply. It is _cheaper per proof_ to aggregate more proofs into a single aggregate message, meaning aggregating 1000 proofs is more beneficial than aggregating 10 sectors. So if a miner wants to onboard more storage, it is recommended to aggregate more proofs into a single message.

To check the list of the sectors prove-commitments that are in the batching queue, run:

```shell
./lotus-miner sectors batching commit
```

This will output something like:

```shell
10
11
12
13
14
15
16
17
```

To ignore the configuration and force push the current batch, run:

```shell
./lotus-miner sectors batching commit --publish-now=true
```

Then in the output, the message CID of the `ProveCommitAggregate` message and the sector number of the sectors' prove-commitments that are being submitted is listed:

```shell
Batch 0:
	Message: bafy2bzacedtmykgf5g4evdvapacpmo4l32ewu5l7yxqkzjh3h6fhev7v7qoys
	Sectors:
		15	OK
		17	OK
		12	OK
		10	OK
		11	OK
		13	OK
		16	OK
		14	OK
```

If the sectors in the queue are less than `MinCommitBatch`, then individual `ProveCommitSector` messages will be sent for each sector:

```shell
Batch 0:
	Message: bafy2bzacedpwysxdsg2ft3hfbwn6ayyaanivfwkx4inav3zm34hwmmwgsljkk
	Sectors:
		18	OK
Batch 1:
	Message: bafy2bzacedrx7l34ckaue7hm2ubousl3djuigyu2xw4xzywgkhttxecsm5ba2
	Sectors:
		19	OK
```

### CommittedCapacitySectorLifetime

The available units are:

```shell
"ms": int64(Millisecond),
 "s":  int64(Second),
 "m":  int64(Minute),
 "h":  int64(Hour),
```

For example, if you want to set the sector lifecycle to 180 days, you can multiply 180 days by 24 hours per day to get 4320 hours and set this value to `"4320h0m0s"`.

## Storage section

The storage sector controls whether the miner can perform certain sealing actions. Depending on the setup and the use of additional [seal workers]({{< relref "seal-workers" >}}), you may want to modify some of the options.

```toml
[Storage]
  # Upper bound on how many sectors can be fetched in parallel by the storage system at a time
  ParallelFetchLimit = 10
  # Sealing steps that the miner can perform itself. Sometimes we have a dedicated seal worker to do them and do not want the miner to commit any resources for this.
  AllowAddPiece = true
  AllowPreCommit1 = true
  AllowPreCommit2 = true
  AllowCommit = true
  AllowUnseal = true
```

## Fees section

The fees section allows to set limits to the gas consumption for the different messages that are submitted to the chain by the miner:

```toml
[Fees]
  # Maximum fees to pay
  MaxPreCommitGasFee = "0.025 FIL"
  MaxCommitGasFee = "0.05 FIL"
  MaxTerminateGasFee = "0.5 FIL"
  # This is a high-value operation, so the default fee is higher.
  MaxWindowPoStGasFee = "5 FIL"
  MaxPublishDealsFee = "0.05 FIL"
  MaxMarketBalanceAddFee = "0.007 FIL"
  [Fees.MaxPreCommitBatchGasFee]
      Base = "0 FIL"
      PerSector = "0.02 FIL"
  [Fees.MaxCommitBatchGasFee]
      Base = "0 FIL"
      PerSector = "0.03 FIL"

```

Depending on the network congestion, the base fee for a message may grow or decrease. Your gas limits will have to be larger than the base fee for the messages to be included. A very large max fee can, however, result in the quick burning of funds when the base fee is very high, as the miner automatically submits messages during normal operation, so be careful about this. It is also necessary to have more funds available than any max fee set, even if the actual fee will be far less than the max fee set.

Set the maximum cost you are willing to pay for onboarding **per** sector in `MaxPreCommitBatchGasFee.PerSector`/`MaxCommitBatchGasFee.PerSector` to avoid unexpected high costs.

> Note: The current `MaxCommitBatchGasFee.PerSector` is enough to aggregate proofs for 6 sectors. Adjust this respectively according to your operation. **If the value is too low, the message may wait in the mempool for a long while. If you don't have enough funds, the message will not be sent.**

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


[DAGStore]
  # Path to the dagstore root directory. This directory contains three
  # subdirectories, which can be symlinked to alternative locations if
  # need be:
  # - ./transients: caches unsealed deals that have been fetched from the
  # storage subsystem for serving retrievals.
  # - ./indices: stores shard indices.
  # - ./datastore: holds the KV store tracking the state of every shard
  # known to the DAG store.
  # Default value: <LOTUS_MARKETS_PATH>/dagstore (split deployment) or
  # <LOTUS_MINER_PATH>/dagstore (monolith deployment)
  #
  # type: string
  # env var: LOTUS_DAGSTORE_ROOTDIR
  #RootDir = ""

  # The maximum amount of indexing jobs that can run simultaneously.
  # 0 means unlimited.
  # Default value: 5.
  #
  # type: int
  # env var: LOTUS_DAGSTORE_MAXCONCURRENTINDEX
  #MaxConcurrentIndex = 5

  # The maximum amount of unsealed deals that can be fetched simultaneously
  # from the storage subsystem. 0 means unlimited.
  # Default value: 0 (unlimited).
  #
  # type: int
  # env var: LOTUS_DAGSTORE_MAXCONCURRENTREADYFETCHES
  #MaxConcurrentReadyFetches = 0

  # The maximum number of simultaneous inflight API calls to the storage
  # subsystem.
  # Default value: 100.
  #
  # type: int
  # env var: LOTUS_DAGSTORE_MAXCONCURRENCYSTORAGECALLS
  #MaxConcurrencyStorageCalls = 100

  # The time between calls to periodic dagstore GC, in time.Duration string
  # representation, e.g. 1m, 5m, 1h.
  # Default value: 1 minute.
  #
  # type: Duration
  # env var: LOTUS_DAGSTORE_GCINTERVAL
  #GCInterval = "1m0s"
```
