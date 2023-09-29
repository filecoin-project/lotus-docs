---
title: "Seal workers"
description: "The Lotus Worker is a separate application that can be used to offload phases of the sealing process to separate machines or processes. This guide explains how to setup one or several Lotus Workers."
lead: "The Lotus Worker is a separate application that can be used to offload phases of the sealing process to separate machines or processes. This guide explains how to setup one or more lotus workers."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-seal-workers"
aliases:
    - /docs/storage-providers/seal-workers/
weight: 405
toc: true
---

While the `lotus-miner` runs each of the sealing phases itself by default, you can use Lotus Workers to offload some phases from the _sealing pipeline_ to improve resource utilization and efficiency. The additional seal workers free the `lotus-miner` from CPU-intensive tasks to focus on performing and submitting _WindowPoSTs_ and _WinningPoSTs_ to the chain.

## Installation

{{< alert icon="callout" >}}
Depending on your lotus-worker setup, significant amounts of data might be moved/copied across workers, so good network connectivity among them is a must.
{{< /alert >}}

The `lotus-worker` application is built and installed along with the other Lotus binaries when following the installation guide. For simplicity, we recommend following the similar procedure as building `lotus-miner` application for building the `lotus-worker` application.

## Setting up the Lotus Miner

The Lotus Miner needs to be ready to accept API connections from workers.

### Allow external connections to the miner API

Set `ListenAddress` and `RemoteListenAddress` to the IP of a local-network interface as [documented here]({{< relref "../../storage-providers/setup/configuration/#api-section" >}}). For security, the API port should not be open to the internet.

### Obtain an authentication token

```shell
lotus-miner auth api-info --perm admin
```

The Lotus Workers need this token to connect to the Lotus Miner. For more info check the [API docs]({{< relref "../../reference/basics/api-access/#api-tokens" >}}). Write down the output so that you can use it in the next step.

### Configuring the Lotus Miner sealing capabilities

The Lotus Miner is itself a worker and contributes to sealing operations like any other worker. Depending on what phases of the sealing process you would like your workers to perform, you may choose to configure which ones the Lotus Miner will directly perform. This is done in the `Storage` section of the Lotus Miner's `config.toml`:

```toml
[Storage]
  AllowAddPiece = true
  AllowPreCommit1 = true
  AllowPreCommit2 = true
  AllowCommit = true
  AllowUnseal = true
  AllowReplicaUpdate = true
  AllowProveReplicaUpdate2 = true
  AllowRegenSectorKey = true
```

If you wish to fully delegate any of these operations to workers, set them to `false`.

## Launching Lotus workers

### Environment variables

Ensure that workers can access the following environment variables when they run. These are similar to those used by the Miner daemon ([explained in the setup guide]({{< relref "../../storage-providers/setup/initialize/" >}})):

The seal workers will fail to start if the file descriptor limit is not set high enough. This limit can be raised temporarily before starting the worker by running the command `ulimit -n 1048576`. Although, we recommend setting it permanently by following the [Permanently Setting Your ULIMIT System Value]({{< relref "../../kb/soft-fd-limit/" >}}) guide.

```
# MINER_API_INFO as obtained before
export MINER_API_INFO=<TOKEN>:/ip4/<miner_api_address>/tcp/<port>/http`
export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # when GPU is available
export FIL_PROOFS_USE_GPU_TREE_BUILDER=1   # when GPU is available
export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
export FIL_PROOFS_PARENT_CACHE=/fast/disk/folder2   # > 50GiB!
export LOTUS_WORKER_NAME="Your-Worker-Name" # if not set, defaults to hostname

# The following increases speed of PreCommit1 at the cost of using a full
# CPU core-complex rather than a single core.
# See https://github.com/filecoin-project/rust-fil-proofs/ and the
# "Worker co-location" section below.
export FIL_PROOFS_USE_MULTICORE_SDR=1
```

### Run the worker

```shell
lotus-worker run <flags>
```

The above command starts the worker. Depending on the operations that you want the worker to perform and the hardware that it is running on, you will want to specify for which sealing phases the worker will make itself available:

```
   --addpiece                    enable addpiece (default: true)
   --precommit1                  enable precommit1 (32G sectors: 1 core, 128GiB RAM) (default: true)
   --unseal                      enable unsealing (32G sectors: 1 core, 128GiB RAM) (default: true)
   --precommit2                  enable precommit2 (32G sectors: multiple cores, 96GiB RAM) (default: true)
   --commit                      enable commit (32G sectors: multiple cores or GPUs, 128GiB RAM + 64GiB swap) (default: true)
   --replica-update              enable replica update (default: true)
   --prove-replica-update2       enable prove replica update 2 (default: true)
   --regen-sector-key            enable regen sector key (default: true)
