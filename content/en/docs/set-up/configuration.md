---
title: "Lotus configuration"
identifier: "lotus-node-configuration"
description: "This guide documents environment variables, configuration and other advanced features in the Lotus Node."
lead: "This guide documents environment variables, configuration and other advanced features in the Lotus Node."
draft: false
menu:
    docs:
        parent: "node-set-up"
weight: 240
toc: true
---

The Lotus daemon stores a configuration file in `~/.lotus/config.toml`. Note that by default all settings are commented. Here is an example configuration:

```toml
[API]
  # Binding address for the Lotus API
  #
  # type: string
  # env var: LOTUS_API_LISTENADDRESS
  #ListenAddress = "/ip4/127.0.0.1/tcp/1234/http"

  # type: string
  # env var: LOTUS_API_REMOTELISTENADDRESS
  #RemoteListenAddress = ""

  # type: Duration
  # env var: LOTUS_API_TIMEOUT
  #Timeout = "30s"


[Backup]
  # Note that in case of metadata corruption it might be much harder to recover
  # your node if metadata log is disabled
  #
  # type: bool
  # env var: LOTUS_BACKUP_DISABLEMETADATALOG
  #DisableMetadataLog = false


[Libp2p]
  # Binding address for the libp2p host - 0 means random port.
  # Format: multiaddress; see https://multiformats.io/multiaddr/
  #
  # type: []string
  # env var: LOTUS_LIBP2P_LISTENADDRESSES
  #ListenAddresses = ["/ip4/0.0.0.0/tcp/0", "/ip6/::/tcp/0"]

  # Addresses to explicitally announce to other peers. If not specified,
  # all interface addresses are announced
  # Format: multiaddress
  #
  # type: []string
  # env var: LOTUS_LIBP2P_ANNOUNCEADDRESSES
  #AnnounceAddresses = []

  # Addresses to not announce
  # Format: multiaddress
  #
  # type: []string
  # env var: LOTUS_LIBP2P_NOANNOUNCEADDRESSES
  #NoAnnounceAddresses = []

  # When not disabled (default), lotus asks NAT devices (e.g., routers), to
  # open up an external port and forward it to the port lotus is running on.
  # When this works (i.e., when your router supports NAT port forwarding),
  # it makes the local lotus node accessible from the public internet
  #
  # type: bool
  # env var: LOTUS_LIBP2P_DISABLENATPORTMAP
  #DisableNatPortMap = false

  # ConnMgrLow is the number of connections that the basic connection manager
  # will trim down to.
  #
  # type: uint
  # env var: LOTUS_LIBP2P_CONNMGRLOW
  #ConnMgrLow = 150

  # ConnMgrHigh is the number of connections that, when exceeded, will trigger
  # a connection GC operation. Note: protected/recently formed connections don't
  # count towards this limit.
  #
  # type: uint
  # env var: LOTUS_LIBP2P_CONNMGRHIGH
  #ConnMgrHigh = 180

  # ConnMgrGrace is a time duration that new connections are immune from being
  # closed by the connection manager.
  #
  # type: Duration
  # env var: LOTUS_LIBP2P_CONNMGRGRACE
  #ConnMgrGrace = "20s"


[Pubsub]
  # Run the node in bootstrap-node mode
  #
  # type: bool
  # env var: LOTUS_PUBSUB_BOOTSTRAPPER
  #Bootstrapper = false

  # type: string
  # env var: LOTUS_PUBSUB_REMOTETRACER
  #RemoteTracer = ""


[Client]
  # type: bool
  # env var: LOTUS_CLIENT_USEIPFS
  #UseIpfs = false

  # type: bool
  # env var: LOTUS_CLIENT_IPFSONLINEMODE
  #IpfsOnlineMode = false

  # type: string
  # env var: LOTUS_CLIENT_IPFSMADDR
  #IpfsMAddr = ""

  # type: bool
  # env var: LOTUS_CLIENT_IPFSUSEFORRETRIEVAL
  #IpfsUseForRetrieval = false

  # The maximum number of simultaneous data transfers between the client
  # and storage providers for storage deals
  #
  # type: uint64
  # env var: LOTUS_CLIENT_SIMULTANEOUSTRANSFERSFORSTORAGE
  #SimultaneousTransfersForStorage = 20

  # The maximum number of simultaneous data transfers between the client
  # and storage providers for retrieval deals
  #
  # type: uint64
  # env var: LOTUS_CLIENT_SIMULTANEOUSTRANSFERSFORRETRIEVAL
  #SimultaneousTransfersForRetrieval = 20


[Wallet]
  # type: string
  # env var: LOTUS_WALLET_REMOTEBACKEND
  #RemoteBackend = ""

  # type: bool
  # env var: LOTUS_WALLET_ENABLELEDGER
  #EnableLedger = false

  # type: bool
  # env var: LOTUS_WALLET_DISABLELOCAL
  #DisableLocal = false


[Fees]
  # type: types.FIL
  # env var: LOTUS_FEES_DEFAULTMAXFEE
  #DefaultMaxFee = "0.07 FIL"


[Chainstore]
  # type: bool
  # env var: LOTUS_CHAINSTORE_ENABLESPLITSTORE
  #EnableSplitstore = false

  [Chainstore.Splitstore]
    # ColdStoreType specifies the type of the coldstore.
    # It can be "universal" (default) or "discard" for discarding cold blocks.
    #
    # type: string
    # env var: LOTUS_CHAINSTORE_SPLITSTORE_COLDSTORETYPE
    #ColdStoreType = "universal"

    # HotStoreType specifies the type of the hotstore.
    # Only currently supported value is "badger".
    #
    # type: string
    # env var: LOTUS_CHAINSTORE_SPLITSTORE_HOTSTORETYPE
    #HotStoreType = "badger"

    # MarkSetType specifies the type of the markset.
    # It can be "map" (default) for in memory marking or "badger" for on-disk marking.
    #
    # type: string
    # env var: LOTUS_CHAINSTORE_SPLITSTORE_MARKSETTYPE
    #MarkSetType = "map"

    # HotStoreMessageRetention specifies the retention policy for messages, in finalities beyond
    # the compaction boundary; default is 0.
    #
    # type: uint64
    # env var: LOTUS_CHAINSTORE_SPLITSTORE_HOTSTOREMESSAGERETENTION
    #HotStoreMessageRetention = 0

    # HotStoreFullGCFrequency specifies how often to perform a full (moving) GC on the hotstore.
    # A value of 0 disables, while a value 1 will do full GC in every compaction.
    # Default is 20 (about once a week).
    #
    # type: uint64
    # env var: LOTUS_CHAINSTORE_SPLITSTORE_HOTSTOREFULLGCFREQUENCY
    #HotStoreFullGCFrequency = 20
```

