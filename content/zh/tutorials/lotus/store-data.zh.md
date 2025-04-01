---
title: "存储数据"
description: "本指引将向您展示如何使用 Lotus 在 Filecoin 网络上导入和进行交易以存储数据"
lead: "本指引将向您展示如何使用 Lotus 在 Filecoin 网络上导入和进行交易以存储数据"
draft: true 
menu:
    tutorials:
        parent: "tutorials-lotus"
        identifier: "tutorials-lotus-store-zh"
weight: 355
toc: true
---

{{< alert icon="warning" >}}
Legacy Lotus/Lotus-Miner 市场子系统已于 [2023年1月31日](https://github.com/filecoin-project/lotus/releases/tag/v1.18.0) 结束生命周期(EOL)。截至2024年6月10日，它已从 Lotus/Lotus-Miner 代码库中完全移除。我们建议用户使用 [Boost](https://github.com/filecoin-project/boost)、[Curio Market](https://docs.curiostorage.org/curio-market) 或 [Droplet](https://droplet.venus-fil.io/intro/) 作为替代方案。
{{< /alert >}}

## 概述

为了成功地将数据加到 Filecoin 网络, 需要成功完成以下步骤

1. 数据必须打包成 [CAR file](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md).
1. 存储供应商和客户之间的存储交易必须由存储供应商发起并接受。
1. 数据必须传输给存储供应商。
1. 存储供应商必须将数据放在一个扇区中，封包并提交证明给Filecoin网络

从那时起，网络存储交易就完成

## 导入数据

要在当下将你系统中的普通文件导入到 Lotus 中，请执行:

```shell
lotus client import ./your-example-file.txt
```

完成后，此指令将传Data CID.。这是个非常重要的信息，因为它将用于在将来进行交易以存储和取回数据。

您可以用以下指令去列出当下导入的文件的数据 CID：

```shell
lotus client local
```

如果您需要导入一个完整的文件夹或多个文件，最好先将它们 tar 或 zip 压缩到一个档中。

## #导入定制 DAGs

高段的IPLD 用户可能希望将客制 DAGs 导入 Lotus（如果不适用, 您可以跳过本节）。

CAR file格式允许序列化任何 IPLD-DAG（即 IPLD-CBOR）。定制的 IPLD-DAGs 应该以众所周知的格式（如 CBOR）编码，否则 Lotus 将不知道如何解析它们。

{{< alert icon="warning" >}}
CAR 文件必须包含完整的 DAG, 不支持不完整的 DAG！
{{< /alert >}}

如果您构建了自己的 CAR 文件，请确保直接使用 --car 标志将其导入。

### 比扇区大的文件 

如果您的文件大于正在使用的 [Filecoin](https://status.filecoin.io) 网络的扇区（打开视窗），您需要先将文件拆分为多个部分。

存储供应商将指定他们提供的存储大小量，以便您可以选择最适合您的选项。较小的扇区速度较快，而较大的扇区则更具成本效益

## 进行存储交易

一旦知道数据 CID，就可以使用它与存储供应商进行存储交易。

### 找存储供应商

您可以通过以下方式获取网络中所有存储供应商的列表：

```shell
lotus state list-miners
t0xxxx
t0xxxy
t0xxxz
...
```

### 找价格和条件

为了询问特定存储供应商提供的条款，您可以执行：

```shell
lotus client query-ask <miner>
```

### 达成交易

一旦对条款感到满意，您就可以继续使用您在导入过程中获得的数据 CID 向存储供应商提出交易建议。执行：


```shell
lotus client deal
```

此指令将互动式地询问您的 CID、miner ID 和交易持续时间（以天为单位）。您也可以使用参数调用它

```shell
lotus client deal <data CID> <miner> <price> <duration>
```

其中的期间以区块表示（1区块相当于30秒）。

### 确保交易

鉴于网络当前的速度和稳定性，用户可能会发现他与存储供应商的个别交易意外失败。因此，我们建议您为每个要存储的 [CAR](https://github.com/ipld/specs/blob/master/block-layer/content-addressable-archives.md) 文件（打开新窗口）创建最多 10 个交易。虽然这似乎有点过头了，但这是增加成功交易和存储数据的机会的一种简单方法。随着网络的成熟，这种变通方法将变得越来越没有必要.

## 检查交易状态

您可以用以下列出交易:

```shell
lotus client list-deals
```

除此外，这将为您提供有关交易的当前状况，它们是否已（由存储供应商）在链上发布以及存储供应商是否因不遵守它们而被削减。

交易要成功，存储供应商需要正确配置和执行，接受交易并正确密封文件。否则，交易将出现错误状态。

您可以与多个存储供应商就相同的数据进行交易。

一旦交易成功并且数据被封包，就也可以取回它。

## 附加工具

- [Filecoin.tools](https://filecoin.tools/) 打开新视窗 还允许您检查交易状态
- [Starling](https://github.com/filecoin-project/starling) 提供了一组实用程序在运行中的 Lotus Node 上添加和监控 Filecoin 网络的内容。

