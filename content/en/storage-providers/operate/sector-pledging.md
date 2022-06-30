---
title: "Get storage power"
description: "How to obtain storage power in the network."
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

### Pledging a CC-sectors

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

## Reasons to take storage deals

Another way to obtain storage power in the network is to take in storage deals. To be able to take in storage deals you will need to setup your markets part. As explained in the `Reason to pledge CC-sectors` section you can also update already sealed CC-sectors with storage deals via Snap Deals.