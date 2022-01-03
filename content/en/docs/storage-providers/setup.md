---
title: "Setup"
description: "This guide describes the necessary steps to configure a Lotus miner for production."
lead: "This guide describes the necessary steps to configure a Lotus miner for production."
draft: false
menu:
    docs:
        parent: "storage-providers"
weight: 490
toc: true
---

Mining will only work if you fully cover the [minimal hardware requirements]({{< relref "hardware-requirements" >}}) for the network in which you will mine. As the mining process is very demanding for the machines on several aspects and relies on precise configuration, we strongly recommend Linux systems administration experience before embarking.

## Pre-requisites

Before attempting to follow this guide:

- Make sure you meet the [minimal hardware requirements]({{< relref "hardware-requirements" >}}).
- Make sure you have followed the instructions to [install the Lotus suite]({{< relref "../set-up/install" >}}) and make sure you have built Lotus with ["Native Filecoin FFI"]({{< relref "../set-up/install#native-filecoin-ffi" >}}). Once the installation is complete, `lotus`, `lotus-miner` and `lotus-worker` will be installed.
- Make sure your Lotus Node is running as the miner will communicate with it and cannot work otherwise.
- If you are in China, read the [tips for running in China]({{< relref "../set-up/nodes-in-china" >}}) page first.

{{< alert icon="callout" >}}
Be warned: if you decide to skip any of the sections below, things will not work! Read and tread carefully.
{{< /alert >}}

## Before starting the miner

Follow these sections through _before_ attempting to start the miner. Running `lotus-miner` prematurely will cause errors.

### Install extra dependencies

If you are running an Nvidia GPU, install `nvidia-opencl-icd`. Most Linux distributions contain this package in their package manager:

```shell
sudo apt update -y && sudo apt install -y nvidia-opencl-icd -y
```

### Performance tweaks

It is recommended to set the following environment variables in your environment so that they are defined **every time any of the Lotus applications is launched** (meaning, when the daemons are started):

```sh
# See https://github.com/filecoin-project/bellman
export BELLMAN_CPU_UTILIZATION=0.875
```

The `BELLMAN_CPU_UTILIZATION` is an optional variable to designate a proportion of the multi-exponentiation calculation to be moved to a CPU in parallel to the GPU. This is an effort to keep all the hardware occupied. The interval must be a number between `0` and `1`. The value `0.875` is a good starting point, but you should experiment with it if you want an optimal setting. Different hardware setups will result in different values being optimal. Omitting this environment variable might also be optimal.

```sh
# See https://github.com/filecoin-project/rust-fil-proofs/
export FIL_PROOFS_MAXIMIZE_CACHING=1 # More speed at RAM cost (1x sector-size of RAM - 32 GB).
export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # precommit2 GPU acceleration
export FIL_PROOFS_USE_GPU_TREE_BUILDER=1

# The following increases speed of PreCommit1 at the cost of using a full
# CPU Core-Complex rather than a single core. Should be used with CPU affinities set!
# See https://github.com/filecoin-project/rust-fil-proofs/ and the seal workers guide.
export FIL_PROOFS_USE_MULTICORE_SDR=1
```

### Running the miner on a different machine as the Lotus Node

If you opt to run a miner on a different machine as the Lotus Node, set:

```sh
export FULLNODE_API_INFO=<api_token>:/ip4/<lotus_daemon_ip>/tcp/<lotus_daemon_port>/http
```

and **make sure the `ListenAddress` has [remote access enabled]({{< relref "../developers/api-access#enable-remote-api-access" >}})**. Instructions on how to obtain a token are [available here]({{< relref "../developers/api-access#obtaining-tokens" >}}).

Similarly, `lotus-miner` (as a client application to the Lotus Miner daemon), can talk to a remote miner by setting:

```sh
export MINER_API_INFO="TOKEN:/ip4/<IP>/tcp/<PORT>/http"
export MARKETS_API_INFO="TOKEN:/ip4/<IP>/tcp/<PORT>/http"
```

### Adding the necessary swap

If you have only 128 GiB of RAM, you will need to make sure your system provides at least an extra 256 GiB of very fast swap (preferably NVMe SSD) or you will be unable to seal sectors:

```sh
sudo fallocate -l 256G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
# show current swap spaces and take note of the current highest priority
swapon --show
# append the following line to /etc/fstab (ensure highest priority) and then reboot
# /swapfile swap swap pri=50 0 0
sudo reboot
# check a 256GB swap file is automatically mounted and has the highest priority
swapon --show
```

### Creating wallets for the miner

You will need at least a BLS wallet (`f3...` for mainnet) for mining. We recommend using [separate owner and worker addresses]({{< relref "addresses" >}}):

```sh
# A new BLS address to use as owner address:
lotus wallet new bls
f3...

# A new BLS address to use as worker address:
lotus wallet new bls
f3...
```

{{< alert icon="callout" >}}
Next make sure to [send some funds]({{< relref "../set-up/manage-fil" >}}) to the **worker address** so that the miner setup can be completed. The amount you should initialize with varies with gas fees, but 0.1 FIL is generally a safe amount. The sender doesn't have to be any particular address and can be specified using the `from` flag. If `from` is unspecified, the sender will default to the `owner` address, in which case the `onwer` must have the 0.1 FIL. If the `owner` is also unspecified, the wallet's default address is used as the owner and that address must have the 0.1 FIL. 
{{< /alert >}}

