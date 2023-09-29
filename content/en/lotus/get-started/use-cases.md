---
title: "Node types"
description: "This page provide details on different lotus node types and their use case."
lead: "This page provide details on different lotus node types and their use case."
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

## Full node

A Lotus full node is required to interact with the Filecoin blockchain. These nodes are also required when running a storage provider on the Filecoin network.

Usually, the Lotus full nodes are kept small, with regular chain compactions, or by using the SplitStore-feature which discards older chain data. Lotus full nodes are usually synced from snapshots to reduce the time required to get in sync with the Filecoin Network.

## Full historical node

A Lotus full historical node differs from a typical Lotus full node in just one aspect. A full historical node is synced from epoch "0" or the "genesis block" of the filecoin blockchain. These nodes require a huge amount of space to store the full chain data, and take a very long time be synced from the beginning.

A Lotus full historical node is useful in very limited cases. Most users that need to extract and inspect pieces of the Filecoin chain, usually uses tools like [lily](https://lilium.sh/software/lily/introduction/), which allows for structured data extraction into a PostgreSQL/TimescaleDB database or CSV dumps for later query and analysis.

Please do note that historical queries on a Lotus full historical node are slow due to the size of the chain, and can take anywhere between a few minutes to hours to get a response.

## Lite client node

Lite nodes are a scaled-down version of a Lotus full node. These nodes require a connection to a Lotus full node to function. Once connected to the Lotus full node, these Lotus Lite client nodes can only perform message signing and deal transactions.

A lite node is useful when there are hardware constraints, as a lite node requires significantly fewer resources than a Lotus full node. Another use case would be to process transactions in parallel with other lite client nodes behind a Lotus full node. This increases the efficiency of the system.
