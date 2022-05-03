---
title: "Overview"
description: "Miners in the Filecoin network are in charge of storing, providing content and issuing new blocks."
lead: "Miners in the Filecoin network are in charge of storing, providing content and issuing new blocks."
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

This sections contains guides to setup and run succesful mining operations using Lotus and should be approached by **advanced users only**, familiar with [how Filecoin works](https://docs.filecoin.io/about-filecoin/how-filecoin-works/), [how mining works](https://docs.filecoin.io/mine/how-mining-works/) and the operation of a Lotus node.

{{< alert icon="warning" >}}
Lotus Mining for _mainnet_ has stringent minimal **[hardware requirements]({{< relref "hardware-requirements" >}})**. Do not attempt this installation if your computer does not meet the minimum requirements.
{{< /alert >}}

## Getting started with Lotus Miner

The following guides are essential starting points for those willing to launch a Lotus miner:

- The miner installation is covered in the [Installation guide]({{< relref "../../../lotus/install/prerequisites" >}}). Once the installation is complete, the Lotus node, Lotus miner, and Lotus worker applications should all be installed.

- The [Miner setup]({{< relref "initialize" >}}) covers all the details to configure your miner to achieve the maximum performance and avoid common pitfalls.
- The [Configuration reference]({{< relref "configuration" >}}) explains what the different miner configuration options mean.
- The [Seal workers]({{< relref "seal-workers" >}}) guide covers how to run additional seal workers co-located or not with the Lotus Miner.

We nevertheless recommend careful reading of every existing section and gaining as much background as possible before proceeding with a Lotus miner deployment.
