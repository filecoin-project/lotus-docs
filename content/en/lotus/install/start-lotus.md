---
title: "Start Lotus"
description: "Starting the Lotus daemon and syncing the chain"
draft: false
menu:
    lotus:
        parent: "lotus-install"
weight: 225
toc: true
---

You should now have Lotus installed, and should be able start the Lotus daemon and sync the chain.

## Start the Lotus daemon and sync the chain

The `lotus` application runs as a daemon and a client to control and interact with that daemon. A daemon is a long-running program that is usually run in the background.

When using _mainnet_, we recommend you start the daemon [syncing from a trusted state snapshot]({{< relref "../manage/chain-management#lightweight-snapshot" >}}). In any case, you can start the daemon with the following command:

```shell
lotus daemon
```

During the first run, Lotus will:

- Set up its data folder at `~/.lotus`.
- Download the necessary proof parameters. This is a few gigabytes of data that is downloaded once.
- Import the snapshot (if specified) and start syncing the Lotus chain.

The daemon will start producing lots of log messages right away. From this point, you will have to work on a new terminal. Any`lotus` commands you run now will communicate with the running daemon.

{{< alert icon="tip">}}
Do not be concerned by the number of warnings and sometimes errors showing in the logs. They are a normal part of the daemon lifecycle as it participates in the globally distributed consensus network.
{{< /alert >}}

If you used snapshots, subsequent daemon starts can proceed as normal without any options:

```shell
lotus daemon
## When running with systemd do:
# systemctl start lotus-daemon
```

For more information about syncing and snapshots, [see the Chain management section]({{< relref "../manage/chain-management" >}}).

We recommend waiting until the syncing process has completed, which should be relatively fast when using trusted state snapshot imports:

```shell
lotus sync wait
```

## Interact with the daemon

The `lotus` command allows you to interact with a _running_ Lotus daemon. The `lotus-miner` and `lotus-worker` commands work in the same way.

Lotus comes with built-in CLI documentation.

```shell
lotus
  - chain: Interact with filecoin blockchain
  - client: Make deals, store data, retrieve data
  - wallet: Manage wallet
  - net: Manage P2P Network
  - sync: Inspect or interact with the chain syncer
  ...

# Show general help
lotus --help
# Show help for the "client" to make deals, store data, retrieve data
lotus client --help
```

For example, after your Lotus daemon has been running for a few minutes, use `lotus sync` to check the sync status of your lotus node.

```shell
lotus net sync
```
```
sync status:
...
	Target:	[bafy2bzaceaki6bjhe2lxmtyexcff6vh5y5uw4tmbjr3gatwvh5dhaqqb2ykaa] (320791)
	Stage: complete
	Height: 320791
...
```

Or use `lotus net` to check the number of other peers that it is connected to in the Filecoin network.

```shell
lotus net peers
```

```
12D3KooWSDqWSDNZtpJae15FBGpJLeLmyabUfZmWDWEjqEGtUF8N, [/ip4/58.144.221.27/tcp/33425]
12D3KooWRTQoDUhWVZH9z5u9XmaFDvFw14YkcW7dSBFJ8CuzDHnu, [/ip4/67.212.85.202/tcp/10906]
```

Or check the current version of your Lotus node as well as network.

```shell
lotus version
```

```
Daemon:  1.17.2+mainnet+git.fb0fb7144+api1.5.0
Local: lotus version 1.17.2+mainnet+git.fb0fb7144
# running lotus v1.17.2 on Main net
```

## Stop the Lotus daemon

To gracefully stop the running lotus daemon (required when restarting the daemon to update Lotus), use the following command:

```shell
lotus daemon stop
## When running with systemd do:
# systemctl stop lotus-daemon
```