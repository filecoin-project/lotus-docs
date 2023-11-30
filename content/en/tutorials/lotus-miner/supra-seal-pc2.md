---
title: "SupraSeal PC2 Setup"
description: "This is a step by step guide on how to enable th experimental SupraSeal PC2 features on your Lotus-Workers."
lead: "This is a step by step guide on how to enable the experimental SupraSeal C2 feature on your Lotus-Workers that is in the Lotus v1.25.0 release."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 220
toc: true
---

## Pre-requisites 

- You need to have CUDA configured on your server. Check out the CUDA installation tutorial.
- Rust installed.
- Ubuntu 22.04 LTS or higher for the PC2-server.

## Benchmarks
Some early benchmarks with different GPUs:

| GPU            | Speedup | CUDA (sec) | SupraSeal PC2 (sec) |
| -------------- | ------- | ---------- | ------------------- |
| RTX A5000      |         |            |         151         |

## Setup

{{< alert icon="warning" >}}
Please note that the `FFI_USE_FIXED_ROWS_TO_DISCARD=1` environment variable must be exported, and your entire lotus-miner cluster must be built from source with this enviroment variable to be able to run SupraSeal PC2. SupraSeal PC2 cannot work with sectors sealed without this environment variable set.
{{< /alert >}}

1. Install dependencies needed for building and using the SupraSeal PC2 binary

```shell
sudo apt install build-essential libconfig++-dev libgmp-dev wget git curl
``` 

2. Checkout [Lotus master](https://github.com/filecoin-project/lotus/tree/master).
3. [Build from source]({{< relref "../../lotus/install/linux/#native-filecoin-ffi" >}}) with the environment variable `FFI_USE_FIXED_ROWS_TO_DISCARD=1` exported.

**Please note that you also need to export and build with this enviroment variable across the lotus-miner stack of machines. Else the SupraSeal PC2 will fail!**

4. Run the build script for SupraSeal PC2 located in the `../lotus/scripts/` folder

```
cd /lotus/scripts
./supraseal-pc2.sh
```

## Run a benchmark