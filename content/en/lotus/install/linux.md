---
title: "Lotus on Linux"
description: "This page provides detailed steps to install Lotus on Linux."
draft: false
menu:
    lotus:
         parent: "lotus-install"
weight: 210
toc: true
---

The following instructions are specific to Linux installations.

There are several ways to install Lotus on Linux:

+ [Downloading from Github](#downloading-from-github)
+ [Building from source](#building-from-source).

{{< alert icon="warning">}}**Storage providers should build from source**.

Building Lotus from source allows you to strictly configure how Lotus runs and how it communicates with its dependencies. Storage providers looking to improve their system efficiency should [install Lotus by building from source](#building-from-source).
{{< /alert >}}

## Downloading from Github

1. Install Lotus dependencies:

    Arch:
    
    ```shell
    sudo pacman -Syu hwloc
    ```
    
    Ubuntu/Debian:
    
    ```shell
    sudo apt install -y hwloc
    ```
    
    Fedora:
    
    ```shell
    sudo dnf -y install hwloc
    ```
    
    OpenSUSE:
    
    ```shell
    sudo zypper in hwloc
    ```
    
    Amazon Linux 2:
    
    ```shell
    sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm; sudo yum install -y hwloc-devel
    ```

2. Download the latest Linux bundle from the [Lotus GitHub releases page](https://github.com/filecoin-project/lotus/releases/latest):

    ```shell
    wget https://github.com/filecoin-project/lotus/releases/download/v{{< version >}}/lotus_v{{< version >}}_linux_amd64_v1.tar.gz
    ```

3. Extract tar -xvf archive.tar.gz executable:

    ```shell
    tar -xvf lotus_v{{< version >}}_linux_amd64_v1.tar.gz
    ```

4. Move the `lotus` binary to `/usr/local/bin`:

    ```shell
    sudo mv lotus_{{< version >}}_linux_amd64/lotus /usr/local/bin/lotus
    ```

5. Set execute permissions on the binary:

    ```shell
    chmod ugo+x /usr/local/bin/lotus
    ```

## Building from source

You can build the Lotus executables from source by following these steps.

### Software dependencies

You will need the following software installed to install and run Lotus.

### System-specific

Building Lotus requires some system dependencies, usually provided by your distribution.

Arch:

```shell
sudo pacman -Syu opencl-icd-loader gcc git jq pkg-config opencl-icd-loader opencl-headers opencl-nvidia hwloc
```

Ubuntu/Debian:

```shell
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y
```

Fedora:

```shell
sudo dnf -y install gcc make git jq pkgconfig mesa-libOpenCL mesa-libOpenCL-devel opencl-headers ocl-icd ocl-icd-devel clang llvm wget hwloc hwloc-devel
```

OpenSUSE:

```shell
sudo zypper in gcc git jq make libOpenCL1 opencl-headers ocl-icd-devel clang llvm hwloc && sudo ln -s /usr/lib64/libOpenCL.so.1 /usr/lib64/libOpenCL.so
```

Amazon Linux 2:

```shell
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm; sudo yum install -y git gcc jq pkgconfig clang llvm mesa-libGL-devel opencl-headers ocl-icd ocl-icd-devel hwloc-devel
```

### Rustup

Lotus needs [rustup](https://rustup.rs). The easiest way to install it is:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Go

To build Lotus, you need a working installation of [Go {{< version "go" >}} or higher](https://golang.org/dl/):

```shell
wget -c https://golang.org/dl/go{{< version "go" >}}.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
```

{{< alert icon="tip">}}
You'll need to add `/usr/local/go/bin` to your path. For most Linux distributions, you can run something like:

```shell
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
```

See the [official Golang installation instructions](https://golang.org/doc/install) if you get stuck.
{{< /alert >}}

## System Configuration

Before you proceed with the installation, you should increase the UDP buffer. You can do this by running the following commands:

```shell
sudo sysctl -w net.core.rmem_max=2097152
sudo sysctl -w net.core.rmem_default=2097152
```

### Build and install Lotus

Once all the dependencies are installed, you can build and install Lotus.

1. Clone the repository:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Switch to the latest stable release branch:

    ```shell
    git pull
    LATEST_RELEASE=$(git tag -l 'v*' | grep -v "-" | sort -V -r | head -n 1) # Finds the latest Lotus Node release
    git checkout $LATEST_RELEASE
    ```

    The latest production release can be found on [GitHub](https://github.com/filecoin-project/lotus/releases) or via the [command line](https://github.com/filecoin-project/lotus/blob/master/LOTUS_RELEASE_FLOW.md#why-is-the-releases-branch-deprecated-and-what-are-alternatives).

1. If you are in China, see "[Lotus: tips when running in China]({{< relref "../../kb/nodes-in-china/" >}})".
1. Depending on your CPU model, you will want to export additional environment variables:

    a. If you have **an AMD Zen or Intel Ice Lake CPU (or later)**, enable the use of SHA extensions by adding these two environment variables:

    ```shell
    export RUSTFLAGS="-C target-cpu=native -g"
    export FFI_BUILD_FROM_SOURCE=1
    ```

    See the [Native Filecoin FFI section](#native-filecoin-ffi) for more details about this process.

    a. Some older Intel and AMD processors without the ADX instruction support may panic with illegal instruction errors. To solve this, add the `CGO_CFLAGS` environment variable:

    ```shell
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    ```

    a. By default, a 'multicore-sdr' option is used in the proofs library.  This feature is also used in FFI unless explicitly disabled.  To disable building with the 'multicore-sdr' dependency, set `FFI_USE_MULTICORE_SDR` to `0`:

    ```shell
    export FFI_USE_MULTICORE_SDR=0
    ```

1. Build and install Lotus

   Lotus is compiled to operate on a single network.

   Choose the network you want to join, then run the corresponding command to build the Lotus node:

   ```shell
   # For Mainnet:
   make all

   # For Calibration Testnet:
   make calibnet
   ```
   Install Lotus:
   ```shell
   sudo make install
   ```

   This will put `lotus`, `lotus-miner` and `lotus-worker` in `/usr/local/bin`.

   `lotus` will use the `$HOME/.lotus` folder by default for storage (configuration, chain data, wallets). See [advanced options]({{< relref "configuration" >}}) for information on how to customize the Lotus folder.

   Once the installation is finished, use the command below to ensure lotus is installed successfully for the right network.

   ```shell
   lotus --version
   ```
   ```
   lotus version 1.23.3+mainnet+git.7bb1f98ac
   # or
   lotus version 1.23.3+calibnet+git.7bb1f98ac
   ```

1. You should now have Lotus installed. You can now [start the Lotus daemon]({{< relref "start-lotus.md#start-the-lotus-daemon" >}})


### Native Filecoin FFI

Some newer CPU architectures like AMD's Zen and Intel's Ice Lake have support for SHA extensions. Having these extensions enabled significantly speeds up your Lotus node. To make full use of your processor's capabilities, make sure you set the following variables **before building from source**:

```shell
export RUSTFLAGS="-C target-cpu=native -g"
export FFI_BUILD_FROM_SOURCE=1
```

This method of building does not produce portable binaries. Make sure you run the binary on the same computer as you built it.

### Systemd service files

Lotus provides **generic** Systemd service files. They can be installed with:

```shell
make install-daemon-service
make install-miner-service
```

{{< alert icon="warning">}}
Provided service files should be **inspected and edited** according to user needs as they are very generic and may lack specific environment variables and settings needed by the users.

One example is that logs are redirected to files in `/var/log/lotus` by default and not visible in `journalctl`.
{{< /alert >}}
