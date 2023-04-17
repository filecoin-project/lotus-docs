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

These instructions are specific to macOS. If you are installing Lotus on a Linux distribution, head over to the [Linux section](#linux). There are several ways to install Lotus on macOS:

- [Install with Homebrew](#install-with-homebrew).
- [Build from source](#build-from-source).

{{< alert icon="warning">}}**Storage providers should build from source.**
Building Lotus from source allows you to strictly configure how Lotus runs and how it communicates with its dependencies. Storage providers looking to improve their system efficiency should [install Lotus by building from source](#build-from-source).
{{< /alert >}}

## System requirements

To install Lotus, you must be running macOS 10.11 El Capitan or higher. 

## Install with Homebrew

Using Brew, install Lotus from the `filecoin/lotus` tap:

```shell
brew install filecoin-project/lotus/lotus
```

Lotus is installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

## Build from source

You can build the Lotus executables from source by following these steps.

### Prerequisites

You must have XCode and Homebrew installed to build Lotus from source.

#### Install XCode CLI

Lotus requires XCode CLI before building the Lotus binaries.

To check if you already have XCode CLI installed, run:

```shell
xcode-select -p
```

This should output something like:

```plaintext
/Library/Developer/CommandLineTools
```

If this command returns a path like the one shown above, move on to [installing dependencies with Homebrew](#homebrew). If the above command doesn't return a path, install Xcode:

```shell
xcode-select --install
```

Next up, install dependencies using Homebrew.

#### Install dependencies with Homebrew

Using [Homebrew](https://brew.sh), install the following packages:

```shell
brew install go bzr jq pkg-config hwloc coreutils
```

Next up, install Rust using Rustup.

#### Install Rust using Rustup

Rustup is an installer for the systems programming language Rust. Run the installer and follow the onscreen prompts. The default installation option should be chosen unless you are familiar with customisation:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Now, build and install Lotus.

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

1. This step depends on your specific hardware set up. If your hardware is:

   - Intel hardware, move to the next step.
   - Apple hardware (Apple M1, etc), create the necessary environment variables to allow Lotus to run on M1 architecture:

        ```shell
        export LIBRARY_PATH=/opt/homebrew/lib
        export FFI_BUILD_FROM_SOURCE=1
        export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
        ```

1. Build the `lotus` daemon:

    ```shell
    make clean all
    ```

1. Run the final `make` command to move this `lotus` executable to `/usr/local/bin`. This allows you to run `lotus` from any directory.

    ```shell
    sudo make install
    ```

Lotus is installed. Next, [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).
