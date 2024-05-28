---
title: "Setup Curio"
description: "This guide will show you setup a new Curio cluster or migrate to Curio from Lotus-Miner"
lead: "This guide will show you setup a new Curio cluster or migrate to Curio from Lotus-Miner"
draft: false
menu:
    storage-providers:
        parent: "curio"
aliases:
  - /storage-providers/lotus-provider/setup
weight: 130
toc: true
---

{{< alert icon="warning" >}}
Curio is in alpha state, and we recommend our users to only run Curio in a testing environment or Calibration network for the time being.
{{< /alert >}}

## Setup YugabyteDB

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
    wget https://downloads.yugabyte.com/releases/2.21.0.1/yugabyte-2.21.0.1-b1-linux-x86_64.tar.gz
    tar xvfz yugabyte-2.21.0.1-b1-linux-x86_64.tar.gz && cd yugabyte-2.21.0.1/
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
To create a new Curio cluster, a Lotus daemon node is required.

### Wallet setup
Initiating a new miner ID on the Filecoin network requires an owner, worker and sender address.
These address can be same or different depending on the user's choice.
Users must create these wallet on Lotus node before running the Curio commands.

```shell
lotus wallet new bls
lotus wallet new bls
```

Once new wallet are created, we must send some funds to them.

```shell
lotus send <WALLET 1> 5
lotus send <WALLET 2> 5
```

### Creating new miner ID
Curio provides a utility for users to onboard quickly. Please run the below command on your new Curio node, choose `Create a new miner` option and follow the on-screen instructions.
It communicates in English (en), Chinese (zh), and Korean (ko).

1. Start the guided setup.
    ```shell
    curio guided-setup
    ```

2. Choose "Create a new miner" option.
    ```text
    Defaulting to English. Please reach out to the Curio team if you would like to have additional language support.
    Use the arrow keys to navigate: ↓ ↑ → ←
    ? I want to::
    Migrate from existing Lotus-Miner
    ▸ Create a new miner
    ```

3. Enter your YugabyteDB details.
    ```text
    This process is partially idempotent. Once a new miner actor has been created and subsequent steps fail, the user need to run 'curio config new-cluster < miner ID >' to finish the configuration.

    Use the arrow keys to navigate: ↓ ↑ → ←
    ? Enter the info to connect to your Yugabyte database installation (https://download.yugabyte.com/):
    ▸ Host: 127.0.0.1
    Port: 5433
    Username: yugabyte
    Password: yugabyte
    Database: yugabyte
    Continue to connect and update schema.

    ✔ Step Complete: Pre-initialization steps complete
    ```

4. Enter the wallet details be used for "create miner" message.
    ```text
    Initializing a new miner actor.
    Use the arrow keys to navigate: ↓ ↑ → ←
    ? Enter the info to create a new miner:
    ▸ Owner Address: <empty>  <------ Enter wallet 1 here
    Worker Address: <empty>  <------ Enter wallet 2 here
    Sender Address: <empty>  <------ Enter wallet 1 here
    Sector Size: 0  <--------------- Sector Size (32 G/GiB/GB)
    Confidence epochs: 0
    Continue to verify the addresses and create a new miner actor.
    ```

    ```text
    Initializing a new miner actor.
    ✔ Owner Address: <empty>
    Enter the owner address: t3weiymrx3iyivzeuub5l232gb62ocu7zbjtztudiipm6wkkmsehdydrdddm6cdrflxir26cmrz4xui6t5gruq
    ✔ Worker Address: <empty>
    Enter worker address: t3xhmgfxurecrusgubzdgme4t2ecxbiyny5uanfzvcrrihzhia654f6gp2ynugpiyp5xe7ibg6fqly76kowfva
    ✔ Sender Address: <empty>
    Enter sender address: t3weiymrx3iyivzeuub5l232gb62ocu7zbjtztudiipm6wkkmsehdydrdddm6cdrflxir26cmrz4xui6t5gruq
    ✔ Sector Size: 0
    Enter the sector size: 8 MiB
    ✔ Confidence epochs: 0
    Confidence epochs: 0
    Pushed CreateMiner message: bafy2bzacebu3mhaj6chnz5frjo2sbxduebnh4e7e37fwm3jd7xhvhla7t6ylu
    Waiting for confirmation
    ```

5. Wait for new miner actor to get created.
    ```text
    New miners address is: t01004 (t2cmgqvicpcil5zlp6bqsffmjjfz7ix66k4zaojay)
    ✔ Step Complete: Miner t01004 created successfully

    ✔ Step Complete: Configuration 'base' was updated to include this miner's address
    ```

6. We request you to please share the basic data about your miner with us to help us improve Curio.
    ```text
    The Curio team wants to improve the software you use. Tell the team you're using `curio`.
    Use the arrow keys to navigate: ↓ ↑ → ←
    ? Select what you want to share with the Curio team.:
    ▸ Individual Data: Miner ID, Curio version, chain (mainnet or calibration). Signed.
    Aggregate-Anonymous: version, chain, and Miner power (bucketed).
    Hint: I am someone running Curio on whichever chain.
    Nothing.
    ```

7. Finish the initialisation.
    ```text
    ✔ Step Complete: New Miner initialization complete.

    Try the web interface with curio run --layers=gui for further guided improvements.
    ```

8. If you entered non-default in step 3 then please export the relevant details before running the Curio command.

    | Env Variable      | UseCase                   |
    |-------------------|---------------------------|
    | CURIO_DB_HOST     | YugabyteDB SQL IP         |
    | CURIO_DB_NAME     | YugabyteDB Name           |
    | CURIO_DB_USER     | DB user for connection    |
    | CURIO_DB_PASSWORD | User's password           |
    | CURIO_DB_PORT     | YugabyteDB's SQL port     |
    | CURIO_REPO_PATH   | Curio's default repo path |

9. Try running Curio with only `GUI` first.

    ```shell
    curio run --layers gui
    ```

10. Add seal/permanent [storage for the first machine]({{< relref "storage" >}}).
11. Start other nodes in the Curio cluster with respective config layers.

Once, the new miner has been created, You can start `curio` process with correct [configuration layer]({{< relref "config" >}}).
