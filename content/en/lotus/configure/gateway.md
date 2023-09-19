---
title: "Lotus Gateway"
description: "A high level guide to running a Lotus API gateway service"
lead: "A Lotus gateway exposes a subset of Lotus node’s API, and depends on an existing datastore, managed by a conventional Lotus full node."
draft: false
menu:
    lotus:
        parent: "lotus-configure"
weight: 330
toc: true
---
## Motivation

A gateway is an invaluable tool for exposing chain data to clients without requiring them to run a full node. It offers some conveniences such as connection rate limiting, and api lookback limits.

## Overview of setup

A Gateway does no management of the local chain store. As such, it’s necessary to run a Lotus process and ensure the Gateway process is using the same datastore.

API requests should be directed to the Gateway process’s socket, not the Lotus socket. It’s recommended to limit access to the Lotus process to prevent circumventing the Gateway.

## Requirements

- An existing Lotus full node, including access to its datastore.
- Access to a lotus-gateway binary, or the appropriate lotus-all-in-one docker image.
- If running the [Ethereum RPC](https://lotus.filecoin.io/lotus/configure/ethereum-rpc), disk space for the Ethereum transaction hash mapping database.

The transaction hash database is relatively small, but is subject to chain activity, so ensure you source the latest information before deploying a gateway.

As of June 2023 the total storage space required is under 2GiB, and grows at approximately 20Mb per day. 

## Configuration

### Lotus fullnode configuration

Ensure splitstore’s `HotStoreMessageRetention` is configured with the gateway’s api lookback in mind. Note that if splitstore is running in “discard” mode, data will be discarded beyond the retention horizon.

By default, the hot store retains 4 finalities of data, if you wish you store beyond this boundary, you’ll need to calculate the number of finalities required to match the api-lookback. For example, if we want an api-lookback of 48 hours we can calculate the finalities as follows:

```
Given:
1 Finality = 900 Epochs (7.5 hours)
1 Epoch = 30 Seconds
4 Finalities retained ahead of compaction horizion.

Then:
Extra retention = Total desired retention - base retention
                = 48 Hours                - 30 Hours
                = 18 Hours

18 Hours    = [64800 Seconds =] 2160 Epochs
2880 Epochs = 2.4 Finalities
```

As finalities are discrete, we need to round this value up. So our configuration will be

```toml
HotStoreMessageRetention = 3
```

Which will give us a total of 52.5 hours of chain history

### Gateway Configuration

Gateway configuration itself is straightforward. You can consult the help page for up to date descriptions of the parameters:

```bash
$ lotus-gateway run --help
NAME:
   lotus-gateway run - Start api server

USAGE:
   lotus-gateway run [command options] [arguments...]

OPTIONS:
   --api-max-lookback value         maximum duration allowable for tipset lookbacks (default: 24h0m0s)
   --api-max-req-size value         maximum API request size accepted by the JSON RPC server (default: 0)
   --api-wait-lookback-limit value  maximum number of blocks to search back through for message inclusion (default: 20)
   --conn-per-minute value          The number of incoming connections to accept from a single IP per minute.  Use 0 to disable (default: 0)
   --listen value                   host address and port the api server will listen on (default: "0.0.0.0:2346")
   --per-conn-rate-limit value      rate-limit API calls per each connection. Use 0 to disable (default: 0)
   --rate-limit value               rate-limit API calls. Use 0 to disable (default: 0)
   --rate-limit-timeout value       the maximum time to wait for the rate limter before returning an error to clients (default: 5s)
```

## Healthchecks

You can check gateway health with the following http requests:

Liveness:    `$HOST:2346/health/livez`

Readiness: `$HOST:2346/health/readyz`

## Monitoring

The gateway exposes prometheus metrics at `/debug/metrics`

Some metrics we recommend are monitoring include:

- Request per second
`sum(rate(lotus_gw_api_request_duration_ms_count[...]))`
- Total Requests
`sum(increase(lotus_gw_api_request_duration_ms_count[...]))`
- RPC Response Errors
`sum(rate(lotus_gw_rpc_response_error[...])) by (method)`
- RPC requests by type
`sum(rate(lotus_gw_api_request_duration_ms_count[...])) by (endpoint)`

### Other notes

We recommend locking down access to the Lotus fullnode managing the datastore, otherwise clients may bypass the gateway, defeating its purpose.

If both the gateway and the lotus process are running on the same host, you have the option of  configuring lotus to listen on  `127.0.0.1` which will allow access only from local processes. The caveat of this is that remote monitoring processes (e.g. prometheus on another host) will be unable to access the metrics endpoint directly.
