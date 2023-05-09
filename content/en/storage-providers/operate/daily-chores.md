---
title: "Chores"
description: "This page offers some advice for what you should do only a daily or weekly basis"
lead: "This page offers some advice for what you should do only a daily or weekly basis"
draft: false
menu:
    storage-providers:
        parent: "storage-providers-operate"
        identifier: "storage-provider-daily-chores"
aliases:
    - /docs/storage-providers/troubleshooting/
    - /storage-providers/operate/troubleshooting/
weight: 380
toc: true
---

## Inspect expiring sectors

The `check-expire` lets you inspect which sectors are about to expire. By default it will display the sectors that will expire within 60 days:

```shell
lotus-miner sectors check-expire
```

If you want to display sectors that will expire later, or earlier, then 60 days from now, you can change the `--cutoff` option with your desired epoch length cutoff.

```shell with-output
lotus-miner sectors check-expire --cutoff 345600
```

```shell output
ID  SealProof  InitialPledge  Activation                      Expiration                  MaxExpiration                 MaxExtendNow
2585  8          1.111 FIL      920515 (48 weeks 1 day ago)     1938603 (in 2 weeks 1 day)     6176515 (in 4 years 3 weeks)   3448626 (in 1 year 25 weeks)  
1619  8          264.472 mFIL   395718 (1 year 22 weeks ago)    1947243 (in 2 weeks 4 days)    5651718 (in 3 years 29 weeks)  3448626 (in 1 year 25 weeks)  
1694  8          268.789 mFIL   410107 (1 year 21 weeks ago)    1961643 (in 3 weeks 2 days)    5666107 (in 3 years 30 weeks)  3448626 (in 1 year 25 weeks)  
2108  8          827.247 mFIL   599683 (1 year 12 weeks ago)    2065323 (in 8 weeks 3 days)    5855683 (in 3 years 40 weeks)  3448626 (in 1 year 25 weeks)  
3647  8          1.314 FIL      1534542 (17 weeks 5 days ago)   2141643 (in 12 weeks 2 days)   6790542 (in 4 years 34 weeks)  3448631 (in 1 year 25 weeks) 
3791  8          1.378 FIL      1614739 (13 weeks 5 days ago)   2221947 (in 16 weeks 2 days)   6870739 (in 4 years 38 weeks)  3448631 (in 1 year 25 weeks)
```

### Extend sectors

{{< alert icon="warning" >}}
Please note that for the Lotus v1.22.1 both the `lotus-miner sectors extend` and `lotus-miner sectors renew` commands exists. In this guide we explain how to extend sectors in Lotus v1.23.0 or higher.
{{< /alert >}}

You can extend a sector with the command:

```shell
lotus-miner sectors extend [command options] [arguments...]
```

This is an example of selecting sectors with a lifecycle between `epochnumber-a` epoch and `epochnumber-b` epoch and updating it to 1555200 epoch:

```shell
lotus-miner sectors extend  --from <epochnumber-a> --to <epochnumber-b> --new-expiration 1555200
```

This is an example of updating the lifecycle of a sector read from a file to 1555200 epoch:

```shell
lotus-miner sectors extend  --sector-file <your-sectorfile> --new-expiration 1555200
```

{{< alert icon="warning" >}}
If you are using a sectorfile to extend sectors, please note that you will need to specify a sectorID per line in the textfile.

Format of sector file:

```
1
2
...
```
{{< /alert >}}

## Compacting partitions

Expired, removed and terminated sectors will be listed in your proving partition until you compact your partitions. To clean up a partition in a deadline we can use the `lotus-miner sectors compact-partitions` command. The network enforces a security measure that disallows compacting a partition in a deadline untill 1800 epochs (15 hours) have passed. This is to enforce that compacting a deadline cannot be used to prevent invalid posts from being disputed.

The `lotus-miner sectors compact-partitions` also includes a safety measure that disallows compacting during a challenge window, or the prior challenge window. This is because compaction rearranges metadata, and if done too close to a windowPoSt it could cause you to miss a windowPost.

It is recommended to compact your partitions on a regular basis as it will save gas fees. All computations are captured and accounted for by the FVM, this includes the bitfield computation. If you have "dead” sectors stored in your `lotus-miner` actor state, every read/write to your sectors info will result in wasted computations leading to higher gas costs.

You can inspect which sectors and the partition index in a proving deadline with `lotus-miner proving deadline --sector-nums <deadlineIdx>`.

```shell output
lotus-miner proving deadline 1
Deadline Index:           1
Partitions:               1
Proven Partitions:        0
Current:                  false

Partition Index:          0
Sectors:                  74
Sector Numbers:           [40 63 71 219 297 333 390 404 466 481 504 564 721 2510 2533 2549 2607 2623 2625 2691 2738 2740 2755 2764 2780 2853 2880 2908 2920 2932 2953 2982 3098 3099 3124 3136 3140 3146 3151 3205 3246 3252 3289 3344 3362 3365 3415 3432 3478 3537 3590 3591 3626 3638 3764 3782 3792 3886 3930 4004 4032 4044 4079 4148 4156 4177 4188 4223 4262 4295 4304 4410 4411 4419]
Faults:                   0
Faulty Sectors:           []
```

To compact a partition, you need to specify the deadline and the partition index `lotus-miner sectors compact-partitions --deadline <Proving-Deadline> --partitions <Partition-Index>`.

```shell output
lotus-miner sectors compact-partitions --deadline 1 --partitions 0 --really-do-it
compacting 1 paritions
Requested compact partitions in message bafy2bzacecnmiea6y7yt776vhur5rdjgliw5cvlb7cuf4q643ntu44odjgh64
```

After the compaction message has been sent, you should be able to see that your proving deadline has been compacted and old sectors has been removed:

```shell output
lotus-miner proving deadline 1
Deadline Index:           1
Partitions:               1
Proven Partitions:        0
Current:                  false

Partition Index:          0
Sectors:                  58
Sector Numbers:           [2510 2533 2623 2691 2738 2740 2755 2764 2780 2853 2880 2908 2920 2932 2953 2982 3098 3099 3124 3136 3140 3146 3151 3205 3246 3252 3289 3344 3362 3365 3415 3432 3478 3537 3590 3591 3626 3638 3764 3782 3792 3886 3930 4004 4032 4044 4079 4148 4156 4177 4188 4223 4262 4295 4304 4410 4411 4419]
Faults:                   0
Faulty Sectors:           []
```
