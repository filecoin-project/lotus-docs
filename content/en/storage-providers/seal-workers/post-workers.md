---
title: "PoSt workers"
description: "PoSt workers are specilized instances of a `lotus-worker`. It enables you to offload windowPoSt and winningPoSt to seperate workers."
lead: "PoSt workers are specilized instances of a `lotus-worker`. It enables you to offload windowPoSt and winningPoSt to seperate workers."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-seal-workers"
weight: 120
toc: true
---

While the Lotus Miner runs _windowPoSt_ and _winningPoSt_ by default, you can use specialized lotus workers to create a cluster of windowPoSt and winningPoSt workers to handle multiple Proof-of-Spacetime partitions simultaneously.

A lotus worker instance can only be one of the following:
- WindowPoSt worker
- WinningPoSt worker
- Worker for sealing tasks

## Launching PoSt workers

Before launching your PoSt worker you need to ensure that your worker meets the minimal requirements for the job it is going to perfom. You should also consider how they can access sectors and setting correct enviroment variables be you run the workers.

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

The windowPoSt process requires reading random leafs of all the sealed sectors in a proving deadline. When setting up windowPoSt workers one needs to consider how the workers can access those files. The PoSt workers can read challenges from any other workers, including the lotus-miner process, but it will prefer reading it from local paths.

The lotus-miner instance disables PoSt-work when a PoSt worker is connected, meaning that a single windowPoSt worker can not rely on reading challenges from the lotus-miner instance. And therefore needs read access to the sealed sectors. 

{{< alert icon="warning" >}}
Storage providers should design their workers sector access depending on their setup size and also redundancy required. If only one worker has read access to the sealed sectors, it can create a single point of failure. If you have multiple partitions in a deadline, having multiple PoSt workers reading challenges from the same source may also cause unwanted I/O load.
{{< /alert >}}

### Environment variables

Ensure that workers have access to the following environment variables when they run. These are similar to those used by the Miner daemon ([explained in the setup guide]({{< relref "configure#setup" >}})):

```
export MINER_API_INFO:<TOKEN>:/ip4/<miner_api_address>/tcp/<port>/http`
export BELLMAN_CUSTOM_GPU="MODEL-NAME:CORES" # If you´re using a custom GPU
export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
export FIL_PROOFS_PARENT_CACHE=/fast/disk/folder2   # > 50GiB!
```

For the PoSt worker to start, it will need to read and verify the Filecoin proof parameters. These are the same parameters as is currently on the lotus-miner instance. We recomend copying them over from your lotus-miner machine, else they will be downloaded on first run.

The PoSt workers will fail to start if the file descriptor limit is not set high enough. Raise the the file descriptor limit temporarily before running with `ulimit -n 1048576` or permanently by following the [Permanently Setting Your ULIMIT System Value](https://github.com/filecoin-project/lotus/discussions/6198) guide.

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

A PoSt worker instance can only be either a winningPoSt worker, or a windowPoSt worker.

When a winningPoSt or windowPoSt worker connects to the _lotus-miner_, the lotus miner will delegate all winningPoSt or windowPoSt tasks to that worker. If both tasks are delegated to seperate PoSt workers, no PoSt tasks will be executed locally on the miner instance. If a worker is stopped, the lotus-miner instance switches back to local PoSt automatically.

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

### Advanced settings

Although the default settings are reasonable you can configure some advanced settings when running the PoSt workers, that can be tested for local optimizations of your hardware.

{{< alert icon="tip" >}}
Use with caution as changing these values to extremes might cause you to miss windowPoSt.
{{< /alert >}}

```
   --post-parallel-reads value   maximum number of parallel challenge reads (0 = no limit) (default: 128)
```

Lets you set an upper boundary of how many challenges it reads from your storage simultaneously. At defualt this is set to 128.

```
   --post-read-timeout value     time limit for reading PoSt challenges (0 = no limit) (default: 0s)
```

Lets you set a cut off time for reading challenges from storage, after which it will abort the job. At default this is set to no limit.

## Multiple partitions

If you have multiple partitions in a single proving deadline and multiple windowPoSt workers, each partition will run on seperate workers in parallel, up to the number of partitions.

Consider this proving deadline with four full partitions:

```
lotus-miner proving deadlines
Miner: f011235
deadline  partitions  sectors (faults)  proven partitions
0         4           9396 (0)          0
```

If the storage provider has four windowPoSt workers connected, each of the partitions will be computed on each of the workers in parallel. If one windowPoSt worker gets disconnected, leaving you with only three windowPoSt workers, the first three partitions will be computed in parallel, while the last partition will be picked up by the first windowPoSt worker to finish its computation.

### Testing the setup

When doing changes to your PoSt setup it is useful to verify that the changes works as intended without testing it on a real proving period and risk failing windowPoSt. 

After you have set up your windowPoSt workers you can manually trigger a windowPoSt with `lotus-miner proving compute window-post [deadline index]`. It will not send any messages to the chain.

{{< alert icon="tip" >}}
This should be scheduled outside of any proving deadlines. Check `lotus-miner proving info` to see when your next proving period starts.
{{< /alert >}}