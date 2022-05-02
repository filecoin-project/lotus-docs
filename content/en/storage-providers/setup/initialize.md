---
title: "Setup"
description: "This guide describes the necessary steps to configure a Lotus miner for production."
lead: "This guide describes the necessary steps to configure a Lotus miner for production."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-setup"
        identifier: "storage-providers-setup-setup"
aliases:
    - /docs/storage-providers/setup/
    - /storage-providers/configure/setup/
weight: 110
toc: true
---

## Checklist before launch

To summarize, make sure that:

- The _worker address_ has some funds so that the miner can be initialized.
- The following environment variables have been defined and will be available for any Lotus miner runs:

  ```plaintext
  export LOTUS_MINER_PATH=/path/to/miner/config/storage
  export LOTUS_PATH=/path/to/lotus/node/folder # When using a local node.
  export BELLMAN_CPU_UTILIZATION=0.875 # Optimal value depends on your exact hardware.
  export FIL_PROOFS_MAXIMIZE_CACHING=1
  export FIL_PROOFS_USE_GPU_COLUMN_BUILDER=1 # When having GPU.
  export FIL_PROOFS_USE_GPU_TREE_BUILDER=1   # When having GPU.
  export FIL_PROOFS_PARAMETER_CACHE=/fast/disk/folder # > 100GiB!
  export FIL_PROOFS_PARENT_CACHE=/fast/disk/folder2   # > 50GiB!
  ```

- Parameters have been prefetched to the cache folders specified above.
- The system has enough swap and it is active.
- The lotus api has been configured and variable has been exported in the environment where lotus miner runs.
- Wallets have been created for the owner and worker address.

## Miner initialization

Before starting your miner for the first time run:

```shell
lotus-miner init --owner=<address>  --worker=<address> --no-local-storage
```

- The `--no-local-storage` flag is used so that we can later configure [specific locations for storage]({{< relref "custom-storage-layout" >}}). This is optional but recommended.
- The Lotus Miner configuration folder is created at `~/.lotusminer/` or `$LOTUS_MINER_PATH` if set.
- The difference between _owner_ and _worker_ addresses is explained in the [miner addresses guide]({{< relref "addresses" >}}). As mentioned above, we recommend using two separate addresses. If the `--worker` flag is not provided, the owner address will be used. _Control addresses_ can be added later when the miner is running.

## Connectivity to the miner

Before you start your miner, it is important to configure it so that it is reachable from any peer in the Filecoin network. For this, you will need a stable public IP and edit your `~/.lotusminer/config.toml` as follows:

```toml
...
[Libp2p]
  ListenAddresses = ["/ip4/0.0.0.0/tcp/24001"] # choose a fixed port
  AnnounceAddresses = ["/ip4/<YOUR_PUBLIC_IP_ADDRESS>/tcp/24001"] # important!
...
```

Once you start your miner, [make sure you can connect to its public IP/port]({{< relref "connectivity" >}}).

## Starting the miner

You are now ready to start your Lotus miner:

```shell
lotus-miner run
```

or if you are using the systemd service file:

```shell
systemctl start lotus-miner
```

{{< alert icon="warning" >}}
**Do not proceed** from here until you have verified that your miner not only is running, but also [reachable on its public IP address]({{< relref "connectivity" >}}).
{{< /alert >}}

## Publishing the miner addresses

Once the miner is up and running, publish your miner address (which you configured above) on the chain so that other nodes can talk to it directly and make deals:

```shell
lotus-miner actor set-addrs /ip4/<YOUR_PUBLIC_IP_ADDRESS>/tcp/24001
```

## Next steps

Your miner should now be preliminarily set up and running, but **there are still a few more recommended tasks** to be ready for prime-time:

- Set up your [custom storage layout]({{< relref "custom-storage-layout" >}}) (required if you used `--no-local-storage`).
- Edit the miner [configuration settings]({{< relref "configuration" >}}) to fit your requirements.
- Learn what is a right moment to [shut down/restart your miner]({{< relref "maintenance" >}})
- Update `ExpectedSealDuration` with the time it takes your miner to seal a sector: discover it by [running a benchmark]({{< relref "benchmarks" >}}) or by [pledging a sector]({{< relref "sector-pledging" >}}) and noting down the time.
- Configure additional [seal workers]({{< relref "seal-workers" >}}) to increase the miner's capacity to seal sectors.
- Configure a [separate address for WindowPost messages]({{< relref "addresses" >}}).
- Consider [splitting markets and miners processes]({{< relref "split-markets-miners" >}}) for increased stability.
