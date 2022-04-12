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

{{< alert icon="callout" >}}
This feature is supported since lotus v1.15.2.
{{< /alert >}}

While the Lotus Miner runs _windowPoSt_ and _winningPoSt_ by default, you can use specialized lotus workers to create a cluster of windowPoSt and winningPoSt workers to handle multiple Proof-of-Spacetime partitions simultaneously.

A lotus worker instance can only be one of the following:
- WindowPoSt worker
- WinningPoSt worker
- Worker for sealing tasks

## Launching PoSt workers

Before launching your PoSt worker you need to ensure that your worker meets the minimal requirements for the job it is going to perfom. You should also consider how the PoSt workers can access the sealed sectors and setting the correct enviroment variables before you run the workers.

### Minminal spec requirements

These are the minimal requirements for running each of the PoSt tasks:

| **Task**    | **GPU**            | **VRAM** | **RAM** |
|:-----------:|:------------------:|:--------:|:-------:|
| winningPoSt | Highly recommended |  6GiB*   |  64GiB* |
| windowPoSt  | Highly recommended | 8\.5GiB  | 128GiB  |

*These are conservative numbers and we are currently exploring the lower boundaries for winningPoSt.

{{< alert icon="callout" >}}
Although both tasks can be run with a powerful CPU, it is highly recommended to run on GPU as it speeds up the process significantly, therefore reducing the chance to miss windowPoSt or winningPoSt
{{< /alert >}}

### Remote storage access

The windowPoSt process requires reading random leafs of all the sealed sectors in a proving deadline. When setting up windowPoSt workers one needs to consider how the workers can access those files. The PoSt workers can ask any other worker to read challenges for them, including the lotus-miner process, but it will prefer reading it from local paths.

{{< alert icon="warning" >}}
Storage providers should design their worker sectors access according to their setup size and also redundancy required. If only one worker has read access to the sealed sectors, it can create a single point of failure. If you have multiple partitions in a deadline, having multiple PoSt workers requesting a single worker to read challenges for them may cause unwanted I/O load.
{{< /alert >}}

### Environment variables

Remember to have the appropriate Nvidia-drivers and nvidia-opencl-icd installed if running OpenCL on your worker. If using CUDA, install the CUDA-toolkit and build lotus binaries with `FFI_USE_CUDA=1`

The following environment variables are required to be set before starting the worker.

```
export MINER_API_INFO:<TOKEN>:/ip4/<miner_api_address>/tcp/<port>/http
export BELLMAN_CUSTOM_GPU="MODEL-NAME:CORES" # If you´re using a custom GPU
export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
```

When the PoSt worker starts, it needs to read and verify the Filecoin proof parameters. We recommend copying them over from your lotus-miner machine. Otherwise, they will be downloaded locally on first run.

The PoSt workers will fail to start if the file descriptor limit is not set high enough. This limit can be raised temporarily before starting the worker by running the command `ulimit -n 1048576`. Although, we recommend setting it permanently by following the [Permanently Setting Your ULIMIT System Value]({{< relref "kb#soft-fd-limit" >}}) guide.

{{< alert icon="tip" >}}
When fetching parameter files, remember to set the [`IPFS_GATEWAY` variable when running from China]({{< relref "nodes-in-china" >}})
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

A PoSt worker instance can only be either a winningPoSt worker, or a windowPoSt worker. Enabling a PoSt tasks will automatically disable all other tasks.

When a winningPoSt or windowPoSt worker connects to the _lotus-miner_, the lotus miner will delegate all winningPoSt or windowPoSt tasks to that worker. If both tasks are delegated to seperate PoSt workers, no PoSt tasks will be executed locally on the miner instance. If a worker is stopped, the lotus-miner instance switches back to local PoSt automatically.

You can verify that PoSt workers are connected to the lotus-miner with `lotus-miner proving workers`:

```shell
$ lotus-miner proving workers
Worker 0, host windowPoSt
        CPU:  [                                                                ] 0/48 core(s) in use
        RAM:  [|                                                               ] 1% 4.005 GiB/119.2 GiB
        VMEM: [|                                                               ] 1% 4.005 GiB/119.2 GiB
        GPU:  [                                                                ] 0% 0.00/1 gpu(s) in use
        GPU: GeForce RTX 2080 Ti, not used

Worker 1, host winningPoSt
        CPU:  [                                                                ] 0/16 core(s) in use
        RAM:  [|                                                               ] 1% 4.005 GiB/119.2 GiB
        VMEM: [|                                                               ] 1% 4.005 GiB/119.2 GiB
        GPU:  [                                                                ] 0% 0.00/1 gpu(s) in use
        GPU: GeForce RTX 2080 Ti, not used
```

You can also verify that PoSt workers are connected in the workers-section of `lotus-miner info`.

```shell
$ lotus-miner info
Workers:
	Seal: 15
	WdPoSt: 4
	WinPoSt: 3
```

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

When making changes to your PoSt setup it is useful to verify that the changes works as intended without testing it on a real proving period and risk failing windowPoSt. 

After you have set up your windowPoSt workers you can manually trigger a windowPoSt with `lotus-miner proving compute window-post [deadline index]`. It will not send any messages to the chain.

{{< alert icon="tip" >}}
This should be scheduled outside of any proving deadlines. Check `lotus-miner proving info` to see when your next proving period starts.
{{< /alert >}}
