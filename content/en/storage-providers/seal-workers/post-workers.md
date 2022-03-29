---
title: "PoSt workers"
description: "PoSt workers are specilized instances of a `lotus-worker`. It enables you to offload windowPoSt and winningPoSt to seperate workers."
lead: "PoSt workers are specilized instances of a `lotus-worker`. It enables you to offload windowPoSt and winningPoSt to seperate workers."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-seal-workers"
aliases:
    - /docs/storage-providers/seal-workers/
weight: 120
toc: true
---

While the Lotus Miner runs _windowPoSt_ and _winningPoSt_ by default, you can use specialized lotus workers to create a cluster of windowPoSt and winningPoSt workers to handle multiple Proof-of-Spacetime partitions simultaneously.

A lotus worker instance can only be one of the following:
- WindowPoSt worker
- WinningPoSt worker
- Worker for sealing tasks

## Launching PoSt workers

Before launching your PoSt worker you need to ensure that your worker meets the minimal requirements for the job it is going to perfom. You should also consider 

### Minminal spec requirements

These are the minimal requirements for running each of the PoSt tasks:

| **Task**    | **GPU**            | **VRAM** | **RAM** |
|:-----------:|:------------------:|:--------:|:-------:|
| winningPoSt | Highly recommended |          |         |
| windowPoSt  | Highly recommended | 8\.5GiB  | 128GiB  |

{{< alert icon="callout" >}}
Although both tasks can be run with a powerful CPU, it is highly recommended to run on GPU as it speeds up the process significantly, and therefore reducing the chance to miss windowPoSt or winningPoSt
{{< /alert >}}

### Remote storage access

PoSt workers do not necessarily need local access to the sealed sectors. Workers without local access will ask workers with local access to read challenges from their storage. 

### Environment variables

Ensure that workers have access to the following environment variables when they run. These are similar to those used by the Miner daemon ([explained in the setup guide]({{< relref "setup" >}})):

```
# MINER_API_INFO as obtained before
export MINER_API_INFO:<TOKEN>:/ip4/<miner_api_address>/tcp/<port>/http`
export MARKETS_API_INFO:<TOKEN>:/ip4/<miner_api_address>/tcp/<port>/http`
export BELLMAN_CPU_UTILIZATION=0.875      # optimal value depends on exact hardware
export FIL_PROOFS_MAXIMIZE_CACHING=1
export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # when GPU is available
export FIL_PROOFS_USE_GPU_TREE_BUILDER=1   # when GPU is available
export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
export FIL_PROOFS_PARENT_CACHE=/fast/disk/folder2   # > 50GiB!
```

The PoSt workers will fail to start if the file descriptor limit is not set high enough. So raise the the file descriptor limit with `ulimit -n 1048576` or by following the [Permanently Setting Your ULIMIT System Value](https://github.com/filecoin-project/lotus/discussions/6198) guide.

{{< alert icon="tip" >}}
When initially fetching parameter files, remember to set the [`IPFS_GATEWAY` variable when running from China]({{< relref "nodes-in-china" >}})
{{< /alert >}}

### Run the PoSt worker

```shell
lotus-worker run <flags>
```

The above command will start the worker. You´ll need to specify which PoSt operation you want the worker to perform with one of the following flags set to true.

```
   --winningpost                 enable winning post (default: false)
   --windowpost                  enable window post (default: false)
```

When a winningPoSt or windowPoSt worker connects to the _lotus-miner_, the lotus miner will delegate all winningPoSt or windowPoSt tasks to that worker. If both tasks are delegated to seperate PoSt workers, no PoSt tasks will be executed locally on the miner instance. If a worker is stopped, lotus-miner switches back to local PoSt automatically.

You can verify that PoSt workers are connected to the lotus-miner with `lotus-miner proving workers`:

```shell
$ lotus-miner proving workers
Worker 0, host computer
        CPU:  [                                                                ] 0 core(s) in use
        RAM:  [||||||||||||||||||                                              ] 28% 18.1 GiB/62.7 GiB
        VMEM: [||||||||||||||||||                                              ] 28% 18.1 GiB/62.7 GiB

Worker 1, host othercomputer
        CPU:  [                                                                ] 0 core(s) in use
        RAM:  [||||||||||||||                                                  ] 23% 14 GiB/119.2 GiB
        VMEM: [||||||||||||||                                                  ] 23% 14 GiB/119.2 GiB
        GPU: GeForce RTX 2080, not used
```

You can also verify that PoSt workers are connected in the workers-section of `lotus-miner info`.

```shell
$ lotus-miner info
Workers:
	Seal: 15
	WdPoSt: 4
	WinPoSt: 3
```

### Optional settings

Although the default settings are reasonable you can configure some advanced settings when running the PoSt workers, that can be tested for local optimizations of your hardware.

```
   --post-parallel-reads value   maximum number of parallel challenge reads (0 = no limit) (default: 0)
```

Lets you set an upper boundary of how many challenges it reads from your storage simultaneously. At defualt this is set to no limit, meaning that it will try to read all challenges at the same time from your storage.

```
   --post-read-timeout value     time limit for reading PoSt challenges (0 = no limit) (default: 0s)
```

Lets you set a cut off time for reading challenges from storage, after which it will abort the job. At default this is set to no limit.

## Multiple partitions

If you have multiple partitions in a single proving deadline, each partition will run on seperate workers in parallel, up to the number of partitions.

Consider this proving deadline with four full partitions:

```
lotus-miner proving deadlines
Miner: f011235
deadline  partitions  sectors (faults)  proven partitions
0         4           9396 (0)          0
```

If the storage provider has four windowPoSt workers connected, each of the partitions will be computed on each of the workers in parallel. If one windowPoSt worker gets disconnected, leaving you with only three windowPoSt workers, the first three partitions will be computed in parallel. While the last partition will be picked up by the first windowPoSt worker to finish its computation.