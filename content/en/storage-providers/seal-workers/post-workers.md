---
title: "PoSt workers"
description: "PoSt workers are specialized instances of a lotus-worker. It enables you to offload windowPoSt and winningPoSt to separate workers."
lead: "PoSt workers are specialized instances of a lotus-worker. It enables you to offload windowPoSt and winningPoSt to separate workers."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-seal-workers"
weight: 410
toc: true
---

While the Lotus Miner runs windowPoSt and winningPoSt by default, you can use specialized `lotus workers` to create a cluster of windowPoSt and winningPoSt workers that can handle multiple Proof-of-Spacetime partitions simultaneously.

A lotus worker instance can only be one of the following:

- WindowPoSt worker
- WinningPoSt worker
- Worker for sealing tasks

## Launching PoSt workers

Before launching your PoSt worker, you need to ensure that your worker meets the minimal requirements for the job it will perform. You should also consider how the PoSt workers can access the sealed sectors and set the correct environment variables before running the workers.

### Minimal requirements

These are the minimal requirements for running each of the PoSt tasks:

| Task | GPU | VRAM | RAM |
| ---- | --- | ---- | --- |
| winningPoSt | Highly recommended |  6 GiB*   |  64 GiB* |
| windowPoSt  | Highly recommended | 8.5 GiB  | 128 GiB  |

*These are conservative numbers. We are currently exploring the lower boundaries for winningPoSt.

{{< alert icon="callout" >}}
Although both tasks can be run with a powerful CPU, using a GPU for these tasks drastically speeds up the process.
{{< /alert >}}

### Remote storage access

The windowPoSt process requires reading random leaves of all the sealed sectors in a proving deadline. When setting up windowPoSt workers, one needs to consider how the workers can access those files. The PoSt workers can ask any other worker to read challenges for them, including the `lotus-miner` process, but it will prefer reading it from local paths.

{{< alert icon="warning" >}}
Storage providers should design their worker sectors' access according to their setup size and also redundancy required. If only one worker has read access to the sealed sectors, it can create a single point of failure. If you have multiple partitions in a deadline, having multiple PoSt workers requesting a single worker to read challenges may cause an unwanted I/O load.
{{< /alert >}}

### Environment variables

Remember to install [CUDA]({{< relref "../../tutorials/lotus-miner/cuda" >}}) on your PoSt-worker. If you want to use OpenCL instead, [check out this article]({{< relref "../../kb/using-opencl/" >}}). 

The following environment variables are required to be set before starting the worker:

```shell
export MINER_API_INFO=<TOKEN>:/ip4/<miner_api_address>/tcp/<port>/http
export RUST_GPU_TOOLS_CUSTOM_GPU="MODEL-NAME:CORES" # If you're using a custom GPU
export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
```

When the PoSt worker starts, it needs to read and verify the Filecoin proof parameters. We recommend copying them over from your `lotus-miner` machine. Otherwise, they will be downloaded locally on first run.

The PoSt workers will fail to start if the file descriptor limit is not set high enough. You can raise this limit temporarily before starting the worker by running the command `ulimit -n 1048576`. Although, we recommend setting it permanently by following the [Permanently Setting Your ULIMIT System Value]({{< relref "kb#soft-fd-limit" >}}) guide.

{{< alert icon="tip" >}}
When fetching parameter files, remember to set the [`IPFS_GATEWAY` variable when running from China]({{< relref "../../kb/nodes-in-china/" >}})
{{< /alert >}}

### Run the PoSt worker

Use the `run` command to start the worker:

```shell
lotus-worker run <flags>
```

You'll need to specify which PoSt operation you want the worker to perform with one of the following flags set to true:

```shell
--winningpost              enable winning post (default: false)
--windowpost               enable window post (default: false)

--no-local-storage         don't use repo for sector storage (default: false)

## local storage is not needed to perform PoSt tasks.
```

A PoSt worker instance can only be either a winningPoSt worker, or a windowPoSt worker. Enabling a PoSt tasks will automatically disable all other tasks.

When a winningPoSt or windowPoSt worker connects to the `lotus-miner`, it will delegate all winningPoSt or windowPoSt tasks to that worker. If both tasks are delegated to separate PoSt workers, the `lotus-miner` will execute no PoSt tasks locally on the miner instance. If a worker is stopped, the `lotus-miner` instance automatically switches back to local PoSt.

You can verify that PoSt workers are connected to the `lotus-miner` with `lotus-miner proving workers`:

