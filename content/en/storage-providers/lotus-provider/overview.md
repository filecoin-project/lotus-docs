---
title: "Overview"
description: "This section covers a overview of what Lotus-Provider is, and how it relates to the Lotus-Miner"
lead: "This section covers a overview of what Lotus-Provider is, and how it relates to the Lotus-Miner"
draft: false
menu:
    storage-providers:
        parent: "lotus-provider"
weight: 105
toc: true
---

{{< alert icon="warning" >}}
Lotus-Provider is in alpha state, and we recommend our users to only run lotus-provider in a testing enviroment for the time being.
{{< /alert >}}

Lotus-Provider is a new component in the Lotus ecosystem that aims to simplify the setup and operation of storage providers. It is currently in its alpha stage and is recommended for testing environments only for now.

It currently supports WindowPoSt and WinningPoSt. On the near term development map, multiple MinerIDs and sealing is of the highest priority. 

## Key Features

### High Availability

Lotus-Provider is designed for high availability. You can run multiple instances of Lotus-Provider and connect them to multiple clustered YugabyteDB instances. This NxN configuration allows all instances to communicate with each other. Additionally, different Lotus-Provider instances can be connected to different chain daemons, providing further flexibility.

### Simplicity

Once the configuration is stored in the database, setting up a new machine with Lotus-Provider is straightforward. Simply start the binary with the appropriate flags to locate Yugabyte and specify which configuration layers to use.

### Durability

Lotus-Provider is designed for durability. You can safely update one of your Lotus-Provider machines without disrupting the operation of the others.

## Why Try Lotus-Provider Alpha?

Trying the Lotus-Provider alpha allows you to explore these features and provide valuable feedback back to the development team for further development. It offers a glimpse into the future of SP stack, where setting up and operating a storage provider is simpler and more flexible.

## Future of Lotus-Provider

The long-term vision for Lotus-Provider is to eventually replace the current lotus-miner and lotus-worker processes.

This is part of an ongoing effort to simplify and streamline the setup and operation of storage providers.

However, this transition is expected to be gradual and will be carefully managed to ensure minimal disruption to existing operations. Importantly, the new system will only be fully adopted once it has been thoroughly battle-tested and proven to be reliable.