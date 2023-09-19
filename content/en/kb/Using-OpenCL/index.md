---
title: "Using OpenCL or disabling GPU"
description: "This article explains how to use OpenCL instead of CUDA, or disabling the GPU on the Lotus-Miner process"
date: 2022-03-18T12:00:35+01:00
lastmod: 2022-03-18T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
areas: ["Lotus Miner"]
types: ["article"]
---

This article explains how to use OpenCL instead of CUDA, or disabling the GPU entirely.

### Using OpenCL instead of CUDA

This step is only necessary if you are running an Nvidia GPU and would prefer to use OpenCL instead of CUDA. Please note that Cuda is recommended over OpenCL for sealing and proving workloads.


First you need to install OpenCL through a package manager:

```shell
sudo apt update -y && sudo apt install -y nvidia-opencl-icd -y
```

Before building the Lotus-Miner binary you will need to export the `FFI_USE_OPENCL=1` environment variable, and then [building from source process]({{< relref "../../storage-providers/operate/upgrades/#upgrade-in-place" >}}).

### Disable GPU

You can also choose to disable the GPU entirely and instead make proving and sealing workloads be run on the CPU. Please note that this is not recommended.

Before building the any Lotus binary you will need to export the `FFI_USE_GPU=0` environment variable, and then [building from source process]({{< relref "../../storage-providers/operate/upgrades/#upgrade-in-place" >}}).
