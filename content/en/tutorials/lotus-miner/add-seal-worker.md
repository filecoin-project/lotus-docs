---
title: "Add A Seal Worker To Lotus Miner"
description: "This is a step by step guide on how to setup a lotus seal-worker and connect it to the miner in calibnet."
lead: "This is a step by step guide on how to setup a lotus seal-worker and connect it to the miner in calibnet. Some of the steps are specific to the hardware and configuration used in this setup and might not be applicable for everyone. Please follow the documentation to set up your miner and use this guide only as a reference point."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 120
toc: true
---

## Setup Details

#### PC1 Worker

- CPU: 2 x AMD EPYC 7F32 8-Core Processor
- RAM: 1007 GiB
- GPU: None
- Process: PC1 Seal Worker
- OS: Ubuntu
- Private IP: z.z.z.z
- Public IP: C.C.C.C

All lotus process will run as a non-root user. Please make sure to open relevant ports in your firewall to allow connections.
This tutorial is use the miner setup under the How To Run A Miner tutorials.TODO: reflink

## Lotus Worker Setup

### Installation

1. Install Lotus binaries by following the [Linux install guide - build from source]({{<relref "../../lotus/install/ubuntu/#building-from-source" >}}).

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

git checkout tags/v1.14.4

export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
export CGO_CFLAGS="-D__BLST_PORTABLE__"
export FFI_BUILD_FROM_SOURCE=1
export RUSTFLAGS="-C target-cpu=native -g"
```

```shell
make clean calibnet

./lotus --version

```

2. Add swap to the machines as per availability and requirements.

### Configuration

1. Add the below variables to enable logging to a file.

```shell
export GOLOG_OUTPUT=file >> ~/.bashrc
export GOLOG_FILE="$HOME/worker.log" >> ~/.bashrc && source ~/.bashrc
```

2. On the worker machines, create directories to store cache. Make sure these directories are on a fast NVME disk. Otherwise, it will slow down your worker.

```shell
mkdir ~/parent_cache
mkdir ~/parameter_cache
```

### Setup

1. Add the following variables to the ~/.bashrc file and source the file. TODO: Add link to token gen from run a miner tutorial.

```shell
# See https://github.com/filecoin-project/rust-fil-proofs/
export FIL_PROOFS_MAXIMIZE_CACHING=1 # More speed at RAM cost (1x sector-size of RAM - 32 GB).

# The following increases speed of PreCommit1 at the cost of using a full
# CPU Core-Complex rather than a single core. Should be used with CPU affinities set!
# See https://github.com/filecoin-project/rust-fil-proofs/ and the seal workers guide.
export FIL_PROOFS_USE_MULTICORE_SDR=1


export MINER_API_INFO=<TOKEN>:/ip4/y.y.y.y/tcp/2345/http

export LOTUS_MINER_PATH=$HOME/.lotusminer
export FIL_PROOFS_PARAMETER_CACHE=$HOME/param_cache # > 100GiB!
export FIL_PROOFS_PARENT_CACHE=$HOME/parent_cache   # > 50GiB!


export GOLOG_OUTPUT=file
export GOLOG_FILE="$HOME/miner.log"
```

```shell
source ~/.bashrc
``` 
2. Copy the parameters from the miner node to the worker node.

3. Start the seal-worker

```shell
lotus-worker run --addpiece=true --precommit1=true --unseal=false --precommit2=false --commit=false &
```

4. Verify that the worker is running

```shell
lotus-worker info
lotus-miner sealing workers #This commands need to be run on the lotus-miner node
```

5. Add storage for sealing the sectors.

```shell
mkdir ~/tmp
```

Please make sure that ~/tmp directory is backed by a fast disk like NVME.

```shell
lotus-worker storage attach --init --seal ~/tmp
lotus-worker storage list
```

Now the seal-worker is ready to start performing PC1 for the sectors.
