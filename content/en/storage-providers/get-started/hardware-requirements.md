---
title: "Hardware requirements"
description: "The hardware requirements for storage providers are tied to the computational resources needed to seal a sector and generate regular Proof of Spacetime for every sealed sector."
lead: "The hardware requirements for storage providers are tied to the computational resources needed to seal a sector and generate regular Proof of Spacetime for every sealed sector."
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

The Filecoin consensus relies on multiple stages, which are very difficult to execute on a single type of hardware. Therefore, it is strongly not recommended to try to run all parts of an SP from a single machine, as supporting such a setup economically is impossible. To complement the hardware recommendations for each task type or process, it is advisable to configure and delegate sealing phases to [`lotus-worker`]({{< relref "../../storage-providers/seal-workers/seal-workers/" >}}), particularly in setups where multiple sectors need to be sealed in parallel. This will help ensure that each [specific operation requirement]({{< relref "../../storage-providers/get-started/hardware-requirements/#specific-operation-requirements" >}}) is met and that the `lotus-miner` process runs smoothly.

| Hardware | Specification |
|----------|---------------|
| CPU      | 8-core processor |
| CPU Support | Models with support for _Intel SHA Extensions_ (AMD since Zen microarchitecture or Intel since Ice Lake) will significantly speed up the processes. |
| RAM      | 256 GiB RAM + Swap |
| GPU | Nvidia GPU with at least 11GB VRAM |
| Disk | 2 TB NVMe disk |


## CPU

To run just the `lotus-miner` process without any sealing tasks, it is recommended to have at least a **CPU with 8 cores**.

### PC1

For the [PreCommit1 task]({{< relref "../../storage-providers/get-started/tasks/#precommit-1" >}}), a CPU model with support for _Intel SHA Extensions_: AMD since Zen microarchitecture, or Intel since Ice Lake, is a must. Lack of SHA Extensions results in a very significant slowdown.

### PC2
For the [PreCommit2 task]({{< relref "../../storage-providers/get-started/tasks/#precommit-2" >}}) a CPU with a lot of cores will speed up the process, unless the task is offloaded to a GPU, **which is highly recommended to speed up the task.**

### C2
For the [Commit2 task]({{< relref "../../storage-providers/get-started/tasks/#commit-2" >}}) a CPU with a lot of cores will speed up the process, unless the task is offloaded to a GPU, **which is highly recommended to speed up the task.**

## RAM

**128 GiB of RAM** are recommended at the very least if the `lotus-miner` when the windowPoSt task is not outsourced to a windowPoSt worker. This **should** be complemented with **128 GiB of swap on a fast NVMe SSD**.

If the windowPoSt task is outsourced to a separate windowPoSt worker, one can expect that both the RAM and swap requirements to just run the `lotus-miner` process to be lower. See the specific operation requirements for more information about the [windowPoSt hardware requirements]({{< relref "../../storage-providers/get-started/hardware-requirements/#specific-operation-requirements" >}})

### Sealing tasks
Check the [specific task hardware requirements table]({{< relref "../../storage-providers/get-started/hardware-requirements/#specific-operation-requirements" >}}) for RAM usage per task.

## GPU

If windowPoSt tasks are not outsourced to a separate windowPoSt worker, a **powerful GPU is highly recommended** to have on the server that runs the `lotus-miner` process, as it speeds up the proving tasks significantly.

### PC2

The PreCommit 2 tasks are significantly faster when running on a GPU compared to when running on the CPU. The minimum VRAM requirement to run the PC2 process on a GPU is 5GiB VRAM.

### C2

The Commit 2 tasks is significantly faster when running on a GPU compared to when running on the CPU. The minimum VRAM requirement to run the C2 process on a GPU is 11GiB VRAM.

{{< alert icon="warning" >}}
Mixing AMD and Nvidia GPUs in the same machine is known to cause issues with OpenCL and should be avoided. In general, Nvidia GPUs have better support than AMD cards.
{{< /alert >}}

## Disk

The `lotus-miner` process in itself does not require a very large disk space. But it is recommended to have the process running on a fast storage medium like an NVMe disk, especially if the windowPoSt process is not outsourced to a separate worker.

### PC1 

Each PreCommit 1 sector will generate data to the amount of 384GiB. Since this sealing task can be write heavy if many sectors are sealing in parallel, it is recommended to use SSDs or NVMe drives.

### PC2

Each PreCommit 2 task will read all the previously generated data by the PreCommit 1 sealing task, which means that this process is very read heavy. Running this task on NVMe drives with great read speeds are recommended.

### C2

Each Commit 2 task uses the 16MiB file generated in the [Commit1 phase]({{< relref "../../storage-providers/get-started/tasks/#commit-1" >}}). This process can comfortably be run on SSDs.

## Specific operation requirements

The following table shows what hardware resources are needed to run a single task of the given sealing phase or proof calculation:

| Operation                      | CPU used                       | GPU used | VRAM   | Memory (32Gib sectors) | Notes                                                                                                                                                                                     |
| ------------------------------ | -------------------------------| -------- | ------ | ---------------------- |  ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sealing: AddPiece              | Yes (all cores)                | No       | -      | 0.2GiB                 | Write heavy                                                                                                                                                                               |
| Sealing: preCommit phase 1     | Yes (1 core or 1 core-complex) | No       | -      | 64GiB                  | PoRep SDR encoding. Not amenable to parallelization. Core usage depends on the value of [`FIL_PROOFS_USE_MULTICORE_SDR`](https://github.com/filecoin-project/rust-fil-proofs/).               |
| Sealing: preCommit phase 2     | Yes (when no GPU, all cores)   | Yes      | 5 GiB  | 30GiB                  | Read-heavy operation, fast NVMe disks recommended. **Highly recommended to run on a GPU**                                                                                                 |
| Sealing: commit phase 1        | Yes                            | No       | -      | -                      | Extremely light computation, usually faster then 1 second                                                                                                                                 |
| Sealing: commit phase 2        | Yes (when no GPU, all cores)   | Yes      | 11 GiB | ~ 192GiB               | **Highly recommended to run on a GPU**. Using 128GiB RAM and 64GiB SWAP is possible, but comes at a performance hit.                                                                      |
| Unsealing                      | Yes (1 core or 1 core-complex) | No       | -      | 64GiB                  | Same process as preCommit phase 1. Not amenable to parallelization. Core usage depends on the value of [`FIL_PROOFS_USE_MULTICORE_SDR`](https://github.com/filecoin-project/rust-fil-proofs/).|
| SnapDeals: Update Replica (RU) | Yes (when no GPU, all cores)   | Yes      | 5 GiB  | 64GiB                  | **Highly recommended to run on a GPU**.                                                                                                                                                   |
| SnapDeals: PRU2                | Yes (when no GPU, all cores)   | Yes      | 11 GiB | ~ 192GiB               | **Highly recommended to run on a GPU**. Using 128GiB RAM and 64GiB SWAP is possible, but comes at a performance hit.                                                                      |
| Proving _WindowPoSt_           | Yes (all cores, when no GPU)   | Yes      | 11 GiB | 96GiB                  | _WindowPoSts_ must be submitted in 30 minute windows. When no GPU is available, the more CPU cores, the faster. **Highly recommended to run on a GPU**.                                       |
| Proving _WinningPoSt_          | Yes                            | No       | 6 GiB  | 16GiB                  | _WinningPoSt_ is a less intensive computation and must be completed in a 25-second window. **It is highly recommended to run on a GPU.**                                                  |

## Future proofing

The above requirements will not increase in the foreseeable future, and money spent on hardware should provide users with many years of reliable service.
