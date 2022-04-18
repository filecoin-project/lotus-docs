---
title: "Linux"
description: "This page provide detailed steps to install Lotus on Linux."
draft: false
menu:
    lotus:
         parent: "lotus-install"
weight: 120
toc: true
---

The following instructions are specific to Linux installations.

There are several ways to install Lotus on Linux:

+ [Snap package manager](#snap-package-manager)
+ [AppImages](#appimage)
+ [Building from source](#building-from-source).

{{< alert icon="warning">}}**Storage providers should build from source**.

Building Lotus from source allows you to strictly configure how Lotus runs and how it communicates with its dependencies. Storage providers looking to improve their system efficiency should [install Lotus by building from source](#building-from-source).
{{< /alert >}}

## Snap package manager

To install Lotus using Snap, run:

```shell
snap install lotus-filecoin
```

You can also install nightly builds by using the `--edge` flag. These builds are created every night from the `master` branch [Lotus GitHub repository](https://github.com/filecoin-project/lotus).

```shell
snap install lotus-filecoin --edge
```

You can find out more about this Snap [over at Snapcraft.io](https://snapcraft.io/lotus-filecoin).

## AppImage

[AppImages](https://appimage.org/) are portable applications that allow developers to package software and dependencies in a single executable. AppImages run on most Linux-based operating systems.

1. Go to the latest [releases page in the Lotus GitHub repository](https://github.com/filecoin-project/lotus/releases/tag/v1.13.0).
1. Under **Assets**, download the AppImage.
1. Open a terminal window and move to the location where you downloaded the AppImage. This location is likely your **Downloads** folder:

    ```shell
    cd ~/Downloads
    ```

1. Make the AppImage executable:

    ```shell
    chmod +x lotus_v1.13.0_linux-amd64.appimage
    ```

1. You can now run the AppImage file by double-clicking on it or opening it from a terminal window:

    ```shell
    ./lotus-v1.13.0_linx-amd64.appimage
    ```

## Building from source

You can build the Lotus executables from source by following these steps.

### Software dependencies

You will need the following software installed to install and run Lotus.

### System-specific

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

### Rustup

Lotus needs [rustup](https://rustup.rs). The easiest way to install it is:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Go

To build Lotus, you need a working installation of [Go 1.16.4 or higher](https://golang.org/dl/):

```shell
wget -c https://golang.org/dl/go1.16.4.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
```

{{< alert icon="tip">}}
You'll need to add `/usr/local/go/bin` to your path. For most Linux distributions you can run something like:

```shell
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
```

See the [official Golang installation instructions](https://golang.org/doc/install) if you get stuck.
{{< /alert >}}

### Build and install Lotus

Once all the dependencies are installed, you can build and install Lotus.

1. Clone the repository:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Checkout the release for the network you wish to use.

   To join mainnet, checkout the [latest release](https://github.com/filecoin-project/lotus/releases).

   If you are changing networks from a previous Lotus installation or there has been a network reset, read the [Switch networks guide]({{< relref "switch-networks" >}}) before proceeding.

   For networks other than mainnet, look up the current branch or tag/commit for the network you want to join in the [Filecoin networks dashboard](https://network.filecoin.io), then build Lotus for your specific network below.

   ```shell
   git checkout <tag_or_branch>
   # For example:
   git checkout <vX.X.X> # tag for a release
   ```

   Currently, the latest code on the _master_ branch corresponds to the mainnet.

1. If you are in China, see "[Lotus: tips when running in China]({{< relref "" >}})".
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

   Lotus is compiled to operate on a single network,  run one of the following commands to build the lotus node for the specific lotus network.

   ```shell
   # join mainnet
   make clean all

   # Or to join a testnet or devnet:
   make clean calibnet # Calibration with min 32GiB sectors

   sudo make install
   ```

   This will put `lotus`, `lotus-miner` and `lotus-worker` in `/usr/local/bin`.

   `lotus` will use the `$HOME/.lotus` folder by default for storage (configuration, chain data, wallets). See [advanced options]({{< relref "configuration" >}}) for information on how to customize the Lotus folder.

   Once the installation is finished, use the command down below to ensure lotus is installed successfully for the right network.

   ```shell
   lotus --version
   ```
   ```
   lotus version 1.13.0+calibnet+git.7a55e8e89
   ```

1. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

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

## Start the Lotus daemon and sync the chain

The `lotus` application runs as a daemon and a client to control and interact with that daemon. A daemon is a long-running program that is usually run in the background.

When using _mainnet_, we recommend you start the daemon [syncing from a trusted state snapshot]({{< relref "../manage/chain-management#lightweight-snapshot" >}}). In any case, you can start the daemon with the following command:

```shell
lotus daemon
```

During the first run, Lotus will:

- Set up its data folder at `~/.lotus`.
- Download the necessary proof parameters. This is a few gigabytes of data that is downloaded once.
- Import the snapshot (if specified) and start syncing the Lotus chain.

The daemon will start producing lots of log messages right away. From this point, you will have to work on a new terminal. Any`lotus` commands you run now will communicate with the running daemon.

{{< alert icon="tip">}}
Do not be concerned by the number of warnings and sometimes errors showing in the logs. They are a normal part of the daemon lifecycle as it participates in the globally distributed consensus network.
{{< /alert >}}

If you used snapshots, subsequent daemon starts can proceed as normal without any options:

```shell
lotus daemon
## When running with systemd do:
# systemctl start lotus-daemon
```

For more information about syncing and snapshots, [see the Chain management section]({{< relref "../manage/chain-management" >}}).

We recommend waiting until the syncing process has completed, which should be relatively fast when using trusted state snapshot imports:

```shell
lotus sync wait
```

## Interact with the daemon

The `lotus` command allows you to interact with a _running_ Lotus daemon. The `lotus-miner` and `lotus-worker` commands work in the same way.

Lotus comes with built-in CLI documentation.

```shell
lotus
  - chain: Interact with filecoin blockchain
  - client: Make deals, store data, retrieve data
  - wallet: Manage wallet
  - net: Manage P2P Network
  - sync: Inspect or interact with the chain syncer
  ...

# Show general help
lotus --help
# Show help for the "client" to make deals, store data, retrieve data
lotus client --help
```

For example, after your Lotus daemon has been running for a few minutes, use `lotus sync` to check the sync status of your lotus node.

```shell
lotus net sync
```
```
sync status:
...
	Target:	[bafy2bzaceaki6bjhe2lxmtyexcff6vh5y5uw4tmbjr3gatwvh5dhaqqb2ykaa] (320791)
	Stage: complete
	Height: 320791
...
```

Or use `lotus net` to check the number of other peers that it is connected to in the Filecoin network.

```shell
lotus net peers
```
```
12D3KooWSDqWSDNZtpJae15FBGpJLeLmyabUfZmWDWEjqEGtUF8N, [/ip4/58.144.221.27/tcp/33425]
12D3KooWRTQoDUhWVZH9z5u9XmaFDvFw14YkcW7dSBFJ8CuzDHnu, [/ip4/67.212.85.202/tcp/10906]
```

Or check the current version of your Lotus node as well as network.

```shell
lotus version
```
```
Daemon:  1.13.0+calibnet+git.7a55e8e89+api1.4.0
Local: lotus version 1.13.0+calibnet+git.7a55e8e89
# running lotus v1.13.0 on Calibration testnet
```

## Stop the Lotus daemon

To gracefully stop the running lotus daemon (required when restarting the daemon to update Lotus), use the following command:

```shell
lotus daemon stop
## When running with systemd do:
# systemctl stop lotus-daemon
```
