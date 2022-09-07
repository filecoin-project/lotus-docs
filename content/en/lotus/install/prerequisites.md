---
title: "Prerequisites"
description: "This page provide details on Lotus installation prerequisites and supported platforms."
draft: false
menu:
    lotus:
        parent: "lotus-install"
        identifier: "lotus-install-prerequisites"
aliases:
    - /docs/set-up/install/
    - /get-started/lotus/installation
weight: 205
toc: true
---

Please make sure to read the [Get started section]({{< relref "../../lotus/get-started/what-is-lotus/" >}}) before proceeding with the installation.
This page details the prerequisites needed to install Lotus and supported platforms.

## Minimal requirements

{{< alert icon="warning" >}}
These are the minimal requirements to just run a Lotus node. [Hardware requirements for storage providers]({{< relref "../../storage-providers/get-started/hardware-requirements/" >}}) are different.
{{< /alert >}}

There are two types of nodes in Lotus currently:

### Lotus full node with minimal snapshot

To run a Lotus node synced using a minimal snapshot your computer must have:

- macOS or Linux installed. Windows is not yet supported.
- 8-core CPU and 32 GiB RAM.
- Enough space to store the minimal snapshot and xx-amount of days of chain growth (preferably on an SSD or faster storage medium). The chain grows at approximately 38 GiB per day. The chain can be [synced from trusted state snapshots and compacted or pruned]({{< relref "../../lotus/manage/chain-management/" >}}).

**This type of node what is recommend to run for people that are looking to build on Lotus, or run a storage provider**

### Lotus full node with full chain history

To run a Lotus full-node with the full history from genesis requires a large amount of resources and storage:

The full history was around 10TiB in June of 2021.

- Linux installed.
- 

### Lotus Lite node
Lotus Lite nodes are not syncing the chain at all, so they require few resources. The downside is that they are limited to message signing and deal transactions. They also need to trust their, potentially centralized, gateway nodes with all chain state.

- A Lotus full node - For best results, make sure that this node is fully synced.
- A computer with at least 2GB RAM and a dual-core CPU. 

## Supported Platforms

Currently, Lotus is supported on the following platforms.

- [Linux]({{< relref "../../lotus/install/linux/" >}})
- [MacOS]({{< relref "../../lotus/install/macos/" >}})
- [Cloud]({{< relref "../../lotus/install/cloud-services/" >}})

## Nodes in China

A few tips for users in China to get around some of the bandwidth issues or slowness they can suffer when building and running Lotus.

### Proof parameter download

Running Lotus requires the chain's _proof parameters_ which are large files hosted outside of China and very slow to download there. To get around that, users should set the following environment variable when running either `lotus`, `lotus-miner`, and `lotus-worker`.

```sh
export IPFS_GATEWAY=https://proof-parameters.s3.cn-south-1.jdcloud-oss.com/ipfs/
```

### Go module download

Building Lotus requires downloading a Go modules. These are usually hosted on Github, which has very low bandwidth from China. To fix this use a local proxy by setting the following variable **before** running Lotus:

```sh
export GOPROXY=https://goproxy.cn
```