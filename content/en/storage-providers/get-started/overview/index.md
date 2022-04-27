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

The guides in this section are meant to introduce high-level concepts early in the docs and bring in more advanced topics and configurations later on. 

- The `Get started` segment contains a high-level overview of the tasks the `lotus-miner` binary does, introduces the basic economics of being a storage provider, and outlines some hardware and architectural requirements.
- The `Setup` segment contains all the necessary information for initializing the storage provider on the network.
- The `Operate` segment contains the necessary information about operating the storage provider daily and introduces more complex operations like SnapDeals, Batching and Index Provider.
- The `Workers` segment contains guides for setting up dedicated workers for offloading tasks from the `lotus-miner` binary.
- The `Advanced onfigurations` segment details all the configurations you can tune to optimize your storage provider setup.

We nevertheless recommend careful reading of every existing section and gaining as much background as possible before proceeding with a Lotus miner deployment.
