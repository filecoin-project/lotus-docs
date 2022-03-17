---
title: "Setup A Lotus Miner"
description: "This is a step by step guide on how to setup a lotus miner in calibnet."
lead: "This is a step by step guide on how to setup a lotus miner in calibnet. Some of the steps are specific to the hardware and configuration used in this setup and might not be applicable for everyone. Please follow the documentation to set up your miner and use this guide only as a reference point."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 110
toc: true
---

## Setup Details

#### Machine One

- CPU: 2 x Intel(R) Xeon(R) Gold 6242 CPU @ 2.80GHz
- RAM: 502 GiB
- GPU: 4 x Quadro RTX 6000
- Process: Lotus Node, Seal Worker
- OS: Ubuntu
- Private IP: x.x.x.x
- Public IP: A.A.A.A

#### Machine Two

- CPU: 2 x Intel(R) Xeon(R) Gold 6242 CPU @ 2.80GHz
- RAM: 502 GiB
- GPU: 4 x Quadro RTX 6000
- Process: Lotus Miner(Seal worker)
- OS: Ubuntu
- Private IP: y.y.y.y
- Public IP: B.B.B.B

All lotus process will run as a non-root user. Please make sure to open relevant ports in your firewall to allow connections.


## Lotus Miner Setup

### Installation

1. Install Lotus binaries by following the [Linux install guide - build from source]({{<relref "../../lotus/installation/linux/#building-from-source" >}}).

```shell
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Choose the default installation option 1) for the above rust installation.

```shell
wget -c https://golang.org/dl/go1.16.4.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local

echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc

git clone https://github.com/filecoin-project/lotus.git
cd lotus/

git checkout tags/v1.13.2

export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
export CGO_CFLAGS="-D__BLST_PORTABLE__"
export FFI_BUILD_FROM_SOURCE=1
```

The CPU on these machines do not support SHA instruction set and thus following variables were not used. But they might be applicable for you depending on the CPU.


```shell
export RUSTFLAGS="-C target-cpu=native -g"
```

**Nvidia Specific Variables**

```shell
export FFI_USE_CUDA=1 # This variable forces the use of CUDA architecture instead of OpenCL for Nvidia cards. Not applicable for non-Nvidia cards.
export BELLMAN_CUSTOM_GPU="Quadro RTX 6000:4608" # These variables need to be set after driver 475+ due to change in naming convention.
```

```shell
make clean calibnet

./lotus --version

```

2. Add swap to the machines as per availability and requirements.

### Configuration


1. Initialize the lotus node and wait for the sync to complete. If you are configuring the miner for mainnet then, please [import a snapshot]({{<relref "../../lotus/node-management/chain-management/#lightweight-snapshot">}}) and wait for lotus node to get synced.

```shell
export GOLOG_OUTPUT=file >> ~/.bashrc
export GOLOG_FILE="$HOME/miner.log" >> ~/.bashrc && source ~/.bashrc
lotus daemon &
```

2. Configure lotus node to allow remote API access. Please do not listen on a public IP as it will allow anyone from the internet to be able to connect to this node. Ideally, use a private IP and in case there is no private IP available, please ensure that firewall is configured to reject all packets accept from miner/market APIs for security.

```shell
[API]
  # Binding address for the Lotus API
  #
  # type: string
  # env var: LOTUS_API_LISTENADDRESS
  ListenAddress = "/ip4/x.x.x.x/tcp/1234/http"

  # type: string
  # env var: LOTUS_API_REMOTELISTENADDRESS
  #RemoteListenAddress = "x.x.x.x:1234"

  # type: Duration
  # env var: LOTUS_API_TIMEOUT
  #Timeout = "30s"
```

Restart the lotus node for the changes to take affect.

3. Generate a API token for the miner.

```shell
lotus auth create-token --perm admin
```

4. Verify that the lotus node is in sync and that lotus is listening on the specified port.

```shell
telnet x.x.x.x 1234
```

### Setup wallets for the miner

1.Create wallets for miner on the Lotus node machine.

```shell
lotus wallet new bls
lotus wallet new bls
```

2. Send some fils to the owner wallet from the [calibnet fauceti]({{<relref "https://faucet.calibration.fildev.network/" >}}). For the mainnet, the user can send fils from exchange or other sources.

3. Send some fils from the owner wallet to the worker wallet.

```shell
lotus send --from <owner address> <worker address> 10
```

4. Verify that fils are not present in both wallets.

```shell
lotus wallet list
```

## Lotus Miner Setup

### Installation

1. Install Lotus binaries by following the [Linux install guide(build from source)]({{<relref "../../lotus/installation/linux/#building-from-source" >}}).

```shell
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
Choose the default installation option 1) for the above rust installation.

```shell
wget -c https://golang.org/dl/go1.16.4.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local

echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc

git clone https://github.com/filecoin-project/lotus.git
cd lotus/

git checkout tags/v1.13.2

export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
export CGO_CFLAGS="-D__BLST_PORTABLE__"
export FFI_BUILD_FROM_SOURCE=1
```

The CPU on these machines do not support SHA instruction set and thus following variables were not used. But they might be applicable for you depending on the CPU.


