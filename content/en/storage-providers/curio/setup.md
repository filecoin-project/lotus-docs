---
title: "Setup Curio"
description: "This guide will show you setup a new Curio cluster or migrate to Curio from Lotus-Miner"
lead: "This guide will show you setup a new Curio cluster or migrate to Curio from Lotus-Miner"
draft: false
menu:
    storage-providers:
        parent: "curio"
weight: 130
toc: true
---

{{< alert icon="warning" >}}
Curio is in alpha state, and we recommend our users to only run Curio in a testing environment or Calibration network for the time being.
{{< /alert >}}

## Setup YugaByteDB

{{< alert icon="warning" >}}
If you have already set up a YugabyteDB for Boost then you can reuse the same YugabyteDB instance for Curio.
You can skip directly to [migrating from Lotus-Miner to Curio]({{< relref "setup#migrating-from-lotus-miner-to-curio" >}}) or [Initializing new Curio Miner]({{< relref "setup#initiating-a-new-curio-cluster" >}}).
{{< /alert >}}

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

## Migrating from Lotus-miner to Curio
Curio provides a utility to users onboard quickly. Please run the below command on your `lotus-miner` node and follow the os-screen instructions.
It communicates in English (en), Chinese (zh), and Korean (ko).

```shell
curio guided-setup
```

Once the migration is complete, you can shut down all of your workers and miner processes. You can start `curio` process to replace them with correct [configuration layer]({{< relref "config" >}}).

### Testing the setup

You can confirm that the `curio` process is able to schedule and compute WindowPoSt by running a WindowPoSt test computation:

```shell with-output
curio test window-post task
```

From the output we can confirm that a WindowPoSt gets inserted to the database, and is being picked up by the Curio process running with the *wdpost* configuration layer.

## Initiating a new Curio cluster
Curio provides a utility for users to onboard quickly. Please run the below command on your new Curio node, choose `Create a new miner` option and follow the on-screen instructions.

```shell
curio guided-setup
```

Once, the new miner has been created, You can start `curio` process with correct [configuration layer]({{< relref "config" >}}).