```shell
lotus-miner proving workers
> Worker 0, host windowPoSt
>         CPU:  [                                                                ] 0/48 core(s) in use
>         RAM:  [|                                                               ] 1% 4.005 GiB/119.2 GiB
>         VMEM: [|                                                               ] 1% 4.005 GiB/119.2 GiB
>         GPU:  [                                                                ] 0% 0.00/1 gpu(s) in use
>         GPU: GeForce RTX 2080 Ti, not used
> 
> Worker 1, host winningPoSt
>         CPU:  [                                                                ] 0/16 core(s) in use
>         RAM:  [|                                                               ] 1% 4.005 GiB/119.2 GiB
>         VMEM: [|                                                               ] 1% 4.005 GiB/119.2 GiB
>         GPU:  [                                                                ] 0% 0.00/1 gpu(s) in use
>         GPU: GeForce RTX 2080 Ti, not used
```

You can also verify that PoSt workers are connected in the workers section of `lotus-miner info`.

```shell
lotus-miner info

> Workers:
> 
>     Seal: 15
>     WdPoSt: 4
>     WinPoSt: 3
```

### Stop the PoSt worker

Use the `stop` command to stop the worker:

```shell
lotus-worker stop
```

## Multiple partitions

If you have multiple partitions in a single proving deadline and multiple windowPoSt workers, each partition will run on separate workers in parallel, up to the number of partitions.

Consider this proving deadline with four full partitions:

```shell
lotus-miner proving deadlines
Miner: f011235
deadline  partitions  sectors (faults)  proven partitions
0         4           9396 (0)          0
```

If the storage provider has four windowPoSt workers connected, the `lotus-miner` will compute each of the partitions on each of the workers in parallel. If one windowPoSt worker gets disconnected, leaving you with only three windowPoSt workers, the first three partitions will be computed in parallel. The first windowPoSt worker will pick up the last partition to finish its computation.

Depending on the scale of your operation it may be necessary to fine-tune the proving processes of your storage provider. This is particularly true in the case of `DeclareFaultsRecovered` messages across multiple partitions. This is done in the `Proving` section of the Lotus Miner's `config.toml`: 

```toml
  # Extract taken from version 1.17.1

[Proving]
  # Maximum number of sector checks to run in parallel. (0 = unlimited)
  # 
  # WARNING: Setting this value too high may make the node crash by running out of stack
  # WARNING: Setting this value too low may make sector challenge reading much slower, resulting in failed PoSt due
  # to late submission.
  # 
  # After changing this option, confirm that the new value works in your setup by invoking
  # 'lotus-miner proving compute window-post 0'
  #
  # type: int
  # env var: LOTUS_PROVING_PARALLELCHECKLIMIT
  #ParallelCheckLimit = 128

  # Maximum number of partitions to prove in a single SubmitWindowPoSt message. 0 = network limit (10 in nv16)
  # 
  # A single partition may contain up to 2349 32GiB sectors, or 2300 64GiB sectors.
  # 
  # The maximum number of sectors which can be proven in a single PoSt message is 25000 in network version 16, which
  # means that a single message can prove at most 10 partinions
  # 
  # In some cases when submitting PoSt messages which are recovering sectors, the default network limit may still be
  # too high to fit in the block gas limit; In those cases it may be necessary to set this value to something lower
  # than 10; Note that setting this value lower may result in less efficient gas use - more messages will be sent,
  # to prove each deadline, resulting in more total gas use (but each message will have lower gas limit)
  # 
  # Setting this value above the network limit has no effect
  #
  # type: int
  # env var: LOTUS_PROVING_MAXPARTITIONSPERPOSTMESSAGE
  #MaxPartitionsPerPoStMessage = 0

  # In some cases when submitting DeclareFaultsRecovered messages,
  # there may be too many recoveries to fit in a BlockGasLimit.
  # In those cases it may be necessary to set this value to something low (eg 1);
  # Note that setting this value lower may result in less efficient gas use - more messages will be sent than needed,
  # resulting in more total gas use (but each message will have lower gas limit)
  #
  # type: int
  # env var: LOTUS_PROVING_MAXPARTITIONSPERRECOVERYMESSAGE
  #MaxPartitionsPerRecoveryMessage = 0
```
Version 1.17.1 also introduces the `LOTUS_RECOVERING_SECTOR_LIMIT` environment variable which allows you to limit the number of sectors declared in each `DeclareFaultsRecovered` message.

```shell
LOTUS_RECOVERING_SECTOR_LIMIT=<number-of-sectors>
```

### Testing the setup

When making changes to your PoSt setup it is useful to verify that the changes works as intended without testing it on a real proving period and risk failing windowPoSt.

After you have set up your windowPoSt workers you can manually trigger a windowPoSt with `lotus-miner proving compute window-post [deadline index]`. It will not send any messages to the chain.

{{< alert icon="tip" >}}
This should be scheduled outside of any proving deadlines. Check `lotus-miner proving info` to see when your next proving period starts.
{{< /alert >}}
