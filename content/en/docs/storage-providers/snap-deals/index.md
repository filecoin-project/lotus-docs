---
title: "Snap-deals"
description: "Snap-deals are a way add data into sectors that have already been sealed. This allows users to utilize the confirmed storage available in the network, while also allowing storage providers to earn straoge rewards without having to seal new sectors."
lead: "Snap-deals are a way add data into sectors that have already been sealed. This allows users to utilize the confirmed storage available in the network, while also allowing storage providers to earn straoge rewards without having to seal new sectors."
draft: false
menu:
    docs:
        parent: "storage-providers"
weight: 492
toc: true
---

When clients want to store something using Filecoin, they must first find a storage provider willing to accept a deal. Once the storage provider and client have agreed upon the terms of the deal, the client starts to transfer their data to the storage provider. Once the transfer is complete, the storage provider seals the data, and the Filecoin blockchain verifies that the data is stored correctly for the length of the storage deal. 

Storage providers earn rewards in two ways:

1. Committing storage space to the network. 
1. Charging clients fees for storing data. 

Most of the storage available on the Filecoin network, also known as _committed capacity_, is storing _dummy data_. If there aren't any users that want to store something at the time that the sector is committed, then the storage provider fills in space random 1s and 0s. This means that a large portion of the storage available on the Filecoin network isn't being used for anything particularly important.

## A simplified explanation

Snap-deals allow storage providers to accept deals from users and place that user's data into a block of storage that had already been committed. That was a bit of a mouthful, so picture it like this.

Imagine there is a town with a very long shelf. Anyone in this town can store anything they want on this shelf. When a townsperson wants to store something, they give that _thing_ to a storage provider. The storage provider builds a wooden box, puts the townsperson's stuff into the box, and then puts the box on the shelf.

![A shelf representing the Filecoin network.](shelf.png)

Some of the boxes have useful stuff in them, like photographs, music, or videos. But sometimes, the storage providers don't have any townspeople lining up to put useful stuff into the boxes. So instead, they put packing peanuts in the box and put that on the shelf. This means that there are a lot of boxes being made to just hold packing peanuts. Making boxes takes a long time and takes a lot of work from the storage provider.

![Types of data in a Filecoin sector.](data-types.png)

Instead of creating a new box every time someone wants to store something, it'd be better if we could just replace the packing peanuts with useful stuff! Since nobody cares about the packing peanuts, nobody is going to be unhappy with throwing them out. And the storage provider gets to put useful stuff on the shelf without having to create a new box! Things are better for the townsperson, too, since they don't have to wait for the storage provider to create a new box!

![Emptying sectors of dummy data to fill them with real data.](emptying-boxes.png)

This is a simplified view of how Snap-deals work. Instead of a storage provider creating an entirely new sector to store a client's data, they can put the client's data into a committed capacity sector. The data becomes available faster, things are less expensive for the storage provider, and more of the network's storage capacity gets utilized!

## Benefits

While everyone in the Filecoin ecosystem will benefit from Snap-deals, storage providers will benefit the most. Snap-deals let storage providers use their available storage more effectively and make processing deals much faster. 

Clients will also benefit since their data will become available much faster. 

## Performance information

Here is a table to compare basic deals, Snap-deals, and the associated hardware used.

## Test snap-deals

If you are a storage provider and want to get to grips with Snap-deals, then follow this quick guide! You will learn how to set up a local Filecoin network, create some basic deals, and then convert those deals to Snap-deals.

### Start a Lotus local-net

### Create basic deals

### Convert deals to Snap-deals

