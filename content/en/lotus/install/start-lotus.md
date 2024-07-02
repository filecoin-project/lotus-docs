---
title: "Start Lotus"
description: "Starting the Lotus daemon and syncing the chain"
draft: false
menu:
    lotus:
        parent: "lotus-install"
weight: 220
toc: true
---

Now that we have installed Lotus we can download a lightweight chain snapshot and start syncing the chain.

## Download snapshot
1. Download the most recent lightweight snapshot for the mainnet:

    ```shell
    aria2c -x5 https://forest-archive.chainsafe.dev/latest/mainnet/
    ```

{{< alert icon="tip" >}}
If you are looking for the snapshot for the Calibration test network, you can get the latest snapshot with this link [https://forest-archive.chainsafe.dev/latest/calibnet/](https://forest-archive.chainsafe.dev/latest/calibnet/)
{{< /alert >}}

Now that we have downloaded a recent snapshot we can import the snapshot to Lotus and start the daemon process.

## Import snapshot and start the Lotus daemon

The `lotus` application runs as a daemon and a client to control and interact with that daemon. A daemon is a long-running program that is usually run in the background. 

During the first run, Lotus will:

- Set up its data folder at `~/.lotus`.
- Download the necessary proof parameters. This is a few gigabytes of data that is downloaded once.

If you do not want the chain data folder at the default `~/.lotus` location, you can specify its location by exporting the environment variable `LOTUS_PATH=path/to/.lotus`. If you want this environment variable to persist across sessions, you need to export the variable from the user’s profile script.

### Import the snapshot:

```shell
# Replace the filename for the `.car` file based on the snapshot you downloaded.
lotus daemon --import-snapshot path/to/forest_snapshot_mainnet_2024-01-11_height_3555440.forest.car.zst --halt-after-import
```

With this command Lotus will import the snapshot and halt after the import process has finished. After the process has halted we can start the daemon and sync the remaining blocks.

### Start the Lotus daemon

```
nohup lotus daemon > ~/lotus.log 2>&1 &
```

This command makes the daemon run in the background and log messages to `~/lotus.log`. You can change the path of the lotus.log file if you want the logs to be logged elsewhere.


### Check syncing status
After the Lotus daemon has been running for a few minutes, use `lotus sync wait` to check the sync status of your lotus node.

```shell
lotus sync wait
```
```
lotus sync wait
Worker: 78534; Base: 2403099; Target: 2403099 (diff: 0)
State: message sync; Current Epoch: 2403099; Todo: 0

Done!
```

When the `lotus sync wait` command shows done you are fully synced with the chain.

### Watch the logs

```
watch tail -30 ~/lotus.log
```

{{< alert icon="tip">}}
Do not be concerned by the number of warnings and sometimes errors showing in the logs. They are a normal part of the daemon lifecycle as it participates in the globally distributed consensus network.
{{< /alert >}}

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

You can use the `lotus net peers` to check the number of other peers that it is connected to in the Filecoin network.

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
Daemon:  1.23.0+mainnet+git.d1d4b35ad+api1.5.0
Local: lotus version 1.23.0+mainnet+git.d1d4b35ad
```

## Stop the Lotus daemon

To gracefully stop the running lotus daemon (required when restarting the daemon to update Lotus), use the following command:

```shell
lotus daemon stop
## When running with systemd do:
# systemctl stop lotus-daemon
```