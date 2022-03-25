---
title: "Local network"
description: "Running a Filecoin network locally can be extremely useful for developers wanting to build and test their applications. This page provides guidance on different methods to run a Filecoin network locally."
lead: "Running a Filecoin network locally can be extremely useful for developers wanting to build and test their applications. This page provides guidance on different methods to run a Filecoin network locally."
draft: false
menu:
    developers:
        parent: "developers-networks"
        identifier: "developers-networks-local-network"
weight: 310
toc: true
aliases:
    - /docs/developers/developer-network
    - /docs/developers/local-network/
---

You can spin up a local network (local-net) using the regular Lotus binaries. This method will launch Lotus using 2 KiB sectors, allowing systems with fewer resources to run a local-net. This solution runs comfortably on a computer with 2 CPU cores and 4 GB RAM.

This process requires you to use multiple terminal windows, so you might find a terminal multiplexer like [Tmux](https://github.com/tmux/tmux) helpful. However, you can easily complete this tutorial by just having several terminal windows open. The screenshots in this guide use Tmux.

## Install Lotus

Since spinning up a local-net requires the `lotus` daemon, you need to have Lotus installed. If you have already installed a Lotus node on this computer you can move onto the [next section ↓](#environment-setup)

- [MacOS]({{< relref "../lotus/install/macos" >}})
- [Linux]({{< relref "../lotus/install/linux" >}})


Run through the installation steps for your operating system, then return here.

## Environment setup

Local-nets use slightly different binaries to those used in the Filecoin mainnet. This section shows you how to setup the Lotus environment and build those binaries. 

1. Create the following environment variable in your terminal:

    ```shell
    export LOTUS_PATH=~/.lotus-local-net
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    ```

1. Clone Lotus repo:

    ```shell
    git clone https://github.com/filecoin-project/lotus lotus-local-net
    cd lotus-local-net
    ```

    The `filecoin-project/lotus` repository is the same one that you would use to join the Filecoin mainnet. The `git clone` command puts the Lotus repository into the `lotus-local-net` folder to keep this guide organized.

1. Checkout to the Snap-deals branch:

    ```shell
    git checkout release/v1.14.0
    ```

    This will output something like:

    ```plaintext
    > Branch 'release/v1.14.0' set up to track remote branch 'release/v1.14.0' from 'origin'.
    > Switched to a new branch 'release/v1.14.0'
    ```

1. Remove any existing repositories.

    <!-- TODO: test if this section is necessary. -->

    ```shell
    rm -rf ~/.genesis-sectors
    ```

1. Build the `2k` binary for Lotus:

    ```shell
    make 2k
    ```

    This will output something like:

    ```plaintext
    git submodule update --init --recursive
    Submodule 'extern/filecoin-ffi' (https://github.com/filecoin-project/filecoin-ffi.git) registered for path 'extern/filecoin-ffi'
    ...
    go build  -ldflags="-X=github.com/filecoin-project/lotus/build.CurrentCommit=+git.8d5be1c01" -tags=2k -o lotus-gateway ./cmd/lotus-gateway
    ```

1. Grab the 2048 byte parameters:

    ```shell
    ./lotus fetch-params 2048
    ```

    This will output something like:

    ```plaintext
    2021-02-23T10:58:01.469-0500    INFO    build   go-paramfetch@v0.0.2-0.20200701152213-3e0f0afdc261/paramfetch.go:138  Parameter file /var/tmp/filecoin-proof-parameters/v28-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-0-0-0cfb4f178bbb71cf2ecfcd42accce558b27199ab4fb59cb78f2483fe21ef36d9.vk is ok
    ...
    c261/paramfetch.go:162  parameter and key-fetching complete
    ```

1. Pre-seal some sectors for the genesis block:

    ```shell
    ./lotus-seed pre-seal --sector-size 2KiB --num-sectors 2
    ```

    This will output something like:

    ```plaintext
    sector-id: {{1000 0} 0}, piece info: {2048 baga6ea4seaqoej3hzxzqr5y25ibovtjrhed7yba5vm6gwartr5hsgcbao7aluki}
    ...
    2021-02-23T10:59:36.937-0500    INFO    preseal seed/seed.go:232        Writing preseal manifest to /home/user/.genesis-sectors/pre-seal-t01000.json
    ```

1. Create the genesis block:

    ```shell
    ./lotus-seed genesis new localnet.json
    ```

    This command does not output anything on success.

1. Create a default address and give it some funds:

    ```shell
    ./lotus-seed genesis add-miner localnet.json ~/.genesis-sectors/pre-seal-t01000.json
    ```

    This will output something like:

    ```plaintext
    2022-02-08T15:44:19.734-0500    INFO    lotus-seed      lotus-seed/genesis.go:129       Adding miner t01000 to genesis template
    2022-02-08T15:44:19.734-0500    INFO    lotus-seed      lotus-seed/genesis.go:146       Giving t3xe5je75lkrvye32tfl37gug3az42iotuu3wxgkrhbpbvmum4lu26begiw74ju5a35nveqaw4ywdibj4y6kxq some initial balance
    ```

## Start the nodes

Now that you've got everything setup, you can start the `lotus` and `lotus-miner` nodes.

1. Start the first node:

    ```shell
    ./lotus daemon --lotus-make-genesis=devgen.car --genesis-template=localnet.json --bootstrap=false
    ```

    This command will output a lot of information and continue to run. All further steps should be completed in a new terminal window.

1. Create a new terminal window or tab and re-export the `LOTUS_PATH` and `LOTUS_MINER_PATH` variables:

    ```shell
    export LOTUS_PATH=~/.lotus-local-net
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    ```

1. Import the genesis miner key:

    ```shell
    ./lotus wallet import --as-default ~/.genesis-sectors/pre-seal-t01000.key
    ```

    This will output something like:

    ```plaintext
    imported key t3xe5je75lkrvye32tfl37gug3az42iotuu3wxgkrhbpbvmum4lu26begiw74ju5a35nveqaw4ywdibj4y6kxq successfully!
    ```

1. Set up the genesis miner. This process can take a few minutes:

    ```shell
    ./lotus-miner init --genesis-miner --actor=t01000 --sector-size=2KiB --pre-sealed-sectors=~/.genesis-sectors --pre-sealed-metadata=~/.genesis-sectors/pre-seal-t01000.json --nosync
    ```

    This process may take a few minutes. When complete, the terminal window will display:

    ```plaintext
    Miner successfully created, you can now start it with 'lotus-miner run'
    ```

1. Start the miner:

    ```shell
    ./lotus-miner run --nosync
    ```

    This command will output a lot of information and continue to run. You should now have two programs running at once - the `lotus` node and this `lotus-miner`. All further steps should be completed in a new terminal window.

## Next steps

You now have a fully functioning Filecoin local network! You can start testing your setup and playing with the Filecoin network in a safe and fast environment.