## Connectivity

Usually your lotus daemon will establish connectivity with others in the network and try to make itself diallable using uPnP. If you wish to manually ensure that your daemon is reachable:

- Set a fixed port of your choice in the `ListenAddresses` in the Libp2p section (i.e. 6665).
- Open a port in your router that is forwarded to this port. This is usually called featured as "Port forwarding" and the instructions differ from router model to model but there are many guides online.
- Add your public IP/port to `AnnounceAddresses`. i.e. `/ip4/<yourIP>/tcp/6665`.

Note that **it is not a requirement to use Lotus as a client to the network to be fully reachable**, as your node already dials-out to others nodes and miners directly.

## Environment variables

Some aspects of the Lotus Node can be controlled using environment variables.

Variables common to most Lotus binaries:

- `LOTUS_FD_MAX`: Sets the file descriptor limit for the process
- `LOTUS_JAEGER`: Sets the Jaeger URL to send traces. See TODO.
- `LOTUS_DEV`: Any non-empty value will enable more verbose logging, useful only for developers.
- `GOLOG_OUTPUT`: Controls where the program logs. Possible values: `stdout`, `stderr`, `file`. Multiple values can be combined with '+'.
- `GOLOG_FILE`: Path to file to log to.
- `GOLOG_LOG_FMT`: Logging format (json, nocolor).

Variables specific to the _Lotus daemon_:

