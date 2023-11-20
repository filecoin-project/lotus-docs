---
title: "SupraSeal PC2 Setup"
description: "This is a step by step guide on how to enable SupraSeal PC2 features on your Lotus-Workers."
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
| RTX A5000      |         |            |                     |

## Setup

{{< alert icon="warning" >}}
Note that the `FFI_USE_FIXED_ROWS_TO_DISCARD=1` environment variable must be exported to all your PC1 and PC2 workers. SupraSeal PC2 is not compatible with sectors sealed without this enviroment variable.
{{< /alert >}}

1. Install dependencies needed for building and using the SupraSeal PC2 binary

```shell
sudo apt install build-essential libconfig++-dev libgmp-dev wget git curl
``` 

2. Checkout [Lotus master](https://github.com/filecoin-project/lotus/releases/tag/v1.25.1-rc1).
3. [Build from source]({{< relref "../../lotus/install/linux/#native-filecoin-ffi" >}}) with the environment variable `FFI_USE_FIXED_ROWS_TO_DISCARD=1` exported. **Please note that you also need to export and build all PreCommit1 machines servers with this enviroment variable as well. Else the SupraSeal PC2 will just fail!**

4. Run the build script for SupraSeal PC2 located in the `../lotus/scripts/` folder

```
cd /lotus/scripts
./supraseal-pc2.sh
```

## Run a benchmark