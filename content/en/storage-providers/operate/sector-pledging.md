---
title: "Get storage power"
description: "A storage providers power in the network."
lead: "A storage provider can obtain power in the network by pleding commited capacity sectors, or by taking in storage deals. This page covers the motivation, and steps needed to take for both of these methods"
draft: false
menu:
    storage-providers:
        parent: "storage-providers-operate"
        identifier: "storage-provider-sector-pledging"
aliases:
    - /docs/storage-providers/sector-pledging/
weight: 340
toc: true
---

## Reasons to pledge CC-sectors

As [explained in "How mining works"](https://docs.filecoin.io/mine/how-mining-works/#power-and-rewards), the amount of power of a storage provider in the Filecoin network is directly proportional to the amount of live storage (active sectors) contributed to the network. Storage providers with more power have more chances to be selected to mine new blocks.

By sealing sectors with random data, a storage provider can demonstrate to the network that it can offer that much storage, and later upgrade these sectors with real data by utilizing Snap Deals.

Taking the above into account, **pledging commited capacity sectors makes the most sense when doing it at a scale where it provides enough power to have real chances to mine new blocks, and also to indicate to potential clients that you have a capacity to store large amounts of real data**.

{{< alert icon="tip" >}}
Pledging a sector can be useful to test how long the sealing process takes and makes sure that the hardware is correctly configured before taking on real deals.
{{< /alert >}}

### Pledging a CC-sector

To pledge a sector use:

```sh
lotus-miner sectors pledge
```

In Lotus, this will pledge the space for ~538 days by default.

> The protocol allows a sector to have an expiration time between 180 and 540 days. You can change the the committed capacity sector expiration time by changing the `CommittedCapacitySectorLifetime = "12960h0m0s"` to your desired time in your config.toml file.

Check that the sealing job has started with:

```sh
lotus-miner sealing jobs
```

This will be accommpanied by a file in `<PATH_FOR_SEALING_STORAGE>/unsealed`.

After some minutes, you can check the sealing progress with:

```sh
lotus-miner sectors list
# and
lotus-miner sealing workers
```

When sealing for the new is complete, `pSet: NO` will become `pSet: YES`.

### Adjusting the expected seal duration setting

If you pledged a sector, you can use the duration of the operation to update the [`ExpectedSealDuration` setting]({{< relref "configuration#dealmaking-section" >}}).

To find out how long it took to seal the sector, run:

```
lotus-miner sectors status --log 0
```

Then follow the instructions in the configuration reference linked above.

## Reasons to pledge CC-sectors



## Inspect expiring sectors

You can check which sectors are about to expire. Sectors that will expire within 60 days can be checked by default with the following command:

```shell
lotus-miner sectors check-expire
```

If you want to check for sectors that will expire within 33 days (669600 epoch in devnet) , add the `--cutoff` option along with your desired epoch:

```shell with-output
lotus-miner sectors check-expire --cutoff 669600
```

```shell output
ID  SealProof  InitialPledge  Activation                      Expiration                  MaxExpiration                 MaxExtendNow
5   5          59.605 nFIL    1519 (1 day 9 hours ago)        691857 (in 4 weeks 2 days)  5257519 (in 34 weeks 3 days)  1587303 (in 10 weeks 2 days)
10  5          59.605 nFIL    3588 (1 day 7 hours ago)        697617 (in 4 weeks 2 days)  5259588 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)
11  5          59.605 nFIL    4695 (1 day 6 hours ago)        697617 (in 4 weeks 2 days)  5260695 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)
15  5          59.605 nFIL    6891 (1 day 4 hours ago)        700497 (in 4 weeks 2 days)  5262891 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)
17  5          59.605 nFIL    7004 (1 day 3 hours ago)        700497 (in 4 weeks 2 days)  5263004 (in 34 weeks 4 days)  1587303 (in 10 weeks 2 days)
```

## Extend sectors

You can extend the lifecycle of a sector with the command:

```shell
lotus-miner sectors renew [command options] [arguments...]
```

This is an example of selecting sectors with a lifecycle between `epochnumber-a` epoch and `epochnumber-b` epoch and updating it to 1555200 epoch:

```shell
lotus-miner sectors renew  --from <epochnumber-a> --to <epochnumber-b> --new-expiration 1555200
```

This is an example of updating the lifecycle of a sector read from a file to 1555200 epoch:

```shell
lotus-miner sectors renew  --sector-file <your-sectorfile> --new-expiration 1555200
```

{{< alert icon="warning" >}}
You have to select the sectors to renew. That means you have to specify the `--from` and `--to` option, or specify the sector file, if no sector is selected this command will have no effect.

Format of sector file:

```
1
2
...
```
{{< /alert >}}