- `LOTUS_PATH`: Location to store Lotus data (defaults to `~/.lotus`).
- `LOTUS_MAX_HEAP` (v1.2.3+): Maximum heap size that the [memory watchdog](https://github.com/raulk/go-watchdog) will try to respect. Values are a numeric byte amount (`12345678`) or a storage unit in metric system (e.g. `16GiB`). If not set, the memory watchdog will use the total system memory as a limit for the memory watchdog. The memory watchdog is necessary to overcome [GC-related shortcomings](https://github.com/golang/go/issues/42805) in the Go runtime.
- `LOTUS_DISABLE_WATCHDOG=1` (v1.2.3+): If set, will disable the memory watchdog. May be necessary in environments where the OS/kernel doesn't report correct information.
- `LOTUS_SKIP_GENESIS_CHECK=_yes_`: Set only if you wish to run a lotus network with a different genesis block.
- `LOTUS_CHAIN_TIPSET_CACHE`: Sets the size for the chainstore tipset cache. Defaults to `8192`. Increase if you perform frequent arbitrary tipset lookups.
- `LOTUS_CHAIN_INDEX_CACHE`: Sets the size for the epoch index cache. Defaults to `32768`. Increase if you perform frequent deep chain lookups for block heights far from the latest height.
- `LOTUS_BSYNC_MSG_WINDOW`: Sets the initial maximum window size for message fetching blocksync request. Set to 10-20 if you have an internet connection with low bandwidth.

Variables for resource allocation tuning (overrides settings in the resource allocation table).

* 32G environment:
```
AP_32G_BASE_MIN_MEMORY=1073741824
AP_32G_GPU_UTILIZATION=0
AP_32G_MAX_MEMORY=4294967296
AP_32G_MAX_PARALLELISM=1
AP_32G_MAX_PARALLELISM_GPU=0
AP_32G_MIN_MEMORY=4294967296
C1_32G_BASE_MIN_MEMORY=1073741824
C1_32G_GPU_UTILIZATION=0
C1_32G_MAX_MEMORY=1073741824
C1_32G_MAX_PARALLELISM=0
C1_32G_MAX_PARALLELISM_GPU=0
C1_32G_MIN_MEMORY=1073741824
C2_32G_BASE_MIN_MEMORY=34359738368
C2_32G_GPU_UTILIZATION=1
C2_32G_MAX_MEMORY=161061273600
C2_32G_MAX_PARALLELISM=-1
C2_32G_MAX_PARALLELISM_GPU=6
C2_32G_MIN_MEMORY=32212254720
GET_32G_BASE_MIN_MEMORY=0
GET_32G_GPU_UTILIZATION=0
GET_32G_MAX_MEMORY=1048576
GET_32G_MAX_PARALLELISM=0
GET_32G_MAX_PARALLELISM_GPU=0
GET_32G_MIN_MEMORY=1048576
PC1_32G_BASE_MIN_MEMORY=10485760
PC1_32G_GPU_UTILIZATION=0
PC1_32G_MAX_MEMORY=68719476736
PC1_32G_MAX_PARALLELISM=1
PC1_32G_MAX_PARALLELISM_GPU=0
PC1_32G_MIN_MEMORY=60129542144
PC2_32G_BASE_MIN_MEMORY=1073741824
PC2_32G_GPU_UTILIZATION=1
PC2_32G_MAX_MEMORY=16106127360
PC2_32G_MAX_PARALLELISM=-1
PC2_32G_MAX_PARALLELISM_GPU=6
PC2_32G_MIN_MEMORY=16106127360
UNS_32G_BASE_MIN_MEMORY=10485760
UNS_32G_GPU_UTILIZATION=0
UNS_32G_MAX_MEMORY=68719476736
UNS_32G_MAX_PARALLELISM=1
UNS_32G_MAX_PARALLELISM_GPU=0
UNS_32G_MIN_MEMORY=60129542144
```
* 512MB Environment:
```
AP_512M_BASE_MIN_MEMORY=1073741824
AP_512M_GPU_UTILIZATION=0
AP_512M_MAX_MEMORY=1073741824
AP_512M_MAX_PARALLELISM=1
AP_512M_MAX_PARALLELISM_GPU=0
AP_512M_MIN_MEMORY=1073741824
C1_512M_BASE_MIN_MEMORY=1073741824
C1_512M_GPU_UTILIZATION=0
C1_512M_MAX_MEMORY=1073741824
C1_512M_MAX_PARALLELISM=0
C1_512M_MAX_PARALLELISM_GPU=0
C1_512M_MIN_MEMORY=1073741824
C2_512M_BASE_MIN_MEMORY=10737418240
C2_512M_GPU_UTILIZATION=1
C2_512M_MAX_MEMORY=1610612736
C2_512M_MAX_PARALLELISM=1
C2_512M_MAX_PARALLELISM_GPU=0
C2_512M_MIN_MEMORY=1073741824
GET_512M_BASE_MIN_MEMORY=0
GET_512M_GPU_UTILIZATION=0
GET_512M_MAX_MEMORY=1048576
GET_512M_MAX_PARALLELISM=0
GET_512M_MAX_PARALLELISM_GPU=0
GET_512M_MIN_MEMORY=1048576
PC1_512M_BASE_MIN_MEMORY=1048576
PC1_512M_GPU_UTILIZATION=0
PC1_512M_MAX_MEMORY=1073741824
PC1_512M_MAX_PARALLELISM=1
PC1_512M_MAX_PARALLELISM_GPU=0
PC1_512M_MIN_MEMORY=805306368
PC2_512M_BASE_MIN_MEMORY=1073741824
PC2_512M_GPU_UTILIZATION=0
PC2_512M_MAX_MEMORY=1610612736
PC2_512M_MAX_PARALLELISM=-1
PC2_512M_MAX_PARALLELISM_GPU=0
PC2_512M_MIN_MEMORY=1073741824
UNS_512M_BASE_MIN_MEMORY=1048576
UNS_512M_GPU_UTILIZATION=0
UNS_512M_MAX_MEMORY=1073741824
UNS_512M_MAX_PARALLELISM=1
UNS_512M_MAX_PARALLELISM_GPU=0
UNS_512M_MIN_MEMORY=805306368
```
* 64GB Environment:
```
AP_64G_BASE_MIN_MEMORY=1073741824
AP_64G_GPU_UTILIZATION=0
AP_64G_MAX_MEMORY=8589934592
AP_64G_MAX_PARALLELISM=1
AP_64G_MAX_PARALLELISM_GPU=0
AP_64G_MIN_MEMORY=8589934592
C1_64G_BASE_MIN_MEMORY=1073741824
C1_64G_GPU_UTILIZATION=0
C1_64G_MAX_MEMORY=1073741824
C1_64G_MAX_PARALLELISM=0
C1_64G_MAX_PARALLELISM_GPU=0
C1_64G_MIN_MEMORY=1073741824
C2_64G_BASE_MIN_MEMORY=68719476736
C2_64G_GPU_UTILIZATION=1
C2_64G_MAX_MEMORY=204010946560
C2_64G_MAX_PARALLELISM=-1
C2_64G_MAX_PARALLELISM_GPU=6
C2_64G_MIN_MEMORY=64424509440
GET_64G_BASE_MIN_MEMORY=0
GET_64G_GPU_UTILIZATION=0
GET_64G_MAX_MEMORY=1048576
GET_64G_MAX_PARALLELISM=0
GET_64G_MAX_PARALLELISM_GPU=0
GET_64G_MIN_MEMORY=1048576
PC1_64G_BASE_MIN_MEMORY=10485760
PC1_64G_GPU_UTILIZATION=0
PC1_64G_MAX_MEMORY=137438953472
PC1_64G_MAX_PARALLELISM=1
PC1_64G_MAX_PARALLELISM_GPU=0
PC1_64G_MIN_MEMORY=120259084288
PC2_64G_BASE_MIN_MEMORY=1073741824
PC2_64G_GPU_UTILIZATION=1
PC2_64G_MAX_MEMORY=32212254720
PC2_64G_MAX_PARALLELISM=-1
PC2_64G_MAX_PARALLELISM_GPU=6
PC2_64G_MIN_MEMORY=32212254720
UNS_64G_BASE_MIN_MEMORY=10485760
UNS_64G_GPU_UTILIZATION=0
UNS_64G_MAX_MEMORY=137438953472
UNS_64G_MAX_PARALLELISM=1
UNS_64G_MAX_PARALLELISM_GPU=0
UNS_64G_MIN_MEMORY=120259084288
```
* All Environment variables:
```
AP_2K_BASE_MIN_MEMORY=2048
AP_2K_GPU_UTILIZATION=0
AP_2K_MAX_MEMORY=2048
AP_2K_MAX_PARALLELISM=1
AP_2K_MAX_PARALLELISM_GPU=0
AP_2K_MIN_MEMORY=2048
AP_32G_BASE_MIN_MEMORY=1073741824
AP_32G_GPU_UTILIZATION=0
AP_32G_MAX_MEMORY=4294967296
AP_32G_MAX_PARALLELISM=1
AP_32G_MAX_PARALLELISM_GPU=0
AP_32G_MIN_MEMORY=4294967296
AP_512M_BASE_MIN_MEMORY=1073741824
AP_512M_GPU_UTILIZATION=0
AP_512M_MAX_MEMORY=1073741824
AP_512M_MAX_PARALLELISM=1
AP_512M_MAX_PARALLELISM_GPU=0
AP_512M_MIN_MEMORY=1073741824
AP_64G_BASE_MIN_MEMORY=1073741824
AP_64G_GPU_UTILIZATION=0
AP_64G_MAX_MEMORY=8589934592
AP_64G_MAX_PARALLELISM=1
AP_64G_MAX_PARALLELISM_GPU=0
AP_64G_MIN_MEMORY=8589934592
AP_8M_BASE_MIN_MEMORY=8388608
AP_8M_GPU_UTILIZATION=0
AP_8M_MAX_MEMORY=8388608
AP_8M_MAX_PARALLELISM=1
AP_8M_MAX_PARALLELISM_GPU=0
AP_8M_MIN_MEMORY=8388608
C1_2K_BASE_MIN_MEMORY=2048
C1_2K_GPU_UTILIZATION=0
C1_2K_MAX_MEMORY=2048
C1_2K_MAX_PARALLELISM=0
C1_2K_MAX_PARALLELISM_GPU=0
C1_2K_MIN_MEMORY=2048
C1_32G_BASE_MIN_MEMORY=1073741824
C1_32G_GPU_UTILIZATION=0
C1_32G_MAX_MEMORY=1073741824
C1_32G_MAX_PARALLELISM=0
C1_32G_MAX_PARALLELISM_GPU=0
C1_32G_MIN_MEMORY=1073741824
C1_512M_BASE_MIN_MEMORY=1073741824
C1_512M_GPU_UTILIZATION=0
C1_512M_MAX_MEMORY=1073741824
C1_512M_MAX_PARALLELISM=0
C1_512M_MAX_PARALLELISM_GPU=0
C1_512M_MIN_MEMORY=1073741824
C1_64G_BASE_MIN_MEMORY=1073741824
C1_64G_GPU_UTILIZATION=0
C1_64G_MAX_MEMORY=1073741824
C1_64G_MAX_PARALLELISM=0
C1_64G_MAX_PARALLELISM_GPU=0
C1_64G_MIN_MEMORY=1073741824
C1_8M_BASE_MIN_MEMORY=8388608
C1_8M_GPU_UTILIZATION=0
C1_8M_MAX_MEMORY=8388608
C1_8M_MAX_PARALLELISM=0
C1_8M_MAX_PARALLELISM_GPU=0
C1_8M_MIN_MEMORY=8388608
C2_2K_BASE_MIN_MEMORY=2048
C2_2K_GPU_UTILIZATION=1
C2_2K_MAX_MEMORY=2048
C2_2K_MAX_PARALLELISM=1
C2_2K_MAX_PARALLELISM_GPU=0
C2_2K_MIN_MEMORY=2048
C2_32G_BASE_MIN_MEMORY=34359738368
C2_32G_GPU_UTILIZATION=1
C2_32G_MAX_MEMORY=161061273600
C2_32G_MAX_PARALLELISM=-1
C2_32G_MAX_PARALLELISM_GPU=6
C2_32G_MIN_MEMORY=32212254720
C2_512M_BASE_MIN_MEMORY=10737418240
C2_512M_GPU_UTILIZATION=1
C2_512M_MAX_MEMORY=1610612736
C2_512M_MAX_PARALLELISM=1
C2_512M_MAX_PARALLELISM_GPU=0
C2_512M_MIN_MEMORY=1073741824
C2_64G_BASE_MIN_MEMORY=68719476736
C2_64G_GPU_UTILIZATION=1
C2_64G_MAX_MEMORY=204010946560
C2_64G_MAX_PARALLELISM=-1
C2_64G_MAX_PARALLELISM_GPU=6
C2_64G_MIN_MEMORY=64424509440
C2_8M_BASE_MIN_MEMORY=8388608
C2_8M_GPU_UTILIZATION=1
C2_8M_MAX_MEMORY=8388608
C2_8M_MAX_PARALLELISM=1
C2_8M_MAX_PARALLELISM_GPU=0
C2_8M_MIN_MEMORY=8388608
GET_2K_BASE_MIN_MEMORY=0
GET_2K_GPU_UTILIZATION=0
GET_2K_MAX_MEMORY=1048576
GET_2K_MAX_PARALLELISM=0
GET_2K_MAX_PARALLELISM_GPU=0
GET_2K_MIN_MEMORY=1048576
GET_32G_BASE_MIN_MEMORY=0
GET_32G_GPU_UTILIZATION=0
GET_32G_MAX_MEMORY=1048576
GET_32G_MAX_PARALLELISM=0
GET_32G_MAX_PARALLELISM_GPU=0
GET_32G_MIN_MEMORY=1048576
GET_512M_BASE_MIN_MEMORY=0
GET_512M_GPU_UTILIZATION=0
GET_512M_MAX_MEMORY=1048576
GET_512M_MAX_PARALLELISM=0
GET_512M_MAX_PARALLELISM_GPU=0
GET_512M_MIN_MEMORY=1048576
GET_64G_BASE_MIN_MEMORY=0
GET_64G_GPU_UTILIZATION=0
GET_64G_MAX_MEMORY=1048576
GET_64G_MAX_PARALLELISM=0
GET_64G_MAX_PARALLELISM_GPU=0
GET_64G_MIN_MEMORY=1048576
GET_8M_BASE_MIN_MEMORY=0
GET_8M_GPU_UTILIZATION=0
GET_8M_MAX_MEMORY=1048576
GET_8M_MAX_PARALLELISM=0
GET_8M_MAX_PARALLELISM_GPU=0
GET_8M_MIN_MEMORY=1048576
PC1_2K_BASE_MIN_MEMORY=2048
PC1_2K_GPU_UTILIZATION=0
PC1_2K_MAX_MEMORY=2048
PC1_2K_MAX_PARALLELISM=1
PC1_2K_MAX_PARALLELISM_GPU=0
PC1_2K_MIN_MEMORY=2048
PC1_32G_BASE_MIN_MEMORY=10485760
PC1_32G_GPU_UTILIZATION=0
PC1_32G_MAX_MEMORY=68719476736
PC1_32G_MAX_PARALLELISM=1
PC1_32G_MAX_PARALLELISM_GPU=0
PC1_32G_MIN_MEMORY=60129542144
PC1_512M_BASE_MIN_MEMORY=1048576
PC1_512M_GPU_UTILIZATION=0
PC1_512M_MAX_MEMORY=1073741824
PC1_512M_MAX_PARALLELISM=1
PC1_512M_MAX_PARALLELISM_GPU=0
PC1_512M_MIN_MEMORY=805306368
PC1_64G_BASE_MIN_MEMORY=10485760
PC1_64G_GPU_UTILIZATION=0
PC1_64G_MAX_MEMORY=137438953472
PC1_64G_MAX_PARALLELISM=1
PC1_64G_MAX_PARALLELISM_GPU=0
PC1_64G_MIN_MEMORY=120259084288
PC1_8M_BASE_MIN_MEMORY=8388608
PC1_8M_GPU_UTILIZATION=0
PC1_8M_MAX_MEMORY=8388608
PC1_8M_MAX_PARALLELISM=1
PC1_8M_MAX_PARALLELISM_GPU=0
PC1_8M_MIN_MEMORY=8388608
PC2_2K_BASE_MIN_MEMORY=2048
PC2_2K_GPU_UTILIZATION=0
PC2_2K_MAX_MEMORY=2048
PC2_2K_MAX_PARALLELISM=-1
PC2_2K_MAX_PARALLELISM_GPU=0
PC2_2K_MIN_MEMORY=2048
PC2_32G_BASE_MIN_MEMORY=1073741824
PC2_32G_GPU_UTILIZATION=1
PC2_32G_MAX_MEMORY=16106127360
PC2_32G_MAX_PARALLELISM=-1
PC2_32G_MAX_PARALLELISM_GPU=6
PC2_32G_MIN_MEMORY=16106127360
PC2_512M_BASE_MIN_MEMORY=1073741824
PC2_512M_GPU_UTILIZATION=0
PC2_512M_MAX_MEMORY=1610612736
PC2_512M_MAX_PARALLELISM=-1
PC2_512M_MAX_PARALLELISM_GPU=0
PC2_512M_MIN_MEMORY=1073741824
PC2_64G_BASE_MIN_MEMORY=1073741824
PC2_64G_GPU_UTILIZATION=1
PC2_64G_MAX_MEMORY=32212254720
PC2_64G_MAX_PARALLELISM=-1
PC2_64G_MAX_PARALLELISM_GPU=6
PC2_64G_MIN_MEMORY=32212254720
PC2_8M_BASE_MIN_MEMORY=8388608
PC2_8M_GPU_UTILIZATION=0
PC2_8M_MAX_MEMORY=8388608
PC2_8M_MAX_PARALLELISM=-1
PC2_8M_MAX_PARALLELISM_GPU=0
PC2_8M_MIN_MEMORY=8388608
UNS_2K_BASE_MIN_MEMORY=2048
UNS_2K_GPU_UTILIZATION=0
UNS_2K_MAX_MEMORY=2048
UNS_2K_MAX_PARALLELISM=1
UNS_2K_MAX_PARALLELISM_GPU=0
UNS_2K_MIN_MEMORY=2048
UNS_32G_BASE_MIN_MEMORY=10485760
UNS_32G_GPU_UTILIZATION=0
UNS_32G_MAX_MEMORY=68719476736
UNS_32G_MAX_PARALLELISM=1
UNS_32G_MAX_PARALLELISM_GPU=0
UNS_32G_MIN_MEMORY=60129542144
UNS_512M_BASE_MIN_MEMORY=1048576
UNS_512M_GPU_UTILIZATION=0
UNS_512M_MAX_MEMORY=1073741824
UNS_512M_MAX_PARALLELISM=1
UNS_512M_MAX_PARALLELISM_GPU=0
UNS_512M_MIN_MEMORY=805306368
UNS_64G_BASE_MIN_MEMORY=10485760
UNS_64G_GPU_UTILIZATION=0
UNS_64G_MAX_MEMORY=137438953472
UNS_64G_MAX_PARALLELISM=1
UNS_64G_MAX_PARALLELISM_GPU=0
UNS_64G_MIN_MEMORY=120259084288
UNS_8M_BASE_MIN_MEMORY=8388608
UNS_8M_GPU_UTILIZATION=0
UNS_8M_MAX_MEMORY=8388608
UNS_8M_MAX_PARALLELISM=1
UNS_8M_MAX_PARALLELISM_GPU=0
UNS_8M_MIN_MEMORY=8388608
```


## Controlling a remote daemon

The `lotus` application, as a client to the lotus daemon, can talk to a Lotus daemon running on any location (not just the local one), by setting the following environment variable:

```sh
FULLNODE_API_INFO="TOKEN:/ip4/<IP>/tcp/<PORT>/http"
```

On the _Lotus Node_, the full variable string, including a new token, can be produced with:

```sh
lotus auth api-info --perm admin
```

Note that you may need to edit the result to place the right IP for the remote node. See the [docs about API tokens]({{< relref "../developers/api-access" >}}) for more information about tokens.

## Log level control

```sh
lotus log set-level <level>
```

This command can be used to toggle the logging levels of the different systems of a Lotus node. In decreasing order
of logging detail, the levels are `debug`, `info`, `warn`, and `error`.

As an example, to set the `chain` and `blocksync` to log at the `debug` level, run
`lotus log set-level --system chain --system blocksync debug`.

To see the various logging systems, run:

```sh
lotus log list
```

{{< alert icon="tip" >}}
The [Environment variables section](#environment-variables) section above documents some `GOLOG_*` variables that allow to control logging locations and formats.
{{< /alert >}}