For additional information about the different wallets that a miner can use and how to configure them, read the [miner addresses guide]({{< relref "addresses" >}}).

{{< alert icon="tip" >}}
Safely [backup your wallets]({{< relref "../set-up/manage-fil#exporting-and-importing-addresses" >}})!
{{< /alert >}}

### Downloading parameters

For the miner to start, it will need to read and verify the Filecoin proof parameters. These can be downloaded in advance (recommended), or otherwise the init process will. Proof parameters consist of several files, which in the case of 32 GiB sectors, total **over 100 GiB**.

We recommend setting a custom location to store parameters and proofs parent cache -created during the first run- with:

```sh
export FIL_PROOFS_PARAMETER_CACHE=/path/to/folder/in/fast/disk
export FIL_PROOFS_PARENT_CACHE=/path/to/folder/in/fast/disk2
```

Parameters are read on every (re)start, so using disks with very fast access, like NVMe drives, will speed up miners and workers (re)boots. When the above variables are not set, things will end up in `/var/tmp/` by default, which **often lacks enough space**.

To download the parameters do:

```sh
# Use sectors supported by the Filecoin network that the miner will join and use.
# lotus-miner fetch-params <sector-size>
lotus-miner fetch-params 32GiB
lotus-miner fetch-params 64GiB
```

You can verify sectors sizes for a network in the [network dashboard](https://network.filecoin.io). The `FIL_PROOFS_*_CACHE` variables should stay defined not only for download, but also when starting the Lotus miner (or workers).

## Checklist before launch

To summarize, make sure that:

- The _worker address_ has some funds so that the miner can be initialized.
- The following environment variables have been defined and will be available for any Lotus miner runs:

  ```
  export LOTUS_MINER_PATH=/path/to/miner/config/storage
  export LOTUS_PATH=/path/to/lotus/node/folder # When using a local node.
  export BELLMAN_CPU_UTILIZATION=0.875 # Optimal value depends on your exact hardware.
  export FIL_PROOFS_MAXIMIZE_CACHING=1
  export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # When having GPU.
  export FIL_PROOFS_USE_GPU_TREE_BUILDER=1   # When having GPU.
  export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
  export FIL_PROOFS_PARENT_CACHE=/fast/disk/folder2   # > 50GiB!
  export TMPDIR=/fast/disk/folder3                    # Used when sealing.
  ```

- Parameters have been prefetched to the cache folders specified above.
- The system has enough swap and it is active.

## Miner initialization

Before starting your miner for the first time run:

```sh
lotus-miner init --owner=<address>  --worker=<address> --no-local-storage
```

- The `--no-local-storage` flag is used so that we can later configure [specific locations for storage]({{< relref "custom-storage-layout" >}}). This is optional but recommended.
- The Lotus Miner configuration folder is created at `~/.lotusminer/` or `$LOTUS_MINER_PATH` if set.
- The difference between _owner_ and _worker_ addresses is explained in the [miner addresses guide]({{< relref "addresses" >}}). As mentioned above, we recommend using two separate addresses. If the `--worker` flag is not provided, the owner address will be used. _Control addresses_ can be added later when the miner is running.

## Connectivity to the miner

Before you start your miner, it is important to configure it so that it is reachable from any peer in the Filecoin network. For this, you will need a stable public IP and edit your `~/.lotusminer/config.toml` as follows:

```toml
...
[Libp2p]
  ListenAddresses = ["/ip4/0.0.0.0/tcp/24001"] # choose a fixed port
  AnnounceAddresses = ["/ip4/<YOUR_PUBLIC_IP_ADDRESS>/tcp/24001"] # important!
...
```

Once you start your miner, [make sure you can connect to its public IP/port]({{< relref "connectivity" >}}).

## Starting the miner

You are now ready to start your Lotus miner:

```sh
lotus-miner run
```

or if you are using the systemd service file:

```sh
systemctl start lotus-miner
```

{{< alert icon="warning" >}}
**Do not proceed** from here until you have verified that your miner not only is running, but also [reachable on its public IP address]({{< relref "connectivity" >}}).
{{< /alert >}}

## Publishing the miner addresses

Once the miner is up and running, publish your miner address (which you configured above) on the chain so that other nodes can talk to it directly and make deals:

```sh
lotus-miner actor set-addrs /ip4/<YOUR_PUBLIC_IP_ADDRESS>/tcp/24001
```

## Next steps

Your miner should now be preliminarily set up and running, but **there are still a few more recommended tasks** to be ready for prime-time:

- Set up your [custom storage layout]({{< relref "custom-storage-layout" >}}) (required if you used `--no-local-storage`).
- Edit the miner [configuration settings]({{< relref "config" >}}) to fit your requirements.
- Learn what is a right moment to [shut down/restart your miner]({{< relref "lifecycle" >}})
- Update `ExpectedSealDuration` with the time it takes your miner to seal a sector: discover it by [running a benchmark]({{< relref "benchmarks" >}}) or by [pledging a sector]({{< relref "sector-pledging" >}}) and noting down the time.
- Configure additional [seal workers]({{< relref "seal-workers" >}}) to increase the miner's capacity to seal sectors.
- Configure a [separate address for WindowPost messages]({{< relref "addresses" >}}).
- Consider [splitting markets and miners processes]({{< relref "split-markets-miners" >}}) for increased stability.
