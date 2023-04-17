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

Using Brew, install Lotus from the `filecoin/lotus` tap:

```shell
brew install filecoin-project/lotus/lotus
```

Lotus is now installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

## Build from source

You can build the Lotus executables from source by following these steps.

### Prerequisites

You must have XCode, Homebrew and Rust installed to build Lotus from source. Instructions for each are listed below.

#### Install XCode CLI

Lotus requires that XCode CLI be installed before building the Lotus binaries. To check if you already have XCode CLI, run:

```shell
xcode-select -p
```

This should output something like:

```plaintext
/Library/Developer/CommandLineTools
```

[move on to installing dependencies with Homebrew](#install-dependencies-with-homebrew)

```shell
xcode-select --install
```

#### Install dependencies with Homebrew

We recommend that macOS users use [Homebrew](https://brew.sh) to install each of the necessary packages. Use the command `brew install` to install the following packages:

   ```shell
   brew install go bzr jq pkg-config hwloc coreutils
   ```

#### Install Rust using Rustup

Rustup is an installer for the systems programming language Rust. Run the installer and follow the onscreen prompts. The default installation option should be chosen unless you are familiar with customization:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Build and install Lotus

1. Clone the repository:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    ```

1. Navigate to the repository:

   ```shell
   cd lotus/
   ```

1. Switch to the latest stable release branch:

    ```shell
    git checkout releases
    ```

    The `releases` branch always contains the latest stable release for Lotus. If you want to checkout to a network other than mainnet, take a look at the [Switching networks guide →]({{< relref "switch-networks" >}})

    If you are in China, take a look at the [tips for running Lotus in China]({{< relref "../../kb/nodes-in-china/" >}})".

1. Build the `lotus` daemon:

    ```shell
    make clean all
    ```

1. Run the final `make` command to move the `lotus` executable to `/usr/local/bin`. This allows you to run `lotus` from any directory.

    ```shell
    sudo make install
    ```

    Lotus is installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).
