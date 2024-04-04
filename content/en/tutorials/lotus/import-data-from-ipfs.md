---
title: "Import data from IPFS"
description: "This guide will show you how to use Lotus to directly add IPFS-hosted data to the Filecoin network."
lead: "This guide will show you how to use Lotus to directly add IPFS-hosted data to the Filecoin network."
draft: true
menu:
    tutorials:
        parent: "tutorials-lotus"
aliases:
    - /docs/developers/import-data-from-ipfs/
weight: 120
toc: true
---

{{< alert icon="warning" >}}
The import data from IPFS in Lotus has been deprecated as part of the deprecation of the dealmaking pathway in Lotus. Check out: https://github.com/filecoin-project/lotus/pull/11661 for more context
{{< /alert >}}

Lotus supports making deals with data stored in [IPFS](https://ipfs.tech), without having to re-import it into lotus. 

1. Start the IPFS daemon on the same machine as your Lotus node:

    ```shell
    ipfs daemon
    ```

1. Open `~/.lotus/config.toml`.
1. Set the `UseIpfs` variable to `true`:

    ```toml
    [Client]
    UseIpfs = true
    ```

1. Restart your IPFS and Lotus daemon.
1. You should now be able to make deals with the data associated with your IPFS node:

    ```shell
    ipfs add -r example.txt
    ```

    This should output something like:

    ```shell
    added QmV8FbWfaHeEVPMAzWM5paifwf94VFrpvehQqFZez5T6RW example.txt
    198.39 KiB / 198.39 KiB [==========================================] 100.00
    ```

1. You can now use that IPFS hash with `lotus` to create a storage deal.

    ```shell
    lotus client deal QmV8FbWfaHeEVPMAzWM5paifwf94VFrpvehQqFZez5T6RW t01000 <price> <duration>
    ```

{{< alert icon="warning" >}}
The import data from IPFS in Lotus has been deprecated as part of the deprecation of the dealmaking pathway in Lotus. Check out: https://github.com/filecoin-project/lotus/pull/11661 for more context
{{< /alert >}}