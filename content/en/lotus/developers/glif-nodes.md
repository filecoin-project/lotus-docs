---
title: "Glif nodes"
description: "Glif provides a number of synced Lotus node endpoints on the Filecoin testnets and mainnet."
draft: false
menu:
    lotus:
             parent: "lotus-developers"
aliases:
    - /docs/developers/hosted-lotus/
    - /developers/glif-nodes/
weight: 115
toc: true
---

## Mainnet endpoint

Developers can interact directly with load-balanced, synced mainnet nodes using the [JSON RPC API]({{< relref "/reference/basics/overview" >}}) on the `https://api.node.glif.io` endpoint (or `https://api.node.glif.io/rpc/v0`).

Unlike bare Lotus, the endpoint above is hardened and limited:

- Only read calls and `MPoolPush()` are supported. You can view the full list of available calls at [api.node.glif.io](https://api.node.glif.io).
- Only POST requests are supported.
- The Filecoin signing tools can be used to sign messages before submission when needed.
- Only the _latest_ 2000 blocks are available on public endpoints. This is due to the limitation of [lightweight-snapshots]({{< relref "chain-management" >}}).
- `Filecoin.StateMarketDeals` operation data is available as a [direct link to an AWS S3 bucket](https://marketdeals.s3.amazonaws.com/StateMarketDeals.json.zst). `StateMarketDeals` data is refreshed every 10 minutes. Alternatively, you can query the Filecoin CID Checker Mongo DB via the [publicly available API](https://filecoin.tools/docs/static/index.html).
- Mainnet network has a ws (web socket) endpoint. the ws link is available like [wss://wss.node.glif.io/apigw/lotus/rpc/v0](wss://wss.node.glif.io/apigw/lotus/rpc/v0)

## Testnet endpoint

Testnet nodes using the [JSON RPC API]({{< relref "/reference/basics/overview" >}}) can use `https://api.calibration.node.glif.io/rpc/v0`.
- Only the _latest_ 2000 blocks are available on public endpoints. This is due to the limitation of [lightweight-snapshots]({{< relref "chain-management" >}}).
- `Filecoin.StateMarketDeals` operation data is available as a [direct link to an AWS S3 bucket](https://marketdeals-calibration.s3.amazonaws.com/StateMarketDeals.json.zst). `StateMarketDeals` data is refreshed every 10 minutes.

- {{< alert icon="tip" >}}
You can use the `v1` JSON RPC API with `https://api.calibration.node.glif.io/rpc/v1`
{{< /alert >}}

- Testnet network has a ws (web socket) endpoint. the ws link is available like [wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v0](wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v0)

### Custom endpoints

Custom endpoints can be requested, including advanced permission settings. Let us know your use case.

{{< alert icon="tip" >}}
For support, questions and current status, visit the [#fil-glif-node-hosting](https://filecoinproject.slack.com/archives/C017HM9BJ8Z) channel in [Filecoin Community Slack](https://filecoin.io/slack).
{{< /alert >}}

## Get started

Here are some steps to get started on Glif Nodes:

### Fill in the request form

**(Optional) Fill-in the [request form](https://forms.gle/rfXx2yKbhgrwUv837) for a Glif Node**:

This is an optional step if you need a custom node with special features. You will need to provide some details about your expected usage and your needs. When your application is approved, you will receive:

- A JWT token
- A custom endpoint

## Install Lotus and use it as a client

This is an optional step. We can use `lotus` to talk to the Glif node API (as a client). This is useful for two things:

- It allows us to verify that the endpoint works and that credentials are correct when using a custom endpoint.
- It makes debugging easier was we can try and quickly check things using the `lotus` CLI directly.

To use `lotus`, download and extract the appropriate lotus release from the [releases page](https://github.com/filecoin-project/lotus/releases/). **The lotus version needs to match that of the running node**. We will not be running the Lotus daemon or syncing the chain, we will use it only as a client.

Check the running version of the Glif node instance with:

```shell
curl -X POST 'https://api.node.glif.io' -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.Version","params":[]}'
```

Once downloaded, in order to let the Lotus binary talk to the Lotus remote endpoint, export the following environment variable:

```shell
export FULLNODE_API_INFO=<token>:<endpoint>

# For example, with the default URL (no token needed)
export FULLNODE_API_INFO=https://api.node.glif.io
```

You can test that it works with:

```shell
lotus net id 12D3KooWBF8cpp65hp2u9LK5mh19x67ftAam84z9LsfaquTDSBpt
```

If the above does not work, verify that you are using the right token and multiaddress.

By default, all read operations are enabled, along with the MPoolPush method. This means that you will need to [sign messages yourself](https://docs.filecoin.io/build/signing-libraries/) using your own externally-managed wallets, unless you are given a full node under your full control. We can however, use the CLI to send any read commands. The following are just examples:

```shell
./lotus net id
./lotus net peers
./lotus sync status
./lotus chain head
...
```

Get familiar with the capabilities of your node and verify that the endpoints. The CLI interactions will be useful when debugging things in a quick way. Note that the default Glif endpoint is load-balanced across several Lotus nodes!

## Integrate directly with the JSON-RPC API

Your application will very probably interact with the Lotus JSON-RPC API directly. Here are the first steps to gain operative knowledge on this API:

- Read the instructions in the [Lotus API reference](https://docs.filecoin.io/build/signing-libraries/). Understand how calls are performed, how authentication works and how parameters and responses are encoded in JSON-RPC. Try out some `curl` examples.
- From the above, learn how to obtain the parameters and expected format for every endpoint from the Lotus Go documentation. This will be the first place to check if something does not work or the format of some parameter is not understood.
- You can also use this [Lotus API documentation](https://documenter.getpostman.com/view/4872192/SWLh5mUd?version=latest) which covers the Glif Node-supported methods in a more readable form, with additional tips.
- If you are planning to send transactions, you will need to manage wallets and create signatures for your messages. See the [signing libraries](https://docs.filecoin.io/build/signing-libraries/) page for different solutions.
