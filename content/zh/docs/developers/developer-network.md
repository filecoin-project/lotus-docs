---
title: "开发者网络"
description: "Running a Filecoin network locally can be extremely useful for developers wanting to build and test their applications. This page provides guidance on different methods to run a Filecoin network locally."
draft: false
menu:
    docs:
        parent: "developers"
weight: 310
toc: true
---

## 手动设置

您可以使用常规的 Lotus 二进制文件启动dev-net。此方法将使用 2 KiB 扇区启动 Lotus 以允许用较少资源执行dev-net。此法可在拥有2个 CPU 内核和 4GB RAM 的计算机上轻松运行。
此过程需要您使用多个终端窗口，所以你可能会发现像[Tmux](https://github.com/tmux/tmux) 这样的终端多路复用器很有帮助。　　

1. 一些不支持 [ADX 指令集](https://en.wikipedia.org/wiki/Intel_ADX) 的旧Intel和AMD处理器可能会遇到有非法指令错误出现而崩溃。要解决此问题，请添加`CGO_CFLAGS`环境变量:

   ```shell
   export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
   export CGO_CFLAGS="-D__BLST_PORTABLE__"
   ```

1. 用临时值替换 `LOTUS_PATH` 和 `LOTUS_MINER_PATH`:

   ```shell
   export LOTUS_PATH=~/.lotusDevnet
   export LOTUS_MINER_PATH=~/.lotusminerDevnet
   ```

   如果您将这些值添加到 `~/.bashrc` 之类的配置文件中，在您想在 Filecoin 主网上运行节点时必须将它们删除。

1. 复制Lotus仓库:

   ```shell
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus
   ```

1. 使用 2048 字节扇区在调试模式下编译 Lotus 二进制文件:

   ```shell with-output
   make 2k
   ```

   这将输出：

   ```
   git submodule update --init --recursive
   Submodule 'extern/filecoin-ffi' (https://github.com/filecoin-project/filecoin-ffi.git) registered for path 'extern/filecoin-ffi'
   ...
   ```

1. Lotus 会自动寻找 Filecoin 主网的创世区块。可使用 `LOTUS_SKIP_GENESIS_CHECK` 环境变量跳过这一步:

   ```shell
   export LOTUS_SKIP_GENESIS_CHECK=_yes_
   ```

1. 抓取2048字节的参数:

   ```shell with-output
   ./lotus fetch-params 2048
   ```

   这将输出:

   ```
   2021-02-23T10:58:01.469-0500    INFO    build   go-paramfetch@v0.0.2-0.20200701152213-3e0f0afdc261/paramfetch.go:138  Parameter file /var/tmp/filecoin-proof-parameters/v28-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-0-0-0cfb4f178bbb71cf2ecfcd42accce558b27199ab4fb59cb78f2483fe21ef36d9.vk is ok
   ...
   c261/paramfetch.go:162  parameter and key-fetching complete
   ```

1. 为创世区块预封一些扇区:

   ```shell with-output
   ./lotus-seed pre-seal --sector-size 2KiB --num-sectors 2
   ```

   这将输出:

   ```
   sector-id: {{1000 0} 0}, piece info: {2048 baga6ea4seaqoej3hzxzqr5y25ibovtjrhed7yba5vm6gwartr5hsgcbao7aluki}
   ...
   2021-02-23T10:59:36.937-0500    INFO    preseal seed/seed.go:232        Writing preseal manifest to /home/user/.genesis-sectors/pre-seal-t01000.json
   ```

1. 创建创世区块:

   ```shell
   ./lotus-seed genesis new localnet.json
   ```

1. 为默认账户充值FIL:

   ```shell with-output
   ./lotus-seed genesis add-miner localnet.json ~/.genesis-sectors/pre-seal-t01000.json
   ```

   这将输出:

   ```
   t3wknmlrksha5itapqstc46zdals676h67vjl7lg2lvmrxozzuth6hovuuamgfbk6cqgha3m3qfo4fxmuhubha some initial balance
   ```

1. 启动第一个节点:

   ```shell
   ./lotus daemon --lotus-make-genesis=devgen.car --genesis-template=localnet.json --bootstrap=false
   ```

1. 创建一个新的终端窗口或选项卡并重新导出　`LOTUS_PATH` 和 `LOTUS_MINER_PATH` 环境变量:

   ```shell
   export LOTUS_PATH=~/.lotusDevnet
   export LOTUS_MINER_PATH=~/.lotusminerDevnet
   ```

   如果您将上述变量添加到 `~/.bashrc` 之类的配置文件中，那么您可以直接source该文件:

   ```shell
   source ~/.bashrc
   ```

1. 导入创世存储节点密钥:

   ```shell with-output
   ./lotus wallet import --as-default ~/.genesis-sectors/pre-seal-t01000.key
   ```

   这将输出:

   ```
   imported key t3sxyian3zr52a32r7gpyx55rhf4wmbsm7e6ir3ygcaytrl44txwxwyron7uo4pbbqvmsaek36gqbjmmpwkwga successfully!
   ```

1. 设置创世存储供应商。此过程可能需要几分钟时间:

   ```shell with-output
   ./lotus-miner init --genesis-miner --actor=t01000 --sector-size=2KiB --pre-sealed-sectors=~/.genesis-sectors --pre-sealed-metadata=~/.genesis-sectors/pre-seal-t01000.json --nosync
   ```

   这将输出:

   ```
   2021-02-23T11:05:17.941-0500    INFO    main    lotus-storage-miner/init.go:124 Initializing lotus miner
   ...
   2021-02-23T16:55:57.257Z        INFO    main    lotus-storage-miner/init.go:494 Importing pre-sealed sector metadata for t01000
   2021-02-23T16:55:57.266Z        INFO    main    lotus-storage-miner/init.go:266 Miner successfully created, you can now start it with 'lotus-miner run'
   ```

1. 启动存储供应商节点:

   ```shell with-output
   ./lotus-miner run --nosync
   ```

   这将输出:

   ```
   2021-02-23T16:58:13.493Z        INFO    main    lotus-storage-miner/run.go:95   Checking full node sync status
   2021-02-23T16:58:13.501Z        INFO    modules modules/core.go:64      memory limits initialized       {"max_mem_heap": 0, "total_system_mem": 2101817344, "effective_mem_limit": 2101817344}
   ...
   ```

您现在有一个 Lotus 节点和一个正在运行的存储供应商！你可以与它互动

## Textile 容器

Textile 的开发人员创建了一种快速的方法来执行 Lotus dev-net 以进行测试。除了易于设置之外，这个开发网的一个优点是使用模拟的“扇区构建器”，这使得诸如密封之类的昂贵操作变得更加容易。

可前往 [textileio/lotus-devnet GitHub 仓库](https://github.com/textileio/lotus-devnet) 以了解如何在Textile dev-net 上设置节点。


