---
title: "Overview"
description: "This section covers a overview of what Curio is, and how it relates to the Lotus-Miner"
lead: "This section covers a overview of what Curio is, and how it relates to the Lotus-Miner"
draft: false
menu:
    storage-providers:
        parent: "curio"
weight: 105
toc: true
---

{{< alert icon="warning" >}}
Curio is in alpha state, and we recommend our users to only run Curio in a testing environment or Calibration Network for the time being.
{{< /alert >}}

Curio is a new component in the Filecoin ecosystem that aims to simplify the setup and operation of storage providers.
It is currently in its alpha stage and is recommended for testing environments only.

It currently supports Sealing CC sectors, WindowPoSt and WinningPoSt for multiple MinerIDs.
We are working on integrating Boost to allow market integration for data onboarding.

## Key Features
HA
Simplicity
DB based config
Retry mechanism


### High Availability

Curio is designed for high availability.
You can run multiple instances of Curio and connect them to multiple clustered YugabyteDB instances.
This NxN configuration allows all instances to communicate with each other.
Additionally, different Curio instances can be connected to different chain daemons, providing further flexibility.

### Simplicity

Once the configuration is stored in the database, setting up a new machine with Curio is straightforward.
Start the binary with the appropriate flags to locate Yugabyte and specify which configuration layers to use.

### Durability

Curio is designed for durability. You can safely update one of your Curio machines without disrupting the operation of the others.

## Why Try Curio Alpha?

Trying the Curio alpha allows you to explore these features
and provide valuable feedback back to the development team for further development.
It offers a glimpse into the future of SP stack,
where setting up and operating a storage provider is simpler and more flexible.

## Future of Curio

The long-term vision for Curio is to eventually replace the current lotus-miner and lotus-worker processes.

This is part of an ongoing effort to simplify and streamline the setup and operation of storage providers.

However, this transition is expected to be gradual and will be carefully managed to ensure minimal disruption to existing operations.
Importantly, the new system will only be fully adopted once it has been thoroughly battle-tested and proven to be reliable.
