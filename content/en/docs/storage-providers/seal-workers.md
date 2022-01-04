---
title: "Seal workers"
description: "The Lotus Worker is a separate application that can be used to offload phases of the sealing process to separate machines or processes. This guide explains how to setup one or several Lotus Workers."
lead: "The Lotus Worker is a separate application that can be used to offload phases of the sealing process to separate machines or processes. This guide explains how to setup one or several Lotus Workers."
draft: false
menu:
    docs:
        parent: "storage-providers"
weight: 480
toc: true
---

While the Lotus Miner runs each of the sealing phases itself by default, you can use Lotus Workers to create a _sealing pipeline_ to improve resource utilization. The sealing pipeline frees up the Lotus Miner from CPU-intensive tasks to focus on performing and submitting _WindowPoSTs_ and _WinningPoSTs_ to the chain.

## Resource allocation in Lotus Workers

Each **Lotus Worker** can run multiple tasks, depending on your hardware resources. Each slot is called a _window_. The final number is determined by the number of available cores and the requirements of the sealing phase allocated to it. That means that a single worker on a 8-core CPU with a single GPU will run at most:

- Number of CPU threads the task will use.
- Minimum amount of RAM required for good performance.
- Maximum amount of RAM required to run the task, where the system can swap out part of the RAM to disk, and the performance won't be affected too much.
- Whether the system can use a GPU.

### Task resource table

