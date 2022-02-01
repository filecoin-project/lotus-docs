---
title: "Installation Requirements"
description: "This page provide details on Lotus installation prerequisites and supported platforms."
draft: false
menu:
    docs:
        parent: "installation"
weight: 120
toc: true
---

TODO:
Add supported platform
Linux
Mac
Cloud - supported cloud providers
Windows - Not supported

## Minimal requirements

To run a Lotus node your computer must have:

- macOS or Linux installed. Windows is not yet supported.
- 8-core CPU and 32 GiB RAM. Models with support for _Intel SHA Extensions_ (AMD since Zen microarchitecture or Intel since Ice Lake) will significantly speed things up.
- Enough space to store the current Lotus chain (preferably on an SSD storage medium). The chain grows at approximately 38 GiB per day. The chain can be [synced from trusted state snapshots and compacted or pruned]({{< relref "chain-management" >}}) to a minimum size of around 33Gib.  The full history was around 10TiB in June of 2021.

{{< alert icon="warning" >}}
These are the minimal requirements to run a Lotus node. [Hardware requirements for Miners]({{< relref "../../storage-providers/hardware-requirements" >}}) are different.
{{< /alert >}}



## Nodes in China

A few tips for users in China to get around some of the bandwidth issues or slowness they can suffer when building and running Lotus."

### Speed up proof parameter download for first boot

Running Lotus requires the download of chain's _proof parameters_ which are large files which by default are hosted outside of China and very slow to download there. To get around that, users should set the following environment variable when running either of `lotus`, `lotus-miner` and `lotus-worker`:

```sh
export IPFS_GATEWAY=https://proof-parameters.s3.cn-south-1.jdcloud-oss.com/ipfs/
```

### Speed up Go module download during builds

Building Lotus requires downloading a few Go modules. These are usually hosted on Github, which has very low bandwidth from China. To fix this use a local proxy by setting the following variable **before** running Lotus:

```sh
export GOPROXY=https://goproxy.cn
```
