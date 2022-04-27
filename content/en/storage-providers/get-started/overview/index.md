---
title: "Overview"
description: "Storage providers in the Filecoin network are in charge of storing, providing content and creating consensus."
lead: "Storage providers in the Filecoin network are in charge of storing, providing content and creating consensus."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-get-started"
        identifier: "storage-providers-overview"
aliases:
    - /docs/storage-providers/overview/
weight: 110
toc: true
---

This section contains guides to initialize and run a successful storage provider operation using Lotus and should be approached by **advanced users only**. You should read through and be familiar with the concepts outlined in these two articles: [how Filecoin works](https://docs.filecoin.io/about-filecoin/how-filecoin-works/), [how mining works](https://docs.filecoin.io/mine/how-mining-works/), as well as having a Lotus node running.

{{< alert icon="warning" >}}
Being a storage provider on the _mainnet_ has stringent minimal **[hardware requirements]({{< relref "hardware-requirements" >}})**. Do not attempt this installation if your server does not meet the minimum requirements.
{{< /alert >}}

## How to read the storage provider documentation

The guides in this section is meant to introduce high level concepts early in the docs, and bring in more advanced topics and configurations later on. 

- The miner installation is covered in the [Installation guide]({{< relref "../../../lotus/install/prerequisites" >}}). Once the installation is complete, the Lotus node, Lotus miner, and Lotus worker applications should all be installed.

- The [Miner setup]({{< relref "initialize" >}}) covers all the details to configure your miner to achieve the maximum performance and avoid common pitfalls.
- The [Configuration reference]({{< relref "configuration" >}}) explains what the different miner configuration options mean.
- The [Seal workers]({{< relref "seal-workers" >}}) guide covers how to run additional seal workers co-located or not with the Lotus Miner.

We nevertheless recommend careful reading of every existing section and gaining as much background as possible before proceeding with a Lotus miner deployment.
