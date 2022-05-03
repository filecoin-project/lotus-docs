---
title: "Sealing"
description: "Lotus has a lot of advanced configurations you can tune to optimize your storage provider setup. This guide explains the advanced configuration options for lotus market"
lead: "This guide explains the advanced configuration options available for optimizing the sealing pipeline on a lotus-miner"
draft: false
menu:
    storage-providers:
        parent: "storage-providers-advanced-configurations"
weight: 120
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

In Lotus v1.10.0 and up, if `AggregateCommits` is set to false, prove-commitments will be sent to the chain via `ProveCommitSector` messages once they are ready. If `AggregateCommits` is set to true, lotus will aggregate and batch pre-commitments until any of `MaxCommitBatch`, `CommitBatchWait` or `CommitBatchSlack` is hit:
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

{{< alert icon="👉" >}}
The current `MaxCommitBatchGasFee.PerSector` is enough to aggregate proofs for 6 sectors. Adjust this respectively according to your operation. **If the value is too low, the message may wait in the mempool for a long while. If you don't have enough funds, the message will not be sent.**
{{< /alert >}}

