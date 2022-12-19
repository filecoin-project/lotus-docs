---
title: "Hardware requirements"
description: "The hardware requirements for storage providers are tied to the computational resources needed to seal a sector and generating regular Proof of Spacetime for every sealed sector."
lead: "The hardware requirements for storage providers are tied to the computational resources needed to seal a sector and generating regular Proof of Spacetime for every sealed sector."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-get-started"
        identifier: "storage-providers-hardware-requirements"
aliases:
    - /docs/storage-providers/hardware-requirements/
weight: 120
toc: true
---

The Filecoin network requires storage providers to run computationally expensive operations to generate sealed sectors. The cost of these operations depends on which network the storage provider is running; some testnets use a smaller sector size to increase the speed of sealing artificially. For reference, the requirements listed below correspond to **32GiB sectors**, as used by mainnet and the calibration network (testnetwork).

## General hardware requirements

The following are _general_ requirements and guidelines for each hardware type to run **just** the `lotus-miner` process without any sealing tasks. But it also highlights some of the requirements for sealing tasks under each hardware type. Resources needed by each sealing operation are detailed later below.

Note that Lotus allows to configure and delegate sealing phases to [Lotus workers]({{< relref "../../storage-providers/seal-workers/seal-workers/" >}}), which in setups that is going to seal multiple sectors in parallel is needed.

## CPU

To run the just the `lotus-miner` process without any sealing tasks, it is recommended to have at least a **CPU with 8 cores**.

### PC1

For the [PreCommit1 task]({{< relref "../../storage-providers/get-started/tasks/#precommit-1" >}}) a CPU model with support for _Intel SHA Extensions_: AMD since Zen microarchitecture, or Intel since Ice Lake, is a must. Lack of SHA Extensions results in a very significant slow down.

## RAM

**128 GiB of RAM** are recommended at the very least if running just the `lotus-miner` when the windowPoSt task is not outsourced to a windowPoSt worker. This **should** be complemented with **256 GiB of swap on a very fast NVMe SSD**.

If the windowPoSt task is outsourced to a seperate windowPoSt worker, one can expect that both the RAM and swap requirement to just run the `lotus-miner` process to be lower.

## GPU

If windowPoSt tasks are not outsourced to a seperate windowPoSt worker, a powerful GPU is **highly recommended** to have on the server that runs the `lotus-miner` process, as it speeds up the proving tasks significantly.

### PC2

The PreCommit 2 tasks is significantly faster when running on a GPU compared to when running on the CPU. The minimum VRAM requirement to run the PC2 process on a GPU is 5GiB VRAM.

### C2

The Commit 2 tasks is significantly faster when running on a GPU compared to when running on the CPU. The minimum VRAM requirement to run the C2 process on a GPU is 11.5GiB VRAM.

{{< alert icon="warning" >}}
Mixing AMD and Nvidia GPUs in the same machine is known to cause issues with OpenCL and should be avoided. In general Nvidia GPUs have better support then AMD cards.
{{< /alert >}}

## Disk

The `lotus-miner` process in itself does not require a very large disk space. But it is recommended to have the process running on a fast storage medium like a NVMe disk, especially if the windowPoSt process is not outsourced to a seperate worker.

### PC1 

Each PreCommit 1 sector will generate data to the amount of 384GiB. Since this sealing task can be write heavy if many sectors are sealing in parallel, it is recommeneded to use SSDs or NVMe drives.

### PC2

Each PreCommit 2 task will read all the previously generated data by the PreCommit 1 sealing task, which means that this process is very read heavy. Running this task on NVMe drives with great read speeds are recommended.


## Specific operation requirements

The following table shows what hardware resources are needed to run a single tasks of the given sealing phase or proof calculation:

| Operation                  | CPU used                       | GPU used | Memory (32Gib sectors) | Notes                                                                                                                                                                                                                                       |
| -------------------------- | ------------------------------ | -------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sealing: preCommit phase 1 | Yes (1 core or 1 core-complex) | No       | 65GiB                 | PoRep SDR encoding. Not amenable to parallelization. Core usage depends on value of [`FIL_PROOFS_USE_MULTICORE_SDR`](https://github.com/filecoin-project/rust-fil-proofs/).
| Sealing: preCommit phase 2 | Yes (when no GPU, all cores)   | Yes      | 128GiB                 | Read-heavy operation, fast NVMe disks recommended. Highly recommended to run on a GPU.                                                                                                                                                         |
| Sealing: commit phase 1    | Yes (all cores)                | No       | -                      |                                                                                                                                                                                                                                             |
| Sealing: commit phase 2    | Yes (when no GPU, all cores)   | Yes      | ~ 192GiB               | Highly recommended to run on a GPU.                                                                                                                                                                                                      |
| Unsealing                  | Yes (1 core)                   | No       | 65GiB                 |                                                                                                                                                                                                                                             |
| Proving _WindowPoSt_       | Yes (all cores, when no GPU)   | Yes      | -                      | _WindowPoSts_ must be submitted in 30 minute windows. When no GPU available, the more CPU cores the faster. Highly recommended to run on a GPU                                                                                                                                  |
| Proving _WinningPoSt_      | Yes                            | No       | -                      | _WinningPoSt_ is a less intensive computation. Must be completed in a 25 seconds window. Recommended to run on a GPU                                                                                                                                                    |

## Future proofing

The above requirements will not increase in the presumable future, and money spent on hardware should provide users with many years of reliable service.