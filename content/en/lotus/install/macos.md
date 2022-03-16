---
title: "MacOS"
description: "This page provide detailed steps to install Lotus on MacOS."
draft: false
menu:
    lotus:
         parent: "lotus-install"
         identifier: "lotus-install-macos"
weight: 130
toc: true
---

These instructions are specific to macOS. You can install Lotus on macOS 10.11 El Capitan or higher. If you are installing Lotus on a Linux distribution, head over to the [Linux section](#linux).

There are several ways to install Lotus on macOS:

- [Install with Homebrew](#install-with-homebrew).
- [Build from source](#build-from-source).

{{< alert icon="warning">}}**Miners should build from source.**
Building Lotus from source allows you to strictly configure how Lotus runs and how it communicates with its dependencies. Miners looking to improve their system efficiency should [install Lotus by building from source](#build-from-source).
{{< /alert >}}

## Install with Homebrew

You can quickly install Lotus using Homebrew on macOS.

1. Add the `filecoin-project/lotus` tap:

   ```shell
   brew tap filecoin-project/lotus
   ```

1. Install Lotus:

    ```shell
    brew install lotus
    ```

1. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

## Build from source

You can build the Lotus executables from source by following these steps.

### Software dependencies

You must have XCode and Homebrew installed to build Lotus from source.

#### XCode Command Line Tools

Lotus requires that X-Code CLI tools be installed before building the Lotus binaries.

1. Check if you already have the XCode Command Line Tools installed via the CLI, run:

    ```shell
    xcode-select -p
    ```
    ```
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
   brew install go bzr jq pkg-config rustup hwloc
   ```

Next up is cloning the Lotus repository and building the executables.

### Build and install Lotus

The installation instructions are different depending on which CPU is in your Mac:

- [M1-based CPUs](#m1-based-cpus)
- [Intel and AMD-based CPUs](#intel-and-amd-based-cpus)

#### M1-based CPUs

{{< alert icon="warning">}}
These instructions are for installing Lotus on an M1-based Mac. If you have an Intel or AMD-based CPU, use the [Intel and AMD-based CPU instructions ↓](#intel-and-amd-based-cpus)
{{< /alert >}}

1. Clone the repository:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Run `git checkout <RELEASE TAG>` to checkout to the latest Lotus release:

    ```shell
    git checkout v1.13.1
    ```

    You can use any tag listed on the [Lotus GitHub release page](https://github.com/filecoin-project/lotus/releases) to checkout to that specific release.

    {{< alert icon="tip">}}
    If you want to checkout to a network other than mainnet, take a look at the [Switching networks guide →](./switch-networks.md)
    {{< /alert >}}

1. Create necessary environment variable to allow Lotus to run on ARM architecture:

    ```shell
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    ```

1. Build the `lotus` daemon:

    ```shell
    make all
    ```

1. Run the final `make` command to move this `lotus` executable to `/usr/local/bin`. This allows you to run `lotus` from any directory.

    ```shell
    sudo make install
    ```

1. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

#### Intel and AMD-based CPUs

{{< alert icon="warning">}}
These instructions are for installing Lotus on an Intel or AMD-based Mac. If you have an M1-based CPU, use the [M1-based CPU instructions ↑](#m1-based-cpus)
{{< /alert >}}

1. Clone the repository:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Run `git checkout <RELEASE TAG>` to checkout to the latest Lotus release:

    ```shell
    git checkout v1.13.1
    ```

    You can use any tag listed on the [Lotus GitHub release page](https://github.com/filecoin-project/lotus/releases) to checkout to that specific release.

    {{< alert icon="tip">}}
    If you want to checkout to a network other than mainnet, take a look at the [Switching networks guide →]({{< relref "switch-networks" >}})
    {{< /alert >}}

1. If you are in China, take a look at some [tips for running Lotus in China]({{< relref "nodes-in-china" >}})".
1. Some older Intel and AMD processors without the ADX instruction support may panic with illegal instruction errors. To fix this, add the `CGO_CFLAGS` environment variable:

   ```shell
   export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
   export CGO_CFLAGS="-D__BLST_PORTABLE__"
   ```

   This is due to a Lotus bug that prevents Lotus from running on a processor without `adx` instruction support, and should be fixed soon.

1. Build and install Lotus:

   ```shell
   make clean && make all
   sudo make install
   ```

1. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).
