---
title: "Error: Can't acquire bellman.lock"
description: "This is a solution for the failed to create data store error."
date: 2022-03-18T12:00:35+01:00
lastmod: 2022-03-18T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["sealing", "Lotus Worker", "Lotus Miner"]
---

## Problem

The following error shows up in the worker's or miner's log.

```shell
Error: Can't acquire bellman.lock
```

The **Bellman** lockfile is created to lock a GPU for a process. This error can occur when this file isn't properly cleaned up.

## Environment

- Calibnet
- Mainnet 

## Resolution

Stop the lotus-miner or lotus-worker and remove /tmp/bellman.lock file. Start the lotus-miner or lotus-worker again.
