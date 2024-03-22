---
title: "SupraSeal C2 Setup"
description: "This is a step by step guide on how to enable SupraSeal C2 features on your Lotus-Workers."
lead: "This is a step by step guide on how to enable the experimental SupraSeal C2 feature on your Lotus-Workers."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 215
toc: true
---

## Pre-requisites 

- You need to have CUDA configured on your setup. Checkout the Cuda installation tutorial.
  - CUDA-version 11.x or higher is needed.
- Ubuntu 20.04.4 LTS or higher.

## Benchmarks
Some early benchmarks with different GPUs:

| GPU            | Speedup | CUDA (sec) | SupraSeal C2 (sec) |
| -------------- | ------- | ---------- | ------------------ |
| Quadro RTX 6000| 4.86    | 1104       | 227                |
| RTX 4090       | 3.67    | 525        | 143                |
| A4000          | 2.03    | 1091       | 538                |
| RTX 3090       | 3.88    | 535        | 138                |

## Setup

1. [Checkout the latest Lotus release](https://github.com/filecoin-project/lotus/releases/)
2. [Build from source]({{< relref "../../lotus/install/linux/#native-filecoin-ffi" >}}) with the environment variable `FFI_USE_CUDA_SUPRASEAL=1` exported.

You can see that it's being enabled by checking that `supraseal-c2` is being downloaded when downloading the crates:

```shell
Downloading crates ...
------
Downloaded supraseal-c2 v0.1.0 <-----
Downloaded sppark v0.1.5
```

## Troubleshooting
If you encounter the following issue when building:

```shell
/usr/local/go/pkg/tool/linux_amd64/link: running gcc failed: exit status 1
/usr/bin/ld: cannot find -lcudart_static
/usr/bin/ld: cannot find -lcudart_static
```

You can fix it by running `find /usr/ -name libcudart_static*`:

```shell with-output
find /usr/ -name libcudart_static*
```
```
/usr/local/cuda-11.6/targets/x86_64-linux/lib/libcudart_static.a
```

On most modern systems, you can fix this by updating the `LIBRARY_PATH` environment variable. This variable is used by the linker to find required libraries. By adding the path to the CUDA libraries, you're helping the linker find them when building your project. Here's how you can do it:

```shell
export LIBRARY_PATH=$LIBRARY_PATH:/usr/local/cuda/targets/x86_64-linux/lib/
```

Finally, source it. And rebuild:

```shell
source ~/.bashrc
```