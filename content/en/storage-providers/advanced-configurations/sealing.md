---
title: "Sealing"
description: "Lotus has a lot of advanced configurations you can tune to optimize your storage provider setup. This guide explains the advanced configuration options for lotus market"
lead: "This guide explains the advanced configuration options available for optimizing the sealing pipeline on a lotus-miner"
draft: false
menu:
    storage-providers:
        parent: "storage-providers-advanced-configurations"
weight: 515
toc: true
---

## Sealing section

This section controls some of the behavior around sector sealing:

```toml
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

  # Upper bound on how many sectors can be sealing+upgrading at the same time when creating new CC sectors (0 = unlimited)
  #
  # type: uint64
  # env var: LOTUS_SEALING_MAXSEALINGSECTORS
  #MaxSealingSectors = 0

  # Upper bound on how many sectors can be sealing+upgrading at the same time when creating new sectors with deals (0 = unlimited)
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
  #PreferNewSectorsForDeals = false

  # Upper bound on how many sectors can be sealing+upgrading at the same time when upgrading CC sectors with deals (0 = MaxSealingSectorsForDeals)
  #
  # type: uint64
  # env var: LOTUS_SEALING_MAXUPGRADINGSECTORS
  #MaxUpgradingSectors = 0

  # When set to a non-zero value, minimum number of epochs until sector expiration required for sectors to be considered
  # for upgrades (0 = DealMinDuration = 180 days = 518400 epochs)
  # 
  # Note that if all deals waiting in the input queue have lifetimes longer than this value, upgrade sectors will be
  # required to have expiration of at least the soonest-ending deal
  #
  # type: uint64
  # env var: LOTUS_SEALING_MINUPGRADESECTOREXPIRATION
  #MinUpgradeSectorExpiration = 0

  # DEPRECATED: Target expiration is no longer used
  #
  # type: uint64
  # env var: LOTUS_SEALING_MINTARGETUPGRADESECTOREXPIRATION
  #MinTargetUpgradeSectorExpiration = 0

  # CommittedCapacitySectorLifetime is the duration a Committed Capacity (CC) sector will
  # live before it must be extended or converted into sector containing deals before it is
  # terminated. Value must be between 180-1278 days (1278 in nv21, 540 before nv21).
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

  # Whether new sectors are created to pack incoming deals
  # When this is set to false no new sectors will be created for sealing incoming deals
  # This is useful for forcing all deals to be assigned as snap deals to sectors marked for upgrade
  #
  # type: bool
  # env var: LOTUS_SEALING_MAKENEWSECTORFORDEALS
  #MakeNewSectorForDeals = true

  # After sealing CC sectors, make them available for upgrading with deals
  #
  # type: bool
  # env var: LOTUS_SEALING_MAKECCSECTORSAVAILABLE
  #MakeCCSectorsAvailable = false

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

  # minimum batched commit size - batches above this size will eventually be sent on a timeout
  #
  # type: int
  # env var: LOTUS_SEALING_MINCOMMITBATCH
  #MinCommitBatch = 4

  # maximum batched commit size - batches will be sent immediately above this size
  #
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
  # sending precommit messages to the chain individually. When the basefee is
  # below this threshold, precommit messages will get sent out immediately.
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

  # When submitting several sector prove commit messages simultaneously, this option allows you to
  # stagger the number of prove commits submitted per epoch
  # This is done because gas estimates for ProveCommits are non deterministic and increasing as a large
  # number of sectors get committed within the same epoch resulting in occasionally failed msgs.
  # Submitting a smaller number of prove commits per epoch would reduce the possibility of failed msgs
  #
  # type: uint64
  # env var: LOTUS_SEALING_MAXSECTORPROVECOMMITSSUBMITTEDPEREPOCH
  #MaxSectorProveCommitsSubmittedPerEpoch = 20

  # type: uint64
  # env var: LOTUS_SEALING_TERMINATEBATCHMAX
  #TerminateBatchMax = 100

  # type: uint64
  # env var: LOTUS_SEALING_TERMINATEBATCHMIN
  #TerminateBatchMin = 1

  # type: Duration
  # env var: LOTUS_SEALING_TERMINATEBATCHWAIT
  #TerminateBatchWait = "5m0s"

  # UseSyntheticPoRep, when set to true, will reduce the amount of cache data held on disk after the completion of PreCommit2 to 11GiB.
  #
  # type: bool
  # env var: LOTUS_SEALING_USESYNTHETICPOREP
  #UseSyntheticPoRep = false
```

