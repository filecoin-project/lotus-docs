---
title: "Initialize"
description: "This guide describes the necessary steps to initilize a storage provider on-chain."
lead: "This guide describes the necessary steps to initilize a storage provider on-chain."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-setup"
        identifier: "storage-providers-setup-initialize"
aliases:
    - /docs/storage-providers/setup/
    - /storage-providers/configure/setup/
weight: 110
toc: true
---

## Checklist

Make sure that:

- All the [prerequisite steps]({{< relref "../../../storage-providers/setup/prerequisites/">}}) have been completed.
- The _worker address_ has funds so that the storage provider can be initialized.
- The following environment variables have been defined and will be available for all Lotus miner instances:

  ```plaintext
  export LOTUS_MINER_PATH=/path/to/miner/config/storage
  export LOTUS_PATH=/path/to/lotus/node/folder # When using a local node.
  export FULLNODE_API_INFO=<api_token>:/ip4/<lotus_daemon_ip>/tcp/<lotus_daemon_port>/http # When using a remote Lotus node.
  export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
  export FIL_PROOFS_PARENT_CACHE=/fast/disk/folder2   # > 50GiB!
  ```

- Parameters have been prefetched to the cache folders specified above.
- The system has enough swap if needed.
- The lotus api has been configured and the variable has been exported in the environment where lotus miner runs.
- Wallets have been created for the owner and worker address.

## Initialization

Before we can run the storage provider we need to initilize it by sending a message to the chain and tell the Filecoin network that we want to start a storage provider:

```shell
lotus-miner init --owner=<address>  --worker=<address> --no-local-storage
```

- The Lotus Miner configuration folder is created in `~/.lotusminer/` or in your `$LOTUS_MINER_PATH` if set.
- The difference between _owner_ and _worker_ addresses is explained in the [miner addresses guide]({{< relref "../../storage-providers/operate/addresses/" >}}). As mentioned above, we recommend using two separate addresses. If the `--worker` flag is not provided, the owner address will be used. _Control addresses_ can be added later when the storage provider is running.
- The `--no-local-storage` flag is used so that we can later configure [specific locations for storage]({{< relref "../../../storage-providers/operate/custom-storage-layout/" >}}) the location of our sealing storage, and our long term storage.

## Connectivity to the storage provider

Before you run your storage provider, it is important that it is reachable from any peer in the Filecoin network. For this, you will need a stable public IP and edit your `~/.lotusminer/config.toml` as follows:

```toml
...
[Libp2p]
  ListenAddresses = ["/ip4/0.0.0.0/tcp/24001"] # choose a fixed port
  AnnounceAddresses = ["/ip4/<YOUR_PUBLIC_IP_ADDRESS>/tcp/24001"] # important!
...
```

Once you start your miner, [make sure you can connect to its public IP/port]({{< relref "../../../storage-providers/operate/connectivity/" >}}).

## Running the storage provider

You are now ready to start the `lotus-miner` process:

```shell
lotus-miner run
```

or if you are using the systemd service file:

```shell
systemctl start lotus-miner
```

{{< alert icon="warning" >}}
**Do not proceed** from here until you have verified that your storage provider not only is running, but also [reachable on its public IP address]({{< relref "../../../storage-providers/operate/connectivity/" >}}).
{{< /alert >}}

## Publishing the addresses

Once the storage provider is up and running, publish your address (which you configured above) to the chain so that other nodes can talk to it directly and make deals:

```shell
lotus-miner actor set-addrs /ip4/<YOUR_PUBLIC_IP_ADDRESS>/tcp/24001
```

## Next steps

Your storage provider should now be preliminarily initialized and running, but **there are still a few more things you need to configure** to be ready for prime-time. We will go through these in the [configuration section]({{< relref "../../../storage-providers/setup/configuration/" >}}).