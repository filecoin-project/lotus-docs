---
title: "How to join the Butterfly test network."
description: "A guide to join the Butterfly network"
date: 2022-03-17T12:00:35+01:00
lastmod: 2021-11-16T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["Butterfly Network", "Lotus Build"]
---

## Butterfly Network

The `Butterfly` test network is mostly an internal development and test network used by the Lotus team. It is used for short term testing, and should not be used for something that needs a long time operating network. To get updates about the Butterfly test network it is recommended to follow the `#lotus-butterfly` channel in the Filecoin Slack, as well as subscribing to [network updates](https://status.filecoin.io).
The `Butterfly` network supports sector size of 512MiB, 32GiB and 64GiB.

## Steps to join butterfly network

{{< alert icon="warning" >}}
The `Butterfly` network can not be considered a stable network and may be reset or upgraded at any moment with little notice.
{{< /alert >}}

Clone and checkout a release or branch as explained in the [build and install Lotus]({{< relref "../../lotus/install/linux/#build-and-install-lotus" >}}) guide.

To join the `Butterfly` network, build Lotus with below commands:
```shell
make clean
make butterflynet
make install
```


- The parameters are pinned on [IPFS gateway](https://proofs.filecoin.io/), and the CIDs can be found [here](https://github.com/filecoin-project/lotus/blob/edd3486d2cf53b960382e9cda6671e647844aa41/build/proof-params/parameters.json).
- For users that are in China: `export IPFS_GATEWAY=https://proof-parameters.s3.cn-south-1.jdcloud-oss.com/ipfs/` to get params fetched from jdcloud.