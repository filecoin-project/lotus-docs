---
title: "Local network"
description: "Running a Filecoin network locally can be extremely useful for developers wanting to build and test their applications. This page provides guidance on different methods to run a Filecoin network locally."
lead: "Running a Filecoin network locally can be extremely useful for developers wanting to build and test their applications. This page provides guidance on different methods to run a Filecoin network locally."
draft: false
menu:
    developers:
        parent: "developers-networks"
        identifier: "developers-networks-local-network"
weight: 305
toc: true
aliases:
    - /docs/developers/developer-network
    - /docs/developers/local-network/
---

You can spin up a local network (local-net) using the regular Lotus binaries. This method will launch Lotus using 2 KiB sectors, allowing systems with fewer resources to run a local-net. This solution runs comfortably on a computer with 2 CPU cores and 4 GB RAM.

This process requires you to use multiple terminal windows, so you might find a terminal multiplexer like [Tmux](https://github.com/tmux/tmux) helpful. However, you can easily complete this tutorial by just having several terminal windows open. The screenshots in this guide use Tmux.

## Prerequisites

Since spinning up a local-net requires the `lotus` daemon, you need to have Lotus installed. To install `lotus`, you must complete the prerequisite steps based on your OS.

### Linux

#### System-specific software dependencies

Building Lotus requires some system dependencies, usually provided by your distribution.

Arch:

```shell
sudo pacman -Syu opencl-icd-loader gcc git bzr jq pkg-config opencl-icd-loader opencl-headers opencl-nvidia hwloc
```

Ubuntu/Debian:

```shell
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y
```

Fedora:

```shell
sudo dnf -y install gcc make git bzr jq pkgconfig mesa-libOpenCL mesa-libOpenCL-devel opencl-headers ocl-icd ocl-icd-devel clang llvm wget hwloc hwloc-devel
```

OpenSUSE:

```shell
sudo zypper in gcc git jq make libOpenCL1 opencl-headers ocl-icd-devel clang llvm hwloc && sudo ln -s /usr/lib64/libOpenCL.so.1 /usr/lib64/libOpenCL.so
```

Amazon Linux 2:

```shell
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm; sudo yum install -y git gcc bzr jq pkgconfig clang llvm mesa-libGL-devel opencl-headers ocl-icd ocl-icd-devel hwloc-devel
```

#### Rustup

Lotus needs [rustup](https://rustup.rs). The easiest way to install it is:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### Go

To build Lotus, you need a working installation of [Go 1.17.9 or higher](https://golang.org/dl/):

```shell
wget -c https://golang.org/dl/go1.17.9.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
```

{{< alert icon="tip">}}
You'll need to add `/usr/local/go/bin` to your path. For most Linux distributions you can run something like:

```shell
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
```

See the [official Golang installation instructions](https://golang.org/doc/install) if you get stuck.
{{< /alert >}}

### MacOS

#### Software dependencies

You must have XCode and Homebrew installed to build Lotus from source. Lotus requires that X-Code CLI tools be installed before building the Lotus binaries.

    Check if you already have the XCode Command Line Tools installed via the CLI, run:

    ```shell
    xcode-select -p
    ```

    This should output something like:

    ```plaintext
    /Library/Developer/CommandLineTools
    ```

    If this command returns a path, then you have Xcode already installed! You can [move on to installing dependencies with Homebrew](#homebrew).

   {{< alert icon="warning">}}
   If the above command doesn't return a path, install Xcode:

   ```shell
   xcode-select --install
   ```

   {{< /alert >}}

Next up is installing Lotus' dependencies using Homebrew.

#### Homebrew

We recommend that macOS users use [Homebrew](https://brew.sh) to install each of the necessary packages.

1. Use the command `brew install` to install the following packages:

   ```shell
   brew install go bzr jq pkg-config rustup hwloc coreutils
   ```

Next up is cloning the Lotus repository and building the executables.

#### Rust

We need to download and install the official compiler for the Rust programming language, and its package manager, Cargo.

```shell
rustup-init
```

Follow the prompts to install Rust. The default installation option should be chosen unless you are familiar with customisation.

#### Environment vairables

Create necessary environment variable:

    ```shell
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
    ```

## Lotus node setup

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

1. Checkout to the latest branch:

   ```shell
   git checkout <tag_or_release>
   # For example:
   git checkout <vX.X.X> # tag for a release
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

