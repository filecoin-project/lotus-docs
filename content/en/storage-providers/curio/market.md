---
title: "Boost Integration"
description: "This guide describes how to connect your Boost instance to the Curio cluster"
lead: "This guide describes how to connect your Boost instance to the Curio cluster"
draft: false
menu:
  storage-providers:
    parent: "curio"
weight: 140
toc: true
---

Curio has a market submodule which allow integrating with Boost without any changes to the Boost code base.
The deal data is added to a sector in TreeD stage instead of AddPiece in Lotus-Miner.

- Intro
- How to enable market in Curio with config
- PiecePark should be enabled on TreeD and TreeRC nodes (data will be closer to sector)
- How to connect exiting Boost
- How to init new Boost
- Branch to use in Boost

## Introduction

Curio offers a market submodule that enables seamless integration with Boost without requiring any changes to the Boost code base. 
This document will guide you through enabling the market in Curio, configuring PiecePark, and setting up both existing and new Boost instances.

### How to Enable Market in Curio with Configuration

### Edit Market Config

```shell
curio --db-host [DB_HOST] config edit --editor nano --source base market
```

Uncomment BoostAdapters and add an entry like:
BoostAdapters = ["t10000:127.0.0.1:1234"]
Save and exit the editor.

### Edit Piece-Park Config

```shell
curio --db-host [DB_HOST] config edit --editor nano --source base piece-park
```

Uncomment EnableParkPiece and set it to true.
Save and exit the editor.

### Start Curio Node

```shell
curio --db-host [DB_HOST] run --layer=market,piece-park
```

Note: market is the node that Boost will interact with. It proxies deal data, so it is best to run it either next to Boost or on the same node as the piece-park nodes.

Enabling PiecePark on TreeD and TreeRC Nodes
PiecePark should be enabled on both TreeD and TreeRC nodes to ensure that the data is stored closer to the sector.

Follow the above steps to configure PiecePark on the respective nodes.


### Set Environment Variables
```shell
export CURIO_DB_HOST=[DB_HOST]
```

### Get Market RPC Info
```shell
curio market rpc-info --layers market
```
Use this string to configure Boost.

### Example
```shell
CURIO_DB_HOST=127.0.0.1 curio --db-host 127.0.0.1 market rpc-info --layers market
```

Output:
```shell
[lotus-miner/boost compatible] t01234 eyJh....0qPUzo:/ip4/127.0.0.1/tcp/1234
```

### Initializing New Boost

### Follow the Boost Setup Instructions
Refer to the Boost Setup Guide: https://boost.filecoin.io/new-boost-setup#instructions

# Use Curio Branch for Boost
# Ensure you are using the feat/curio branch in Boost for compatibility with Curio.

# Market Configuration
# Use the RPC info string obtained from Curio to set up Boost.

# Example
```shell
boostd init --api t01000 eyJh....0qPUzo:/ip4/127.0.0.1/tcp/1234
```

For detailed steps on setting up a new Boost instance, refer to the Boost Getting Started Guide: https://boost.filecoin.io/getting-started
Ensure that your environment variables and configurations are correctly set to avoid conflicts.
You can add the environment variable export commands to your ~/.bashrc or equivalent to avoid retyping them.


### Unable to Find Lotus-Miner API Token

### Check Curio Market RPC Info
```shell
curio market rpc-info --layers market
```
- Use the Correct Layer
- Ensure you are using the correct layer configuration for the market.

### Check Configuration
  Ensure your configuration files do not contain multiple entries for miner actor addresses.
  Restart Curio with the correct configuration.