---
title: "Store and retrieve"
description: "The process of storing and retrieving data using the Filecoin network is slightly different from how most storage platforms work. This tutorial walks you through the whole end-to-end process of keeping your data and then getting it back when you need it! This tutorial should take you about an hour to complete."
lead: "The process of storing and retrieving data using the Filecoin network is slightly different from how most storage platforms work. This tutorial walks you through the whole end-to-end process of keeping your data and then getting it back when you need it! This tutorial should take you about an hour to complete."
draft: false
menu:
    docs:
        parent: "tutorials"
weight: 10
toc: true
mermaid: true
---

## Before we start

The process is split into three main parts: the set-up, storing your data and retrieving your data. Each section has several sub-processes that we need to follow.

{{< mermaid >}}
flowchart TB
    subgraph set-up [Set up]
    a1[Get a Lotus full-node]-->a2[Create a Lotus lite-node]
    a2-->a3[Create a Filecoin address]
    a3-->a4[Sign up to Filecoin plus]
    end
    subgraph Store
    b1[Package your data]-->b2[Import your data into Lotus]
    b2-->b3[Find a miner]
    b3-->b4[Create a storage deal]
    b4-->b5[Wait for the deal to complete]
    end
    subgraph Retrieve
    c1[Create a retrieval deal]-->c2[Download your data]
    end
    set-up --> Store
    Store --> Retrieve
{{< /mermaid >}}

| Section | Sub-tasks |
| --- | --- |
| Set up | 1. Get access to a Lotus full-node.<br> 2. Start a Lotus lite-node on your local computer.<br> 3. Get a FIL address.<br> 4. Sign up for Filecoin Plus. |
| Store data | 1. Package your data.<br> 2. Import your data into Lotus.<br> 3. Find a storage provider through the Filecoin Plus miner registry.<br> 4. Create a storage deal.<br> 5. Wait for the deal to complete. |
| Retrieve data | 1. Create a retrieval deal.<br> 2. Download your data.|

It will take about an hour to complete this tutorial. While there aren't too many steps involved, there's a bit of waiting around for the network to process your requests.

{{< alert icon="tip" >}}
This tutorial uses the Filecoin mainnet. Everything you'll see over the next hour is happening on a production network with other users storing and retrieving data. But don't worry, this tutorial won't cost you anything! It's just important to know that you'll be dealing with real storage providers, real data, and real transactions.
{{< /alert >}}

#### Take notes

There are a few things to remember throughout this tutorial, such as Miner IDs and addresses. There is a table at the end of each section showing the information you should record:

| Variable | Description | Example |
| --- | --- | --- |
| Miner ID | The unique identifier for each storage provider. | `f01000`

The above table is an example of what you will see throughout the tutorial; you don't have to copy it down.

#### Terms and phrases

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

{{< mermaid >}}
graph LR
    A[Get a Lotus node] -->B[Create a local Lotus lite-node]
    B --> C[Get a FIL address]
    C --> D[Sign up to Filecoin Plus]
{{< /mermaid >}}

{{< alert icon="tip" >}}
Programs that interact with the Filecoin network are called _implementations_, and Lotus is a command-line interface (CLI) implementation. There are other implementation being created alongside Lotus, however Lotus is the only Filecoin implementation created and maintained by Protocol Labs.
{{< /alert >}}

#### Things to note

As you're going through this section, make a note of the following variables:

| Variable | Description | Example |
| --- | --- | --- |
| Your Filecoin address | The public part of your Filecoin address. This address is what other users can use to send your FIL. | `f1fwavjcfb32nxbczmh3kgdxhbffqjfsfby2otloi` |

### Prerequisites

