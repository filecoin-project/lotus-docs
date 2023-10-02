---
title: "Troubleshooting"
description: "This page offers some troubleshooting advice for Lotus API users by listing some of the most common errors that they can come across."
lead: "This page offers some troubleshooting advice for Lotus API users by listing some of the most common errors that they can come across."
draft: false
menu:
    reference:
             parent: "reference-basics"
             identifier: "reference-basics-troubleshooting"
aliases:
    - /docs/developers/troubleshooting/
    - /developers/troubleshooting/
weight: 10 
toc: true
---

## Store

## Error: Failed to start deal

```shell
WARN  main  lotus/main.go:72  failed to start deal: computing commP failed: generating CommP: Piece must be at least 127 bytes
```

This error means that there is a minimum file size of 127 bytes.

## Error: 0kb file response during retrieval

This means that the file to be retrieved may have not yet been sealed and is thus, not retrievable yet.

Miners can check sealing progress with this command:

```shell
lotus-miner sectors list
```

When sealing is complete, `pSet: NO` will become `pSet: YES`.

## API

### Types: params

`params` must be an array. If there are no `params` you should still pass an empty array.

### Types: TipSet

For methods such as `Filecoin.StateMinerPower`, where the method accepts the argument of the type `TipSet`, you can pass `null` to use the current chain head.

```shell
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{ "jsonrpc": "2.0", "method": "Filecoin.StateMinerPower", "params": ["t0101", null], "id": 3 }' \
     'http://127.0.0.1:1234/rpc/v0'
```

### Types: Sending a CID

If you do not serialize the CID as a [JSON IPLD link](https://did-ipid.github.io/ipid-did-method/#txref), you will receive an error. Here is an example of a broken CURL request:

```shell
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{ "jsonrpc": "2.0", "method":"Filecoin.ClientGetDealInfo", "params": ["bafyreiaxl446wlnu6t6dpq4ivrjf4gda4gvsoi4rr6mpxau7z25xvk5pl4"], "id": 0 }' \
     'http://127.0.0.1:1234/rpc/v0'
```

To fix it, change the `params` property to:

```shell
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{ "jsonrpc": "2.0", "method":"Filecoin.ClientGetDealInfo", "params": [{"/": "bafyreiaxl446wlnu6t6dpq4ivrjf4gda4gvsoi4rr6mpxau7z25xvk5pl4"}], "id": 0 }' \
     'http://127.0.0.1:1234/rpc/v0'
```
