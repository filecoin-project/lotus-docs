---
title: "Migrate to Lotus-Provider"
description: "This guide will show you the three steps for migrating to Lotus-Provider, from Lotus-Miner"
lead: "This guide will show you the three steps for migrating to Lotus-Provider, from Lotus-Miner"
draft: false
menu:
    storage-providers:
        parent: "lotus-provider"
weight: 110
toc: true
---

{{< alert icon="warning" >}}
Lotus-Provider is in alpha state, and we recommend our users to only run lotus-provider in a testing enviroment for the time being.
{{< /alert >}}

Check out the accompanying video tutorial for migrating to Lotus-Provider:
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8Th0nBcAT-M?si=VXTKc3uZmI91hjPp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Setup YugaByteDB

For this guide, we're setting up a single YugaByteDB. However, you can set up multiple YugaByteDB instances in a cluster to enable high availability.

Ensure that you have the following available before we install and set up YugabyteDB:

1. One of the following operating systems:

- CentOS 7 or later
- Ubuntu 16.04 or later

For other operating systems, Docker or Kubernetes. Please check out the [YugabyteDB documentation](https://docs.yugabyte.com/preview/quick-start/).

2. **Python 3.** To check the version, execute the following command:

```shell with-output
python --version
```
```
Python 3.7.3
```

If you encounter a `Command 'python' not found` error, you might not have an unversioned system-wide python command.

- Starting from Ubuntu 20.04, python is no longer available. To fix this, run `sudo apt install python-is-python3`.
- For CentOS 8, set `python3` as the alternative for python by running `sudo alternatives --set python /usr/bin/python3`

Once these dependencies have been installed, we can run the install script:

**Note: avoid using ZFS as the backing drive for YugabyteDB because of advanced filesystem commands so-far is unavailable.**

```shell with-output
wget https://downloads.yugabyte.com/releases/2.20.0.1/yugabyte-2.20.0.1-b1-linux-x86_64.tar.gz
tar xvfz yugabyte-2.20.0.1-b1-linux-x86_64.tar.gz && cd yugabyte-2.20.0.1/
./bin/post_install.sh
./bin/yugabyted start --advertise_address 127.0.0.1  --master_flags rpc_bind_addresses=127.0.0.1 --tserver_flags rpc_bind_addresses=127.0.0.1
```
```
+----------------------------------------------------------------------------------------------------------+
|                                                yugabyted                                                 |
+----------------------------------------------------------------------------------------------------------+
| Status              :                                                                                    |
| Replication Factor  : None                                                                               |
| YugabyteDB UI       : http://127.0.0.1:15433                                                             |
| JDBC                : jdbc:postgresql://127.0.0.1:5433/yugabyte?user=yugabyte&password=yugabyte          |
| YSQL                : bin/ysqlsh   -U yugabyte -d yugabyte                                               |
| YCQL                : bin/ycqlsh   -u cassandra                                                          |
| Data Dir            : /root/var/data                                                                     |
| Log Dir             : /root/var/logs                                                                     |
| Universe UUID       : 411422ee-4c17-4f33-996e-ced847d10f5c                                               |
+----------------------------------------------------------------------------------------------------------+
```

You can adjust the `--advertise_address`, `--rpc_bind_addresses` and `--tserver_flags` according to your own configuration and needs.

## Enable SectorIndexDB in the config


Once YugabyteDB has been installed, we can configure the sector index in the `lotus-miner` process to be stored in the database instead of an in-memory process on the `lotus-miner`.

1. In your `lotus-miner` config.toml file, go to the *[Subsystems]* section, and locate the `EnableSectorIndexDB` option. Set this config to true:

```toml
  # When enabled, the sector index will reside in an external database
  # as opposed to the local KV store in the miner process
  # This is useful to allow workers to bypass the lotus miner to access sector information
  #
  # type: bool
  # env var: LOTUS_SUBSYSTEMS_ENABLESECTORINDEXDB
  EnableSectorIndexDB = true
```

2. In the *[HarmonyDB]* section of your `lotus-miner` config.toml file, set the hostnames to wherever you have configured YugaByteDB to be running.

```toml
  # HOSTS is a list of hostnames to nodes running YugabyteDB
  # in a cluster. Only 1 is required
  #
  # type: []string
  # env var: LOTUS_HARMONYDB_HOSTS
  Hosts = ["127.0.0.1"]
```

If you configure YugabyteDB to have a different username, password or port compared to the default once. You will need to configure these configs as well:

```toml
  # The Yugabyte server's username with full credentials to operate on Lotus' Database. Blank for default.
  #
  # type: string
  # env var: LOTUS_HARMONYDB_USERNAME
  #Username = "yugabyte"

  # The password for the related username. Blank for default.
  #
  # type: string
  # env var: LOTUS_HARMONYDB_PASSWORD
  #Password = "yugabyte"

  # The database (logical partition) within Yugabyte. Blank for default.
  #
  # type: string
  # env var: LOTUS_HARMONYDB_DATABASE
  #Database = "yugabyte"

  # The port to find Yugabyte. Blank for default.
  #
  # type: string
  # env var: LOTUS_HARMONYDB_PORT
  #Port = "5433"
```

Once you have completed these steps, you can restart the `lotus-miner` process, and your sector index will now reside in YugabyteDB.

## Migrate WindowPoSt to Lotus-Provider

1. Before migrating the WindowPoSt scheduling and computation to `Lotus-Provider`, we need to stop the `lotus-miner` process. Shut down the `lotus-miner` process with `lotus-miner stop`.


2. Then we need to get permissions from the chain daemon that we want to connect `lotus-provider` to. You can get those with executing this command on the daemon node:

```shell with-output
lotus auth api-info --perm=admin
```
```
FULLNODE_API_INFO=eyJhInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.nNtaVSjHsSXyWFTkvk3KZC8hjlrBrK9B9WNHLJGKfR0:/ip4/127.0.0.1/tcp/1234/http
```

Export this enviroment variable on the the machine that is going to run `lotus-provider`.

3. Run the `lotus-provider` migration script. This will migrate all the needed configs from your `lotus-miner` to the `lotus-provider`.

```shell with-output
lotus-provider config from-miner --to-layer=wdpost --overwrite
```
```
Before running lotus-provider, ensure any miner/worker answering of WindowPost is disabled by (on Miner) DisableBuiltinWindowPoSt=true and (on Workers) not enabling windowpost on CLI or via environment variable LOTUS_WORKER_WINDOWPOST.
To work with the config:
lotus-provider  --db-host="127.0.0.1" config help 
To run Lotus Provider: in its own machine or cgroup without other files, use the command:
lotus-provider  --db-host="127.0.0.1" run --layers="wdpost"
```

Now all the configurations needed to run WindowPoSt scheduling and computation in lotus-provider have been exported to the **`wdpost`** configuration layer.

4. Disable WindowPoSt entierly in the `lotus-miner` config. In the *[Subsystems]* section, locate the DisableWindowPoSt configuration:

```toml
  # type: bool
  # env var: LOTUS_SUBSYSTEMS_DISABLEWINDOWPOST
  DisableWindowPoSt = true
```

5. Start the `lotus-miner` and `lotus-provider` process. Start the lotus-miner process as you usually do with `lotus-miner run`. 

You can start lotus-provider with the outputted command from step 3:

```shell
lotus-provider  --db-host="127.0.0.1" run --layers="wdpost"
```

## Testing the setup

You can confirm that the `lotus-provider` process is able to schedule and compute WindowPoSt by running a WindowPoSt test computation:

```shell with-output
lotus-provider test window-post task
```

From the output we can confirm that a WindowPoSt get inserted to the database, and is being picked up by the lotus-provider process running with the *wdpost* configuration layer.