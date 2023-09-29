---
title: "Nodes in China"
description: "This article provides a few tips for users in China to get around some of the bandwidth issues or slowness they can suffer when building and running Lotus."
date: 2022-09-19T00:00:35+01:00
lastmod: 2022-09-19T00:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
aliases:
    - /docs/set-up/nodes-in-china/
    - /lotus/configure/nodes-in-china/
toc: false
pinned: false
types: ["article"]
areas: ["Lotus Node", "Lotus Miner"]
---

## Problem

Users in China might experience bandwidth issues or slowness when building and downloading proof parameters needed to run Lotus. This article provides a few tips to get around the bandwidth issues.

## Speed up proof parameter download for first boot

Running Lotus requires the download of chain's _proof parameters_ which are large files which by default are hosted outside of China and very slow to download there. To get around that, users should set the following environment variable when running either of `lotus`, `lotus-miner` and `lotus-worker`:

```shell
export IPFS_GATEWAY=https://proof-parameters.s3.cn-south-1.jdcloud-oss.com/ipfs/
```

## Speed up Go module download during builds

Building Lotus requires downloading a few Go modules. These are usually hosted on Github, which has very low bandwidth from China. To fix this use a local proxy by setting the following variable **before** running Lotus:

```shell
export GOPROXY=https://goproxy.cn
```