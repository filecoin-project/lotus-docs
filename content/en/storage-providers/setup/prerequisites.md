---
title: "Prerequisites"
description: "This guide describes the necessary prerequisites before configuring a storage provider for production."
lead: "This guide describes the necessary prerequisites before configuring a storage provider for production."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-setup"
        identifier: "storage-providers-setup-prerequisites"
weight: 205
toc: true
---

Being a storage provider will only work if you fully comply with the [minimal hardware requirements]({{< relref "../../storage-providers/get-started/hardware-requirements/" >}}) for the network in which you will be a storage provider. The sealing process is very resource-intensive and is dependent on precise configuration. We strongly recommend Linux systems administration experience before embarking.

{{< alert icon="callout" >}}
Be warned: if you decide to skip any of the sections below, things will not work! Read and tread carefully.
{{< /alert >}}

Please make sure that the following prerequites are met whether you are planning to run the `lotus miner` on the same machine as the lotus daemon or a different machine.

1. Make sure your Lotus Node is running, as the storage provider will communicate with it and cannot work otherwise.
2. If you are in China, read the [tips for running in China]({{< relref "../../lotus/install/prerequisites#node-in-china" >}}) page first.
3. Make sure to [add swap]({{< relref "../../kb/add-swap" >}}) to the machine if needed.

### Install CUDA

1. Install the latest stable [Nvidia drivers and Cuda]({{< relref "../../tutorials/lotus-miner/cuda" >}}) if you have an Nvidia card on your machine. Nvidia cards have a better performance with Cuda when compared to OpenCL.
2. Make sure you have followed the instructions to [install the Lotus suite]({{< relref "../../lotus/install/prerequisites" >}}) to build the `lotus-miner` binary. Make sure that you have built Lotus with "Native Filecoin FFI" and exported the following variable to compile FFI to use Cuda if using Nvidia cards.

    ```shell
    export FFI_USE_CUDA=1
    ```

 Please do not use the `lotus-miner` binary created during Lotus node installation process as it does not include the above options.

### Configure parameters location

For the storage provider to start, it will need to read and verify the Filecoin proof parameters. The proof parameters consist of several files, which in the case of 32 GiB sectors, total **over 100 GiB**.

We recommend setting a custom location, on to store parameters and proofs parent cache -created during the first run- with:

```shell
export FIL_PROOFS_PARAMETER_CACHE=/path/to/folder/in/fast/disk
export FIL_PROOFS_PARENT_CACHE=/path/to/folder/in/fast/disk2
```

Parameters are read on every (re)start, so using disks with very fast access, like NVMe drives, will speed up `lotus-miner` and workers (re)boots. When the above variables are not set, things will end up in `/var/tmp/` by default.

To download the parameters:

```shell
# Use sectors supported by the Filecoin network that the storage provider will join and use.
# lotus-miner fetch-params <sector-size>
lotus-miner fetch-params 32GiB
lotus-miner fetch-params 64GiB
```

### Running the storage provider on a different machine as the Lotus Node

If you opt to run a the `lotus-miner` on a different machine then the Lotus Node, set:

```shell
export FULLNODE_API_INFO=<api_token>:/ip4/<lotus_daemon_ip>/tcp/<lotus_daemon_port>/http
```

Make sure the `ListenAddress` has [remote access enabled]({{< relref "../../developers/api-access#enable-remote-api-access" >}}). Instructions on how to obtain a token are [available here]({{< relref "../../developers/api-access/#obtaining-tokens" >}}).

### Creating wallets for the storage provider

You will need at least a BLS wallet (`f3...` for mainnet) to initialize. We recommend using [separate owner and worker addresses]({{< relref "../../storage-providers/operate/addresses/" >}}):

```shell
# A new BLS address to use as owner address:
lotus wallet new bls
f3...

# A new BLS address to use as worker address:
lotus wallet new bls
f3...
```

{{< alert icon="callout" >}}
Next make sure to [send some funds]({{< relref "../../lotus/manage/manage-fil/" >}}) to the **worker address** so that the storage provider setup can be completed. The amount you should initialize with varies with gas fees, but 0.1 FIL is generally a safe amount. The sender doesn't have to be any particular address and can be specified using the `from` flag. If `from` is unspecified, the sender will default to the `owner` address, in which case the `onwer` must have the 0.1 FIL. If the `owner` is also unspecified, the wallet's default address is used as the owner and that address must have the 0.1 FIL. 
{{< /alert >}}

For additional information about the different wallets that a storage provider can use and how to configure them, read the [addresses guide]({{< relref "../../storage-providers/operate/addresses/" >}}).

{{< alert icon="tip" >}}
Safely [backup your wallets]({{< relref "../../lotus/manage/manage-fil/#exporting-and-importing-addresses" >}})!
{{< /alert >}}

### Cuda variables

There are some changes in the latest Nvidia driver, so if you upgrade your driver remember to check `nvidia-smi` - it will always display the correct name for the GPU. The new names are not picked by FFI automatically and need to be exported manually.

If you are using an nvidia driver below `460.91.03`

```shell
export BELLMAN_CUSTOM_GPU="GeForce RTX 3090:10496"
```

If you are using an Nvidia driver above `510.47.03`

```shell
export BELLMAN_CUSTOM_GPU="NVIDIA GeForce RTX 3090:10496"
```

Nvidia RTX 3090 was used in this example. Remember to edit it with your GPU and amount of Cuda cores.