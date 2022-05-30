---
title: "Types of node"
description: "This page provide details on different types of lotus nodes and their use case."
lead: "This page provide details on different types of lotus nodes and their use case."
draft: false
menu:
    lotus:
        parent: "lotus-get-started"
        identifier: "types-of-node"
aliases:
    - /build/examples
weight: 115
toc: true
---

A lotus node is required to interact with the filecoin blockchain. These nodes are also required when running a storage provider runs a lotus-miner to offer the storage on the network.

Usually, the lotus nodes are kept small and reqular chain compaction is done to avoid node getting too large. These nodes can be synced from a latest snapshot in case any failures and this reduces the time required to start them.

A lotus node need to be deployed by anyone who wants to interact with the filecoin blockchain, provide storage, store data on filecoin and retrieve data from the filecoin network.

## Full node

A lotus full node differs from a normal lotus node in just one aspect. A full node is synced from the epoch "0" or "genesis block" of the filecoin blockchain.
These nodes require a huge amount of space to store the full chain and take a very long time be synced from the beginining. A [full chain snapshot can be imported]({{ < relref "chain-management" >}}) on a new lotus node to designate it as a full lotus node.

A lotus full node is useful when historical queries have to be run against the chain. Please do note that historical queries are slow due to the size of the chain and can take anywhere between a few minutes to hours to get a response.

## Lite node

Lite nodes are a scaled down version of a normal lotus node. These nodes require connection to a lotus node to function. Once connected to the lotus node, these can only perform message signing and deal transactions.

A lite node is useful when there are hardware constraints as lite node requires significantly less resources than a normal lotus node. Another use case would be to process transactions in parallel with other lite nodes behind a normal lotus node. This increses the efficiency of the system.
