---
title: "Snap-deals"
description: "A one-message protocol for updating any sector with new data without re-sealing. This allows users to utilize the confirmed storage available in the network, while also allowing storage providers to earn storage rewards without having to seal new sectors."
lead: "A one-message protocol for updating any sector with new data without re-sealing. This allows users to utilize the confirmed storage available in the network, while also allowing storage providers to earn storage rewards without having to seal new sectors."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-operate"
aliases:
    - /storage-providers/configure/snap-deals/
weight: 335
toc: true
---

When clients want to store something using Filecoin, they must first find a storage provider willing to accept a deal. Once the storage provider and client have agreed upon the terms of the deal, the client starts to transfer their data to the storage provider. Once the transfer is complete, the storage provider seals the data, and the Filecoin blockchain verifies that the data is stored correctly for the length of the storage deal. 

Storage providers earn rewards in two ways:

1. Committing storage space to the network. 
1. Charging client's fees for storing data. 

Most of the storage available on the Filecoin network, also known as _committed capacity_, is storing _dummy data_. If there aren't any users that want to store something at the time that the sector is committed, then the storage provider fills in the binary space with lots of `0`s. This means that a large portion of the storage available on the Filecoin network isn't being used for anything particularly important.

{{< alert icon="tip" >}}
If you'd like to see an in-depth explanation of how Snap-deals work, take a look at the [Filecoin Improvement Proposal FIP-0019](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0019.md).
{{< /alert >}}

## Simplified explanation

Snap-deals allow storage providers to accept deals from users and place that user's data into a block of storage that had already been committed. That was a bit of a mouthful, so picture it like this.

Imagine there is a town with a very long shelf. Anyone in this town can store anything they want on this shelf. When a townsperson wants to store something, they give that _thing_ to a storage provider. The storage provider builds a wooden box, puts the townsperson's stuff into the box, and then puts the box on the shelf.

![A shelf representing the Filecoin network.](shelf.png)

Some of the boxes have useful stuff in them, like photographs, music, or videos. But sometimes, the storage providers don't have any townspeople lining up to put useful stuff into the boxes. So instead, they put packing peanuts in the box and put that on the shelf. This means that there are a lot of boxes being made to just hold packing peanuts. Making boxes takes a long time and takes a lot of work from the storage provider.

![Types of data in a Filecoin sector.](data-types.png)

Instead of creating a new box every time someone wants to store something, it'd be better if we could just replace the packing peanuts with useful stuff! Since nobody cares about the packing peanuts, nobody is going to be unhappy with throwing them out. And the storage provider gets to put useful stuff on the shelf without having to create a new box! Things are better for the townsperson, too, since they don't have to wait for the storage provider to create a new box!

![Emptying sectors of dummy data to fill them with real data.](emptying-boxes.png)

This is a simplified view of how Snap-deals work. Instead of a storage provider creating an entirely new sector to store a client's data, they can put the client's data into a committed capacity sector. The data becomes available faster, things are less expensive for the storage provider, and more of the network's storage capacity gets utilized!

## Benefits

Snap-deals benefit all users throughout the Filecoin ecosystem. Storage providers are able to use their storage capacity more effectively and speed up the deal-making process. Snap-deals also make the data from clients available much faster.

## Performance information