```

All tasks are enabled by default so if the seal worker is only going to run a small subset of these tasks it is recommended to add the `--no-default` option and individually enable each task that it is going to run.

Once the worker is running, it connects to the Lotus miner. You can verify this with:

```shell
$ lotus-miner sealing workers
Worker 0, host computer
        CPU:  [                                                                ] 0 core(s) in use
        RAM:  [||||||||||||||||||                                              ] 28% 18.1 GiB/62.7 GiB
        VMEM: [||||||||||||||||||                                              ] 28% 18.1 GiB/62.7 GiB
        GPU: GeForce RTX 2080, not used

Worker 1, host othercomputer
        CPU:  [                                                                ] 0 core(s) in use
        RAM:  [||||||||||||||                                                  ] 23% 14 GiB/62.7 GiB
        VMEM: [||||||||||||||                                                  ] 23% 14 GiB/62.7 GiB
        GPU: GeForce RTX 2080, not used
```
If you want to give the `lotus-worker` a custom name, you can specify it at runtime with the `--name` option, or by exporting the `LOTUS_WORKER_NAME=Your-Name` environment variable. 

### Sealing space location

Now that the `lotus-worker` is running you need to attach the sealing storage location to the worker. The sealing location should be located on a fast storage medium so that the disk does not become the bottleneck that delays the sealing process. It can be specified with:

```shell
lotus-worker storage attach --init --seal <PATH_FOR_SEALING_STORAGE>
```

### Limit tasks run in parallel

You can set a limit on the amount of tasks run in parallel per task type with environment variables. The environment variable are formatted as `[short task type]_[sector size]_MAX_CONCURRENT=[limit]`.

And the short task type codes are:

```
AddPiece: AP
PreCommit1: PC1
PreCommit2: PC2
Commit2:  C2
ReplicaUpdate:  RU
ProveReplicaUpdate2:  PRU2
Fetch:  GET
Unseal: UNS
```

As an example if you want to limit the amount of PreCommit 1 tasks a `lotus-worker` can run, you just export the `PC1_32G_MAX_CONCURRENT=4` environment variable before you start the worker.

You can then see the limits set in the sealing workers output:

```shell
lotus-miner sealing workers
Worker c4d65451-07f8-4230-98ad-4f33dea2a8cc, host myhostname
	TASK: PC1(1/4) AP(15/15) GET(3)
	CPU:  [||||||||                                                        ] 16/128 core(s) in use
	RAM:  [||||||||                                                        ] 12% 125.8 GiB/1008 GiB
	[...]
