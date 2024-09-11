---
title: "Add Seal Worker"
description: "This is a step by step guide on how to set up a Lotus seal-worker and connect it to the miner in calibnet."
lead: "This is a step by step guide on how to set up a Lotus seal-worker and connect it to the miner in calibnet. Some of the steps are specific to the hardware and configuration used in this setup and might not be applicable for everyone. Please follow the documentation to set up your miner and use this guide only as a reference point."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 210
toc: true
---

## Setup Details

Below are the details of the physical server used in this tutorial. 

### PC1 Worker

- CPU: 2 x AMD EPYC 7F32 8-Core Processor
- RAM: 1007 GiB
- GPU: None
- Process: PC1 Seal Worker
- OS: Ubuntu
- Private IP: z.z.z.z
- Public IP: C.C.C.C

All Lotus processes will run as a non-root user. Please make sure to open relevant ports in your firewall to allow connections. This tutorial will use the same miner created under the [How To Run A Miner tutorial]({{<relref "run-a-miner">}}).

## Lotus Worker Setup

This section will cover the installation, configuration and running a Lotus seal-worker.

### Installation

1. We have bundled all the install steps into the below code snippets so you can just copy and paste them into your terminal. If you would prefer to run each command step by step, take a look at the [Installation guide]({{<relref "/lotus/install/linux#building-from-source" >}}). As this is a PC1-only worker, we have not used any `CUDA` variables, but you can use them if you are building a worker that requires GPU usage.

    ```shell
    sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```
    
    Follow the prompts to install Rust, and then run these commands:
    
    ```shell
    wget -c https://golang.org/dl/go1.19.12.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    LATEST_RELEASE=$(git tag -l 'miner/v*' | grep -v "-" | sort -V -r | head -n 1) # Finds the latest Lotus Miner release
    git checkout $LATEST_RELEASE
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    export FFI_BUILD_FROM_SOURCE=1
    export RUSTFLAGS="-C target-cpu=native -g"
    make clean calibnet
    ./lotus --version
    ```

2. Add sufficient swap to the machines based on the [hardware requirements guide]({{<relref "../../storage-providers/get-started/hardware-requirements/#specific-operation-requirements">}}).

### Configuration

1. Add the below variables to enable logging to a file.
    
    ```shell
    export GOLOG_OUTPUT=file >> ~/.bashrc
    export GOLOG_FILE="$HOME/worker.log" >> ~/.bashrc && source ~/.bashrc
    ```

1. On the seal-worker machines, create directories to store the cache. Make sure these directories are on a fast NVME disk. Otherwise, it will slow down your seal-worker.
    
    ```shell
    mkdir ~/parent_cache
    mkdir ~/parameter_cache
    ```

### Setup

1. Add the following variables to the `~/.bashrc` file and then source the file. The token used for API authentication is the same as generated in the [previous tutorial]({{<relref "run-a-miner#generate-auth-token-for-seal-worker">}}). 
    
    ```shell
    # The following increases speed of PreCommit1 at the cost of using a full
    # CPU Core-Complex rather than a single core. Should be used with CPU affinities set!
    # See https://github.com/filecoin-project/rust-fil-proofs/ and the seal-workers guide.
    export FIL_PROOFS_USE_MULTICORE_SDR=1
    
    export MINER_API_INFO=<TOKEN>:/ip4/y.y.y.y/tcp/2345/http
    
    export LOTUS_MINER_PATH=$HOME/.lotusminer
    export FIL_PROOFS_PARAMETER_CACHE=$HOME/param_cache # > 100GiB!
    export FIL_PROOFS_PARENT_CACHE=$HOME/parent_cache   # > 50GiB!
    
    export GOLOG_OUTPUT=file
    export GOLOG_FILE="$HOME/miner.log"
    ```

1. You then need to load these changes:

    ```shell
    source ~/.bashrc
    ```
 
1. Copy the parameters from the miner node to the seal-worker node.
1. Start the seal-worker
    
    ```shell
    lotus-worker run --addpiece=true --precommit1=true --unseal=false --precommit2=false --commit=false &
    ```

1. Verify that the seal-worker is running
    
    ```shell
    lotus-worker info
    lotus-miner sealing workers # This command need to be run on the lotus-miner node
    ```

1. Add storage for sealing the sectors.
    
    ```shell
    mkdir ~/tmp
    ```
    
    Please make sure that the ~/tmp directory is backed by a fast disk like NVME.
    
    ```shell
    lotus-worker storage attach --init --seal ~/tmp
    lotus-worker storage list
    ```
    
Now, the seal-worker is ready to start performing PC1 for the sectors.

