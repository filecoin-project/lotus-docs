---
title: "Sector pledging"
description: "Pledging sectors is a technique to seal sectors with random data to increase the miner's power in the network. This guide covers the motivation, steps to create and upgrade pledged sectors back to a usable state."
lead: "Pledging sectors is a technique to seal sectors with random data to increase the miner's power in the network. This guide covers the motivation, steps to create and upgrade pledged sectors back to a usable state."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-operate"
        identifier: "storage-provider-sector-pledging"
aliases:
    - /docs/storage-providers/sector-pledging/
weight: 330
toc: true
---

## Reasons to pledge sectors

As [explained in "How mining works"](https://docs.filecoin.io/mine/how-mining-works/#power-and-rewards), the amount of power of a miner in the Filecoin network is directly proportional to the amount of live storage (active sectors) contributed to the network. Miners with more power have more chances to be selected to mine new blocks.

By sealing sectors with random data, a miner can demonstrate to the network that it can potentially offer that much storage for real deals when there is enough demand or when it decides to do so. This is known as _pledging_. In the meantime, pledged sectors work similar to regular sectors and result in an increase in the miner's power.

Taking the above into account, **pledging sectors [on mainnet] network makes most sense when doing it at a scale where it provides enough power to have real chances to mine new blocks**. Otherwise, it is only useful for testing purposes.

{{< alert icon="tip" >}}
Pledging one sector during miner setup can be useful to test how long the sealing process takes and make sure that the miner's hardware is correctly configured before taking on real deals.
{{< /alert >}}

## Pledging a sector

To pledge a sector use:

```sh
lotus-miner sectors pledge
```

In Lotus, this will pledge the space for ~538 days by default.

> The protocol allows a sector to have expiration time between 180-1278 days (1278 in nv21, 540 before nv21).

{{< alert icon="warning" >}}
This will write data to `$TMPDIR` so make sure that there is enough space available.
{{< /alert >}}

Check that the sealing job has started with:

```sh
lotus-miner sealing jobs
```

This will be accompanied by a file in `<PATH_FOR_SEALING_STORAGE>/unsealed`.

After some minutes, you can check the sealing progress with:

```sh
lotus-miner sectors list
# and
lotus-miner sealing workers
```

When sealing for the new sector is complete, `pSet: NO` will become `pSet: YES`.

## Adjusting the expected seal duration setting

If you pledged a sector, you can use the duration of the operation to update the [`ExpectedSealDuration` setting]({{< relref "configuration#dealmaking-section" >}}).

To find out how long it took to seal the sector, run:

```
lotus-miner sectors status --log 0
```

Then follow the instructions in the configuration reference linked above.