```

### Miner and worker co-location

You can run a _Lotus Worker_ on the same machine as the _Lotus Miner_. This can be helpful to manage priorities between processes or better allocate available CPUs for each task. The `lotus-miner` daemon performs worker tasks by default, so to avoid conflicts we recommend disabling all task types in the [miner config Storage section]({{< relref "configuration#storage-section" >}}).

Additionally, be mindful of the local resources used by the sealing process (particularly CPU). WindowPoSTs are CPU and GPU intensive. WindowPoSTs need to be submitted by the storage provider regularly. If a storage provider is performing other CPU-bound sealing operations in parallel, it may fail to submit the WindowPoSTs in time, and [lose collateral](https://docs.filecoin.io/mine/slashing/) in the process. For this reason, we recommend careful allocation of CPU cores and GPUs available between `lotus-miner` and `lotus-worker` instances.

Note that if you co-locate `lotus-miner` and worker(s), you do not need to open up the miner API and it can stay listening on the local interface.

### Lotus Worker co-location

In most cases, only one Lotus Worker per machine should be running since `lotus-worker` will try to use all available resources. Running multiple Lotus Workers in one operating system context will cause issues with resource allocation, which will cause the scheduler to allocate more work than there are available resources.

The only cases where running multiple workers per machine may be a good idea is when there are multiple GPUs, or a single high memory-capacity GPU, available.

It may still be beneficial to run workers in separate containers with non-overlapping resources (i.e., CPU, RAM, and GPU resources allocated exclusively to each worker) to fully utilize multiple GPUs. When using proprietary Nvidia drivers, it's possible to select which GPU device will be used by Lotus with the `NVIDIA_VISIBLE_DEVICES=<device number>` environment variable. Device numbers can be obtained with the `nvidia-smi -L` command.

Advanced GPUs with more than 20 GB of memory capacity are theoretically capable of running sealing tasks in parallel as long as the total memory requirement of all tasks does not exceed the GPU's capacity. Parallel GPU task allocation can be accomplished through co-location of Lotus Workers on a single machine. In all cases, worker co-location should be undertaken with careful attention to avoid resource over-allocation.

## Gracefully stopping a worker

In a sealing pipeline there are often multiple lotus-workers, and gracefully shutting them down is important to not cause disruptions in the pipeline. Storage providers often have a lot incoming sealing tasks in the pipeline, but want/need to shut down worker nr.XX for maintenance/upgrade. We recommend following these steps:

1. Disable all sealing tasks on the lotus-worker:

```shell
lotus-worker tasks disable --all
```

This will allow the worker to finish up its current tasks, and hand off the finilized sectors to your storage paths.

2. After every sealing task on a given worker is done, you can use the `stop` command to detach the worker:

```shell
lotus-worker stop
```

## Running Multiple Lotus Workers

Storage providers intending to scale significantly beyond the 10 TB minimum may wish to run multiple Lotus workers, each on a dedicated machine. Multi-worker environments benefit from additional configuration. Each case has unique requirements and considerations, and this document can provide only a very brief overview of some options.

### Sector Storage Groups

The `sectorstore.json` file in each storage location contains two additional fields that allow creating worker groups to avoid unnecessarily moving data between multi-purpose workers. These fields are not mandatory.

```
Groups []string - list of group names the storage path belongs to.
AllowTo []string - list of group names to which sectors can be fetched to from this storage path.
```
 The `Groups` field identifies the storage path as one that accepts incoming PC1 sectors for PC2 processing. `AllowTo` determines which storage path(s) a sector may be moved to for PC2. **If `AllowTo` is not specified, the store will be accessible to all groups.**
 
- This feature is useful when sealing storage paths are not shared among workers.
- This feature can be used to group workers together if some, but not all, of them share a storage path (e.g., NFS). If all workers share the same storage path, then this feature should not be used.
- This feature does not relate to the long term storage path.

#### Use case

Consider a setup with three workers: 

- Worker 1 (PC1, PC2)
- Worker 2 (PC1, PC2)
- Worker 3 (PC1). 

Without storage groups, PC2 tasks on Workers 1 or 2 can be scheduled with sector data from any of the three workers. For example, if Worker 1 finished a PC1 job but did not yet have an available PC2 window, the large volume of data generated in PC1 might be needlessly moved to Worker 2 for PC2. This wastes bandwidth and may cause data fetching to block data processing. The following `sectorstore.json` files have been configured to avoid such unnecessary file transfers.

- Worker 1 (PC1, PC2):
    ```json
    {
      "ID": "2546c5be-10f0-aa96-906b-24434a6c94a0",
      "Weight": 10,
      "CanSeal": true,
      "CanStore": false,
      "MaxStorage": 0,
      "Groups": ["example-seal-group-1"],
      "AllowTo": ["example-seal-group-1"]
    }
    ```

- Worker 2 (PC1, PC2):
    ```json
    {        
      "ID": "b5db38b9-2d2e-06eb-8367-7338e1bcd0f1",
     "Weight": 10,
      "CanSeal": true,
      "CanStore": false,
      "MaxStorage": 0,
      "Groups": ["example-seal-group-2"],
      "AllowTo": ["example-seal-group-2"]
    }
    ```

- Worker 3 (PC1):
    ```json
    {        
      "ID": "423e45b7-e8e6-64b5-9a62-eb45929d9562", 
      "Weight": 10,
      "CanSeal": true,
      "CanStore": false,
      "MaxStorage": 0,
      "Groups": null,
      "AllowTo": ["example-seal-group-1"]
    }
    ```

Worker 1 and Worker 2 have been assigned unique `Groups` values, and each worker's `AllowTo` matches its respective `Groups`. This ensures PC1 and PC2 for any given sector always execute on the same worker. 

Setting `AllowTo` on Worker 3 to Worker 1's `Groups` value implies sectors from Worker 3 will only go to Worker 1 for PC2.

#### Implementation

To establish storage groups when initializing new storage paths: 

```shell
lotus-miner storage attach --init --seal [--groups <group-a>] [--groups <group-b>] [--allow-to <group-a>] [--allow-to <group-b>] /path/to/storage
# or 
lotus-worker storage attach --init --seal [--groups <group-a>] [--groups <group-b>] [--allow-to <group-a>] [--allow-to <group-b>] /path/to/storage
```

For existing storage paths, add these lines to `sectorstore.json` in each sealing storage location, then restart `lotus-worker`. (The storage locations used by a worker can be found in `LOTUS_WORKER_PATH/storage.json`.)

```json
{
 "ID": "74e1d667-7bc9-49bc-a9a6-0c30afd8684c",
 "Weight": 10,
 "CanSeal": false,
 "CanStore": true,
 "MaxStorage": 0,
 "Groups": ["group-a", "group-b"],
 "AllowTo": ["storage0"]
}
```