### PreCommitSectorsBatch

`PreCommitSectorsBatch` introduced by [FIP-0008 ](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0008.md) supports a miner to pre-commit a number of sectors at once.

If `BatchPreCommit` is set to false, pre-commitments will be sent to the chain via `PreCommitSector` messages once they are ready. If `BatchPreCommit` is set to true, lotus will batch pre-commitments until any of `MaxPreCommitBatch`, `PreCommitBatchWait` or `PreCommitBatchSlack` is hit:
- `MaxPreCommitBatch` is the maximum amount of sectors' pre-commitments to batch in one `PreCommitSectorsBatch` message. According to FIP-0008, this values is up to 256.
- `PreCommitBatchWait` is how long to wait before submitting the current batch. Note: the ticket of pre-commitment has an expiration of approximately **31.5 hours**, one sector's pre-commit ticket expires **WILL** cause the whole message to fail. Therefore, **we recommend miners to set this value lower than 30 hours.**
- `PreCommitBatchSlack` is the time buffer to forcefully submit the current batch before any of the sector's pre-commit ticket or a deal will expire. For example, if this value is set to 1 hour, which is 120 epochs, then a `PreCommitSectorsBatch` message will be submitted for the existing batch 120 epochs before the earliest epoch among precommits' tickets and deal's start epochs in this batch. **We recommend you to set a longer slack to prevent message failures due to expirations.**

{{< alert icon="👉" >}}
The current batch will be sent if any of `MaxPreCommitBatch`, `PreCommitBatchWait` or `PreCommitBatchSlack` is hit.
{{< /alert >}}

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