```shell
export RUSTFLAGS="-C target-cpu=native -g"
```

**Nvidia Specific Variables**

```shell
FFI_USE_CUDA=1 # This variable forces the use of CUDA architecture instead of OpenCL for Nvidia cards. Not applicable for non-Nvidia cards.
export BELLMAN_CUSTOM_GPU="Quadro RTX 6000:4608" # These variables need to be set after driver 475+ due to change in naming convention.
```

```shell
make clean calibnet

./lotus --version

```

2. The CPU on these machines do not support SHA instruction set and thus following variables were not used. But they might be applicable for you depending on the CPU.

```shell
export RUSTFLAGS="-C target-cpu=native -g"
```

3. Add swap to the machines as per availability and requirements.

4. On the miner machines, create directories to store cache. Make sure these directories are on a fast NVME disk. Otherwise, it will slow down your miner.

```shell
mkdir ~/parent_cache
mkdir ~/parameter_cache
```

### Setup

1. Add the following variables to the ~/.bashrc file and source the file

```shell
# See https://github.com/filecoin-project/rust-fil-proofs/
export FIL_PROOFS_MAXIMIZE_CACHING=1 # More speed at RAM cost (1x sector-size of RAM - 32 GB).
export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # precommit2 GPU acceleration
export FIL_PROOFS_USE_GPU_TREE_BUILDER=1

# The following increases speed of PreCommit1 at the cost of using a full
# CPU Core-Complex rather than a single core. Should be used with CPU affinities set!
# See https://github.com/filecoin-project/rust-fil-proofs/ and the seal workers guide.
export FIL_PROOFS_USE_MULTICORE_SDR=1


export FULLNODE_API_INFO=<TOKEN>:/ip4/x.x.x.x/tcp/1234/http

export FIL_PROOFS_PARAMETER_CACHE=/home/miner/param_cache # > 100GiB!
export FIL_PROOFS_PARENT_CACHE=/home/miner/parent_cache   # > 50GiB!

export LOTUS_MINER_PATH=~/.lotusminer
export GOLOG_OUTPUT=file
export GOLOG_FILE="$HOME/miner.log"
```

```shell
source ~/.bashrc
``` 
2. Download parameters

```shell
lotus-miner fetch-params 32GiB
lotus-miner fetch-params 64GiB
```

3. Initialize the miner

```shell
lotus-miner init --owner=<address>  --worker=<address> --no-local-storage
```

4. Configure libp2p port in the ~/.lotusminer/config.toml file so miner other nodes can find the miner in the network.

```shell
...
[Libp2p]
  ListenAddresses = ["/ip4/0.0.0.0/tcp/24001"] # choose a fixed port
  AnnounceAddresses = ["/ip4/B.B.B.B/tcp/24001"] # important!
...
```

Choosing port 0.0.0.0 on ListenAddress allows the miner process to listen on both internal interfaces x.x.x.x and B.B.B.B. But we are announcing only the public address so all connection coming from the network are routed via this address.

5. Start the miner

```shell
lotus-miner run
```

6. Test that your miner is reachable on its public address. Go through [connectivity guide]({{<relref "../../storage-providers/lotus-miner-operation/connectivity" >}}) in case you need more information about this. Please do not proceed with next step if your miner is not reachable.

```shell
$ lotus-miner net reachability
AutoNAT status:  Public
Public address:  /ip4/<IP>/tcp/<port>
```

7. Publish your miner address in the network.

```shell
lotus-miner actor set-addrs /ip4/B.B.B.B/tcp/24001
```

### Lotus Miner Configuration

1. Add storage for sealing as well as permanent storage of the sectors.

```shell
mkdir ~/storage
mkdir ~/tmp
```

Please make sure that ~/tmp directory is backed by a fast disk like NVME.

```shell
lotus-miner storage attach --init --seal ~/tmp
lotus-miner storage attach --init --store ~/storage
lotus-miner storage list
```

2. Enable remote API access on the lotus-miner to allow the remote seal-workers connection to the miner.

```shell
[API]
  # Binding address for the miner API
  ListenAddress = "/ip4/y.y.y.y/tcp/2345/http"
  # This should be set to the miner API address as seen externally
  RemoteListenAddress = "y.y.y.y:2345"
  # General network timeout value
  Timeout = "30s"
```

Restart the miner process.

3. Generate the JWT token for the seal workers. This token can be used to add additional seal-workers to speed up the sealing process.

```shell
lotus-miner auth api-info --perm admin
```

4. Verify that all the resources are visible on the miner and are ready to use.

```shell
$ lotus-miner sealing workers
Worker xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, host miner-host
	CPU:  [                                                                ] 0/64 core(s) in use
	RAM:  [||||||                                                          ] 9% 46.38 GiB/502.6 GiB
	VMEM: [||                                                              ] 3% 46.38 GiB/1.4 TiB
	GPU:  [                                                                ] 0% 0.00/4 gpu(s) in use
	GPU: Quadro RTX 6000, not used
	GPU: Quadro RTX 6000, not used
	GPU: Quadro RTX 6000, not used
	GPU: Quadro RTX 6000, not used
```


Now the miner is ready to start sealing.
