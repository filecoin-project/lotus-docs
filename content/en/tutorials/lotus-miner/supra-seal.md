---
title: "SupraSeal C2 Setup"
description: "This is a step by step guide on how to enable SupraSeal C2 features on your Lotus-Workers."
lead: "This is a step by step guide on how to enable the experimental SupraSeal C2 feature on your Lotus-Workers that is in the Lotus v1.25.0 release."
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

| GPU            | Speedup | CUDA (sec) | SupraSeal (sec) |
| -------------- | ------- | ---------- | --------------- |
| Quadro RTX 6000| 4.86    | 1104       | 227             |
| RTX 4090       | 3.67    | 525        | 143             |
| A4000          | 2.03    | 1091       | 538             |
| RTX 3090       | 3.88    | 535        | 138             |

## Setup

1. Checkout Lotus v1.25.0 - [currently in rc1](https://github.com/filecoin-project/lotus/releases/tag/v1.25.0-rc1)
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

You can fix it by running `find /usr/ -name libcudart_static`:

```shell with-output
find /usr/ -name libcudart_static
```
```
/usr/local/cuda-11.6/targets/x8664-linux/lib/libcudart_static.a
```

And then exporting that as a `LIBRARY_PATH`:

```shell
export LIBRARY_PATH=$LIBRARY_PATH:/usr/local/cuda-11.6/targets/x8664-linux/lib
```

Finally, source it. And rebuild:

```shell
source ~/.bashrc
```