The default resource table lives in [resources.go](https://github.com/filecoin-project/lotus/blob/master/extern/sector-storage/storiface/resources.go) and can be edited to tune the scheduled behavior to fit specific sealing clusters better.

Default resource value table. Some of these values are _fairly_ conservative:

| Sector size | Task Type  | Threads | Min RAM | Min disk space| GPU        |
|-------------|------------|---------|---------|------------|------------|
|     32G     | AddPiece   | 1*      | 4G      | 4G         |            |
|             | PreCommit1 | 1**     | 56G     | 64G        |            |
|             | PreCommit2 | 92%***  | 15G     | 15G        | If Present |
|             | Commit1    | 0****   | 1G      | 1G         |            |
|             | Commit2    | 92%***  | 32G+30G | 32G+150G   | If Present |
|     64G     | AddPiece   | 1*      | 8G      | 8G         |            |
|             | PreCommit1 | 1**     | 112G    | 128G       |            |
|             | PreCommit2 | 92%***  | 30G     | 30G        | If Present |
|             | Commit1    | 0****   | 1G      | 1G         |            |
|             | Commit2    | 92%***  | 64G+60G | 64G+190G   | If Present |

\* AddPiece can use multiple threads, it's likely that this value will change in near future\
** When used with the `FIL_PROOFS_USE_MULTICORE_SDR=1` env var, PreCommit1 can use multiple cores (up to the number of cores sharing L3 caches)\
*** Depending on the number of available threads, this value means:

```
 12  * 0.92 = 11
 16  * 0.92 = 14
 24  * 0.92 = 22
 32  * 0.92 = 29
 64  * 0.92 = 58
 128 * 0.92 = 117
```

**** The Commit1 step is very cheap in terms of CPU time and blocks the Commit2 step. Allocating it to zero threads makes it more likely it will be scheduled with higher priority.

The Unseal task has the same resource use as the PreCommit1 task.

### Resource windows

The scheduler uses the concept of resource windows to prevent resource starvation of tasks requiring larger amounts of resources by tasks with smaller resource requirements.

A resource window is simply a bucket of sealing tasks that can be run by a given worker in parallel based on the resources the worker has available when no tasks are running.

In the scheduler, each worker has:
- Scheduling windows - Two resource windows used to assign tasks to execute from the global queue
- Preparing window - One resource window in which tasks are prepared to execute (for example, sector data is fetched if needed)
- Executing window - One resource window for currently executing tasks

When tasks arrive in the global scheduling queue, the scheduler will look for empty scheduling windows, and based on a number of factors, like whether the worker already has direct access to sector data, task types supported by the worker, whether the worker has disk space for sector data, task priority - tasks may be assigned to the scheduling window.

After a scheduling window is filled with a number of tasks, it's sent to the worker for processing. The worker will pull tasks out of the scheduling window and start preparing them in the preparing window. After the preparing step is done, the task will be executed in the executing window.

After the worker has fully processed a scheduling window, it's sent back to the global scheduler to get more sealing tasks.

### Task priorities

When the scheduler decides which tasks to run, it takes into account the priority of running a specific task.

There are two priority tiers - high priority, for tasks that are cheap to execute but block other actions, and normal priority for all other tasks. Default priorities are defined in the table below.

| Task Type    | Priority |
|--------------|----------|
| AddPiece     | 6        |
| PreCommit1   | 5        |
| PreCommit2   | 4        |
| Commit2      | 3        |
| Commit1      | 2        |
| Unseal       | 1        |
| Fetch        | -1       |
| ReadUnsealed | -1       |
| Finalize     | -2       |

- Lower number means higher priority.
- Negative number means the highest priority.

When comparing task priority:
- High priority tasks are considered first
- Sectors with deals are considered second (more deals add more priority)
- If the above is equal, tasks are selected based on priorities in the table
- If the above is equal, sectors with lower sector numbers are selected (this can optimize gas usage slightly when submitting messages to the chain)

## Installation

{{< alert icon="callout" >}}
During sealing, significant amounts of data are moved/copied across workers, so good network connectivity among them is a must.
{{< /alert >}}

The `lotus-worker` application should have been built and installed along with the others when following the [installation guide]({{< relref "../set-up/install" >}}). For simplicity, we recommend following the same procedure in the machines that will run the Lotus Workers (only the steps required to build the binaries).

## Setting up the Lotus Miner

The Lotus Miner needs to be ready to accept API connections from workers.

### Allow external connections to the miner API

Set `ListenAddress` and `RemoteListenAddress` to the IP of a local-network interface as [documented here]({{< relref "config#api-section" >}}). For security, the API port should not be open to the internet.

### Obtain an authentication token

```shell
lotus-miner auth api-info --perm admin
```

The Lotus Workers will need this token to connect to the Lotus Miner. For more info check the [API docs]({{< relref "../apis/json-rpc" >}}). Write down the output so that you can use it in the next step.

### Configuring the Lotus Miner sealing capabilities

The Lotus Miner is itself a worker and will contribute to sealing operations like any other worker. Depending on what phases of the sealing process you would like your workers to perform, you may choose to configure which ones the Lotus Miner will directly perform. This is done in the `Storage` section of the Lotus Miner's `config.toml`:

```toml
[Storage]
  AllowAddPiece = true
  AllowPreCommit1 = true
  AllowPreCommit2 = true
  AllowCommit = true
  AllowUnseal = true
```

If you want to fully delegate any of these operations to workers, set them to `false`.

## Launching Lotus workers

### Environment variables

Ensure that workers have access to the following environment variables when they run. These are similar to those used by the Miner daemon ([explained in the setup guide]({{< relref "setup" >}}):

```
# MINER_API_INFO as obtained before
export TMPDIR=/fast/disk/folder3                    # used when sealing
export MINER_API_INFO:<TOKEN>:/ip4/<miner_api_address>/tcp/<port>/http`
export MARKETS_API_INFO:<TOKEN>:/ip4/<miner_api_address>/tcp/<port>/http`
export BELLMAN_CPU_UTILIZATION=0.875      # optimal value depends on exact hardware
export FIL_PROOFS_MAXIMIZE_CACHING=1
export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # when GPU is available
export FIL_PROOFS_USE_GPU_TREE_BUILDER=1   # when GPU is available
export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
export FIL_PROOFS_PARENT_CACHE=/fast/disk/folder2   # > 50GiB!

# The following increases speed of PreCommit1 at the cost of using a full
# CPU core-complex rather than a single core.
# See https://github.com/filecoin-project/rust-fil-proofs/ and the
# "Worker co-location" section below.
export FIL_PROOFS_USE_MULTICORE_SDR=1
```

{{< alert icon="tip" >}}
When initially fetching parameter files, remember to set the [`IPFS_GATEWAY` variable when running from China]({{< relref "../set-up/nodes-in-china" >}})
{{< /alert >}}

### Run the worker

```shell
lotus-worker run <flags>
```

The above command will start the worker. Depending on the operations that you want the worker to perform and the hardware that it is running on, you will want to specify for which sealing phases the worker will make itself available:

```
   --addpiece                    enable addpiece (default: true)
   --precommit1                  enable precommit1 (32G sectors: 1 core, 128GiB RAM) (default: true)
   --unseal                      enable unsealing (32G sectors: 1 core, 128GiB RAM) (default: true)
   --precommit2                  enable precommit2 (32G sectors: multiple cores, 96GiB RAM) (default: true)
   --commit                      enable commit (32G sectors: multiple cores or GPUs, 128GiB RAM + 64GiB swap) (default: true)
```

Once the worker is running, it should connect to the Lotus miner. You can verify this with:

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

### Miner and worker co-location

You can run the _Lotus Worker_ on the same machine as the _Lotus Miner_. This can be helpful to manage priorities between processes or better allocate available CPUs for each task. To avoid conflicts, we recommend disabling all task types in the miner sealing config.

Additionally, be mindful of the local resources used by the sealing process (particularly CPU). WindowPoSTs are CPU intensive and need to be submitted by the miner regularly. If a miner is performing other CPU-bound sealing operations in parallel, it may fail to submit the WindowPoSTs in time, thus [losing collateral](https://docs.filecoin.io/mine/slashing/) in the process. For this reason, we recommend careful allocation of CPU cores available and sealing phases to Lotus Miners and Lotus Workers.

Note that if you co-locate miner and worker(s), you do not need to open up the miner API and it can stay listening on the local interface.

### Lotus Worker co-location

In most cases, only one Lotus Worker per machine should be running since `lotus-worker` will try to use all available resources. Running multiple Lotus Workers in one operating system context will cause issues with resource allocation, which will cause the scheduler to allocate more work than there are available resources.

The only case where running multiple workers per machine may be a good idea is when there are multiple GPUs available, as lotus currently only supports a single GPU - in that case, it's recommended to run workers in separate containers with non-overlapping resources (separate CPU cores, separate RAM allocations, separate GPUs)

#### Separating Nvidia GPUs

When using proprietary Nvidia drivers, it's possible to select which GPU device will be used by Lotus with the `NVIDIA_VISIBLE_DEVICES=[device number]` env var.

Device numbers can be obtained with the `nvidia-smi -L` command.

#### Sector Storage Groups

The sectorstore.json contains two additional optional fields to allow for creating worker groups and avoiding unnecessarily moving data between multi-purpose workers.

##### Use case

- This feature is useful when the Lotus storage path is not shared between workers.
- This feature can be used to group workers together if some, but not all, of them share a storage path (e.g. NFS). If all the workers share the same storage path, then this feature should not be used.
- This feature does not relate to long term storage path.

```
Groups []string - list of group names the storage path belongs to.
AllowTo []string - list of group names to which sectors can be fetched to from this storage path.
```

The option `AllowTo` defined which storage path the sector can be pulled from.
For example in the following setup:

```
Storage miner
Path with Groups: ["example-storage-group-1"]
Worker 1 (PC1, PC2):
Path with Groups: ["example-seal-group-1"], AllowTo: ["example-seal-group-1"]
Worker 2 (PC1, PC2):
Path with Groups: ["example-seal-group-2"], AllowTo: ["example-seal-group-2"]
Worker 3 (PC1):
Path with AllowTo: ["example-seal-group-1""]
```

Without storage groups, PC2 tasks on workers 1 or 2 could be scheduled with sector data from other workers, which would often waste bandwidth and occasionally block processing on fetching data.

With storage groups configured as above, sectors which had PC1 done on worker1 / worker2 will always execute PC2 on the same worker. Sectors from worker3 will only go to worker1 for PC2

Groups can be setup in two ways:

- For new storage paths, set with
``` 
lotus-miner storage attach --init --groups <["group-a", "group-b" ... ]>, --allow-to=<["group-a", "group-b" ... ]> or lotus-worker storage attach --init --groups <["group-a", "group-b" ... ]>, --allow-to <["group-a", "group-b" ... ]>
```
- For existing storage paths, modify [path]/sectorstore.json, then restarting lotus-miner/worker
```
{
 "ID": "74e1d667-7bc9-49bc-a9a6-0c30afd8684c",
 "Weight": 10,
 "CanSeal": false,
 "CanStore": true,
 "MaxStorage": 0,
 "Groups": ["group-a", "group-b"]
  "AllowTo": ["storage0"]
}
```
***Note: if --allow-to or AllowTo is not specified, all groups will be accessible.***
