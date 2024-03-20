---
title: "Install"
date: 2024-03-19T21:15:17+04:00
description: "This guide will show how to build, install and update Curio binaries"
lead: "This guide will show how to build, install and update Curio binaries"
menu:
  storage-providers:
    parent: "curio"
weight: 110
toc: true
---

## Build from source

You can build the Curio executables from source by following these steps.

### Software dependencies

You must have XCode and Homebrew installed to build Curio from source.

#### XCode Command Line Tools

Curio requires that X-Code CLI tools be installed before building the Curio binaries.

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

Next up is installing Curio's dependencies using Homebrew.

#### Homebrew

We recommend that macOS users use [Homebrew](https://brew.sh) to install each of the necessary packages.

1. Use the command `brew install` to install the following packages:

   ```shell
   brew install go bzr jq pkg-config hwloc coreutils
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

2. Switch to the latest stable release branch:

    ```shell
    git checkout master
    ```

3. Create the necessary environment variables to allow Curio to run on M1 architecture:

    ```shell
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
    ```

4. Build the `curio` binary:

    ```shell
    make curio
    ```

5. Run the final `make` command to move this `curio` executable to `/usr/local/bin`. This allows you to run `curio` from any directory.

    ```shell
    sudo make install
    ```

6. You should now have Curio installed. You can now set up a new Curio cluster or migrating from Lotus-Miner. TODO: Link

#### Intel CPUs

{{< alert icon="warning">}}
These instructions are for installing Lotus on an Intel Mac. If you have an M1-based CPU, use the [M1-based CPU instructions ↑](#m1-based-cpus)
{{< /alert >}}

1. Clone the repository:

    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    cd lotus/
    ```

2. Switch to the latest stable release branch:

    ```shell
    git checkout master
    ```

3. Build and install Lotus:

    ```shell
    make clean curio
    sudo make install
    ```

