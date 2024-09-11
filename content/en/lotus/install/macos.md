---
title: "MacOS"
description: "This page provide detailed steps to install Lotus on MacOS."
draft: false
menu:
    lotus:
         parent: "lotus-install"
         identifier: "lotus-install-macos"
weight: 215
toc: true
---

These instructions are specific to macOS. You can install Lotus on macOS 10.11 El Capitan or higher. If you are installing Lotus on a Linux distribution, head over to the [Linux section](#linux).

There are several ways to install Lotus on macOS:

- [Install with Homebrew](#install-with-homebrew).
- [Build from source](#build-from-source).

{{< alert icon="warning">}}**Storage providers should build from source.**
Building Lotus from source allows you to strictly configure how Lotus runs and how it communicates with its dependencies. Storage providers looking to improve their system efficiency should [install Lotus by building from source](#build-from-source).
{{< /alert >}}

## Install with Homebrew

You can quickly install Lotus using Homebrew on macOS.

1. Add the `filecoin-project/lotus` tap:

    ```shell
    brew tap filecoin-project/lotus
    ```

1. Install Lotus:

    ```shell
    brew install lotus --formula
    ```

1. You should now have Lotus installed. You can now [start the Lotus daemon]().
 
{{< alert icon="tip" >}}
You can also start the node in Lite mode if you leverage a public RPC provider, or have access to a full-node. Check out the [Start the lite-node]({{< relref "../../lotus/install/lotus-lite/#start-the-lite-node" >}}) article.
{{< /alert >}}

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

    This should output something like:

    ```plaintext
    /Library/Developer/CommandLineTools
    ```

    If this command returns a path, then you have Xcode already installed! You can [move on to installing dependencies with Homebrew](#homebrew). If the above command doesn't return a path, install Xcode:

    ```shell
    xcode-select --install
    ```

Next up is installing Lotus' dependencies using Homebrew.

#### Homebrew

We recommend that macOS users use [Homebrew](https://brew.sh) to install each of the necessary packages.

1. Use the command `brew install` to install the following packages:

   ```shell
   brew install go jq pkg-config hwloc coreutils
   ```

Next up is cloning the Lotus repository and building the executables.

#### Rust

Rustup is an installer for the systems programming language Rust. Run the installer and follow the onscreen prompts. The default installation option should be chosen unless you are familiar with customisation:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Build and install Lotus

The installation instructions are different depending on which CPU is in your Mac:

- [M1-based CPUs](#m1-based-cpus)
- [Intel CPUs](#intel-cpus)

#### M1-based CPUs

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

1. Create the necessary environment variables to allow Lotus to run on M1 architecture:

    ```shell
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
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

#### Intel CPUs

{{< alert icon="warning">}}
These instructions are for installing Lotus on an Intel Mac. If you have an M1-based CPU, use the [M1-based CPU instructions ↑](#m1-based-cpus)
{{< /alert >}}

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

1. If you are in China, take a look at some [tips for running Lotus in China]({{< relref "../../kb/nodes-in-china/" >}})".

1. Build and install Lotus:

    ```shell
    make clean all
    sudo make install
    ```
