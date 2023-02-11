---
title: "Lotus Node Clusters"
description: "Version 1.19.0 introduces redundant Lotus node cluster raft concensus in order to maintain consistent state for nonces and messages being published in the event of Lotus node failure."
draft: false
menu:
    lotus:
        parent: "lotus-configure"
aliases:
    - /lotus/manage/chain-management
weight: 325
toc: true
---

Version 1.19.0 introduces redundant Lotus node cluster raft concensus in order to maintain consistent state for nonces and messages being published in the event of Lotus node failure.

{{< alert icon="warning" >}}
   A minimum number of 3 Lotus nodes are required to enable and use Lotus node clusters 
   {{< /alert >}}

### Configure the original Lotus node

**This document assumes that the reader is already fully operational with at least one Lotus node and miner instance.**

1. Stop both miner and daemon instances.
2. Browse to your `/.lotus` repo folder and edit the `config.toml` file changing `[API] ListenAddress` and `[Libp2p] ListenAddress`:
```toml
[API]
ListenAddress = "/ip4/127.0.0.1/tcp/4567/http"
```
```toml
[Libp2p]
ListenAddresses = ["/ip4/0.0.0.0/tcp/2222", "/ip6/::/tcp/2222"]
```
### Configure the second Lotus node
1. Create a new repo folder for the second node instance such as `/.lotus-2`.
2. In a new terminal session set the Lotus path for the second lotus node with `LOTUS_PATH=/home/usersname/.lotus-2`.
3. Initialize the new node by importing a [lightweight snapshot](https://lotus.filecoin.io/lotus/manage/chain-management/#lightweight-snapshot) and wait until it has fully synced. 
4. Stop the second Lotus node and edit the `/.lotus-2/config.toml` file changing `[API] ListenAddress` and `[Libp2p] ListenAddress`
```toml
[API]
ListenAddress = "/ip4/127.0.0.1/tcp/5678/http"
```
```toml
[Libp2p]
ListenAddresses = ["/ip4/0.0.0.0/tcp/3333", "/ip6/::/tcp/3333"]
```
5. Restart the second node and import Lotus wallet keys from the original node to the second node.

### Configure the third Lotus node
1. Create a new repo folder for the third node instance such as `/.lotus-3`.
2. In a new terminal session set the Lotus path for the third lotus node with `LOTUS_PATH=/home/usersname/.lotus-3`.
3. Initialize the new node by importing a [lightweight snapshot](https://lotus.filecoin.io/lotus/manage/chain-management/#lightweight-snapshot) and wait until it has fully synced. 
4. Stop the third Lotus node and edit the `/.lotus-3/config.toml` file changing `[API] ListenAddress` and `[Libp2p] ListenAddress`
```toml
[API]
ListenAddress = "/ip4/127.0.0.1/tcp/6789/http"
```
```toml
[Libp2p]
ListenAddresses = ["/ip4/0.0.0.0/tcp/4444", "/ip6/::/tcp/4444"]
```
5. Restart the third node and import Lotus wallet keys from the original node to the third node.

### Configuring Raft Consensus / Redundant Chain nodes
1. There is now a new section in the `config.toml` file for the lotus node, called `[Cluster]`. If you don't see this section in your own `config.toml`, please run `lotus config default` and copy the new section across.
2. Whilst all three nodes and your miner are running, configure the `config.toml` for all three nodes as below. You can get the `multiaddress` for your nodes by checking the output of `lotus net listen` for all three daemons:
```toml
[Cluster]
ClusterModeEnabled = true
```
```toml
InitPeersetMultiAddr = ["/ip4/127.0.0.1/tcp/2222/p2p/12D3KooWHVawzGL5SG58rS1Ti8m3G8fA9NwEWkfnz1AcRLWq1deF","/ip4/127.0.0.1/tcp/3333/p2p/12D3KooWB2ikW3gvaQiwfdnD8HrFAqBd2Y54gdykLTFybUQsYrBG","/ip4/127.0.0.1/tcp/4444/p2p/12D3KooWHxNgWfmiJGf6sFXbjQhnBHudsXGz9WAuZB1H4LLwxx7V"]
```
3. On the `lotus-miner` unset any LOTUS_PATH enviroment variables, and add the full node api info for the three deamons: ` export FULLNODE_API_INFO=<node0_info>,<node1_info>,<node2_info>`. You can get API-keys for each node by `lotus auth api-info --perm admin`. The format for each nodes info is like this: `export FULLNODE_API_INFO=<api_token>:/ip4/<lotus_daemon_ip>/tcp/<lotus_daemon_port>/http`
```
FULLNODE_API_INFO=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.T_meWfWV-F_pX19EPZ1p0uLaRmX3kpE_KFE7nXx9ENs:/ip4/127.0.0.1/tcp/4567/http,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.lIygxCSIqdSeVvN73aVIme9mRdjOunFsn5eb8K8Q5R8:/ip4/127.0.0.1/tcp/5678/http,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.arVqeW93VujWC5JlIoumfbRFiHk8BtROp9rsdZPEaVk:/ip4/127.0.0.1/tcp/6789/http
```
4. Restart all daemon and miner instances, stop the lotus-miner first followed by the three nodes.
5. Start all three nodes followed by the lotus-miner. 
6. You are now running raft concensus through node clustering.
7. You can check that the cluster is successfully running and determine the current node leader by running `./lotus-shed rpc RaftLeader`.

### Cluster config options

You can tune your cluster to your own unique requirements in the config.toml of the three nodes by editing the `[Cluster]` section.
```toml
[Cluster]
  # EXPERIMENTAL. config to enabled node cluster with raft consensus
  #
  # type: bool
  # env var: LOTUS_CLUSTER_CLUSTERMODEENABLED
  #ClusterModeEnabled = false

  # A folder to store Raft's data.
  #
  # type: string
  # env var: LOTUS_CLUSTER_DATAFOLDER
  #DataFolder = ""

  # InitPeersetMultiAddr provides the list of initial cluster peers for new Raft
  # peers (with no prior state). It is ignored when Raft was already
  # initialized or when starting in staging mode.
  #
  # type: []string
  # env var: LOTUS_CLUSTER_INITPEERSETMULTIADDR
  #InitPeersetMultiAddr = []

  # LeaderTimeout specifies how long to wait for a leader before
  # failing an operation.
  #
  # type: Duration
  # env var: LOTUS_CLUSTER_WAITFORLEADERTIMEOUT
  #WaitForLeaderTimeout = "15s"

  # NetworkTimeout specifies how long before a Raft network
  # operation is timed out
  #
  # type: Duration
  # env var: LOTUS_CLUSTER_NETWORKTIMEOUT
  #NetworkTimeout = "1m40s"

  # CommitRetries specifies how many times we retry a failed commit until
  # we give up.
  #
  # type: int
  # env var: LOTUS_CLUSTER_COMMITRETRIES
  #CommitRetries = 1

  # How long to wait between retries
  #
  # type: Duration
  # env var: LOTUS_CLUSTER_COMMITRETRYDELAY
  #CommitRetryDelay = "200ms"

  # BackupsRotate specifies the maximum number of Raft's DataFolder
  # copies that we keep as backups (renaming) after cleanup.
  #
  # type: int
  # env var: LOTUS_CLUSTER_BACKUPSROTATE
  #BackupsRotate = 6

  # Tracing enables propagation of contexts across binary boundaries.
  #
  # type: bool
  # env var: LOTUS_CLUSTER_TRACING
  #Tracing = false

```
