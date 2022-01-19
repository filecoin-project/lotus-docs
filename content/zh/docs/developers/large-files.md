---
title: "大型文件"
description: "本指引更深入地说明存储非常大的文件（超过 1TiB）并提供有关如何存储数据和一些最佳实践。"
lead: "本指引更深入地说明存储非常大的文件（超过 1TiB）并提供有关如何存储数据和一些最佳实践。"
draft: false
menu:
    docs:
        parent: "developers"
weight: 335
toc: true
---

本指引假设您熟悉正常的存储交易工作流程 [normal storage deal workflow]({{< relref "store-data" >}}).

## 最大化每个扇区的存储

在 Filecoin 中，**文件必须小于存储它们的扇区**。　　

通常扇区被错误地描述为 32 GB 或 1 MB，而实际上它们分别是 32 gibibytes (GiB) 和 1 Mebibytes (MiB)。因此，一个 32GiB 扇区有 2^30 字节（1,073,741,824 字节
）而不是 1,000,000,000 字节.　　


但是, **并非扇区中的所有有效都可以有效使用**. 对于每 256 位，保留 2 位位用于证明过程。因此，扇区的可用大小为:　　

<center>
<b>sector-size * 254 / 256**</b>
</center>

这是一个对照表:

| 扇区大小 | 有效空间大小          |
| ----------- | -------------------- |
| 2KiB        | 2,032 bytes          |
| 8MiB        | 8,323,072 bytes      |
| 512MiB      | 532,676,608 bytes    |
| 32GiB       | 34,091,302,912 bytes |
| 64GiB       | 68,182,605,824 bytes |

## 处理离线数据传输

Filecoin 的脱机数据传输功能推荐用于 PB 级和更大的数据集。这允许拥有非常大数据集的用户离线完成数据传输（例如，通过将硬盘从客户端运送到存储供应商），同时存储交易继续按预期在区块链上运作。　　

它是通过存储交易指令上的一个标志去告诉客户端不要通过网络传输数据，而是向存储供货商提供一个 CID（描述数据的唯一标识符），然后存储供应商必须将其与正确核对交易才通过。这给客户端节点提供设置交易的灵活性　—　例如，向存储供应商传递硬盘上的特定位置的数据，他们可以用来生成CID

### 生成唯一的 piece CID

1. 使用Lotus客户端的输入生成CAR文件而无需导入:

```sh
lotus client generate-car <input_path/filename> <output_path/data.car>
```

2. 使用Lotus客户端生成CID和大小:

```sh
lotus client commP <inputCarFilePath>
```

### 离线传输数据给存储供应商

这可以通过多种方式完成，例如将硬盘从客户端运送到存储供应商。

### 最后步骤：存储供应商的作用

存储供应商可以导入数据并手动处理:

```sh
lotus-miner storage-deals import-data <dealCid> <carFilePath>
```

一旦第一个时空证明 (PoSt) 成功提交，存储交易就被视为有效。
