---
title: "Overview"
description: "This section covers a overview of what Curio is, and how it relates to the Lotus-Miner"
draft: false
menu:
    storage-providers:
        parent: "curio"
aliases:
  - /storage-providers/lotus-provider/overview
  - /storage-providers/lotus-provider/setup
weight: 105
toc: true
---

{{< alert icon=\"info\" >}}
Curio is now live and Generally Available (GA). For more information, visit [Curio Documentation](https://docs.curiostorage.org/).
{{< /alert >}}

Curio is the new implementation of the Filecoin storage protocol. It aims to simplify the setup and operation of storage providers.

## Curio vs Lotus Miner

| Feature                              | Curio                                                                                           | Lotus-Miner                                                                           |
|--------------------------------------|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Scheduling                           | <span style='color:green'>Collaborative (Prioritized Greedy)</span>                           | <span style='color:orange'>Single point of failure</span>                             |
| High Availability                    | <span style='color:green'>Available</span>                                                    | <span style='color:orange'>Single control process</span>                              |
| Redundant Post                       | <span style='color:green'>Available</span>                                                    | <span style='color:orange'>Not Available</span>                                       |
| Task Retry Control                   | <span style='color:green'>Task retry with a cutoff limit (per task)</span>                    | <span style='color:orange'>Unlimited retry leading to resource exhaustion</span>      |
| Multiple Miner IDs                   | <span style='color:green'>Curio cluster can support multiple Miner IDs</span>                 | <span style='color:orange'>Single Miner ID per Lotus-Miner</span>                     |
| Shared Task nodes                    | <span style='color:green'>Curio nodes can handle tasks for multiple Miner IDs</span>          | <span style='color:orange'>Attached workers handle tasks for a single Miner ID</span> |
| Distributed Configuration Management | <span style='color:green'>Configuration stored in the highly-available Yugabyte Database</span> | <span style='color:orange'>All configuration in a single file</span>                  |

## Future of Curio

Curio aims to replace the current lotus-miner and lotus-worker processes, streamlining the setup and operation of storage providers.
