---
title: "Glif 节点"
description: "Glif provides a number of synced Lotus node endpoints on the Filecoin testnets and mainnet."
draft: false
menu:
    docs:
        parent: "developers"
weight: 315
toc: true
---

## 主网端点

开发人员可以使用 `https://api.node.glif.io` 端点 (或 `https://api.node.glif.io/rpc/v0` )上的 [JSON RPC API]({{< relref "https://api.node.glif.io" >}}) 与负载平衡、同步的主网节点直接互动.

与裸露的Lotus不同，上面的端点是经过加固和限制的：

- 只支持读取调用和 `MPoolPush()`。
- 只支持POST请求。
- 在需要的时候，Filecoin签名工具可以用来在提交前签署消息。

## 测试网端点

对于使用 [JSON RPC API]({{< relref "https://calibration.node.glif.io" >}})　的同步完成的testnet端点, `https://calibration.node.glif.io` 可以使用。

### 自定义端点

可以请求定制端点，包括高级权限设置。让我们知道你的使用场景。

{{< alert icon="tip" >}}
有关支持、问题和当前状态，请访问[Filecoin社区 Slack](https://filecoin.io/slack)的 [#fil-glif-node-hosting](https://filecoinproject.slack.com/archives/C017HM9BJ8Z)　频道.
{{< /alert >}}

## 新手入门

以下是开始使用Glif节点的一些步骤:

### 填写申请表

**（可选）填写 Glif 节点[申请表](https://forms.gle/rfXx2yKbhgrwUv837)　**:

如果您需要具特殊功能的自定节点，则这是一个可选步骤。您需要提供一些预期使用和需求的详细数据。当您的申请获得批准后您将收到:

- 一个JWT 令牌
- 自定义端点

## 安装 Lotus 并将其用作客户端

这是一个可选步骤。我们可以使用 lotus 与 Glif 节点 API（当作客户端）对话。这对两件事很有用:

- 它允许我们在使用自定义端点时验证其是否正常运作以及凭证是否正确。
- 使调试更容易，因为我们可以尝试直接使用 `lotus` CLI 进行快速检查

要使用 `lotus`，请从 [releases page](https://github.com/filecoin-project/lotus/releases/). 下载并提取合适的 lotus 版本。 **lotus 版本需要与运作的节点版本相符** 。我们不会执行 Lotus 守护程序或同步区块链，我们只会将它用作客户端。

使用以下指令检查 Glif 节点实例运行的版本:

```shell
curl -X POST 'https://api.node.glif.io' -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.Version","params":[]}'
```

下载完成后，为了让 Lotus 二进制文件与 Lotus 远程端点通信，请导出以下环境变量:

```shell
export FULLNODE_API_INFO=<token>:<endpoint>

# For example, with the default URL (no token needed)
export FULLNODE_API_INFO=https://api.node.glif.io
```

您可以用以下指令测试它是否有用:

```shell
lotus net id 12D3KooWBF8cpp65hp2u9LK5mh19x67ftAam84z9LsfaquTDSBpt
```

如果上述方法不起作用，请验证您使用的是正确的令牌和多重地址。　　

默认情况下，所有读取操作以及采用 MPoolPush 方法都为启用状态。这意味着您需要使用自己的外部管理钱包[sign messages yourself](https://docs.filecoin.io/build/signing-libraries/) 除非您完全控制整个节点。但是，我们可以使用 CLI 发送任何读取指令。以下仅为示例:

```shell
./lotus net id
./lotus net peers
./lotus sync status
./lotus chain head
...
```

熟悉节点的功能并验证端点正常运作。在快速调试时，与CLI 的互动将会非常有用。请注意，默认的 Glif 端点是负载平衡的跨多个 Lotus 节点！

## 直接与 JSON-RPC API 整合

您的应用程序很可能会直接与 Lotus JSON-RPC API互动。以下是获取有关对 API 的操作了解的第一步:

- 阅读 Lotus API 参考 [Lotus API reference](https://docs.filecoin.io/build/signing-libraries/) 的说明.　了解程序调用的执行方式、如何验证以及参数和响应在 JSON-RPC 中如何编码。尝试一些 `curl` 示例
- 通过以上去了解如何从 Lotus Go 文档中获取每个端点的参数和预期格式。这将是有问题时或某些参数的格式不被接受时第一个要检查的地方。
- 您还可以使用 [Lotus API documentation](https://documenter.getpostman.com/view/4872192/SWLh5mUd?version=latest) 其内容以更易读的形式介绍了 Glif Node 支持的方法，并附有其他提示。
- 如果您计划发送交易，您将需要管理钱包并为您的讯息创建签名。请参阅签名库 [signing libraries](https://docs.filecoin.io/build/signing-libraries/) 页面以了解不同的解决方案。