If `AggregateCommits` is set to false, prove-commitments will be sent to the chain via `ProveCommitSector` messages once they are ready. If `AggregateCommits` is set to true, lotus will aggregate and batch pre-commitments until any of `MaxCommitBatch`, `CommitBatchWait` or `CommitBatchSlack` is hit:
- `MaxCommitBatch` is the maximum amount of sectors' prove-commitments to batch in one `ProveCommitAggregate` message. According to FIP-0013, this value is up to 819.
- `CommitBatchWait` is how long to wait before submitting the current batch **after** crossing `MinCommitBatch`. Note: a prove-commitment must be submitted **within 30 days** after the pre-commit has landed on-chain. It is recommended to set this value lower than 30 days to prevent collateral loss.
- `CommitBatchSlack` is the time buffer to forcefully submit the current batch before any of the sector's pre-commitment or a deal will expire. For example, if this value is set to 1 hour, which is 120 epochs, then a `ProveCommitAggregate` message will be submitted for the existing batch 120 epochs before the earliest epoch among precommits' expirations and deals' start epochs in this batch. **We recommend you to set a longer slack to prevent message failures due to deal expirations or loss of collateral**
- `AggregateAboveBaseFee` is the network base fee to start aggregating proofs. When the network base fee is lower than this value, the prove commits will be submitted individually via `ProveCommitSector`. **According to the [Batch Incentive Alignment](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0013.md#batch-incentive-alignment) introduced in FIP-0013, we recommend you to set this value to 0.15 nanoFIL to avoid unexpected aggregation fee in burn.**

`MinCommitBatch` is the minimum amount of sectors' prove-commitment to be batched in one `ProveCommitAggregate` message. According to FIP-0013, this value cannot be less than 4, which is the cross-over point where prove-commit aggregation wins out on single prove-commit gas costs. If any of `MaxCommitBatch`, `CommitBatchWait` or `CommitBatchSlack` is hit by the amount of prove-commit is the batching queue is less than `MinCommitBatch`, then prove-commitments in this batch will be proceeded individually via `ProveCommitSector`.

{{< alert icon="👉" >}}
Aggregated proofs will incur a discounted Gas Charge, so overall, it will be less gas usage than the same number of proofs on-chain, but a minimum fee will apply. It is _cheaper per proof_ to aggregate more proofs into a single aggregate message, meaning aggregating 1000 proofs is more beneficial than aggregating 10 sectors. So if a miner wants to onboard more storage, it is recommended to aggregate more proofs into a single message.
{{< /alert >}}

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

### Synthetic-PoRep

The `UseSyntheticPoRep` configuration option (applicable after the nv21 upgrade), when set to true, enables the Synthetic Proof-of-Replication (Synthetic-PoRep) protocol. This protocol significantly reduces the storage overhead of the standard PoRep protocol from 352 GiB to approximately 11 GiB for 32 GiB sectors, and from 704 GiB to approximately 11 GiB for 64 GiB sectors. This is achieved by trading the storage of PoRep overhead data for synthetic challenge proofs, resulting in a net savings of up to 98% in PoRep storage consumption. Please note that changes to this setting will apply to new sectors only.

```toml
[Sealing]
  # UseSyntheticPoRep, when set to true, reduces PoRep storage consumption by trading overhead data for synthetic challenge proofs.
  #
  # type: bool
  # env var: LOTUS_SEALING_USESYNTHETICPOREP
  #UseSyntheticPoRep = false
```

## Storage section

The storage section controls whether the `lotus-miner` can perform certain sealing actions. Depending on the setup and the use of additional [seal workers]({{< relref "../../storage-providers/seal-workers/seal-workers/" >}}), you may want to modify some of the options.

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
  AllowReplicaUpdate = true
  AllowProveReplicaUpdate2 = true
  AllowRegenSectorKey = true
```

### Worker assigning logic 

The storage section includes a worker assigning logic. It allows you to specify a assigning logic that suits your setup.

- `utilization` is the default assigning logic, and tries to assign tasks to lotus-workers with the lowest utilization.
- The `spread` assigning logic tries to assign tasks to as many distinct workers as possible.

```toml
# Assigner specifies the worker assigner to use when scheduling tasks.
# "utilization" (default) - assign tasks to workers with lowest utilization.
# "spread" - assign tasks to as many distinct workers as possible.
#
# type: string
# env var: LOTUS_STORAGE_ASSIGNER
#Assigner = "utilization"
```

You can also choose to use some experimental assigner logics:

- The `experiment-spread-qcount` - this logic is similar to the spread assigner, but also takes into account task counts which are in running/preparing/queued states.
- The `experiment-spread-tasks` - this logic is similar to the spread assigner, but counts running tasks on a per-task-type basis
- The `experiment-spread-tasks-qcount` -  this logic similar to the spread assigner, but also takes into account task counts which are in running/preparing/queued states, as well as counting running tasks on a per-task-type basis.
- The `experiment-random` - In each schedule loop this assinger logic figures a set of all workers which can handle the task and then picks a random one. 

### Disallow remote finalize

If you do not want `Finalize` tasks to be run by remote workers, you can set the `DissallowRemoteFinalize` option to true. If set to true, all finalize tasks will be run on workers with local access to both the long-term storage and the sealing path containing the sector. 

{{< alert icon="👉" >}}
Only set this if all workers have access to long-term storage paths. If this flag is enabled, and there are workers without long-term storage access, sectors will not be moved from them, and Finalize tasks will appear to be stuck.
{{< /alert >}}

```toml
  DisallowRemoteFinalize when set to true will force all Finalize tasks to
  run on workers with local access to both long-term storage and the sealing
  path containing the sector.
  If you see stuck Finalize tasks after enabling this setting, check
  'lotus-miner sealing sched-diag' and 'lotus-miner storage find [sector num]'
  # type: bool
  # env var: LOTUS_STORAGE_DISALLOWREMOTEFINALIZE
  #DisallowRemoteFinalize = true
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

{{< alert icon="👉" >}}
The current `MaxCommitBatchGasFee.PerSector` is enough to aggregate proofs for 6 sectors. Adjust this respectively according to your operation. **If the value is too low, the message may wait in the mempool for a long while. If you don't have enough funds, the message will not be sent.**
{{< /alert >}}

### Make new CC sector available for snap-deal

`MakeCCSectorsAvailable` makes all the new CC sectors available to be upgraded with snap-deals. When this boolean is set to `true`, all pledged "CC" sectors from that point onwards will be converted to "Available" state after sealing. This enables sealing the incoming storage deals more quickly into these "Available" sectors compared to creating a new sector for the deals. 

### Disabling new sector for deal

If `MakeNewSectorForDeals` is set to `true` then `lotus-miner` will create new sectors for incoming deals. This option can set to `false` to ensure that all new deals are sealed as snap-deals into CC sectors. This can help reduce the sealing time for the new deals as long as CC sectors are ready for the snap-deals.
