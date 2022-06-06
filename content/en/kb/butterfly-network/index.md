---
title: "How to join the Butterfly network."
description: "A guide for how you can join the Butterfly network"
date: 2022-03-17T12:00:35+01:00
lastmod: 2021-11-16T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["Lotus Node", "Lotus Miner"]
---

## Problem

How to join the `Butterfly` network.

## Resolution

{{< alert icon="warning" >}}
The `Butterfly` network can not be considered a stable network and may be reset or upgraded at any moment with little notice.
{{< /alert >}}

Clone and checkout a release or branch as explained in the [build and install Lotus]({{< relref "/lotus/install/linux/#build-and-install-lotus" >}}) guide.

To join the `Butterfly` network, simply build Lotus by:
```shell
make clean
make butterflynet
make install
```

The `Butterfly` network supports three sector sizes, 512MiB, 32GiB and 64GiB.

- The parameters are pinned on [IPFS gateway](https://proofs.filecoin.io/ipfs/), and the CIDs can be found [here](https://github.com/filecoin-project/lotus/blob/edd3486d2cf53b960382e9cda6671e647844aa41/build/proof-params/parameters.json).
- For users that are in China: `export IPFS_GATEWAY=https://proof-parameters.s3.cn-south-1.jdcloud-oss.com/ipfs/` to get params fetched from jdcloud.