Storage providers from the Lotus [community tested Snap-deals performance](https://github.com/filecoin-project/lotus/discussions/8127) with the following hardware and results:

| Provider<br>Hardware | UpdateReplica<br>(RU) | ProveReplicaUpdate<br>(PR2) |
| --- | --- | --- |
| **CPU**: 10900X<br>**GPU**: RTX 4090 (CUDA) <br>**RAM**: 256 GB<br>**Sector**: 32 GiB | 3m 23s | 9m 43s |
| **CPU**: 3975WX<br>**GPU**: 2x RTX 3090 (CUDA) <br>**RAM**: 512 GB<br>**Sector**: 32 GiB | 5m 38s | 7m 52s |
| **CPU**: EPYC 7F72<br>**GPU**: 2x RTX 2080ti (CUDA) <br>**RAM**: 256 GB<br>**Sector**: 64 GiB | 9m 19s | 19m 0s |
| **CPU**: EPYC 7502<br>**GPU**: RTX 3080 (CUDA) <br>**RAM**: 512 GB<br>**Sector**: 64 GiB | 12m 59s | 23m 13s |

## Perform snap-deals

If you are a storage provider and want to get to grips with snap-deals, then follow this quick guide! You will learn how to create some CC sectors, and then convert those sectors to snap-deals.

{{< alert icon="warning" >}}
This is a relatively advanced storage provider operation. Users should be familiar with Filecoin, Lotus, the sector-deal lifecycle, and basic storage provider operations.
{{< /alert >}}

### Prerequisites

You must have the following set up to follow this guide through:

- Lotus 1.14.0 or higher [installed]({{< relref "../../../lotus/install/prerequisites">}}).

### Create committed-capacity sectors

1. List the deals on your storage provider:

    ```shell
    lotus-miner sectors list
    ```

    This will output something like:

    ```plaintext
    ID  State    OnChain  Active  Expiration                   Deals  DealWeight  VerifiedPower
    0   Proving  YES      YES     1550097 (in 10 weeks 1 day)  CC
    1   Proving  YES      YES     1550097 (in 10 weeks 1 day)  1      2KiB        18KiB 
    ...
    ```

    Right now, we don't have any committed-capacity (CC) sectors that we can modify.

1. Create a basic CC sector:

    ```shell
    lotus-miner sectors pledge
    ```

    This will output something like:

    ```plaintext
    Created CC sector:  2
    ```

1. List your deals again:

    ```shell
    lotus-miner sectors list
    ```

    This will output something like:

    ```shell
    ID  State                 OnChain  Active  Expiration                   Deals  DealWeight  VerifiedPower
    0   Proving               YES      YES     1550097 (in 10 weeks 1 day)  CC
    1   Proving               YES      YES     1550097 (in 10 weeks 1 day)  1      2KiB        18KiB
    2   Proving               YES      YES     1549517 (in 10 weeks 1 day)  CC
    ```

Now that you have created a basic CC sector, it's time to convert it to a snap-deal sector.

### Convert snap-deals sector

1. Chose a deal `ID` that you want to convert to a snap-deal. 
1. Convert the sector to a snap-deals sector by using the `snap-up` command followed by the `ID` of the sector you want to use:

    ```shell
    lotus-miner sectors snap-up 2
    ```

    This command does not output anything on success.

1. By listing your deals again, you'll see that the FSM has marked the sector as being in an `Available` state:

    ```shell
    lotus-miner sectors list

    > ID  State                 OnChain  Active  Expiration                   Deals  DealWeight  VerifiedPower
    > 0   Proving               YES      YES     1550097 (in 10 weeks 1 day)  CC
    > 1   Proving               YES      YES     1550097 (in 10 weeks 1 day)  1      2KiB        18KiB
    > 2   Available    YES      YES     1549517 (in 10 weeks 1 day)  CC
    ```

    This means that this sector (`2`) is ready to wait for deals!

While the sector is transitioning through the snap-deals states, this sector is still preserved, and nothing is changed internally. The FSM works to keep the sector safe so that WindowPosts and WinningPosts are totally undisrupted during the process.  

### Accept the new storage deal

After the CC sector has been converted to accept the snap-deal, a new storage deal is accepted by the storage provider and will be sealed into the converted sector. You can track the status by checking the sector logs using the below command.

```shell
lotus-miner sectors status --log <sectorNum>
```

## Testing snap-deal manually

1. Convert a CC sector into snap-deal sector by following the [perform snap-deal guide]({{<relref "#perform-snap-deals">}}).
2. Create a `UUID` variable and set it to the result of `uuidgen`:

    ```shell
    UUID=`uuidgen | awk -F"-" '{print $1}'`
    ```

3. Create a 1500 byte file with random data in it:

    ```shell
    dd if=/dev/urandom of=$UUID.deal bs=1 count=1500
    ```

4. Create a `$ROOT` variable that we'll use in a moment:

    ```shell
    OUT=`./lotus client import $UUID.deal`
    ROOT=`echo $OUT | awk 'NF>1{print $NF}'` 
    ```

5. Invoke the `lotus client deal` command with the newly created `$ROOT` variable and some deal parameters:

    ```shell
    ./lotus client deal $ROOT t01000 0.00001 600001
    ```
 
    This will output something like:

    ```plaintext
    1500+0 records in
    1500+0 records out
    1500 bytes transferred in 0.019269 secs (77845 bytes/sec)
    bafyreiamntewzox3wxngh6vuguqqdmajcfwwsrgozwshatfqhnbpvxbbrm
    ```

This process might take a while, but eventually, the deal will go to your `lotus-miner` and be placed into the `snap-deals` sector we just made.

## Snap-deal queue

A new feature in `lotus-miner` allows converting all the future "CC" sectors to snap-deal ready sectors by default. This features moves the newly sealed "CC" sector to "Available" state as part of the sector finalizing steps to mark it as available for snap deals. It provides two main benefits:

1. It removes the manual intervention required to convert the "CC" sectors to snap-deal ready sectors and thus, reduces the overhead for the storage provider. 
2. As all the new storage deals will be sealed as part of snap-deal, the sealing time would be considerable less.

This new feature can be enabled in the lotus miner [configuration]({{<relref "../../advanced-configurations/sealing#make-new-cc-sector-available-for-snap-deal">}}).

When a deal enters the the sealing pipeline, lotus-miner will try to match it to any sectors waiting for deals before sealing. If none are found then, lotus-miner will try to check if any `Available` sectors can accept it. It will select a candidate with the lowest initial pledge. If none of the sectors are eligible then a new sector can be created based on the value of `MakeNewSectorForDeals` under [configuration]({{<relref "../../advanced-configurations/sealing#disabling-new-sector-for-deal">}}). 

{{< alert >}}
In the case that creating new sectors for deals is disabled, the deal will be left hanging until a sector is made "Available" for it.
{{< /alert >}}

## Videos

The Lotus team held an ask-me-anything (AMA) event in February 2022. In the AMA, Lotus developers covered topics like how snap-deals works, how useful they are, and how storage providers can benefit from using them. You can [watch a recording of the live AMA over on YouTube](https://www.youtube.com/watch?v=_9fgQHVMuVA).

## Troubleshooting

There are some cases where you may run into problems with Snap-deals. We have tried to list them all here.

### Premature replica update

If the FSM finishes the replica update within the deadline of the sector or the one before it, Lotus will hang for a while in the `ReplicaUpdateFailed` state. The FSM will keep retrying until the immutable deadlines pass and submit the message. No action is required in this case.

### New configuration option

There is a new config option, `MakeNewSectorForDeals`, which ensures that only Snap-deals will be accepted. Deals will hang until you make a snap-deal instead of kicking off a new sector.

### Command mark-for-upgrade deprecated

The command `lotus-miner sectors mark-for-upgrade` has been deprecated, as of Lotus 1.14.0.

### Extension workflow

In the event that the duration of a newly received deal exceeds the remaining duration of the `Available` Snap-deals sector, you can run the following command to extend the sector's expiration time:

```shell
lotus-miner sectors extend --new-expiration <expiry-epoch> <sectornumber> && lotus-miner sectors match-pending-pieces
```

Where `expiry-epoch` is the epoch number when the sector should expire. For example, if you want to extend the sector for 540 days, this argument would need to be `2880 (epochs/day)` * `540 days` + `current chain height`. 

This will match the piece to the newly extended sector and start the replica update process.

### Halt the upgrade

You can abort the upgrade and remove all replica update data, reverting your sector back to the proving state, by running:

```shell
lotus-miner sectors abort-upgrade --really-do-it <sectornumber>
```

Keep in mind that **you will lose the deals in the update**, and the FSM won't rematch the deal with other sectors. This is the same thing that happens when you remove a deal sector.

