---
title: "API access"
description: "You can connect to a Lotus node using the built-in Lotus API. There is some preparation you need to do first on the node that you want to connect to. You must also generate an API key to use in order to connect to the Lotus node."
lead: "You can connect to a Lotus node using the build in Lotus API. There is some preparation you need to do first on the node that you want to connect to. You must also generate an API key to use in order to connect to the Lotus node."
draft: false
menu:
    reference:
             parent: "reference-basics"
             identifier: "reference-basics-api-access"
aliases:
    - /docs/developers/api-access/
    - /developers/api-access/
weight: 110
toc: true
---

## Enable remote API access

The Lotus Miner and the Lotus Node applications come with their own local API endpoints setup by default when they are running. Both `lotus` and `lotus-miner` act as a daemon (when launched with `lotus daemon` or `lotus-miner run`) and as client to that daemon (every other command).

In this section we will explain how to enable remote access to the Lotus APIs as run by the daemons.

{{< alert >}}
**Instructions are the equivalent for `lotus` and `lotus-miner`**. For simplicity, we will just show how to do it with `lotus` by editing the [Lotus Node configuration]({{< relref "defaults" >}}), but the same can be achieved by editing the [Lotus Miner configuration]({{< relref "configuration" >}}).
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
- For Go, [see the Go JSON-RPC client section below ↓](#go-json-rpc-client)

## Go JSON-RPC client

### Locally Hosted Node

To use the Lotus Go client, the [Go RPC-API](https://github.com/filecoin-project/go-jsonrpc) library can be used to interact with the Lotus API node. This library was written by Lotus developers and it is used by Lotus itself.

If your Lotus instance is hosted remotely, ensure that you have enabled [remote API access](#enable-remote-api-access). You will need to obtain an [API token](#api-tokens).

1. First, import the necessary Go module:

    ```shell
    go get github.com/filecoin-project/go-jsonrpc
    ```

1. Create the following script:

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

1. Run `go mod init` to setup your `go.mod` file.
1. You should now to be able to interact with the Lotus API.

### Publicly Available Hosted Endpoints

To use a publicly available hosted endpoint follow the steps for the locally hosted node above replacing the script in step 2 with the following:

Further information about currently available hosted endpoints can be found at the following links:
- [Ankr](https://www.ankr.com/rpc/filecoin/)
- [Glif](https://api.node.glif.io)
- [ChainStack](https://chainstack.com/labs/#filecoin)

{{< alert >}}
**NOTE** - Publicly available hosted endpoints **do not** require an authorization token.
{{< /alert >}}

```go
package main

import (
    "context"
    "fmt"
    "log"

    jsonrpc "github.com/filecoin-project/go-jsonrpc"
    lotusapi "github.com/filecoin-project/lotus/api"
)

func main() {
    addr := "wss.calibration.node.glif.io/apigw/lotus"

    var api lotusapi.FullNodeStruct
    closer, err := jsonrpc.NewMergeClient(context.Background(), "ws://"+addr+"/rpc/v0", "Filecoin", []interface{}{&api.Internal, &api.CommonStruct.Internal}, nil)
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