---
title : "Welcome to Lotus docs"
description: "Lotus is the reference implementation for the Filecoin network. It is written in Go, and is maintained by the Protocol Labs team. This website contains all the information you need to spin up a Lotus node, become a Filecoin storage provider, or just tinker around with the Filecoin network!"
lead: "Lotus is the reference implementation for the Filecoin network. It is written in Go, and is maintained by the Protocol Labs team. This website contains all the information you need to spin up a Lotus node, become a Filecoin storage provider, or just tinker around with the Filecoin network!"
draft: false
images: []
aliases:
- /docs
---

## What Lotus does

When you install Lotus, you actually install a suite of command-line applications, all bundled into one easy-to-use package:

| Application | Description |
| --- | --- |
| `lotus` | The main Lotus daemon that runs on every Lotus node. This application can validate transactions, manage FIL addresses, and make storage & retreival deals. |
| `lotus-miner` | See the [the storage provider section]({{< relref "/docs/storage-providers/overview" >}}) to setup and run succesful mining operations using `lotus-miner`. |
| `lotus-worker` | A worker that assists miners to perform mining-related tasks. See its respective [guide]({{< relref "/docs/storage-providers/seal-workers" >}}) for more information. |

{{< alert icon="warning" >}}
Lotus is a command line application that **works on Linux and MacOS only**, and needs to be **built from source**. Users should be familiar with how command-line applications work.
{{< /alert >}}

## Who it's for

Want to build applications on the Filecoin network? Do you want to provide storage for the Filecoin users all around the world? Do you just want to play around with some cool tech? Then this implementation is for you!

## Project

Lotus is created, maintained, and supported by Protocol Labs. To find out more about about the project, [head over to the project page]({{< relref "/docs/set-up/about" >}})


### Roadmap

The latest timing information is available in the [Filecoin Mainnet Roadmap](https://app.instagantt.com/shared/s/1152992274307505/latest).

### Research

Learn about the ongoing cryptography research and design efforts that underpin the Filecoin protocol on the [Filecoin Research website](https://research.filecoin.io/). The [CryptoLab at Protocol Labs](https://research.protocol.ai/groups/cryptolab/) also actively researches improvements.

### Related projects

Filecoin is a highly modular project that is itself made out of many different protocols and tools. Learn more about the [Filecoin-related projects](https://docs.filecoin.io/project/related-projects/) supported by Protocol Labs.

## Code of conduct

The Filecoin community believes that our mission is best served in an environment that is friendly, safe, and accepting, and free from intimidation or harassment. To that end, we ask that everyone involved in Filecoin read and respect our [code of conduct](https://github.com/filecoin-project/community/blob/master/CODE_OF_CONDUCT.md).

## Get help

Need a hand installing Lotus, or setting up a `lotus-miner`? [Head over to the discussion tab in the Lotus GitHub repo](https://github.com/filecoin-project/lotus/discussions)
