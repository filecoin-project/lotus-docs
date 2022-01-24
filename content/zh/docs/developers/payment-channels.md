---
title: "支付通道"
description: "支付管道用于在两个参与者之间转移资金。本指引说明Lotus支付管道的运作方式，并提供一些有关的使用范例。"
lead: "支付管道用于在两个参与者之间转移资金。本指引说明Lotus支付管道的运作方式，并提供一些有关的使用范例。"
draft: false
menu:
    docs:
        parent: "developers"
weight: 340
toc: true
---

当Lotus客户想要从供货商那里获取数据时，就会建立一个支付管道。客户端发送支付管道的凭证，供货商发送数据响应。支付管道和支付凭证可用于双方有需要在区块链外增量转移价值的情况。　

## 工作原理

- 支付管道用初始金额在区块链上建立.
- 支付凭证允许客户和供货商在区块链外增量地交换资金。供应商可以在任何阶段提交支付凭证。
- 支付管道的任何一方都可以在区块链上结算。
- 过结算期（目前为 12 小时）后，支付管道的任何一方都可在区块链上调用收费指令(collect).
- 收费指令(Collect) 将提交的凭证的价值发送给管道接收者（供货商），并将管道中的余额退还给管道创建者（客户端）。
- 凭证有一个通道、一个随机数（nonce）和一个值，在同一通道中有较高nonce的凭证可取代较低nonce的凭证。每笔交易都创建在不同的通道上。

## CLI 示例

为快速理解，我们可以用 Lotus CLI 来展示支付管道是如何运作。 Lotus CLI 是 Lotus 守护进程的客户端，其执行的每个指令都对应于　Lotus  API 的一次调用。

客户创建了一个到供应商的支付管道，价值为 10 FIL:

```shell
$ lotus paych add-funds <from_addr> <to_addr> 10
<channel addr>
```

客户在通道 0（隐含）中创建一个随机数为 1（隐含）值为 2的支付凭证：

```shell
lotus paych voucher create <channel addr> 2
```

客户将支付凭证发送给供应商使他可将支付凭证加到本地存储：

```shell
lotus paych voucher add <channel addr> <voucher>
```

存储供应商向客户端发送一些数据。　　

客户端在通道 0（隐含）中创建一个随机数为 2（隐含），值为 4的支付凭证：　　

```shell
lotus paych voucher create <channel addr> 4
```

客户端将支付凭证发给供应商，供应商添加支付凭证并发回更多数据。

在管道建立后客户端调用paych add-funds 用相同的客户端和供应商地址为管道增值:

```shell
lotus paych add-funds <client addr> <provider addr> 5
<channel addr> # Same address as above. Channel now has 15
```

一旦客户端收到他们所有的数据，他们就可以结算管道。请注意，结算不必立即完成。例如，客户如想继续与供货商进行交易，那就可一直保持管道开放着。

```shell
lotus paych settle <channel addr>
```

供应商可以将支付凭证提交给区快链（请注意，当区块链上出现结算讯息时，lotus 就会自动执行此操作）。供应商可能已经收到了许多价值逐渐提高的凭证。供应商应该提交最佳凭证。请注意，每个通道将有一个最佳凭证:

```shell
lotus paych voucher best-spendable <channel addr>

<voucher>
<voucher>
<voucher>

lotus paych voucher submit <channel addr> <voucher>
```

结算期结束后，客户端或供应商都可以调用收费指令支付资金。

```shell
lotus paych collect <channel addr>
```

