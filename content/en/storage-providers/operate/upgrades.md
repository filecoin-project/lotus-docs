---
title: "Upgrades"
description: "This guide covers how to safely upgrade Lotus when running a storage provider."
lead: "This guide covers how to safely upgrade Lotus when running a storage provider."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-operate"
        identifier: "storage-provider-upgrades"
aliases:
    - /docs/storage-providers/upgrades/
weight: 325
toc: true
---

There are two types of upgrades:

- The [upgrade in-place](#upgrade-in-place) is the default procedure and just updates the software
- The [upgrade with reset](#upgrade-with-reset) removes all the data and starts from scratch.

## Cross-check your config file

All upgrade types require you to double-check that your configuration files are up-to-date. You can do this by exporting the default configuration files from Lotus and comparing them to your configuration files.

To export the default configuration files from Lotus, run:

```shell
lotus-miner config default
```
```output
[API]
  # Binding address for the Lotus API
  #
  # type: string
  # env var: LOTUS_API_LISTENADDRESS
  #ListenAddress = "/ip4/127.0.0.1/tcp/2345/http"

...
```

If you would prefer to have Lotus export the default configuration to a file, run:

```shell
lotus-miner config default >> ~/default-lotus-miner-configuration.toml
```

Once you have an updated default configuration file from the new version, compare it with your configuration file and make sure that you're not missing any sections. You can use the `diff` command to produce a list of changes that would need to be made to the your configuration file, to make it match the updated default configuration file.

If you keep the same formatting as the default configuration file it should be fairly easy to spot difference and new sections using this command:

```shell
diff -y -W 200 your-config.toml default-lotus-miner-configuration.toml
```

A `vertical bar` sign indicates that there is a difference in that line between your configuration file, and the default configuration file.

```toml
#ListenAddress = "/ip4/127.0.0.1/tcp/4567/http"   |	  #ListenAddress = "/ip4/127.0.0.1/tcp/2345/http"
```

The `greater-than-sign` indicates that your configuration file is missing some lines that are included in the updated default configuration file.

```toml
					      >	  # env var: LOTUS_STORAGE_ALLOWPROVEREPLICAUPDATE2
					      >	  #AllowProveReplicaUpdate2 = true
					      >
```

You can also check the [Lotus release notes](https://github.com/filecoin-project/lotus/releases) for details on what new sections have been added.

## Upgrade in-place

1. Safely shutdown your `lotus-miner` as explained [here]({{< relref "../../storage-providers/operate/maintenance/" >}}).
1. Shutdown any seal workers
1. Shutdown your Lotus Node (`lotus daemon stop` or `systemctl stop lotus-daemon`)
1. Pull the new version and rebuild. For more information read the [Lotus installation guide]({{< relref "../../lotus/install/prerequisites" >}}) again:

```shell
export RUSTFLAGS="-C target-cpu=native -g"
export FFI_BUILD_FROM_SOURCE=1
git pull
git checkout <tag_or_branch>
git submodule update
make clean
make all
make install
```

1. Start the Lotus daemon and wait for it to finish syncing:

```shell
lotus daemon
# or when using systemctl
systemctl start lotus-daemon
```

Wait for it to finish syncing

```shell
lotus sync wait
```

2. Start your `lotus-miner`.

```shell
lotus-miner run
```

And your `lotus-workers`

```shell
lotus-worker run
```

## Upgrade with reset

{{< alert icon="warning" >}}
This upgrade procedure should only be used as a last resort or when the chain has been upgraded and requires such action to be taken.
{{< /alert >}}

It is similar to reinstalling everything from scratch, so you can follow the usual [installation]({{< relref "../../lotus/install/prerequisites/" >}}) and [miner-setup]({{< relref "../../storage-providers/setup/initialize/" >}}) guides after it. Before you do this, consider:

- [Backing up your Lotus wallets]({{< relref "../../lotus/manage/manage-fil/#exporting-and-importing-addresses" >}})
- You may want to backup your Lotus Node and Miner configurations as well.

Once you are ready, stop everything and delete the data folders, or rename them:

```shell
# Assuming you are using the default data folders
rm -rf ~/.lotus
rm -rf ~/.lotusminer
rm -rf ~/.lotusworker
```

After that, Lotus applications will start from scratch.