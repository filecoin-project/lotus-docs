---
title: "Tasks"
description: "An explanation of the tasks the lotus-miner daemon is doing"
lead: "An explanation of the tasks the lotus-miner daemon is doing"
draft: false
menu:
    storage-providers:
        parent: "storage-providers-get-started"
        identifier: "storage-providers-tasks"
weight: 120
toc: true
---

This guide provides a high-level overview of the core tasks undertaken by the `lotus-miner` daemon and its sub-components.

## Key concepts

### Sectors

A sector is the default unit of storage that storage providers submit to the Filecoin network. Storage providers can decide if they want to commit 32 GiB or 64 GiB sector sizes when they first initialize their storage provider. It´s not possible to change the sector size once it has been initialized on-chain.

A sector can contain data from multiple deals and clients. A storage provider can also submit “Committed Capacity” (CC) sectors. CC sectors are available to the Filecoin network as committed storage power but do not initially contain storage deals. Actively proving CC sectors can be upgraded at a later date to include storage deals in a process known as Snap Deals.

**Sealed sectors**
An unsealed sector contains raw storage deal data. These sectors may optionally be retained if the client requires fast retrieval of their data.

**Unsealed sectors**
A unsealed sector is the raw data. Some clients request that their unsealed data is kept for fast retrievals.

### Epoch

The passing of time on the Filecoin network is divided into epochs of 30 seconds in duration. For every new epoch, a subset of storage providers are elected to add a new block to the chain.

![Overview of the lotus-miner tasks](lotus-miner-tasks.png)

## Tasks

The `lotus-miner` daemon and its sub-components are responsible for many tasks. We can split these tasks into three categories.

**Sealing tasks**
Before a sector can be commited to network, the storage provider *must* seal the sector, meaning it needs to encode the data in the sector to prepare it for the proving tasks. Sealing a sector is a multi-step process and is time-intensive to create, because the encrypted version of each chunk of data depends on every other chunk of input data.

Snap-Deal sealing tasks are covered in a separate dedicated guide in the operate section.

**Proving tasks**
These tasks allow storage providers to verifiably prove they have the data they have commited to the network on disk.

**Scheduling tasks**
These are mostly background tasks for controlling and optimizing work across all the sub components of `lotus-miner`. Since Lotus is highly configurable and many of the `lotus-miner` sub-components can be split into separate machines, scheduling work efficiently and securely is important. 

### Add piece

### PreCommit 1

The PreCommit 1 phase is the first phase of the Proof-of-Replication process and is where encoding and replication takes place. 

All 11 layers of calculation, layer by layer, are calculated sequentially. Each layer is 32GiB in size, and during PreCommit 1 you also need to keep around a copy of the unsealed sector (32GiB).

### PreCommit 2

During this phase an additional 64GiB file (when using 32GiB sectors) that represents the tree is kept around, bringing the total amount of storage needed to approx XX GiB for one sector.

### WaitSeed

The WaitSeed state is a security wait requirement by the network that is initiated between the PreCommit 2 and the start of the Commit 1 phase. It is fixed at 150 epochs, i.e 75 minutes long.

### Commit 1

### Commit 2

### windowPoSt

Window Proof-of-SpaceTime (WindowPoSt) is a proving task where the storage provider is asked to compute a proof that they are actually storing the data they have commited to the network. Every 24-hour period is broken into a series of windows, where each window is 30 minutes long. In a given window, a storage provider is asked to generate a proof based on random parts of the sealed sectors the storage provider has in that window. If they don’t have the data anymore, they won’t be able to respond with their proof in time, and will be penalized.

In this way, every sector is audited at least once in any 24-hour period, and a permanent, verifiable, and public record attesting to each storage providers continued commitment is kept.

### winningPoSt

Winning Proof-of-SpaceTime (WinningPoSt) is the mechanism by which storage providers are rewarded by the Filecoin network for their contributions to it. As a requirement for doing so, each storage provider is tasked with submitting a compressed Proof-of-Spacetime for a specified sector. Each elected storage provider who successfully creates a block is granted FIL, as well as the opportunity to charge other Filecoin participants fees to include messages in the block.

Storage providers who fail to do this in the necessary window will forfeit their opportunity to mine a block.

## Tips

### Safely restarting the miner daemon

The process of shutting down a storage provider and starting it again is complicated. Several factors need to be taken into account to be able to do it with all the guarantees:

- How long the miner plans to be offline.
- The existence and distribution of proving deadlines for the miner.
- The presence of open payment channels and ongoing retrieval deals.
- The occurrence of ongoing sealing operations.

### Reducing time offline

Given the need to continuously send proofs to the network, a storage provider should be offline as little as possible. Offline-time includes the time it takes for the server to restart the `lotus-miner` daemon fully.