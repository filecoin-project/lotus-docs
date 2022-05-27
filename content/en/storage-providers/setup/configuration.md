---
title: "Configuration"
description: "This guide covers configurations that are needed after initializing your storage provider."
lead: "This guide covers configurations that are needed after initializing your storage provider. It also highlights some optional configurations you might want to consider."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-setup"
        identifier: "storage-providers-setup-configuration"
aliases:
    - /docs/storage-providers/config/
    - storage-providers/configure/configuration/
weight: 215
toc: true
---

{{< alert >}}
For any configuration in the config.toml file to take effect, the storage provider must be [restarted]({{< relref "../../storage-providers/operate/maintenance/" >}}).
{{< /alert >}}

## Required configurations

Since we initialized the storage provider with the `--no-local-storage` in the [initialize]({{< relref "../../storage-providers/setup/initialize/" >}} page, we need to specify the disk locations for long-term storage and sealing (fast SSDs recommended).

The `lotus-miner` keeps track of defined storage locations in `~/.lotusminer/storage.json` (or `$LOTUS_MINER_PATH/storage.json`) and uses `~/.lotusminer` path as default.

Upon initialization of a storage location, a `<path-to-storage>/sectorstorage.json` file is created that contains the UUID assigned to this location, along with whether it can be used for sealing or storing.

### Adding sealing storage location

Before adding your sealing storage location you will need to consider where the sealing tasks are going to be performed. While the `lotus-miner` can run all of the sealing phases, and is configured to do so by defualt, using [seal workers]({{< relref "../../storage-providers/seal-workers/seal-workers/" >}} to offload computational heavy sealing tasks to separate machines or processes is recommended. Depending on how you architecture your system you will either need to add the sealing location to the `lotus-worker`, the `lotus-miner` or both depending on where you want the sealing tasks to be performed.

Under the storage-section in your `~/.lotusminer/config.toml` or `$LOTUS_MINER_PATH/config.toml` file, you can configure which sealing process you would like your `lotus-miner` to perform. If you want to fully delegate any of these operations to workers, set them to false.

```toml
[Storage]
  AllowAddPiece = true
  AllowPreCommit1 = true
  AllowPreCommit2 = true
  AllowCommit = true
  AllowUnseal = true
  AllowReplicaUpdate = true
  AllowProveReplicaUpdate2 = true
```

If you want some or all of the sealing tasks to be perfomed on the `lotus-miner` you will need to add a **custom sealing location** for the tasks. The _seal_ storage location should be a really fast storage medium so that the disk does not become the bottleneck that delays the sealing process. It can be specified with:

```sh
lotus-miner storage attach --init --seal <PATH_FOR_SEALING_STORAGE>
```

If you want to offload all the sealing tasks to `lotus-workers` you only need to add the sealing location on the workers and not on the `lotus-miner`. To setup seal workers follow the [seal worker]({{< relref "../../storage-providers/seal-workers/seal-workers/" >}} guide.

### Adding long-term storage location

**Custom location for storing:** After the _sealing_ process is completed, sealed sectors are moved to the _store_ location, which can be specified as follow:

```sh
lotus-miner storage attach --init --store <PATH_FOR_LONG_TERM_STORAGE>
```

This location can be made of large capacity, albeit slower, spinning-disks.

## Optional configurations

These prerequisites are optional and can be used on a case by case basis. Please make sure to understand the use case before performing these steps.

### Using OpenCL instead of CUDA

This step is only necessary if you are running an Nvidia GPU and would prefer to use OpenCL instead of CUDA. Please note that Cuda is recommended over OpenCL for sealing and proving workload. Most Linux distributions contain this package in their package manager:

```shell
sudo apt update -y && sudo apt install -y nvidia-opencl-icd -y
```

If you want to use OpenCL you do not need to compile FFI to use CUDA, so you can discard the `FFI_USE_CUDA` environment variable.

### Sealing performance

It is recommended to set the following environment variables in the environment so that they are defined every time any of the lotus daemons are launched:

```shell
 # See https://github.com/filecoin-project/rust-fil-proofs/
 export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # precommit2 GPU acceleration
 export FIL_PROOFS_USE_GPU_TREE_BUILDER=1

 # The following increases speed of PreCommit1 at the cost of using a full
 # CPU Core-Complex rather than a single core. Should be used with CPU affinities set!
 # See https://github.com/filecoin-project/rust-fil-proofs/ and the seal workers guide.
 export FIL_PROOFS_USE_MULTICORE_SDR=1
 ```

 Depending on your GPU, you might want to experiment with the optional `BELLMAN_CPU_UTILIZATION` variable to designate a proportion of the multi-exponentiation calculation to be moved to a CPU in parallel with the GPU. But omitting this environment variable is probably optimal if you have a newer GPU card.

 ```shell
 # See https://github.com/filecoin-project/bellman
 export BELLMAN_CPU_UTILIZATION=0.875
 ```

The interval must be a number between `0` and `1`. The value `0.875` is a good starting point, but you should experiment with it if you want an optimal setting.


## Configuration file

The `lotus-miner` configuration file is created after the [initialization step]({{< relref "../../storage-providers/setup/initialize/" >}}), and is placed in `~/.lotusminer/config.toml` or `$LOTUS_MINER_PATH/config.toml` when defined.

You can see your versions default configuration file with the `lotus-miner config default` command. Its recommended to get familiar with the different sections and read through the comments in the file. In the `Operate` and `Advanced configurations` sections we will discuss some of these items more in-depth.

The _configuration file_ has all the items commented. To customize one of the items, you must remove the leading `#`.

### API section

The API section controls the settings of the `lotus-miner` API:

{{< details "API section" >}}
```toml
[API]
  # Binding address for the Lotus API
  #
  # type: string
  # env var: LOTUS_API_LISTENADDRESS
  #ListenAddress = "/ip4/127.0.0.1/tcp/2345/http"

  # type: string
  # env var: LOTUS_API_REMOTELISTENADDRESS
  #RemoteListenAddress = "127.0.0.1:2345"

  # type: Duration
  # env var: LOTUS_API_TIMEOUT
  #Timeout = "30s"
```
{{< /details >}}

As you see, the listen address is bound to the local loopback interface by default. To open access to the miner API for other machines, set this to the IP address of the network interface you want to use. You can also set it to `0.0.0.0` to allow all interfaces. API access is protected by JWT tokens, but it should not be open to the internet.

Configure `RemoteListenAddress` to the value that a different node would have to use to reach this API. Usually, it is the miner's IP address and API port, but depending on your setup (proxies, public IPs, etc.), it might be a different IP.

### Subsystem section

This section allows you to disable subsystems of the `lotus-miner`.

{{< details "Subsystem section" >}}
```toml
[Subsystems]
  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLEMINING
  #EnableMining = true

  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLESEALING
  #EnableSealing = true

  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLESECTORSTORAGE
  #EnableSectorStorage = true

  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLEMARKETS
  #EnableMarkets = true

  # type: string
  # env var: LOTUS_SUBSYSTEMS_SEALERAPIINFO
  #SealerApiInfo = ""

  # type: string
  # env var: LOTUS_SUBSYSTEMS_SECTORINDEXAPIINFO
  #SectorIndexApiInfo = ""
```
{{< /details >}}

### Addresses section

The addresses section allows users to specify additional addresses to send messages from. This helps mitigate head-of-line blocking for important messages when network fees are high. For more details see the [Addresses]({{< relref "../../storage-providers/operate/addresses/" >}}) section.

{{< details "Addresses section" >}}
```toml
[Addresses]
  # Addresses to send PreCommit messages from
  PreCommitControl = []
  # Addresses to send Commit messages from
  CommitControl = []
  # Addresses to send Terminate Sector messages from
  TerminateControl = []
  # Addresses to send PublishStorageDeals from
  DealPublishControl = []
  # Disable the use of the owner address for messages which are sent automatically.
  # This is useful when the owner address is an offline/hardware key
  DisableOwnerFallback = false
  # Disable the use of the worker address for messages for which it's possible to use other control addresses
  DisableWorkerFallback = false
```
{{< /details >}}

## Next steps

- Configure a [separate address for WindowPost messages]({{< relref "../../storage-providers/operate/addresses/" >}}).
- Test your sealing pipeline by [running a benchmark]({{< relref "../../storage-providers/operate/benchmarks/" >}}) or by [pledging a sector]({{< relref "../../storage-providers/operate/sector-pledging/" >}}).
- Learn when to safely [shut down/restart your miner]({{< relref "../../storage-providers/operate/maintenance/" >}})
- Consider [splitting markets and miners processes]({{< relref "../../storage-providers/advanced-configurations/split-markets-miners/" >}}) for increased stability.