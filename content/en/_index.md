---
title : "Welcome to Lotus docs"
description: "Lotus is the reference implementation for the Filecoin network. It is written in Go, and is maintained by the Protocol Labs team. This website contains all the information you need to spin up a Lotus node, become a Filecoin storage provider, or just tinker around with the Filecoin network!"
lead: "Lotus is the reference implementation for the Filecoin network. It is written in Go, and is maintained by the Protocol Labs team. This website contains all the information you need to spin up a Lotus node, become a Filecoin storage provider, or just tinker around with the Filecoin network!"
draft: false
images: []
aliases: 
    /docs
---

## What Lotus does

When you install Lotus, you actually install a suite of command-line applications, all bundled into one easy-to-use package:

| Application | Description |
| --- | --- |
| `lotus` | The main Lotus daemon that runs on every Lotus node. This application can validate transactions, manage FIL addresses, and make storage & retreival deals. |
| `lotus-miner` | See the the respective [Lotus Miner](../../mine/lotus/README.md) section in the [Mine](../../mine/README.md) documentation. |
| `lotus-worker` | A worker that assists miners to perform mining-related tasks. See its respective [guide](../../mine/lotus/seal-workers.md) for more information. |

{{< alert icon="⚠️" >}}
Lotus is a command line application that **works on Linux and MacOS only**, and needs to be **built from source**. Users should be familiar with how command-line applications work.
{{< /alert >}}

## Who it's for

Want to build applications on the Filecoin network? Do you want to provide storage for the Filecoin users all around the world? Do you just want to play around with some cool tech? Then this impmlementation is for you!

## Project

Lotus is created, maintained, and supported by Protocol Labs. To find out more about about the project, [head over to the project page](/about/project)

## Get help

Need a hand installing Lotus, or setting up a `lotus-miner`? [Head over to the discussion tab in the Lotus GitHub repo](#)

