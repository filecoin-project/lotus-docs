---
title: "Initialize"
description: "This guide describes the necessary steps to initialize a storage provider on-chain."
lead: "This guide describes the necessary steps to initialize a storage provider on-chain."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-setup"
        identifier: "storage-providers-setup-initialize"
aliases:
    - /docs/storage-providers/setup/
    - /storage-providers/configure/setup/
weight: 210
toc: true
---

## Checklist

Make sure that:

- All the [prerequisite steps]({{< relref "../../../storage-providers/setup/prerequisites/">}}) have been completed.
- Wallets have been created for the owner and worker address, and the _worker address_ has funds so that the storage provider can be initialized.
- The following environment variables have been defined and will be available for all `lotus-miner` instances:

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

## Initialization

Before we can run the storage provider we need to initialize it by sending a message to the chain to tell the Filecoin network that we want to start a storage provider:

```shell
lotus-miner init --owner=<address>  --worker=<needs-bls-address> --no-local-storage --sector-size=<32GiB or 64GiB>
```

- The Lotus Miner configuration folder is created in `~/.lotusminer/` or in your `$LOTUS_MINER_PATH` if set.
- The difference between _owner_ and _worker_ addresses is explained in the [miner addresses guide]({{< relref "../../storage-providers/operate/addresses/" >}}). As mentioned above, we recommend using two separate addresses. If the `--worker` flag is not provided, the owner address will be used. _Control addresses_ can be added later when the storage provider is running.
- The `--no-local-storage` flag is used so that we can later configure [specific locations for storage]({{< relref "../../storage-providers/operate/custom-storage-layout/" >}}) the location of our sealing storage, and our long term storage.
- The `--sector-size` specifies the sector size, and can not be changed after the init. The default is 32GiB.

## Running the storage provider

You are now ready to start the `lotus-miner` process:

```shell
lotus-miner run
```

or if you are using the systemd service file:

```shell
systemctl start lotus-miner
```

## Next steps

Your storage provider should now be preliminarily initialized and running, but **there are still a few more things you need to configure** to be ready for prime-time. We will go through these in the [configuration section]({{< relref "../../storage-providers/setup/configuration/" >}}).