If you are using macOS you must have [Homebrew](https://brew.sh) installed. If you are using Linux you must have [Snapd](https://snapcraft.io/docs/installing-snapd) installed.

### Access a full-node

A Lotus full-node is a computer running the `lotus daemon`. Full-nodes are unique because they have complete access to the Filecoin blockchain. The computer specifications required to run a Lotus full-node are relatively high and might be out of reach for most end-user laptops and PCs.

Usually, we'd have to _spin up_ a full-node, but we're going to use a Lotus full-node provided by Protocol Labs for this tutorial. This node, called `api.chain.love`, is only for practice sessions like this tutorial and should not be relied upon for any production or development purposes.

### Install a lite-node

A lite-node lets your computer interact with the Filecoin network without having to run a resource-intensive full-node! Lite-nodes can do things like sign messages and talk to storage providers, but any processes that need data from the blockchain must come from a full-node. Luckily, lite-nodes automatically route any blockchain-based requests to a full-node. For this tutorial, you're going to run a Lotus lite-node on your local computer and have it connect to a full-node managed by Protocol Labs.

{{< mermaid >}}
graph LR
    A(Get a Lotus node) -- blockchain requests -->B[Full-node]
    A -- storage/retrieval requests --> C[Filecoin miner]
    B --> D((The Filecoin Blockchain))
    C --> D
{{< /mermaid >}}

To install a Lotus lite-node on your computer, you must have the tools required to _build_ a Lotus binary from the GitHub repository.

#### macOS

{{< alert icon="callout">}}
You can install Lotus on MacOS 10.11 El Capitan or higher. You must have [Homebrew](https://brew.sh/) installed.
{{< /alert >}}

1. Add the `filecoin-project/lotus` Homebrew tap:

    ```shell
    brew tap filecoin-project/lotus
    ```

1. Install Lotus:

    ```shell
    brew install lotus
    ```

1. Lotus is now installed on your computer.

#### Ubuntu

There are two simple ways to install Lotus on Ubuntu:

- [AppImage](#appimage)
- [Snap](#snap)

##### AppImage

1. Update and upgrade your system:

    ```shell
    sudo apt update -y && sudo apt upgrade -y
    ```

1. Download the latest `AppImage` file from the [Lotus GitHub releases page](https://github.com/filecoin-project/lotus/releases/):

    ```shell
    wget https://github.com/filecoin-project/lotus/releases/download/v1.11.1/Lotus-v1.11.1-x86_64.AppImage
    ```

1. Make the `AppImage` executable:

    ```shell
    chmod +x Lotus-v1.11.1-x86_64.AppImage
    ```

1. Move the `AppImage` to `/usr/local/bin` and rename it `lotus`:

    ```shell
    sudo mv Lotus-v1.11.1-x86_64.AppImage /usr/local/bin/lotus
    ```

[Head onto the next section to run your Lotus lite-node ↓](#run-a-lotus-lite-node)

##### Snap

{{< alert >}}
You must have [Snapd](https://snapcraft.io/docs/installing-snapd) installed.
{{< /alert >}}

1. To install Lotus using Snap, run:

    ```shell
    snap install lotus-filecoin
    ```

[Head onto the next section to run your Lotus lite-node ↓](#run-a-lotus-lite-node)

### Run a Lotus lite-node

Now that you have Lotus ready to run, you can start a Lotus lite-node on your computer and connect to the `api.chain.love` Lotus full-node!

{{< alert >}}
Just as a reminder, `api.chain.love` is a Lotus full-node managed by Protocol Labs. It's ideal for use in this tutorial, but should not be used in a development or in a production environment.
{{< /alert >}}

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

### Get a FIL address

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

### Backup your address

Your address is made up of two parts: your _public address_ and your _private key_. The public address is what you see when you run `lotus wallet new`, and you're safe to share that address with whoever you want. Your private key, however, must be kept secret and secure. If you lose your private key, you lose access to any FIL stored in that address.

It is incredibly important that you backup your addreses. Storing a copy of your addresses on another device is a great way to ensure you don't lose access to your funds.

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

### Filecoin Plus

Storage providers get paid either by receiving FIL directly from users for storing their data, winning block rewards from the network, or both!

Getting paid from users is straightforward. If Laika wants to store some data, and Albert is a storage provider, the two of them can create a deal to store Laika's data for `X` amount of time for `Y` FIL.

Block rewards are randomly given to a storage provider every 30 seconds. The more data that a storage provider is _storing_, the higher their chances of winning the block reward. So if a storage provider accepts a deal from a user to store 5 GB of data, they have 5 chances to win the block reward for each 30 second round.

DataCap acts as a kind of _multiplier_ for block rewards. If a storage provider accepts a deal from a user with DataCap attached, also known as a _verified deal_ , then the Filecoin network treats that deal as though it's 10x bigger. So a 5 GB deal gives the storage miner 50 chances to win the block reward instead of the usual 5 chances. Some storage providers find DataCap so valuable that they're willing to make verified deals without charging any FIL! You can find a list of these storage providers using the [Filecoin Plus miner registry](https://plus.fil.org/miners/).

#### Sign up

Signing up to Filecoin Plus is easy and free!

{{< alert >}}
You need a GitHub account that is at least 180 days old. If you don't have a GitHub account that's old enough, [get in touch with the team on Filecoin Slack](https://filecoin.io/slack/).
{{< /alert >}}

1. Go to [plus.fil.org](https://plus.fil.org).
1. Under **For isClients**, click **Proceed**.
1. Under **Get verified**, click **Get Verified**.
1. Click **Automatic Verification**.
1. Click **Start** next to the GitHub logo.
1. In the `Request` field, enter the public address you got from running `lotus wallet list`. This step may take a few minutes to complete.

## Store data

Start storing your data on the Filecoin network. This section covers packaging your data, importing it into your local Lotus lite-node, finding a storage provider through the Filecoin Plus miner registry, creating a storage deal, and then waiting for the deal to complete. There's a lot to do, so let's dive in!

{{< alert icon="warning" >}}
Filecoin is optimized for public data and doesn't yet support access controls. If storing private data, ensure you encrypt it before storage to ensure it remains unreadable by anyone without the ability to decrypt it. Keep in mind that if a vulnerability is found in your encryption process at any point in the future, then your data may be compromised.
{{< /alert >}}

#### Things to note

As you're going through this section, make a note of the following variables:

| Variable | Description | Example |
| --- | --- | --- |
| Data CID | The content identifier (CID) of the data that you want to store using Filecoin. | `bafk2bzaceajz56zudni2hli7id6jvvpo5n4wj5eoxm5xwj2ipthwc2pkgowwu` |
| Miner ID #1 | The unique identifier for each storage provider. You need to have two storage provider IDs for this tutorial. | `f01000`
| Miner ID #2 | The unique identifier for each storage provider. You need to have two storage provider IDs for this tutorial. | `f01000`
| Deal CID | The content identifier (CID) for a deal made with a storage provider. | `bafyreict2zhkbwy2arri3jgthk2jyznck47umvpqis3hc5oclvskwpteau` |

### Prepare your data

For this tutorial, we're going to create a dummy 5GB file full of random data and store it on the Filecoin network.

1. Move into your home folder:

    ```shell
    cd ~
    ```

1. Create a 5GB block of random data to serve as our payload:

    **MacOS** users must run:

    ```shell
    dd if=/dev/urandom of=5gb-filecoin-payload.bin bs=1m count=5200
    ```

    **Linux** users should run:

    ```shell
    dd if=/dev/urandom of=5gb-filecoin-payload.bin bs=1M count=5200
    ```

    This process will take about 60 seconds to create a dummy file.

We now have our payload file ready to be stored using the Filecoin network.

### Add data to Lotus

We need to tell our Lotus lite-node which file we want to store using Filecoin.

1. Import the payload into the `lotus daemon` using the `import` command:

    ```shell
    lotus client import 5gb-filecoin-payload.bin
    ```

    Lotus creates a directed acyclic graph (DAG) based off the payload. This process takes a few minutes. Once it's complete, Lotus will output the payload CID.

    ```text output
    Import 3, Root bafykb...
    ```

    This process takes about 60 seconds.

1. Make a note of the CID `bafykb...`. This is your **Data CID**. We'll use it in an upcoming section.

Now that Lotus knows which file we want to use, we can create a deal with a Filecoin storage provider to store our data!

### Find a storage provider

We need to find suitable storage providers before we can store our data. The Filecoin network allows storage providers to compete by offering different terms for pricing, acceptable data sizes, and other important deal parameters. It's also important to consider the storage provider's location; the closer the storage provider is to you, the faster the storage and retrieval process will be.

We're going to use the Filecoin Plus miner registry to find a couple of storage providers and then cross-check their information with a third-party storage provider reputation system.

{{< alert icon="tip" >}}
Increasing the number of storage providers you use increases your data redundancy, and decreases the chances of your data being lost.
{{< /alert >}}

#### Filecoin Plus miner registry

The Filecoin Plus miner registry is a collection of geographically diverse storage providers that are willing to accept low-cost or free storage deals from users. The more storage providers that offer storage in different parts of the world, the faster we can work toward Filecoin’s underlying mission to store humanity’s most important information.

Let's find a couple of storage providers to store our data.

1. Go to [plus.fil.org/miners](https://plus.fil.org/miners/).
1. Using the table, find a couple of storage providers that suit your needs. Try to find storage providers that are geographically close to you.
1. Once you have found a couple of suitable storage providers, make a note of their _miner IDs_ from the **Miner ID** column:

    ![A collection of storage providers listed in the Filecoin Plus miner registry.](miner-x-listings.png)

    Some storage providers list multiple miner IDs. For these storage providers, just copy one of the IDs:

    ![A list of storage providers, highlighting one storage provider with multiple IDs.](miner-with-multiple-miner-ids.png)

1. Make sure to write down the IDs of the storage providers you want to use. We'll be referring to these IDs in the next section.

#### Miner reputation systems

The Filecoin Plus miner registry is a great resource, but it represents a small portion of the entire Filecoin mining community. Filecoin reputation systems like [FilRep](https://filrep.io) can help you compare storage providers based on their past performance and provide useful information about the deal parameters that a storage provider will accept. Using FilRep, you can compare storage provider metrics like location, storage power in the network, pricing, and overall success rate.

We're going to use FilRep to check that the minimum deal size of the storage providers we selected fits the size of our file.

1. Go to [filrep.io](https://filrep.io).
1. Click the **Settings** toggle to display a list of all available storage provider details.
1. Make sure that the **Min File Size** column is selected:

    ![](filrep-select-columns.png)

1. Now you can search for the storage providers you found before, using the miner ID.

    ![](filrep-search-min-file-size.png)

1. Check that the minimum file size is lower than 5 GiB, and that they charge 0 FIL for verified deals.
1. If the minimum file size shown for any of your storage providers is larger than 5 GiB, or they charge more thann 0 FIL for verified deals, go back to [the previous section](#filecoin-plus-miner-registry) and select a new storage provider.

Now that you've found your miners, you can move onto creating a storage deal!

### Create a deal

To complete this section, you need the **Data CID** you received after running `lotus client import` and the IDs of the storage providers you want to use.

1. Start the interactive deal process:

    ```shell
    lotus client deal
    ```

    The interactive deal assistant will now ask you some questions.

1. Specify the CID of the payload you want to backup on Filecoin. This is the CID that you got from running `lotus client import ~/5gb-filecoin-payload.bin`:

    ```text output
    Data CID (from lotus client import): bafykbz...
    ```

1. Wait for Lotus to finish calculating the size of your payload. Lotus calculates this size by counting the individual bits in your payload to ensure that the size is accurate.

    ```text output
    .. calculating data size
    ```

    The duration of this process depends on the size of your file and the specification of your Lotus node. In tests, Lotus took around 20 minutes file of a ~7.5GB file with a 4-core CPU and 8GB RAM. These specifications are common for most end-user laptops.

1. Enter the number of days you want to keep this file on Filecoin. The minimum is 180 days:

    ```text output
    Deal duration (days): 180
    ```

1. Tell Lotus whether or not this is a Filecoin Plus deal. Since you signed up to Filecoin Plus in an earlier step, select `yes` here:

    ```text output
    Make this a verified deal? (yes/no): yes
    ```

1. Enter the miner IDs from the previous section with an empty space separating the two IDs:

    ```text output
    Miner Addresses (f0.. f0..), none to find: f01000 f01001
    ```

1. Confirm your transaction by entering `yes`:

    ```text output
    -----
    Proposing from f136b5uqa73jni2rr745d3nek4uw6qiy6b6zmmvcq
            Balance: 2 FIL

    Piece size: 8GiB (Payload size: 7.445GiB)
    Duration: 7200h0m0s
    Total price: ~0 FIL (0 FIL per epoch)
    Verified: true

    Accept (yes/no): yes
    ```

1. Lotus will returns two **Deal CIDs**:

    ```text output
    .. executing
    Deal (f01000) CID: bafyreict2zhkbwy2arri3jgthk2jyznck47umvpqis3hc5oclvskwpteau
    Deal (f01001) CID: bafeauyreict2zhkbwy2arri3jgthk2jyznck47umvpqis3hc5oclvskwpt
    ```

1. Take a note of the **deal CIDs** `baf...`.

### Check the deal status

Once the data has been sent to the storage clients, the storage deals can take up to 24 hours to complete. You can check the progress of your deals.

1. List successful and pending deals by using the `lotus client list-deals` command:

    ```shell
    lotus client list-deals --show-failed
    ```

    **DO NOT TURN OFF YOUR LOTUS NODE!** Your Lotus lite-node needs to remain online until the deal state has reached `StorageDealActive`. See the [Processing states](#processing-states) table below to find out which states happen and when.

1. You can check the progress of any data transfers by running `lotus client list-transfers`:

    ```shell
    lotus client list-transfers
    ```

    This command will output something like:

    ```text output
    Sending Channels
    ID                   Status   Sending To   Root Cid     Initiated?  Transferred  Voucher
    1620782601911586915  Ongoing  ...KPFTTwY7  ...zyd3kapm  Y           224.1MiB     ...bqhcidjmajbelhlxfqry3d7qlu3tvar45a"}}

    Receiving Channels
    ...
    ```

    If the output of `lotus client list-transfers` is empty, then your transfer has finished:

    ```shell with-output
    lotus client list-transfers
    ```
    ```
    Sending Channels


    Receiving Channels


    ```

#### Deal states

Because of the complex nature of Lotus and the Filecoin network, deals can be in one of many different states.

##### Processing states

The following table is the list of states that a deal should enter, assuming there are no errors. This list is in chronological order, from when the deal is first created to when it has completed successfully:

| State | Description |
| --- | --- |
| StorageDealUnknown | The current status of a deal is undefined or unknown. This could be because your full-node is out of sync. |
| StorageDealReserveClientFunds | The client is checking that it has enough FIL for the deal.|
| StorageDealClientFunding | The client has deposited funds into the StorageMarketActor and is waiting for the funds to appear. |
| StorageDealFundsReserved | Your FIL has been deposited into escrow and is ready to be used to pay for the deal. |
| StorageDealStartDataTransfer | The storage provider is ready to accept data from the client Lotus node. |
| StorageDealTransferring | The data is being transferred from the client Lotus node to the storage provider. |
| StorageDealCheckForAcceptance | The client is waiting for a storage provider to seal and publish a deal. |
| StorageDealProposalAccepted | The storage provider intends to accept a storage deal proposal; however, the storage provider has not made any commitment to do so at this point. |
| StorageDealAwaitingPreCommit | A deal is ready and must be pre-committed. |
| StorageDealSealing | The storage provider, is sealing data into a sector. The larger your data payload, the longer this will take. |
| StorageDealActive | The data is in a sealed sector, and the storage provider can provide the data back to you. |
| StorageDealExpired | A deal has passed its final epoch. The storage provider could still have the data available but is under no obligation to provide it to anyone. |

##### Error states

The following deal states mean there was a failure somewhere along the line, in alphabetical order:

| State | Description |
| --- | --- |
| StorageDealError | There has been an unforeseen error. No further updates will occur. |
| StorageDealFailing | Something has gone wrong in a deal. Once data is cleaned up, the deal will finalize. |
| StorageDealProposalNotFound | Your full-node cannot find the deal you are looking for. This could be because it doesn't exist, or your full-node is out of sync. |
| StorageDealProposalRejected | The storage provider, has chosen not to accept this deal. The storage provider may have provided a reason alongside this status message, but not always. |
| StorageDealRejecting | The storage provider has rejected the deal. This comes immediately before StorageDealProposalRejected. |
| StorageDealSlashed | The data was in a sector, and the storage provider got slashed for failing to prove that the data was available. |

##### Informational states

The following deal states are informational, and do not mean that a deal has failed. This list is in alphabetical order:

| State | Description |
| --- | --- |
| StorageDealAcceptWait | The storage provider is running custom decision logic to decide whether or not to accept the deal. The deal will have this status until the custom logic comes to a decision. |
| StorageDealClientTransferRestart | A storage deal data transfer from a client to a storage provider has restarted after a pause, likely caused by StorageDealProviderTransferAwaitRestart. |
| StorageDealFinalizing | All the data is within the sector, and the storage provider is performing the final checks to make sure that all the data is correct. |
| StorageDealProviderFunding | The storage provider has deposited funds into StorageMarketActor and is waiting for the funds to appear. |
| StorageDealProviderTransferAwaitRestart | The storage provider restarted while data was being transferred from the client to the storage provider. Once the storage provider is back online, it will wait for the client to resume the transfer. |
| StorageDealPublish | The deal is ready to be published on-chain. |
| StorageDealPublishing | The deal has been published but is yet to appear on-chain. |
| StorageDealReserveProviderFunds | The storage provider is checking that it has enough FIL for the deal. |
| StorageDealStaged | The deal has been published, and data is ready to be put into a sector. At this point, the storage provider has fully committed to storing your data. |
| StorageDealValidating | The storage provider is validating that the deal parameters are good for a proposal. |
| StorageDealVerifyData | All the data has been transferred, and the storage provider is now attempting to verify it against the PieceCID. |
| StorageDealWaitingForData | Either a manual transfer is occurring, or the storage provider has not received a data-transfer request from the client. |

These states come from the [Lotus project GitHub repository](https://github.com/filecoin-project/go-fil-markets/blob/master/storagemarket/dealstatus.go).

## Retrieve data

In the previous step, you stored some data on the Filecoin network. It takes up to 24 hours for a storage provider to _seal_ the data. If it's been more than 24 hours since you completed the last section, great! If not, don't worry; you can still follow this page to retrieve some example data that's already on the Filecoin network.

### Restart the Lotus

If you closed Lotus or shutdown your computer since you completed the previous section, you'll need to restart the `lotus daemon`.

1. Open a terminal window.
1. Start a Lotus lite-node and connect to `api.chain.love`:

    ```shell
    FULLNODE_API_INFO=wss://api.chain.love lotus daemon --lite
    ```

1. The Lotus daemon will continue to run. You must run further commands from a separate terminal window.

Next up is [checking your balance ↓](#check-address-balance)

### Check address balance

Before you can retrieve data from a storage provider, you need to check that you have enough FIL to pay for the retrieval.

1. List all the addresses on this Lotus lite-node:

    ```shell
    lotus wallet list
    ```

    Lotus will output something like:

    ```shell
    > Address                                    Balance  Nonce  Default
    > f16mwizoeloamhp4dea4uy367mlihddw2mflnb5vy  10 FIL   0      X
    ```

    Any balance above 0.1 FIL is enough to retrieve the data we are requesting in this tutorial.


{{< alert icon="warning" >}}**Low or no balance**

If you do not have enough FIL, you need to transfer some FIL to this account. You can either do this by using a cryptocurrency exchange or having a friend send you FIL. The address `f1...` listed when you run `lotus wallet list` is your public address; use this when requesting money from an exchange or your friend.
{{< /alert >}}

### Get the deal information

Before you can send a retrieval request, you need to collect some information to structure the command. You will need:

| Variable | Description |
| --- | --- |
| Miner ID | This is the ID of the storage provider where the data is stored. |
| Data CID | This variable is also sometimes called the _Payload CID_. |
| Address | The public address that was initially used to create the storage deal. |

We're going to gather this information now.

1. Copy this **address** to your clipboard: `f16wc2ees6nkmk4pguoaaly4zdkeemaajjbv7aqgq`.

    If you want to retrieve data that **you stored** you can use that **address** in place of the one we're using in this tutorial. If you'd like to use the **address** on your local Lotus note, run `lotus wallet list` and copy it to your clipboard.

    Remember, you will not be able to retrieve data stored less than 24 hours ago.

1. Go to [filecoin.tools](https://filecoin.tools).
1. Paste the **address** in the search bar and press `ENTER` to search for deals made by that **address**:

    ![Filecoin.tools showing all the deals made by a single address.](filecoin-tools-search-address.png)

    The default **address** supplied in this tutorial `f16wc2ees...` has only submitted one storage deal, so you'll only see one row in [filecoin.tools](https://filecoin.tools/f16wc2ees6nkmk4pguoaaly4zdkeemaajjbv7aqgq). If you are using a different **address**, you may see multiple rows. If you don't see _any_ rows, the **address** you searched for has not yet completed a deal. The **address** may have submitted a deal, but the storage provider is yet to _seal_ the data. Deals will only show up here once the storage provider has completed sealing the data.

1. Click anywhere on a row to view information about that specific deal:

    ![Information about a particular deal.](filecoin-tools-show-details.png)

1. Make a note of the **Payload CID** and the **Miner ID**. You'll need both of these to create the retrieval command in the next step.

### Send a retrieval request

Next up is creating the command for Lotus to run. The structure for a retrieval command is: `lotus client retrieve --miner <MINER ID> <DATA CID> ~/output-file`

1. Using the template above, create the command substituting `<MINER ID>` and `<DATA CID>` with the variables you got in the previous step. Your command should look something like this:

    ```shell
    lotus client retrieve --miner f07709 mAVWg5AIgFw51hfKzfy8nRsKHlMtT8/DPBJhn1f9eFyOSeldlAiE output-file
    ```

    The `output-file` is the name of the file that you'd like to save. You can also add a path to this variable:

    ```shell
    lotus client retrieve --miner f0100 mAVW...lAiE ~/Downloads/filecoin-download.tar
    ```

1. Run the command. After submitting this command, your Lotus lite-node will send the retrieval request to the storage provider and wait for a response:

    ```shell
    > Recv: 0 B, Paid 0 FIL, ClientEventOpen (DealStatusNew)
    > Recv: 0 B, Paid 0 FIL, ClientEventDealProposed (DealStatusWaitForAcceptance)
    > Recv: 0 B, Paid 0 FIL, ClientEventDealAccepted (DealStatusAccepted)
    > ...
    ```

1. Wait for the process to finish:

    ```shell
    > Recv: 66.33 KiB, Paid 0.00000000000013584 FIL, ClientEventPaymentSent (DealStatusFinalizing)
    > Recv: 66.33 KiB, Paid 0.00000000000013584 FIL, ClientEventComplete (DealStatusFinalizingBlockstore)
    > Recv: 66.33 KiB, Paid 0.00000000000013584 FIL, ClientEventBlockstoreFinalized (DealStatusCompleted)
    Success
    ```

    You must keep the `lotus daemon` running for the duration of this process.

1. That's it!

This marks the end of the Filecoin Store and Retrieve tutorial! By now you should have a good understanding of how the storage and retrieval process works on the Filecoin network, and also have some ideas on how to integrate this process into your projects! Feel free to carry on playing around with storing and retrieving data using Lotus and Filecoin. If you need a hand or get stuck, check out the [Filecoin Slack](https://filecoin.io/slack/) for help.
