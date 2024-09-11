---
title: "Lotus Miner Setup"
description: "This is a step by step guide on how to set up a lotus miner in calibnet."
lead: "This is a step by step guide on how to set up a lotus miner in calibnet. Some of the steps are specific to the hardware and configuration used in this setup and might not be applicable for everyone. Please follow the documentation to set up your miner and use this guide only as a reference point."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 205
toc: true
---

## Setup details

Below are the details of the physical servers used in this tutorial. One of these machines will run a lotus node and other will be used to run a lotus-miner node.

### Machine One

- CPU: 2 x Intel(R) Xeon(R) Gold 6242 CPU @ 2.80GHz
- RAM: 502 GiB
- GPU: 4 x Quadro RTX 6000
- Process: Lotus Node, Seal Worker
- OS: Ubuntu
- Private IP: x.x.x.x
- Public IP: A.A.A.A

### Machine Two

- CPU: 2 x Intel(R) Xeon(R) Gold 6242 CPU @ 2.80GHz
- RAM: 502 GiB
- GPU: 4 x Quadro RTX 6000
- Process: Lotus Miner(Seal worker)
- OS: Ubuntu
- Private IP: y.y.y.y
- Public IP: B.B.B.B

All lotus processes will run as a non-root user. Please make sure to open relevant ports in your firewall to allow connections.

## Lotus node setup

This section will cover the installation, configuration and starting a lotus node to be used in the tutorial.

### Installation

1. We have bundled all the install steps into the below code snippets so you can just copy and paste them into your terminal. If you would prefer to run each command step by step, take a look at the [Installation guide]({{<relref "/lotus/install/linux#building-from-source" >}}). `FFI_USE_CUDA=1` variable forces the use of CUDA architecture instead of OpenCL for Nvidia cards. `RUST_GPU_TOOLS_CUSTOM_GPU` variable need to be set after driver 475+ due to a change in naming convention.
    
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
    LATEST_RELEASE=$(git tag -l 'v*' | grep -v "-" | sort -V -r | head -n 1) # Finds the latest Lotus Node release
    git checkout $LATEST_RELEASE
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    export FFI_BUILD_FROM_SOURCE=1
    export RUSTFLAGS="-C target-cpu=native -g"
    export FFI_USE_CUDA=1
    export RUST_GPU_TOOLS_CUSTOM_GPU="Quadro RTX 6000:4608"
    make clean calibnet
    ./lotus --version
    ```

1. Add sufficient swap to the machines based on the [hardware requirements guide]({{<relref "../../storage-providers/get-started/hardware-requirements/#specific-operation-requirements">}}).

### Configuration

1. Initialize the lotus node and wait for the sync to complete. If you are configuring the miner for mainnet then, please [import a snapshot]({{<relref "../../lotus/manage/chain-management/#lightweight-snapshot">}}) and wait for the lotus node to get synced:
    
    ```shell
    export GOLOG_OUTPUT=file >> ~/.bashrc
    export GOLOG_FILE="$HOME/miner.log" >> ~/.bashrc && source ~/.bashrc
    lotus daemon &
    ```

1. Configure lotus node to allow remote API access. Please do not listen on a public IP as it will allow anyone from the internet to be able to connect to this node. Ideally, use a private IP and in case there is no private IP available, please ensure that the firewall is configured to reject all packets except from miner/market APIs for security
    
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
      # Timeout = "30s"
    ```

    Restart the Lotus node for the changes to take effect.

1. Generate an API token for the miner:
    
    ```shell
    lotus auth create-token --perm admin
    ```

1. Verify that the lotus node is in sync and that lotus is listening on the specified port:
    
    ```shell
    telnet x.x.x.x 1234
    ```

### Setup wallets for the miner

1. Create wallets for the lotus-miner on the Lotus node machine:
    
    ```shell
    lotus wallet new bls
    lotus wallet new bls
    ```

1. Send some FIL to the owner wallet from the [calibnet faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html). For the mainnet, the user can send fils from an exchange or other sources.
1. Send some fils from the owner wallet to the worker wallet:
   
    ```shell
    lotus send --from <owner address> <worker address> 10
    ```

1. Verify that fils are present in both wallets:
    
    ```shell
    lotus wallet list
    ```

## Lotus miner setup

This section will cover the installation, configuration, and how to start the lotus-miner node.

