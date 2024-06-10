---
title: "Store data"
description: "The process of storing and retrieving data using the Filecoin network is slightly different from how most storage platforms work. This tutorial walks you through the whole end-to-end process of keeping your data and then getting it back when you need it! This tutorial should take you about an hour to complete."
lead: Introduction to setting up, storing, and retrieving using the Filecoin network
draft: true
menu:
    tutorials:
        parent: "tutorials-lotus"
        identifier: "tutorials-store-and-retrieve-store-data"
aliases:
    - /tutorials/store-and-retrieve/store-data/
    - /store/lotus/store-data
    - /store/slate
weight: 110
toc: true
---

{{< alert icon="warning" >}}
The Legacy Lotus/Lotus-Miner Markets sub-system reached EOL at the [end of the 31st January 2023](https://github.com/filecoin-project/lotus/releases/tag/v1.18.0). It has been fully removed from the Lotus/Lotus-Miner codebase as of 10th June 2024. We recommend our users to use the [Boost markets sub-system](https://github.com/filecoin-project/boost) instead.
{{< /alert >}}

Start storing your data on the Filecoin network. This section covers packaging your data, importing it into your local Lotus lite-node, finding a storage provider through the Filecoin Plus miner registry, creating a storage deal, and then waiting for the deal to complete. There's a lot to do, so let's dive in!

{{< alert icon="warning" >}}
Filecoin is optimized for public data and doesn't yet support access controls. If storing private data, ensure you encrypt it before storage to ensure it remains unreadable by anyone without the ability to decrypt it. Keep in mind that if a vulnerability is found in your encryption process at any point in the future, then your data may be compromised.
{{< /alert >}}

## Things to note

As you're going through this section, make a note of the following variables:

| Variable | Description | Example |
| --- | --- | --- |
| Data CID | The content identifier (CID) of the data that you want to store using Filecoin. | `bafk2bzaceajz56zudni2hli7id6jvvpo5n4wj5eoxm5xwj2ipthwc2pkgowwu` |
| Storage Provider ID #1 | The unique identifier for each storage provider. You need to have two storage provider IDs for this tutorial. | `f01000`|
| Storage Provider ID #2 | The unique identifier for each storage provider. You need to have two storage provider IDs for this tutorial. | `f01000`|
| Deal CID | The content identifier (CID) for a deal made with a storage provider. | `bafyreict2zhkbwy2arri3jgthk2jyznck47umvpqis3hc5oclvskwpteau` |

## Prepare your data

For this tutorial, we're going to create a dummy 5GB file full of random data and store it on the Filecoin network.

1. Move into your home folder:

    ```shell
    cd ~
    ```

1. Create a 5GB block of random data to serve as our payload:


    ```shell
    dd if=/dev/urandom of=5gb-filecoin-payload.bin bs=1M count=5200
    ```

    This process will take up to 60 seconds to create a dummy file.

We now have our payload file ready to be stored using the Filecoin network.

## Add data to Lotus

We need to tell our Lotus lite-node which file we want to store using Filecoin.

1. Import the payload into the `lotus daemon` using the `import` command:

    ```shell
    lotus client import 5gb-filecoin-payload.bin
    ```

    Lotus creates a directed acyclic graph (DAG) based off the payload. This process takes a few minutes. Once it's complete, Lotus will output the payload CID.

    ```plaintext output
    Import 3, Root bafykb...
    ```

    This process takes up to 60 seconds.

1. Make a note of the CID `bafykb...`. This is your **Data CID**. We'll use it in an upcoming section.

{{< alert icon="tip" >}}
'lotus client local' will list all the currently imported CIDs
{{< /alert >}}


### Importing custom DAGs

Advanced IPLD users may want to import custom DAGs into Lotus (you may skip this section if that is not you).

The CAR file format allows to serialize any IPLD-DAG (i.e. a IPLD-CBOR). Custom IPLD-DAGs should be encoded in a well-known format (like CBOR) as otherwise Lotus will not know how to interpret them.

{{< alert icon="warning" >}}
CAR files must contain the full DAG. Partial DAGs are not supported!
{{< /alert >}}

If you built your own CAR file, make sure to import it directly with the `--car` flag.

### Files bigger than a sector

If your file is larger than a sector for the [Filecoin network in use](https://network.filecoin.io), you will need to split your file into multiple parts first.

Storage miners will specify which size(s) they're offering so you can select the best option for you. Smaller sectors are faster, while larger sectors are more cost-effective.

Now that Lotus has imported your file, we can create a deal with a Filecoin storage provider to store our data!

### Filecoin Plus Registry

The Filecoin Plus  Registry is a collection of geographically diverse storage providers that are willing to accept low-cost or free storage deals from users. The more storage providers that offer storage in different parts of the world, the faster we can work toward Filecoin’s underlying mission to store humanity’s most important information. It can help you compare storage providers based on their location, pricing and data size limitations, and also their reputation based on their historical performance.  

Let's find a couple of storage providers to store our data.

1. Go to [Filecoin Plus Registry website](https://plus.fil.org).

1. Using the table, find a couple of storage providers that suit your needs. Try to find storage providers that are geographically close to you, minimum file size is lower than 5 GiB, and charge 0 FIL for verified deals.

    ![A collection of storage providers listed in the Filecoin Plus miner registry.](miner-x-listings.png)

1. Once you find suitable storage providers, you can check more detail info about it by clicking the Arrow next to its reputation score.  

    ![storage provider](storage-provider.png)

1. Make sure to write down the IDs of the storage providers you want to use. We'll be referring to these IDs in the next section.


Filecoin Plus Registry only represents a small portion of the entire Filecoin mining community, you can also use other Filecoin reputation systems like [FilRep](https://filrep.io) to check more storage provider metrics, like storage power in the network, reachability and overall success rate.

Now that you've found your storage providers, you can move onto creating a storage deal!

## Create a deal

To complete this section, you need the **Data CID** you received after running `lotus client import` and the IDs of the storage providers you want to use.

1. Start the interactive deal process:

    ```shell
    lotus client deal
    ```

    The interactive deal assistant will now ask you some questions.

{{< alert icon="warning" >}}
If you get an error 'actor not found', it likely means this address has never had FIL or Datacap added to it. You'll need to add some of either before you can do a deal.

[Add Datacap](/tutorials/lotus/store-and-retrieve/set-up/#filecoin-plus)

[Add FIL](/tutorials/lotus/store-and-retrieve/set-up/#adding-fil-to-your-wallet-or-using-filecoin-plus)
{{< /alert >}}
1. Specify the CID of the payload you want to backup on Filecoin. This is the CID that you got from running `lotus client import ~/5gb-filecoin-payload.bin`:

    ```plaintext output
    Data CID (from lotus client import): bafykbz...
    ```

1. Wait for Lotus to finish calculating the size of your payload. Lotus calculates this size by counting the individual bits in your payload to ensure that the size is accurate.

    ```plaintext output
    .. calculating data size
    ```

    The duration of this process depends on the size of your file and the specification of your Lotus node. In tests, Lotus took around 20 minutes file of a ~7.5GB file with a 4-core CPU and 8GB RAM. These specifications are common for most end-user laptops.

1. Enter the number of days you want to keep this file on Filecoin. The minimum is 180 days:

    ```plaintext output
    Deal duration (days): 180
    ```

1. Tell Lotus whether or not this is a Filecoin Plus deal. Since you signed up to Filecoin Plus in an earlier step, select `yes` here:

    ```plaintext output
    Make this a verified deal? (yes/no): yes
    ```

1. Enter the miner IDs from the previous section with an empty space separating the two IDs:

    ```plaintext output
    Miner Addresses (f0.. f0..), none to find: f01000 f01001
    ```

1. Confirm your transaction by entering `yes`:

    ```plaintext output
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

    ```plaintext output
    .. executing
    Deal (f01000) CID: bafyreict2zhkbwy2arri3jgthk2jyznck47umvpqis3hc5oclvskwpteau
    Deal (f01001) CID: bafeauyreict2zhkbwy2arri3jgthk2jyznck47umvpqis3hc5oclvskwpt
    ```

1. Take a note of the **deal CIDs** `baf...`.

### Securing a deal

Given the network's current speed and stability, users may find that individual deals with miners fail unexpectedly. For this reason, we suggest making up to 10 deals for each [CAR file](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md) you want to store. While this may seem a bit over-kill, it's a simple way to increase the chances of a successful deal and your data being stored. This work-around will become less and less necessary as the network matures.

## Check the deal status

Once the data has been sent to the storage clients, the storage deals can take up to 24 hours to complete. You can check the progress of your deals.

1. List successful and pending deals by using the `lotus client list-deals` command:

    ```shell
    lotus client list-deals --show-failed
    ```

{{< alert icon="warning" >}}**DO NOT TURN OFF YOUR LOTUS NODE!** 
Your Lotus lite-node needs to remain online until the deal state has reached `StorageDealActive`. See the [Processing states](#processing-states) table below to find out which states happen and when.
{{< /alert >}}

1. You can check the progress of any data transfers by running `lotus client list-transfers`:

    ```shell
    lotus client list-transfers
    ```

    This command will output something like:

    ```plaintext output
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

### Deal states

Because of the complex nature of Lotus and the Filecoin network, deals can be in one of many different states.

#### Processing states

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

#### Error states

The following deal states mean there was a failure somewhere along the line, in alphabetical order:

| State | Description |
| --- | --- |
| StorageDealError | There has been an unforeseen error. No further updates will occur. |
| StorageDealFailing | Something has gone wrong in a deal. Once data is cleaned up, the deal will finalize. |
| StorageDealProposalNotFound | Your full-node cannot find the deal you are looking for. This could be because it doesn't exist, or your full-node is out of sync. |
| StorageDealProposalRejected | The storage provider, has chosen not to accept this deal. The storage provider may have provided a reason alongside this status message, but not always. |
| StorageDealRejecting | The storage provider has rejected the deal. This comes immediately before StorageDealProposalRejected. |
| StorageDealSlashed | The data was in a sector, and the storage provider got slashed for failing to prove that the data was available. |

#### Informational states

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
