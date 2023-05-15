---
title: "Failed to create data store"
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

The following error shows up in the worker's log.

```json
{"level":"warn","ts":"2021-12-05T13:19:00.649+0100","logger":"ffi-wrapper","caller":"ffiwrapper/ffiwrapper.go:52","msg":"copied different amount than expected: 65536 != 4161536"}
```

And this error shows up in the miner's miner.log

```json
"unhandled sector error (1): filling up the sector ([34091302912]):\n    github.com/filecoin-project/lotus/extern/storage-sealing.(*Sealing).handlePacking\n        /home/perun/lotus/extern/storage-sealing/states_sealing.go:77\n  - 
add piece:\n    github.com/filecoin-project/lotus/extern/storage-sealing.(*Sealing).padSector\n        /home/perun/lotus/extern/storage-sealing/states_sealing.go:96\n  - 
storage call error 0: generating piece commitment: failed to build tree\n\nCaused by:\n    0: failed to create data store\n    1: No such file or directory (os error 2)"
```

The key error from the above output is `failed to create data store\n    1: No such file or directory (os error 2)"`

## Environment

- Calibnet
- Mainnet 

## Resolution

In this example, the user was moving from calibnet to mainnet and had not created their sealing directory. The error could come up though in any circumstance where the sealing directory is not present or available. To create or manage your sealing directory, review the document [linked here](https://lotus.filecoin.io/storage-providers/operate/custom-storage-layout/#custom-location-for-sealing).  

## Extras

[Filecoin Slack thread discussing this issue](https://filecoinproject.slack.com/archives/CPFTWMY7N/p1638706900298000). 


