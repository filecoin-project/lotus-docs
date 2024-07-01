---
title: "Overview"
description: "This section covers a overview of what Curio is, and how it relates to the Lotus-Miner"
lead: "This section covers a overview of what Curio is, and how it relates to the Lotus-Miner"
draft: false
menu:
    storage-providers:
        parent: "curio"
aliases:
  - /storage-providers/lotus-provider/overview
weight: 105
toc: true
---

{{< alert icon=\"info\" >}}
Curio is now live and Generally Available (GA). For more information, visit [Curio Documentation](https://docs.curiostorage.org/).
{{< /alert >}}

Curio is the new implementation of the Filecoin storage protocol. It aims to simplify the setup and operation of storage providers.

## Key Features

### High Availability
Curio is designed for high availability. You can run multiple instances of Curio nodes to handle similar types of tasks. The distributed scheduler and greedy worker design ensure that tasks are completed on time despite partial outages. You can safely update one of your Curio machines without disrupting the operation of the others.

### Node Heartbeat
Each Curio node in a cluster must post a heartbeat message every 10 minutes in HarmonyDB updating its status. If a heartbeat is missed, the node is considered lost and all tasks can now be scheduled on remaining nodes.

### Task Retry
Each task in Curio has a limit on how many times it should be tried before being declared lost. This ensures that Curio does not keep retrying bad tasks indefinitely, safeguarding against lost computation time and storage.

### Polling
Curio avoids overloading nodes with a polling system. Nodes check for tasks they can handle, prioritizing idle nodes for even workload distribution.

### Simple Configuration Management
The configuration is stored in the database in the form of layers. These layers can be stacked on top of each other to create a final configuration. Users can reuse these layers to control the behavior of multiple machines without needing to maintain the configuration of each node. Start the binary with the appropriate flags to connect with YugabyteDB and specify which configuration layers to use to get the desired behavior.

## Curio vs Lotus Miner

| Feature                              | Curio                                                                                           | Lotus-Miner                                                                           |
|--------------------------------------|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Scheduling                           | <span style=\"color:green\">Collaborative (Prioritized Greedy)</span>                           | <span style=\"color:orange\">Single point of failure</span>                             |
| High Availability                    | <span style=\"color:green\">Available</span>                                                    | <span style=\"color:orange\">Single control process</span>                              |
| Redundant Post                       | <span style=\"color:green\">Available</span>                                                    | <span style=\"color:orange\">Not Available</span>                                       |
| Task Retry Control                   | <span style=\"color:green\">Task retry with a cutoff limit (per task)</span>                    | <span style=\"color:orange\">Unlimited retry leading to resource exhaustion</span>      |
| Multiple Miner IDs                   | <span style=\"color:green\">Curio cluster can support multiple Miner IDs</span>                 | <span style=\"color:orange\">Single Miner ID per Lotus-Miner</span>                     |
| Shared Task nodes                    | <span style=\"color:green\">Curio nodes can handle tasks for multiple Miner IDs</span>          | <span style=\"color:orange\">Attached workers handle tasks for a single Miner ID</span> |
| Distributed Configuration Management | <span style=\"color:green\">Configuration stored in the highly-available Yugabyte Database</span> | <span style=\"color:orange\">All configuration in a single file</span>                  |

## Future of Curio

Curio aims to replace the current lotus-miner and lotus-worker processes, streamlining the setup and operation of storage providers."
