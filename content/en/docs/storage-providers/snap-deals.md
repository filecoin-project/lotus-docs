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

### What problem they're trying to solve

When a user wants to store something using Filecoin they first must find a storage provider willing to take a deal. Once the storage provider and user have agreed upon the terms of the deal, the user starts to transfer their data to the storage provider. Once the transfer is complete, the storage provider seals the data, and the Filecoin blockchain verfies that the data is stored correctly for the length of the storage deal. 

Storage providers earn rewards by commiting storage space to the network, and by charging users fees for storing data. However, most of the storage available on the Filecoin network, also known as committed capacity, is storing _dummy data_. If there aren't any users that want to store something at the time that the sector is commited, then the storage provider just fills in the blanks with dummy data. This means that a large portion of the storage available on the Filecoin network isn't being used for anything particularly important.

Snap-deals allow storage providers to accept deals from users, and place that user's data into a block of storage that had already been commited. That was a bit of a mouthful, so imagine it like this...

<!-- EXPLAIN IN ELI5 TERMS -->

### Who they're aimed at - who is going to use them (SPs mostly).

While everyone in the Filecoin ecosystem will benefit from Snap-deals, storage providers will benefit the most. Snap-deals let storage provider use their available storage of effectively, and make processing deals much faster. 

## Performance information

## Test snap-deals

### Start a Lotus local-net

### Create basic deals

### Convert deals to Snap-deals

