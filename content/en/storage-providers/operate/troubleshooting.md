---
title: "Daily chores"
description: "This page offers some troubleshooting advice for Lotus Miners by listing some of the most common errors that users can come accross."
lead: "This page offers some troubleshooting advice for Lotus Miners by listing some of the most common errors that users can come accross."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-operate"
        identifier: "storage-provider-troubleshooting"
aliases:
    - /docs/storage-providers/troubleshooting/
weight: 380
toc: true
---

## Daily chores

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

You can extend a sector with the command:

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

## Compacting partitions

Expired, removed and terminated sectors will be listed in your proving partition until you compact your partitions. To clean up a partition in a deadline we can use the `lotus-miner sectors compact-partitions` command. The network enforces a security measure that disallows compacting a partition in a deadline untill 1800 epochs (15 hours) have passed. This is to enforce that compacting a deadline cannot be used to prevent invalid posts from being disputed.

The `lotus-miner sectors compact-partitions` also includes a safety measure that disallows compacting during a challenge window, or the prior challenge window. This is because compaction rearranges metadata, and if done too close to a windowPoSt it could cause you to miss a windowPost.