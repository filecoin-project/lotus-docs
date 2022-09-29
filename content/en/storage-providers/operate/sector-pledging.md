---
title: "Sector pledging"
description: "Pledging sectors is a technique to seal sectors with random data to make increase the miner's power in the network. This guide covers the motivation, steps to create and upgrade pledged sectors back to a usable state."
lead: "Pledging sectors is a technique to seal sectors with random data to make increase the miner's power in the network. This guide covers the motivation, steps to create and upgrade pledged sectors back to a usable state."
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

> The protocol allows a sector to have expiration time between [180-540](https://github.com/filecoin-project/specs-actors/blob/73e0409ac77c918c8fc91681c250a710c4b9a374/actors/builtin/miner/policy.go#L201-L206) days. Lotus will allow user to set the committed capacity sector expiration time upon pledge once [issue #4760](https://github.com/filecoin-project/lotus/issues/4760) is addressed.

{{< alert icon="warning" >}}
This will write data to `$TMPDIR` so make sure that there is enough space available.
{{< /alert >}}

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

## Adjusting the expected seal duration setting

If you pledged a sector, you can use the duration of the operation to update the [`ExpectedSealDuration` setting]({{< relref "configuration#dealmaking-section" >}}).

To find out how long it took to seal the sector, run:

```
lotus-miner sectors status --log 0
```

Then follow the instructions in the configuration reference linked above.

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

You can extend the lifecycle of a sector with the `lotus-miner sectors renew` command:

```shell with-output
lotus-miner sectors renew [command options] [arguments...]
```
```
NAME:
   lotus-miner sectors renew - Renew expiring sectors while not exceeding each sector's max life

USAGE:
   lotus-miner sectors renew [command options] [arguments...]

OPTIONS:
   --exclude value         optionally provide a file containing excluding sectors
   --extension value       try to extend selected sectors by this number of epochs, defaults to 540 days (default: 1555200)
   --from value            only consider sectors whose current expiration epoch is in the range of [from, to], <from> defaults to: now + 120 (1 hour) (default: 0)
   --max-fee value         use up to this amount of FIL for one message. pass this flag to avoid message congestion. (default: "0")
   --new-expiration value  try to extend selected sectors to this epoch, ignoring extension (default: 0)
   --only-cc               only extend CC sectors (useful for making sector ready for snap upgrade) (default: false)
   --really-do-it          pass this flag to really renew sectors, otherwise will only print out json representation of parameters (default: false)
   --sector-file value     provide a file containing one sector number in each line, ignoring above selecting criteria
   --to value              only consider sectors whose current expiration epoch is in the range of [from, to], <to> defaults to: now + 92160 (32 days) (default: 0)
   --tolerance value       don't try to extend sectors by fewer than this number of epochs, defaults to 7 days (default: 20160)
```

### Renew sectors in an epoch interval

This is an example of selecting sectors with a an expiration epoch between `epochnumber-a` and `epochnumber-b`, and renewing those sectors with 1555200 epochs:

```shell with-output
lotus-miner sectors renew  --from <epochnumber-a> --to <epochnumber-b> --new-expiration 1555200
```
```
Renewing 59 sectors: 
{
  "Extensions": [
    {
      "Deadline": 0,
      "Partition": 0,
      "Sectors": "2282,2285,2383,2386,2388,2394-2396,2400-2406,2408-2416,2418-2420,2422-2423,2428,2430",
      "NewExpiration": 3760173
    },
    {
      "Deadline": 2,
      "Partition": 0,
      "Sectors": "2417,3769,3771-3772,3775-3776,3781,3783,3786-3787,3790-3791,3800,3802,3808,3814,3816,3834-3835,3839,3852,3860-3861,3878,3894,3904,3922,3961",
      "NewExpiration": 3760173
    }
  ]
}
59 sectors renewed
```

Please note that the command has to be executed with the `--really-do-it` flag to actually send the message. Its good practice to check that the output is what the user expected before adding the flag.

### Renew sectors in a txt-file

This is an example of updating the lifecycle of sectors read from a file, and renewing those sectors with 1555200 epochs:

```shell with-output
lotus-miner sectors renew  --sector-file <your-sectorfile> --new-expiration 1555200
```
```
Renewing 7 sectors: 
{
  "Extensions": [
    {
      "Deadline": 0,
      "Partition": 0,
      "Sectors": "2282,2285,2383,2386,2388",
      "NewExpiration": 3760196
    },
    {
      "Deadline": 2,
      "Partition": 0,
      "Sectors": "2417,3769",
      "NewExpiration": 3760196
    }
  ]
}
7 sectors renewed
```

Please note that the command has to be executed with the `--really-do-it` flag to actually send the message. Its good practice to check that the output is what the user expected before adding the flag.

{{< alert icon="warning" >}}
The format of the sector file has to be in the form like this (a single sector number per line):

```
1
2
...
```
{{< /alert >}}

### Renew only-cc sectors

If you only want to renew CC-sectors, there is an additional flag `--only-cc` which will ignore any deal sectors in a given intervall, or file, when renewing.

```shell with-output
lotus-miner sectors renew  --from <epochnumber-a> --to <epochnumber-b> --new-expiration 1555200 --only-cc
```
```
Renewing 2 sectors: 
{
  "Extensions": [
    {
      "Deadline": 0,
      "Partition": 0,
      "Sectors": "2282,2285",
      "NewExpiration": 3760206
    }
  ]
}
2 sectors renewed
```

Please note that the command has to be executed with the `--really-do-it` flag to actually send the message. Its good practice to check that the output is what the user expected before adding the flag.
