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

Curio is the new implementation of Filecoin storage protocol. It aims to simplify the setup and operation of storage providers.
It is currently in its alpha stage and is recommended for testing environments only.

It currently supports Sealing CC sectors, WindowPoSt and WinningPoSt for multiple MinerIDs.
We are working on integrating Boost to allow market integration for data onboarding.

## Key Features

### High Availability
Curio is designed for high availability. You can run multiple instances of Curio nodes to handle similar type of tasks.
The distributed scheduler and greedy worker design will ensure that tasks are completed on time despite most partial outages.
You can safely update one of your Curio machines without disrupting the operation of the others.

### Node Heartbeat
Each Curio node in a cluster must post a heartbeat message every 10 minutes in HarmonyDB updating its status.
If a heartbeat is missed, the node is considered lost and all tasks can now be scheduled on remaining nodes.

### Task Retry
Each task in Curio has a limit on how many times it should be tried before being declared lost. This ensures that Curio does not keep retrying bad tasks indefinitely.
This safeguards against lost computation time and storage.

### Polling
Curio avoids overloading nodes with a polling system. Nodes check for tasks they can handle, prioritizing idle nodes for even workload distribution.

### Simple Configuration Management
The configuration is stored in the database in the forms of layers. These layers can be stacked on top of each other create a final configuration.
Users can reuse these layers to control the behaviour of multiple machines without needing to maintain the configuration of each node.
Start the binary with the appropriate flags to connect with YugabyteDB and specify which configuration layers to use to get desired behaviour.

## Curio vs Lotus Miner

| Feature                              | Curio                                                                                           | Lotus-Miner                                                                           |
|--------------------------------------|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Scheduling                           | <span style="color:green">Distributed (Round Robin)</span>                                      | <span style="color:orange">Single point of failure</span>                             |
| High Availability                    | <span style="color:green">Available</span>                                                      | <span style="color:orange">Single control process</span>                              |
| Redundant Post                       | <span style="color:green">Available</span>                                                      | <span style="color:orange">Not Available</span>                                       |
| Task Retry Control                   | <span style="color:green">Task retry with a cutoff limit (per task)</span>                      | <span style="color:orange">Unlimited retry leading to resource exhaustion</span>      |
| Multiple Miner IDs                   | <span style="color:green">Curio cluster can support multiple Miner IDs</span>                   | <span style="color:orange">Single Miner ID per Lotus-Miner</span>                     |
| Shared Task nodes                    | <span style="color:green">Curio nodes can handle task for multiple Miner IDS</span>             | <span style="color:orange">Attached workers handle tasks for a single Miner ID</span> |
| Distributed Configuration Management | <span style="color:green">Configuration stored in the highly-available Yugabyte Database</span> | <span style="color:orange">All configuration in a single File</span>                  |

## Why Try Curio Alpha?
Trying the Curio alpha allows you to explore these features and provide valuable feedback back to the development team for further development.
It offers a glimpse into the future of SP stack, where setting up and operating a storage provider is simpler and more flexible.

## Future of Curio
The long-term vision for Curio is to eventually replace the current lotus-miner and lotus-worker processes.
This is part of an ongoing effort to simplify and streamline the setup and operation of storage providers.
