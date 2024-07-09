---
title: "Set up"
description: "The process of storing and retrieving data using the Filecoin network is slightly different from how most storage platforms work. This tutorial walks you through the whole end-to-end process of keeping your data and then getting it back when you need it! This tutorial should take you about an hour to complete."
lead: Setting up, storing, and retrieving using the Filecoin network
draft: true
menu:
    tutorials:
        parent: "tutorials-lotus"
aliases:
    - /docs/tutorials/store-and-retrieve/
    - /tutorials/store-and-retrieve/set-up/
weight: 105
toc: true
---

{{< alert icon="warning" >}}
The Legacy Lotus/Lotus-Miner Markets sub-system reached EOL at the [end of the 31st January 2023](https://github.com/filecoin-project/lotus/releases/tag/v1.18.0). It has been fully removed from the Lotus/Lotus-Miner codebase as of 10th June 2024. We recommend our users to use the [Boost markets sub-system](https://github.com/filecoin-project/boost) instead.
{{< /alert >}}

## Before we start

The process is split into three main parts: the set-up, storing your data and retrieving your data. Each section has several sub-processes that we need to follow.

| Section | Sub-tasks |
| --- | --- |
| Set up | 1. Get access to a Lotus full-node.<br> 2. Start a Lotus lite-node on your local computer.<br> 3. Get a FIL address.<br> 4. Sign up for Filecoin Plus. |
| Store data | 1. Package your data.<br> 2. Import your data into Lotus.<br> 3. Find a storage provider through the Filecoin Plus Registry.<br> 4. Create a storage deal.<br> 5. Wait for the deal to complete. |
| Retrieve data | 1. Create a retrieval deal.<br> 2. Download your data.|

It will take about an hour to complete this tutorial. While there aren't too many steps involved, there's a bit of waiting around for the network to process your requests.

{{< alert icon="tip" >}}
This tutorial uses the Filecoin mainnet. Everything you'll see over the next hour is happening on a production network with other users storing and retrieving data. But don't worry, this tutorial won't cost you anything! It's just important to know that you'll be dealing with real storage providers, real data, and real transactions.
{{< /alert >}}

### Take notes

There are a few things to remember throughout this tutorial, such as Miner IDs and addresses. There is a table at the end of each section showing the information you should record:

| Variable | Description | Example |
| --- | --- | --- |
| Miner ID | The unique identifier for each storage provider. | `f01000`

The above table is an example of what you will see throughout the tutorial; you don't have to copy it down.

### Terms and phrases

This tutorial contains some words and phrases that you might not be familiar with. Refer back to this table if you encounter something you don't understand:

| Word | Definition |
| --- | --- |
| Address | A string of letters and numbers that other users can send FIL to. |
| Block explorer | A service, usually a website, that lets you view details of a blockchain such as transactions, deals, and addresses. |
| Deal | An agreement between two computers about what to do with some data. |
| FIL | The shorthand representation of the filecoin cryptocurrency. For example: _We charge 0.5 FIL per GiB._ |
| Filecoin (upper-case `F`) | The network that transactions and storage deals take place on. For example: _Museums can use the Filecoin network to store their digital archives._ |
| filecoin (lower-case `f`) | The cryptocurrency that the Filecoin network runs on. For example: _You can use filecoin to pay for your transactions._ |
| Miner | An alternate name for a _storage provider_. |
| Private key | A string of letters and numbers that programs use to interact with the Filecoin network. Keep your private key safe, and don't share it with anyone. |
| Storage deal | An agreement between a storage provider and a client about what data to store, how long for, and how much the storage provider can charge for storage. |
| Retrieval deal | An agreement between a storage provider and a client about how much the storage provider can charge to send data to a client. |
| Storage client | The user that wants to store something on the Filecoin network. In this tutorial, _you_ are the storage client. |
| Storage provider | A computer on the Filecoin network offering storage space to other users who want to store data. Storage providers are sometimes called _miners_. |
| Wallet | A collection of addresses. Think of each wallet as a folder and each address as a single file in that folder. |

## Set up

Before you begin storing any data on the Filecoin network, you need to run through a few steps to get everything set up. This section covers getting access to a Lotus full-node, creating a Lotus lite-node on your computer, getting a FIL address, and signing up to Filecoin+.

{{< alert icon="tip" >}}
Programs that interact with the Filecoin network are called _implementations_, and Lotus is a command-line interface (CLI) implementation. There are other implementation being created alongside Lotus, however Lotus is the only Filecoin implementation created at Protocol Labs.
{{< /alert >}}

### Things to note

As you're going through this section, make a note of the following variables:

| Variable | Description | Example |
| --- | --- | --- |
| Your Filecoin address | The public part of your Filecoin address. This address is what other users can use to send your FIL. | `f1fwavjcfb32nxbczmh3kgdxhbffqjfsfby2otloi` |


### Access a full-node

A Lotus full-node is a computer running the `lotus daemon`. Full-nodes are unique because they have complete access to the Filecoin blockchain. The computer specifications required to run a Lotus full-node are relatively high and might be out of reach for most end-user laptops and PCs.

Usually, we'd have to _spin up_ a full-node, but in this tutorial, we're going to use the lotus gateway service `api.chain.love`.

## Install a lite-node

A lite-node lets your computer interact with the Filecoin network without having to run a resource-intensive full-node! Lite-nodes can do things like sign messages and talk to storage providers, but any processes that need data from the blockchain must come from a full-node. Luckily, lite-nodes automatically route any blockchain-based requests to a full-node. For this tutorial, you're going to run a Lotus lite-node on your local computer and have it connect to a full-node managed by Protocol Labs.

### Installing on macOS

{{< alert icon="tip" >}}**Requirements**
You can install Lotus on MacOS 10.11 El Capitan or higher. You must have [Homebrew](https://brew.sh/) installed.
{{< /alert >}}


1. Install Lotus from the filecoin-project tap

    ```shell
    brew install filecoin-project/lotus/lotus
    ```

2. Lotus is now installed on your computer.

[Head onto the next section to run your Lotus lite-node ↓](#run-a-lotus-lite-node)

### MacOS build from source

If you prefer to build from source, try these steps. 

1. Check that the XCode command line tools are installed.

    ```shell
    xcode-select -p (if missing, run xcode-select --install )
    ```
    
2. Install the pre-requisites via Homebrew

    ```shell
    brew install go jq pkg-config rustup hwloc coreutils
    ```

3. Clone the latest sources
    
    ```shell
    git clone https://github.com/filecoin-project/lotus.git
    ```

4. Switch into the lotus folder
    
    ```shell
    cd lotus/
    ```

5. Checkout the latest release
    
    ```shell
    LATEST_RELEASE=$(git tag -l 'v*' | grep -v "-" | sort -V -r | head -n 1) # Finds the latest Lotus Node release
    git checkout $LATEST_RELEASE    ```

6. Setup some environment variables correctly
    
    ```shell
    export LIBRARY_PATH=/opt/homebrew/lib
    export FFI_BUILD_FROM_SOURCE=1
    export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
    ```

7. Install Rust (when prompted, choose the default 'install' option) 
    
    ```shell
    rustup-init
    ```

{{< alert icon="tip" >}}If you don't want to restart the active terminal, 
then source "$HOME/.cargo/env". {{< /alert >}}

8. Build the clients
    
    ```shell
    make all
    ```

{{< alert icon="tip" >}}If you get a warning: 'kIOMasterPortDefault' is deprecated: first deprecated in macOS 12.0' , don't worry - the build still worked.
{{< /alert >}}

9. Finally, install the client into your system
    ```shell
    sudo make install
    ```
10. Verify the installation 
    ```shell
    lotus -v
    ```
Now, you're ready to [run a Lotus lite node](#run-a-lotus-lite-node)

### Linux

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


1. Download the latest Linux bundle from the [Lotus GitHub releases page](https://github.com/filecoin-project/lotus/releases/latest):

    ```shell
    wget https://github.com/filecoin-project/lotus/releases/download/v{{< version >}}/lotus_v{{< version >}}_linux_amd64.tar.gz
    ```

1. Extract tar -xvf archive.tar.gz executable:

    ```shell
    tar -xvf lotus_{{< version >}}_linux_amd64.tar.gz
    ```

1. Move the `lotus` binary to `/usr/local/bin`:

    ```shell
    sudo mv lotus_{{< version >}}_linux_amd64/lotus /usr/local/bin/lotus
    ```

[Head onto the next section to run your Lotus lite-node ↓](#run-a-lotus-lite-node)

## Run a Lotus lite-node

Now that you have Lotus ready to run, you can start a Lotus lite-node on your computer and connect to the `api.chain.love` Lotus full-node!

1. Open a terminal windows and run the `lotus daemon --lite` command, using `api.chain.love` as the full-node address:

    ```shell with-output
    FULLNODE_API_INFO=wss://api.chain.love lotus daemon --lite
    ```

    ```
    ...
    2021-06-16T02:00:08.390Z        INFO    markets loggers/loggers.go:56   module ready   {"module": "storage client"}
    2021-06-16T02:00:08.392Z        INFO    markets loggers/loggers.go:56   module ready   {"module": "retrieval client"}
    2021-06-16T02:00:18.190Z        INFO    basichost       basic/natmgr.go:91      DiscoverNAT error:no NAT found
    ...
    ```

1. MacOS users may see a warning regarding Lotus. Select **Accept incoming connections** if you see a warning.

1. The Lotus daemon will continue to run. You must run further commands from a separate terminal window.

Next up is [getting a FIL address ↓](#get-a-fil-address)

## Get a FIL address

Filecoin addresses are similar to regular bank account numbers. Other users can use your address to send you FIL, and you can use your address to pay storage providers for storing and retrieving your data.

There are two parts to a Filecoin address: the public address and the private key. You can freely share your public address with anyone, but you should never share your private key. We're not going to view any private keys in this tutorial, but it's essential to understand the difference between your public address and your private key.

1. Open a new terminal window and create an address using the `lotus wallet new` command:

    ```shell with-output
    lotus wallet new
    ```

    ```
    f1fwavjcfb32nxbczmh3kgdxhbffqjfsfby2otloi
    ```

    Lotus outputs your public address. Public addresses always start with `f1`.

1. Make a note of this address. We'll use it in an upcoming section.

## Backup your address

Your address is made up of two parts: your _public address_ and your _private key_. The public address is what you see when you run `lotus wallet new`, and you're safe to share that address with whoever you want. Your private key, however, must be kept secret and secure. If you lose your private key, you lose access to any FIL stored in that address.

It is incredibly important that you backup your addresses. Storing a copy of your addresses on another device is a great way to ensure you don't lose access to your funds.

1. If your public address `f1...` is still in the terminal window, copy it to your clipboard. If not, list the addresses associated with your Lotus node and copy your public address:

    ```shell with-output
    lotus wallet list
    ```

    ```
    Address                                    Balance  Nonce  Default
    f1nau67e6k6ggdwluatfz4waexetjfrqmx6fil3nq  0 FIL    0      X
    ```

1. Use `lotus wallet export` to export your private key, replacing `f1...` with your public key:

    ```shell
    lotus wallet export f1... > my_address.key
    ```

    This will create a new file called `my_address.key` in the current directory.

Once you have your address in a file, you can copy it to another drive, securely send it to another computer, or even print it out. It's important to keep this file safe. If anything happens to your Lotus node, you can still access your funds using this file.

## Adding FIL to your wallet or using Filecoin Plus?

Before you can transact on the network, you usually have to add some Filecoin to your wallet. You can do this via an exchange such as [Coinbase](https://www.coinbase.com), but you can bypass this stage by applying for Filecoin Plus Datacap below. If you have Datacap on your wallet, then transaction fees are covered, and you can start doing deals faster.  

{{< alert icon="tip" >}}
[Read more about managing wallets]({{< relref "manage-fil" >}})
{{< /alert >}}

## Filecoin Plus

Storage providers get paid either by receiving FIL directly from users for storing their data, winning block rewards from the network, or both!

Getting paid from users is straightforward. If Laika wants to store some data, and Albert is a storage provider, the two of them can create a deal to store Laika's data for `X` amount of time for `Y` FIL.

Block rewards are randomly given to a storage provider every 30 seconds. The more data that a storage provider is _storing_, the higher their chances of winning the block reward. So if a storage provider accepts a deal from a user to store 5 GB of data, they have 5 chances to win the block reward for each 30 second round.

DataCap acts as a kind of _multiplier_ for block rewards. If a storage provider accepts a deal from a user with DataCap attached, also known as a _verified deal_ , then the Filecoin network treats that deal as though it's 10x bigger. So a 5 GB deal gives the storage provider 50 chances to win the block reward instead of the usual 5 chances. Some storage providers find DataCap so valuable that they're willing to make verified deals without charging any FIL! You can find a list of these storage providers using the [Filecoin Plus storage provider registry](https://plus.fil.org/miners/).

### Sign up

Signing up to Filecoin Plus is easy and free!

{{< alert icon="tip" >}}
You need a GitHub account that is at least 180 days old. If you don't have a GitHub account that's old enough, [get in touch with #fil-lotus-help on Filecoin Slack](https://filecoinproject.slack.com/archives/CPFTWMY7N).
{{< /alert >}}

1. Go to [plus.fil.org](https://plus.fil.org).
1. Under **For Clients**, click **Proceed**.
1. Under **Get Verified**, click **Get Datacap**.
1. Click **Automatic Verification**.
1. Click **Github** to connect to your Github account
1. In the `Request` field, enter the public address you got from running `lotus wallet list`. This step may take a few minutes to complete.

You can check your Filecoin Plus balance with
```shell
lotus filplus check-client-datacap f1...
```

{{< alert icon="tip" >}}
You can only request automatic datacap once every 30 days for a single GitHub account.
{{< /alert >}}
