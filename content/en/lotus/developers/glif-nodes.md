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

Developers can interact directly with load-balanced, synced mainnet nodes using the [Lotus JSON RPC API]({{< relref "../../reference/basics/api-access" >}}) on the `https://api.node.glif.io` endpoint (or `https://api.node.glif.io/rpc/v1`).

Unlike bare Lotus, the endpoint above is hardened and limited:

- Only read calls and `MPoolPush()` are supported. You can view the full list of available calls at [api.node.glif.io](https://api.node.glif.io).
- Only POST requests are supported.
- The Filecoin signing tools can be used to sign messages before submission when needed.
- Only the _latest_ 2000 blocks are available on public endpoints. This is due to the limitation of [lightweight-snapshots]({{< relref "chain-management" >}}).
- `Filecoin.StateMarketDeals` operation data is available as a [direct link to an AWS S3 bucket](https://marketdeals.s3.amazonaws.com/StateMarketDeals.json.zst). `StateMarketDeals` data is refreshed every 10 minutes. Alternatively, you can query the Filecoin CID Checker Mongo DB via the [publicly available API](https://filecoin.tools/docs/static/index.html).
- Mainnet network has a ws (web socket) endpoint. The WebSockets link is available at wss://wss.node.glif.io/apigw/lotus/rpc/1

## Calibration endpoint

Calibration nodes using the [JSON RPC API]({{< relref "../../reference/basics/api-access" >}}) can use `https://api.calibration.node.glif.io/rpc/v1`.
- Only the _latest_ 2000 blocks are available on public endpoints. This is due to the limitation of [lightweight-snapshots]({{< relref "chain-management" >}}).
- `Filecoin.StateMarketDeals` operation data is available as a [direct link to an AWS S3 bucket](https://marketdeals-calibration.s3.amazonaws.com/StateMarketDeals.json.zst). `StateMarketDeals` data is refreshed every 10 minutes.

- {{< alert icon="tip" >}}
You can use the `v1` JSON RPC API with `https://api.calibration.node.glif.io/rpc/v1`
{{< /alert >}}

- The Calibration network has a WebSocket endpoint. The WebSocket link is available at wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1

### Custom endpoints

Custom endpoints can be requested, including advanced permission settings. Let us know your use case.

{{< alert icon="tip" >}}
For support, questions and current status, visit the [#fil-glif-node-hosting](https://filecoinproject.slack.com/archives/C017HM9BJ8Z) channel in Filecoin Slack.
{{< /alert >}}

## Get started

Here are some steps to get started on Glif Nodes:

### Fill in the request form

**(Optional) Fill-in the [request form](https://forms.gle/rfXx2yKbhgrwUv837) for a Glif Node**:

This is an optional step if you need a custom node with special features. You will need to provide some details about your expected usage and your needs. When your application is approved, you will receive:

- A JWT token
- A custom endpoint

## Install Lotus and use it as a client

This is an optional step. We can use `lotus` to talk to the Glif node API (as a client) or run a lite node connected to Glif endpoints. This is useful for several things:

- It allows us to verify that the endpoint works and that credentials are correct when using a custom endpoint.
- It makes debugging easier as we can try and quickly check things using the `lotus` CLI directly.
- You can run a lite node that connects to Glif infrastructure instead of syncing the full chain locally.

To use `lotus`, build or install lotus for [Linux]({{< relref "../install/linux" >}}) or [MacOS]({{< relref "../install/macos" >}}). **The lotus version needs to match that of the running node**. We will not be running the Lotus daemon or syncing the chain; we will use it only as a client, or as a lite node.

Check the running version of the Glif node instance with:

```shell
curl -X POST 'https://api.node.glif.io' -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.Version","params":[]}'
```

Once built or installed, in order to let the Lotus binary talk to the Lotus remote endpoint, export the following environment variable:

```shell
export FULLNODE_API_INFO=<token>:<endpoint>

# For example, with the default URL (no token needed)
export FULLNODE_API_INFO=https://api.node.glif.io

# For WebSocket connections (useful for lite nodes)
export FULLNODE_API_INFO=wss://wss.node.glif.io/apigw/lotus/rpc/v1
```

You can test that it works with:

```shell
lotus net id 12D3KooWBF8cpp65hp2u9LK5mh19x67ftAam84z9LsfaquTDSBpt
```

### Using with Lotus lite node

If you want to run a Lotus lite node connected to Glif endpoints, there are some specific considerations:

For lite node connections without authentication, you can use:

```shell
FULLNODE_API_INFO=wss://wss.node.glif.io/apigw/lotus ./lotus daemon --lite
```

However, if you need to provide an API token, you must specify the API version in the URL to avoid routing issues. Use this format:

```shell
FULLNODE_API_INFO=wss://wss.node.glif.io/apigw/lotus/rpc/v1?token=YOUR_TOKEN ./lotus daemon --lite
```

This ensures the lite node sends requests to the correct endpoint instead of malformed URLs that won't work with the Glif infrastructure.

{{< alert icon="tip" >}}
For Calibration network lite nodes, use `wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1?token=YOUR_TOKEN` with the appropriate token.
{{< /alert >}}

By default, all read operations are enabled, along with the MPoolPush method. This means that you will need to [sign messages yourself](https://docs.filecoin.io/reference/general#message-signing-tools) using your own externally-managed wallets, unless you are given a full node under your full control. We can however, use the CLI to send any read commands. The following are just examples:

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

- Read the instructions in the [Lotus API reference](https://docs.filecoin.io/reference/json-rpc). Understand how calls are performed, how authentication works and how parameters and responses are encoded in JSON-RPC. Try out some `curl` examples.
- From the above, learn how to obtain the parameters and expected format for every endpoint from the Lotus Go documentation. This will be the first place to check if something does not work or the format of some parameter is not understood.
- You can also use this [Lotus API documentation](https://documenter.getpostman.com/view/4872192/SWLh5mUd?version=latest) which covers the Glif Node-supported methods in a more readable form, with additional tips.
- If you are planning to send transactions, you will need to manage wallets and create signatures for your messages. See the [signing libraries](https://docs.filecoin.io/reference/general#message-signing-tools) page for different solutions.
