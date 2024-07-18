---
title: "Benchmark a Network Migration"
description: "This guide will walk you through how to benchmark a network migration on your Lotus node."
date: 2023-11-07T12:00:35+01:00
lastmod: 2023-11-07T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["Lotus"]
---

## Pre requisites

To benchmark a migration on your Lotus node, you need:

- A lotus node that can be stopped
- [`lotus-shed` installed]({{< relref "../../kb/lotus-shed-not-installed//" >}})

## Benchmark migration in offline mode

1. On your currently synced and running Lotus node, run:

```shell with-output
lotus chain head | head -n1
```
```
bafy2bzaceb6qkvjzxx5qehiwyvlbma5oi3p5bolwh2p36imqbagr4ck6fnqua
```

2. Stop the Lotus daemon

```shell
lotus daemon stop
```

3. Run the migration

```shell
./lotus-shed migrate-state --repo=[path-to-your-.lotus-repo] [nv-version-to-migrate-to] [output-of-step-1]
```

In the above command, replace `[nv-version-to-migrate-to]` with the network version you want to migrate to. For example, if you want to test the migration to network version 21, you would replace `[nv-version-to-migrate-to]` with `21`.

The last step will create the migration jobs and run through them. You should observe the time it starts, and when it finishes, as well as the system load during this migration.

## Benchmark migration in online mode

Run this only on a node on which you can afford to stop syncing the chain. It can be cleaned up later.

1. On your currently synced and running Lotus node, run:

```shell with-output
lotus chain list | tail -n 1 | awk -F: '{print $1}'
```
```
4099620
```

This gives you the current Epoch your node is on.

2. To run a migration in online mode (i.e., while it continues to sync the chain), we need to adjust the upgrade epoch manually in the code.

In the build/buildconstants/params_mainnet.go file, adjust the upgrade epoch to an epoch around 50 epochs ahead of your current epoch. Example:

```go
var UpgradeWaffleHeight = abi.ChainEpoch(4099620+50)
```

3. Stop your Lotus daemon

```shell
lotus daemon stop
```

4. Rebuild Lotus

```shell
make all
```

5. Restart your daemon

```shell 
lotus daemon 
```

Then, wait for the epoch set in step 2 to arrive and confirm and benchmark the migration in online mode. You will have to revert/clean up the code changes you made in the repository before you can restart your node and catch up with the correct chain.