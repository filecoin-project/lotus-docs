---
title: "Lotus Miner Setup"
description: "This is a step by step guide on how to set up a lotus miner in calibnet."
lead: "This is a step by step guide on how to set up a lotus miner in calibnet. Some of the steps are specific to the hardware and configuration used in this setup and might not be applicable for everyone. Please follow the documentation to set up your miner and use this guide only as a reference point."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 110
toc: true
---

## Setup details
Below are the detail of the physical servers used in this tutorial. One of these machines will run a lotus node and other will be used to run a lotus-miner node.

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
1. We have bundled all the install steps into the below code snippets so you can just copy and paste them into your terminal. If you would prefer to run each command step by step, take a look at the [Installation guide]({{<relref "../../lotus/install/ubuntu/#building-from-source" >}}).
    
    ```shell
    sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```
    
    Follow the prompts to install Rust, and then run these commands:
     
    ```shell
    wget -c https://golang.org/dl/go1.16.4.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    git checkout tags/v1.13.2
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    export FFI_BUILD_FROM_SOURCE=1
    export RUSTFLAGS="-C target-cpu=native -g"
    ```
    
    #### Nvidia specific variables
    `FFI_USE_CUDA=1` variable forces the use of CUDA architecture instead of OpenCL for Nvidia cards. `BELLMAN_CUSTOM_GPU` variable need to be set after driver 475+ due to a change in naming convention.

    ```shell
    export FFI_USE_CUDA=1
    export BELLMAN_CUSTOM_GPU="Quadro RTX 6000:4608"
    ```
    
    ```shell
    make clean calibnet
    ./lotus --version
    ```

2. Add sufficient swap to the machines based on the [hardware requirements guide]({{<relref "../../storage-providers/get-started/hardware-requirements/#specific-operation-requirements">}}).

### Configuration
1. Initialize the lotus node and wait for the sync to complete. If you are configuring the miner for mainnet then, please [import a snapshot]({{<relref "../../lotus/manage/chain-management/#lightweight-snapshot">}}) and wait for the lotus node to get synced.
    
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

    Restart the Lotus node for the changes to take effect.

3. Generate an API token for the miner.
    
    ```shell
    lotus auth create-token --perm admin
    ```

4. Verify that the lotus node is in sync and that lotus is listening on the specified port.
    
    ```shell
    telnet x.x.x.x 1234
    ```

### Setup wallets for the miner
1. Create wallets for the lotus-miner on the Lotus node machine.
    
    ```shell
    lotus wallet new bls
    lotus wallet new bls
    ```

2. Send some fils to the owner wallet from the [calibnet faucet]({{<relref "https://faucet.calibration.fildev.network/" >}}). For the mainnet, the user can send fils from an exchange or other sources.
3. Send some fils from the owner wallet to the worker wallet.
    
    ```shell
    lotus send --from <owner address> <worker address> 10
    ```

4. Verify that fils are present in both wallets.
    
    ```shell
    lotus wallet list
    ```

## Lotus miner setup
This section will cover the installation, configuration and starting a lotus-miner node to be used in the tutorial.

### Installation
1. We have bundled all the install steps into the below code snippets so you can just copy and paste them into your terminal. If you would prefer to run each command step by step, take a look at the [Installation guide]({{<relref "../../lotus/install/ubuntu/#building-from-source" >}}).

    ```shell
    sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```
    
    Follow the prompts to install Rust, and then run these commands:
    
    ```shell
    wget -c https://golang.org/dl/go1.16.4.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    git checkout tags/v1.13.2
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    export FFI_BUILD_FROM_SOURCE=1
    export RUSTFLAGS="-C target-cpu=native -g"
    ```

    #### Nvidia specific variables
    `FFI_USE_CUDA=1` variable forces the use of CUDA architecture instead of OpenCL for Nvidia cards. `BELLMAN_CUSTOM_GPU` variable need to be set after driver 475+ due to a change in naming convention.

    ```shell
    export FFI_USE_CUDA=1
    export BELLMAN_CUSTOM_GPU="Quadro RTX 6000:4608"
    ```

    ```shell
    make clean calibnet
    ./lotus --version
    ```

2. Add sufficient swap to the machines based on the [hardware requirements guide]({{<relref "../../storage-providers/get-started/hardware-requirements/#specific-operation-requirements">}}).
3. On the miner machines, create directories to store cache. Make sure these directories are on a fast NVME disk. Otherwise, it will slow down your miner.
    
    ```shell
    mkdir ~/parent_cache
    mkdir ~/parameter_cache
    ```

### Setup
1. Add the following variables to the `~/.bashrc` file.
    
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

    Now `source` the file to load these variable to the current shell.

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

4. Configure libp2p port in the `~/.lotusminer/config.toml` file so miner other nodes can find the miner in the network.
    
    ```shell
    ...
    [Libp2p]
      ListenAddresses = ["/ip4/0.0.0.0/tcp/24001"] # choose a fixed port
      AnnounceAddresses = ["/ip4/B.B.B.B/tcp/24001"] # important!
    ...
    ```
    
    Choosing port 0.0.0.0 on ListenAddress allows the miner process to listen on both internal interfaces x.x.x.x and B.B.B.B. But we are announcing only the public address so all connections coming from the network are routed via this address.
5. Start the miner
    
    ```shell
    lotus-miner run
    ```

6. Test that your miner is reachable at its public address. Go through the [connectivity guide]({{<relref "../../storage-providers/operate/connectivity" >}}) in case you need more information about this. Please do not proceed with the next step if your miner is not reachable.
    
    ```shell
    $ lotus-miner net reachability
    AutoNAT status:  Public
    Public address:  /ip4/<IP>/tcp/<port>
    ```

7. Publish your miner address in the network.
    
    ```shell
    lotus-miner actor set-addrs /ip4/B.B.B.B/tcp/24001
    ```

### Lotus miner configuration
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

    Restart the lotus-miner process.
3. Verify that all the resources are visible on the miner and are ready to use.
    
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
### Generate auth token for seal-worker
Generate the JWT token for the seal workers. This token can be used to add additional seal-workers to speed up the sealing process.

```shell
lotus-miner auth api-info --perm admin
```
