---
title: "StorageMiner repo directory does not exist"
description: "This is a solution for the StorageMiner repo directory does not exist error."
date: 2022-03-22T12:00:35+01:00
lastmod: 2022-03-22T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["repo", "env", "Lotus Miner"]
---

## Problem

When running `lotus-miner auth create-token --perm admin` the following error occurs (could happen with any lotus-miner commands). 

```plaintext
ERROR: could not get API info for StorageMiner: repo directory does not exist. Make sure your configuration is correct
```

## Environment

- Mainnet 
- Calibnet
- Devnet

## Resolution

The miner cannot find the .lotusminer path. The env variable `LOTUS_MINER_PATH` needs to be set in the active terminal.  

## Extras
[Filecoin Slack](https://filecoinproject.slack.com/archives/CPFTWMY7N/p1641409490259000)
