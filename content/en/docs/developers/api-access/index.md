---
title: "API access"
description: ""
lead: ""
draft: false
menu:
    docs:
        parent: "developers"
weight: 10
toc: true
---

## Enable remote API access

The Lotus Miner and the Lotus Node applications come with their own local API endpoints setup by default when they are running. Both `lotus` and `lotus-miner` act as a daemon (when launched with `lotus daemon` or `lotus-miner run`) and as client to that daemon (every other command).

In this section we will explain how to enable remote access to the Lotus APIs as run by the daemons.

{{< alert >}}
**Instructions are the equivalent for `lotus` and `lotus-miner`**. For simplicity, we will just show how to do it with `lotus` by editing the [Lotus Node configuration](../../set-up/configuration), but the same can be achieved by editing the [Lotus Miner configuration](../../storage-providers/config).
{{< /alert >}}

### Setting the listening interface

By default, the API listens on the local _loopback_ interface `127.0.0.1`. This is configured in the `config.toml` file:

To access the API remotely, Lotus needs to listen on the right IP/interface. The IP associated to each interface can be usually found with the command `ip a`. Once the right IP is known, it can be set in the configuration:

```toml
[API]
  ListenAddress = "/ip4/<EXTERNAL_INTERFACE_IP>/tcp/3453/http" # port is an example

  # Only relevant for lotus-miner
  RemoteListenAddress = "<EXTERNAL_IP_AS_SEEN_BY_OTHERS:<EXTERNAL_PORT_AS_SEEN_BY_OTHERS>"
```

`0.0.0.0` can be used too. This is a wildcard that means "all interfaces". Depending on the network setup, this may affect security (listening on the wrong, exposed interface).

After making these changes, please restart the affected process.

## API tokens

### Obtaining tokens

Any client wishing to talk to the API endpoints, exposed by either the Lotus Node or the Lotus Miner, will need a token. Tokens can be obtained as follows.

For the Lotus Node:

```shell
lotus auth create-token --perm <read,write,sign,admin>
```

For the Lotus Miner:

```shell
lotus-miner auth create-token --perm <read,write,sign,admin>
```

Note that the Lotus daemon and/or the Lotus Miner need to be running in the background!

### Permissions

There are different permissions to choose from:

- `read` - Read node state, no private data.
- `write` - Write to local store / chain, and `read` permissions.
- `sign` - Use private keys stored in wallet for signing, `read` and `write` permissions.
- `admin` - Manage permissions, `read`, `write`, and `sign` permissions.

### Default tokens

Notice how running `lotus auth create-token` is actually triggering a request to the API exposed by the Lotus daemon running in the background. This request is no different but the Lotus application (as client) is using a default pre-generated API token that is available locally and located in `~/.lotus/token`.

The same applies for `lotus-miner`.

## API client libraries


API clients take care of the low-level details of making requests and handling responses and let you focus on writing code specific to your project. They can also translate between different programming languages. These Filecoin API clients are currently available:

- [filecoin.js](https://github.com/filecoin-shipyard/filecoin.js) (Javascript, RPC, compatible with Lotus and other wallet backends).
- [js-filecoin-api-client](https://github.com/filecoin-shipyard/js-filecoin-api-client) (Javascript, compatible with Venus)
- [starling-api](https://github.com/smalldata-industries/starling-api) (Javascript, REST, compatible with Lotus)
- For Go, see the guide on [using Go and JSON-RPC APIs](../../apis/json-rpc).

