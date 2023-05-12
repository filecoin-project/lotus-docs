---
title: "Resolving Failed to Find Sector Errors"
description: "This article describes how to resolve 'fail to find sector' errors that may be presnt in Lotus daemon logs"
date: 2023-03-09T12:00:35+01:00
lastmod: 2023-03-09T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["Lotus Node"]
---

## Problem

There are multiple reasons why a Storage Provider may need to remove sectors.
If you are running `lotus-miner sectors list` with the Linux `watch` command or using a dashboard such as [Farcaster](https://github.com/s0nik42/lotus-farcaster) you may find the following error appear in you daemon logs:
```
{"level":"warn","ts":"2022-05-07T05:36:03.984-0700","logger":"rpc","caller":"go-jsonrpc@v0.1.5/handler.go:279","msg":"error in RPC call to 'Filecoin.StateSectorExpiration': failed to find sector 379:\n    github.com/filecoin-project/lotus/chain/actors/builtin/miner.(*state7).GetSectorExpiration\n        /home/scaseye/lotus/chain/actors/builtin/miner/v7.go:194"}
```

## Environment

- Mainnet
- Calibnet


## Resolution

The `failed to find sector` is informational only and non-critical. Your Storage Provider will not be adversely affected by the presence of this error warning message.

### Step 1: Compact Partitions

The `lotus-miner sectors remove` command will update the sector information on-chain but will not remove the sector information from your local Lotus databases.

In order to also remove the sector locally Lotus provides the `lotus-miner sectors compact-partitions` command. Invoking the compact partitions command will remove the sector locally and stop the `failed to find sector` message for the sector in question permanently.


#### Example 

You are running `watch -n 60 "lotus-miner sectors list"` in a terminal in order to monitor sector progress. This command will result in the `failed to find sector` warning messaage appearing in your logs every 60 seconds for every removed sector.
In our example the sector number triggering the warning message is 379 which resides in deadline 0 and partition 0.
Running the following command will remove the sector locally and permanently stop the warning message from reappearing:

```
lotus-miner sectors compact-partitions --deadline 0 --partitions 0 --really-do-it
```

## Extras

You can find more information about partition compaction at the [following link](https://lotus.filecoin.io/storage-providers/operate/daily-chores/#compacting-partitions).
