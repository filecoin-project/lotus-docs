---
title: "Curio Local Network"
description: "This guide provides detailed information about how to add a Curio miner to local network"
lead: "This guide provides detailed information about how to add a Curio miner to local network"
date: 2024-03-22T19:32:32+04:00
lastmod: 2024-03-22T19:32:32+04:00
draft: false
menu:
  storage-providers:
    parent: "curio"
weight: 140
---
A local-network is highly useful for getting familiar with Curio and experimenting with different scenarios in a safe manner.

## Docker Devnet

1. Clone the Lotus Github repo and checkout the `release/cuio-beta` branch

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   git checkout release/curio-beta
   ```

2. Build the images
   ```shell
   make docker/curio-devnet
   ```

3. Start the docker devnet
   ```shell
   make curio-devnet/up
   ```

4. Stop the docker devnet

   ```shell
   make curio-devnet/down
   ```


## Devnet
1. Please set up a [local network using the Lotus binaries]({{<relref "../../lotus/developers/local-network/">}}).
2. [Build the `curio` binaries from "master" branch of the Lotus repo]({{< relref "install" >}}).
3. Set up the [YugabyteDB]({{< relref "setup#setup-yugabytedb" >}})
4. [Initialize a new miner]({{< relref "setup#initiating-a-new-curio-cluster" >}}) using the `guided-setup` command.
5. Start the new Curio node

    ```
   curio run --nosync --layers seal,post,gui
   ```

6. In an new terminal, attach some storage to the Curio node.

    ```
   curio cli storage --machine 127.0.0.1:12300 attach --init --seal --store ~/.curio
   ```

7. Seal multiple CC sectors.

    ```
   curio seal start --now --cc --actor <Miner ID from Step 4>
   ```

8. Access the Curio UI page at [http://localhost:4701](http://localhost:4701) and watch the sector move through different sealing steps.
9. Wait for the next WindowPost and allow the CC sectors to become "Active".
