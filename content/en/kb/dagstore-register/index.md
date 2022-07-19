---
title: "Retrieval Error: failed to lookup index for mh"
description: "This is a solution for the error like failed to lookup index for mh, err: datastore: key not found."
date: 2022-03-18T12:00:35+01:00
lastmod: 2022-03-18T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["Lotus Miner"]
---

## Problem

The following error shows up when trying to retrieve the data from a storage provider.

```shell
ERROR: offer error: retrieval query offer errored: failed to fetch piece to retrieve from: getting pieces for cid Qmf1ykhUo63qB5dJ8KRyeths9MZfyxpVdT5xwnmoLKefz7: getting pieces containing block Qmf1ykhUo63qB5dJ8KRyeths92mfyxpVdT5xi1moLKefz7: failed to lookup index for mh 1220f7ce2d20772b959c1071868e9495712f12785b1710ee88752af120dd49338190, err: datastore: key not found
```

The error indicates that dagstore does not have a corresponding index shard for the piece containing the requested data. When a retrieval is requested, the dagstore on storage provider side is queried and a reverse look up is used to determine the key(piece CID). This key is then used to query the piece store to find the sector containing the data and byte offset.

If for any reason the shard is not registered with the dagstore then reverse look up to find the piece CID fails and the above error is seen. The most widedly know reason for not having the shard registered with dagstore is the below error.

```plaintext
2022-02-21T20:06:03.950+1100 INFO markets loggers/loggers.go:20 storage provider event {"name": "ProviderEventFailed", "proposal CID": "bafyreihr743zllr2eckgfiweouiap7pgcjqa3mg3t75jjt7sfcpu", "state": "StorageDealError", "message": "error awaiting deal pre-commit: failed to set up called handler: called check error (h: 1570875): failed to look up deal on chain: deal 3964985 not found - deal may not have completed sealing before deal proposal start epoch, or deal may have been slashed"}
```

## Environment

- Calibnet
- Mainnet 

## Resolution

The below resolutions can only be applied on the storage provider side.

1. To fix the problem permanently user should switch to [Boost](https://boost.filecoin.io/) to replace the lotus markets.
1. To fix the deals where retrievals are impacted by above error, user will need to register the shards manually with dagstore:

    ```shell
    lotus-miner dagstore register-shard <piece CID>
    ```
