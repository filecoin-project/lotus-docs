---
title: "Lotus-miner legacy markets Configs"
description: "The Lotus-Miner Legacy Markets are deprecated. This is an overview of its configs."
date: 2023-10-26T12:00:35+01:00
lastmod: 2023-10-26T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
aliases:
    - /storage-providers/advanced-configurations/market/
toc: false
pinned: false
types: ["article"]
areas: ["Deprecated"]
---

{{< alert icon="warning" >}}
The Legacy Lotus/Lotus-Miner Markets sub-system reached EOL at the [end of the 31st January 2023](https://github.com/filecoin-project/lotus/releases/tag/v1.18.0). It has been fully removed from the Lotus/Lotus-Miner codebase as of 10th June 2024. We recommend our users to use the [Boost markets sub-system](https://github.com/filecoin-project/boost) instead.
{{< /alert >}}

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

### Publishing several deals in one message

The `PublishStorageDeals` message can publish multiple deals in a single message.
When a deal is ready to be published, Lotus will wait up to `PublishMsgPeriod`
for other deals to be ready before sending the `PublishStorageDeals` message.

However, once `MaxDealsPerPublishMsg` is ready, Lotus will immediately publish all the deals.

For example, if `PublishMsgPeriod` is 1 hour:

- At 1:00 pm, deal 1 is ready to publish. Lotus will wait until 2:00 pm for other deals to be ready before sending `PublishStorageDeals`.
- At 1:30 pm, Deal 2 is ready to publish
- At 1:45 pm, Deal 3 is ready to publish
- At 2:00pm, lotus publishes Deals 1, 2, and 3 in a single `PublishStorageDeals` message.

If `MaxDealsPerPublishMsg` is 2, then in the above example, when deal 2 is ready to be published at 1:30, Lotus would immediately publish Deals 1 & 2 in a single `PublishStorageDeals` message. Deal 3 would be published in a subsequent `PublishStorageDeals` message.

{{< alert icon="👉" >}}
If any of the deals in the `PublishStorageDeals` fails validation upon execution, or if the start epoch has passed, all deals will fail to be published.
{{< /alert >}}

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
