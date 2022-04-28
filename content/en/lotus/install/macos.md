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
   brew install go bzr jq pkg-config rustup hwloc coreutils
   ```

Next up is cloning the Lotus repository and building the executables.

#### Rust

We need to download and install the official compiler for the Rust programming language, and its package manager, Cargo.

```shell
rustup-init
```

Follow the prompts to install Rust. The default installation option should be chosen unless you are familiar with customisation.

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
   git checkout <tag_or_release>
   # For example:
   git checkout <vX.X.X> # tag for a release
   ```

    You can use any tag listed on the [Lotus GitHub release page](https://github.com/filecoin-project/lotus/releases) to checkout to that specific release.

{{< alert icon="tip">}}
If you want to checkout to a network other than mainnet, take a look at the [Switching networks guide →]({{< relref "switch-networks" >}})
{{< /alert >}}

3. Create necessary environment variable to allow Lotus to run on ARM architecture:

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
   git checkout <tag_or_release>
   # For example:
   git checkout <vX.X.X> # tag for a release
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
   export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
   ```

   This is due to a Lotus bug that prevents Lotus from running on a processor without `adx` instruction support, and should be fixed soon.

1. Build and install Lotus:

   ```shell
   make clean && make all
   sudo make install
   ```

1. You should now have Lotus installed. You can now [start the Lotus daemon](#start-the-lotus-daemon-and-sync-the-chain).

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
```
