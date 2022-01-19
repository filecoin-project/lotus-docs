---
title: "从IPFS导入数据"
description: "本指引将教您如何使用 Lotus 将 IPFS 托管的数据直接添加到 Filecoin 网络。."
lead: "本指引将教您如何使用 Lotus 将 IPFS 托管的数据直接添加到 Filecoin 网络。"
draft: false
menu:
    docs:
        parent: "developers"
weight: 320
toc: true
---

Lotus 支持处理存储在 [IPFS](https://ipfs.io) 内的数据，而无需将其重新导入 Lotus。


1. 在与你的Lotus节点相同的机器上启动 IPFS 守护程序:

    ```shell
    ipfs daemon
    ```

1. 打开 `~/.lotus/config.toml`.
1. 将 `UseIpfs` 变量设置为 `true`:

    ```toml
    [Client]
    UseIpfs = true
    ```

1. 重启IPFS 守护程序.
1. 您现在应该能够处理与 IPFS 节点有关联的数据:

    ```shell
    ipfs add -r example.txt
    ```

    This should output something like:

    ```shell
    added QmV8FbWfaHeEVPMAzWM5paifwf94VFrpvehQqFZez5T6RW example.txt
 198.39 KiB / 198.39 KiB [==========================================] 100.00
    ```

1. 您现在可以使用` lotus` 以及 IPFS hash去建立存储交易了。

    ```shell
    lotus client deal QmV8FbWfaHeEVPMAzWM5paifwf94VFrpvehQqFZez5T6RW t01000
```

