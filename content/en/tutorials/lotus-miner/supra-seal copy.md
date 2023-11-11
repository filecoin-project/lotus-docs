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

- You need to have CUDA configured on your setup. Checkout the Cuda installation tutorial.
- Install Rust
- Ubuntu 22.04 LTS or higher.

Install dependencies needed for using the SupraSeal PC2 binary

```shell
sudo apt install build-essential libconfig++-dev libgmp-dev wget git curl
```

- 

## Benchmarks
Some early benchmarks with different GPUs:

| GPU            | Speedup | CUDA (sec) | SupraSeal PC2 (sec) |
| -------------- | ------- | ---------- | ------------------- |
| RTX A2000      | 4.86    | 1104       | 227                 |

## Setup

1. Checkout Lotus v1.25.1 - [currently in rc1](https://github.com/filecoin-project/lotus/releases/tag/v1.25.1-rc1)
2. [Build from source]({{< relref "../../lotus/install/linux/#native-filecoin-ffi" >}}) with the environment variable `FFI_USE_CUDA_SUPRASEAL=1` exported.


3. Clone the SupraSeal repository

```shell
git clone https://github.com/supranational/supra_seal.git
cd supra_seal/
```

## Benchmark


## Troubleshooting
