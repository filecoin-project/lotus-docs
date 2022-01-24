---
title: "API访问"
description: "您可以使用 内建的Lotus API 连接Lotus 节点。您需要先在要连接的节点上做一些准备工作。也必须产生一个 API 密钥以用于连接到 Lotus 节点"
lead: "您可以使用 内建的Lotus API 连接Lotus 节点。您需要先在要连接的节点上做一些准备工作。也必须产生一个 API 密钥以用于连接到 Lotus 节点"
draft: false
menu:
    docs:
        parent: "developers"
weight: 301
toc: true
---

## 启用远程 API 访问

`Lotus Miner`和 `Lotus Node` 等应用程序在运作时就有自身默认的API设置。 `lotus` 和 `lotus-miner` 都充当守护程序（当与`lotus`守护程序`lotus-miner run`一起启动时）也同时是该守护程序的客户端（接受所有其他指令时）

在本节中，我们将解释如何启用对守护程序启动 Lotus API 的远程访问。

{{< alert >}}
**`lotus`和`lotus-miner` 的使用说明是相同的**。 为简单起见，我们将只说明如何编辑[`lotus`节点配置]({{< relref "../set-up/configuration" >}})来使用`lotus`，我们同样可以通过编辑[`Lotus Miner`配置]({{< relref "../storage-providers/config" >}})来使用`lotus-miner`的api.
{{< /alert >}}

### 设置监听接口

API 默认监听本地 _loopback_ 接口`127.0.0.1`。这是在`config.toml`文件中设置的:

要远程访问 API，Lotus 需要监听正确的 IP/接口。通常可以使用`ip a` 指令找到与每个接口相关的IP。一旦知道正确的IP，就可以在configuration中进行设置:

```toml
[API]
  ListenAddress = "/ip4/<EXTERNAL_INTERFACE_IP>/tcp/3453/http" # port is an example

  # Only relevant for lotus-miner
  RemoteListenAddress = "<EXTERNAL_IP_AS_SEEN_BY_OTHERS:<EXTERNAL_PORT_AS_SEEN_BY_OTHERS>"
```

也可以使用`0.0.0.0`。这是一个通配符，表示“所有接口”。根据网络设置，这可能会影响安全性（监听错误的、暴露的接口）。
在进行这些更改后，请重新启动受影响的进程。

## API令牌

### 获取令牌

任何客户端希望与Lotus节点或Lotus Miner公开的API端点交互, 都需要一个令牌，令牌可以通过以下方式获得。

Lotus节点:

```shell
lotus auth create-token --perm <read,write,sign,admin>
```

Lotus Miner节点:

```shell
lotus-miner auth create-token --perm <read,write,sign,admin>
```

请注意，Lotus和/或Lotus Miner守护程序需要在后端执行着！

### 权限

有不同的权限可选：

- `read` - 读取节点状态，无私有数据
- `write` - 写入本地存储/链，和`read`权限。
- `sign` - 使用钱包中存储的私钥签名、`read`和`write`的权限。
- `admin` - 管理权限、`read`、`write`和`sign`权限。

### 默认令牌

请注意, 执行`lotus auth create-token`实际上是触发了对后台运行的Lotus守护进程所暴露的API的请求。此请求没有什么不同，但 Lotus 应用程序（作为客户端）使用的是预设于当地原有 的API令牌，该令牌位于`~/.lotus/token`。

这同样适用于`lotus-miner`。

## API客户端库

API 客户端负责发出请求和处理响应的低层级细节好让您可专注于编写您项目的特定代码。API 客户端还可以在不同的程序语言之间进行翻译。这些Filecoin API客户端目前是可用的：

- [filecoin.js](https://github.com/filecoin-shipyard/filecoin.js) (Javascript, RPC,与 Lotus 和其他钱包后端兼容).
- [js-filecoin-api-client](https://github.com/filecoin-shipyard/js-filecoin-api-client) (Javascript, 与Venus兼容)
- [starling-api](https://github.com/smalldata-industries/starling-api) (Javascript, REST, 与 Lotus兼容)
- For Go, [参看以下 the Go JSON-RPC client section below ↓](#go-json-rpc-client)

## GO JSON-RPC 客户端

要使用 Lotus Go 客户端, 可以使用 [Go RPC-API](https://github.com/filecoin-project/go-jsonrpc) 库与 Lotus API 节点互动。这个库是由 Lotus 开发人员编写的, 可供 Lotus 自己使用。

如果您的 Lotus 实例是远程托管的，请确保您已启用[remote API access](#enable-remote-api-access)。您将需要取得一个 API 令牌。

1. 首先，导入必要的 Go 模块：

    ```shell
    go get github.com/filecoin-project/go-jsonrpc
    ```

1. 创建以下代码:

    ```go
    package main

    import (
        "context"
        "fmt"
        "log"
        "net/http"

        jsonrpc "github.com/filecoin-project/go-jsonrpc"
        lotusapi "github.com/filecoin-project/lotus/api"
    )

    func main() {
        authToken := "<value found in ~/.lotus/token>"
        headers := http.Header{"Authorization": []string{"Bearer " + authToken}}
        addr := "127.0.0.1:1234"

        var api lotusapi.FullNodeStruct
        closer, err := jsonrpc.NewMergeClient(context.Background(), "ws://"+addr+"/rpc/v0", "Filecoin", []interface{}{&api.Internal, &api.CommonStruct.Internal}, headers)
        if err != nil {
            log.Fatalf("connecting with lotus failed: %s", err)
        }
        defer closer()

           // Now you can call any API you're interested in.
        tipset, err := api.ChainHead(context.Background())
        if err != nil {
            log.Fatalf("calling chain head: %s", err)
        }
        fmt.Printf("Current chain head is: %s", tipset.String())
    }
    ```

1. 执行 `go mod init` 设置你的 `go.mod` 文件。
1. 您现在应该能够与 Lotus API 互通了。
