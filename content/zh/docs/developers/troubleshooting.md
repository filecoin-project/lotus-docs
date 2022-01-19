---
title: "API 故障诊断"
description: "此页面列出Lotus API 用户可能遇到的一些常见错误并提供一些故障排除建议。"
lead: "此页面列出Lotus API 用户可能遇到的一些常见错误并提供一些故障排除建议。"
draft: false
menu:
    docs:
        parent: "developers"
weight: 305
toc: true
---

## 存储

## Error: Failed to start deal

```shell
WARN  main  lotus/main.go:72  failed to start deal: computing commP failed: generating CommP: Piece must be at least 127 bytes
```

此错误意味着最小文件为 127 字节。

## Error: 0kb file response during retrieval

这意味着要提取的文件檔可能尚未密封，因此尚不可检索。　　

存储供应商可以使用以下指令检查密封进度:

```shell
lotus-miner sectors list
```

密封完成后，`pSet: NO` 将变为 `pSet: YES`.

## API

### Types: params

params 必须是一个数组。如果没有参数params，您仍然应该传递一个空数组。

### Types: TipSet

用例如 `Filecoin.StateMinerPower` ，该方法接受类型为 `TipSet` 的参数，可以传 `null` 以使用当前区块链头。

```shell
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{ "jsonrpc": "2.0", "method": "Filecoin.StateMinerPower", "params": ["t0101", null], "id": 3 }' \
     'http://127.0.0.1:1234/rpc/v0'
```

### Types: Sending a CID

如果您不将 CID序列化为 [JSON IPLD link](https://did-ipid.github.io/ipid-did-method/#txref), 您将收到错误讯息。以下是损坏的 CURL 请求示例:

```shell
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{ "jsonrpc": "2.0", "method":"Filecoin.ClientGetDealInfo", "params": ["bafyreiaxl446wlnu6t6dpq4ivrjf4gda4gvsoi4rr6mpxau7z25xvk5pl4"], "id": 0 }' \
     'http://127.0.0.1:1234/rpc/v0'
```

为了解决这个问题，将`params`属性改为:

```shell
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{ "jsonrpc": "2.0", "method":"Filecoin.ClientGetDealInfo", "params": [{"/": "bafyreiaxl446wlnu6t6dpq4ivrjf4gda4gvsoi4rr6mpxau7z25xvk5pl4"}], "id": 0 }' \
     'http://127.0.0.1:1234/rpc/v0'
```