### Installation

1. We have bundled all the install steps into the below code snippets so you can just copy and paste them into your terminal. If you would prefer to run each command step by step, take a look at the [Installation guide]({{<relref "/lotus/install/linux#building-from-source" >}}). `FFI_USE_CUDA=1` variable forces the use of CUDA architecture instead of OpenCL for Nvidia cards. `RUST_GPU_TOOLS_CUSTOM_GPU` variable need to be set after driver 475+ due to a change in naming convention:

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
    export FFI_USE_CUDA=1
    export RUST_GPU_TOOLS_CUSTOM_GPU="Quadro RTX 6000:4608"
    make clean calibnet
    ./lotus --version
    ```

1. Add sufficient swap to the machines based on the [hardware requirements guide]({{<relref "../../storage-providers/get-started/hardware-requirements/#specific-operation-requirements">}}).
1. On the miner machines, create directories to store the cache. Make sure these directories are on a fast NVME disk. Otherwise, it will slow down your miner:
    
    ```shell
    mkdir ~/parent_cache
    mkdir ~/parameter_cache
    ```

### Setup

1. Add the following variables to the `~/.bashrc` file:
    
    ```shell
    # See https://github.com/filecoin-project/rust-fil-proofs/
    export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # precommit2 GPU acceleration
    export FIL_PROOFS_USE_GPU_TREE_BUILDER=1
    
    # The following increases speed of PreCommit1 at the cost of using a full
    # CPU Core-Complex rather than a single core. Should be used with CPU affinities set!
    # See https://github.com/filecoin-project/rust-fil-proofs/ and the seal workers guide.
    export FIL_PROOFS_USE_MULTICORE_SDR=1
    
    export FULLNODE_API_INFO=<TOKEN>:/ip4/x.x.x.x/tcp/1234/http
    
    export FIL_PROOFS_PARAMETER_CACHE=/home/miner/param_cache # > 100GiB!
    export FIL_PROOFS_PARENT_CACHE=/home/miner/parent_cache   # > 50GiB!

    export FFI_USE_CUDA=1
    export RUST_GPU_TOOLS_CUSTOM_GPU="Quadro RTX 6000:4608"
    
    export LOTUS_MINER_PATH=~/.lotusminer
    export GOLOG_OUTPUT=file
    export GOLOG_FILE="$HOME/miner.log"
    ```

    Now `source` the file to load these variable to the current shell.

    ```shell
    source ~/.bashrc
    ```
 
1. Download parameters:
    
    ```shell
    lotus-miner fetch-params 32GiB
    lotus-miner fetch-params 64GiB
    ```

1. Initialize the miner:
    
    ```shell
    lotus-miner init --owner=<address>  --worker=<address> --no-local-storage
    ```

1. Start the miner
    
    ```shell
    lotus-miner run
    ```

### Lotus miner configuration

1. Add storage for sealing, as well as permanent storage for the sectors:
    
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

1. Enable remote API access on the lotus-miner to allow the remote seal-workers connection to the miner:
    
    ```shell
    [API]
      # Binding address for the miner API
      ListenAddress = "/ip4/y.y.y.y/tcp/2345/http"
      # This should be set to the miner API address as seen externally
      RemoteListenAddress = "y.y.y.y:2345"
      # General network timeout value
      Timeout = "30s"
    ```

1. Restart the `lotus-miner` process.
1. Verify that all the resources are visible on the miner and are ready to use:
    
    ```shell
    lotus-miner sealing workers

    > Worker xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, host miner-host
    > 	CPU:  [                                                                ] 0/64 core(s) in use
    > 	RAM:  [||||||                                                          ] 9% 46.38 GiB/502.6 GiB
    > 	VMEM: [||                                                              ] 3% 46.38 GiB/1.4 TiB
    > 	GPU:  [                                                                ] 0% 0.00/4 gpu(s) in use
    > 	GPU: Quadro RTX 6000, not used
    > 	GPU: Quadro RTX 6000, not used
    > 	GPU: Quadro RTX 6000, not used
    > 	GPU: Quadro RTX 6000, not used
    ```
    
    Now the miner is ready to start sealing.

### Generate auth token for seal-worker

Generate the JWT token for the seal workers. This token can be used to add additional seal-workers to speed up the sealing process.

```shell
lotus-miner auth api-info --perm admin
```

