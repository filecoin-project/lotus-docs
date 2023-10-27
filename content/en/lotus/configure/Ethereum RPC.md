---
title: "Ethereum RPC"
description: "Version 1.20.0 introduces FEVM services for Lotus node."
draft: false
menu:
    lotus:
        parent: "lotus-configure"
weight: 320
toc: true
---

## FEVM

With the Filecoin EVM runtime being deployed on Filecoin mainnet via the network version 18 upgrade, node operators, API service providers and application developers will have a new set of configurations that will allow them to interact with the new EVM features.

### EnableEthRPC

To enable the service set the value below to `true`:

```toml
[Fevm]
  # EnableEthRPC enables eth_ rpc, and enables storing a mapping of eth transaction hashes to filecoin message Cids.
  # This will also enable the RealTimeFilterAPI and HistoricFilterAPI by default, but they can be disabled by config options above.
  #
  # type: bool
  # env var: LOTUS_FEVM_ENABLEETHRPC
   EnableEthRPC = true
```

Once you have enabled EthRPC in your Lotus node, you can start using it to interact with Ethereum smart contracts. To do so, you can use any Ethereum client library that supports JSON-RPC over HTTP or WebSocket, such as web3.js or ethers.js.

To use the Ethereum client library with your Lotus node, you need to configure it to connect to the `eth_rpc` API of your Lotus node. 
By default, the `eth_rpc` API is available at `http://127.0.0.1:1234/rpc/v1`.

### Configuration Options
```toml
[Fevm]
  # EnableEthRPC enables eth_ rpc, and enables storing a mapping of eth transaction hashes to filecoin message Cids.
  # This will also enable the RealTimeFilterAPI and HistoricFilterAPI by default, but they can be disabled by config options above.
  #
  # type: bool
  # env var: LOTUS_FEVM_ENABLEETHRPC
  #EnableEthRPC = false

  # EthTxHashMappingLifetimeDays the transaction hash lookup database will delete mappings that have been stored for more than x days
  # Set to 0 to keep all mappings
  #
  # type: int
  # env var: LOTUS_FEVM_ETHTXHASHMAPPINGLIFETIMEDAYS
  #EthTxHashMappingLifetimeDays = 0

  [Fevm.Events]
    # EnableEthRPC enables APIs that
    # DisableRealTimeFilterAPI will disable the RealTimeFilterAPI that can create and query filters for actor events as they are emitted.
    # The API is enabled when EnableEthRPC is true, but can be disabled selectively with this flag.
    #
    # type: bool
    # env var: LOTUS_FEVM_EVENTS_DISABLEREALTIMEFILTERAPI
    #DisableRealTimeFilterAPI = false

    # DisableHistoricFilterAPI will disable the HistoricFilterAPI that can create and query filters for actor events
    # that occurred in the past. HistoricFilterAPI maintains a queryable index of events.
    # The API is enabled when EnableEthRPC is true, but can be disabled selectively with this flag.
    #
    # type: bool
    # env var: LOTUS_FEVM_EVENTS_DISABLEHISTORICFILTERAPI
    #DisableHistoricFilterAPI = false

    # FilterTTL specifies the time to live for actor event filters. Filters that haven't been accessed longer than
    # this time become eligible for automatic deletion.
    #
    # type: Duration
    # env var: LOTUS_FEVM_EVENTS_FILTERTTL
    #FilterTTL = "24h0m0s"

    # MaxFilters specifies the maximum number of filters that may exist at any one time.
    #
    # type: int
    # env var: LOTUS_FEVM_EVENTS_MAXFILTERS
    #MaxFilters = 100

    # MaxFilterResults specifies the maximum number of results that can be accumulated by an actor event filter.
    #
    # type: int
    # env var: LOTUS_FEVM_EVENTS_MAXFILTERRESULTS
    #MaxFilterResults = 10000

    # MaxFilterHeightRange specifies the maximum range of heights that can be used in a filter (to avoid querying
    # the entire chain)
    #
    # type: uint64
    # env var: LOTUS_FEVM_EVENTS_MAXFILTERHEIGHTRANGE
    #MaxFilterHeightRange = 2880

    # DatabasePath is the full path to a sqlite database that will be used to index actor events to
    # support the historic filter APIs. If the database does not exist it will be created. The directory containing
    # the database must already exist and be writeable. If a relative path is provided here, sqlite treats it as
    # relative to the CWD (current working directory).
    #
    # type: string
    # env var: LOTUS_FEVM_EVENTS_DATABASEPATH
    #DatabasePath = ""
```

### Environment variables

- `LOTUS_FVM_CONCURRENCY`: Users with higher available memory can experiment with setting LOTUS_FVM_CONCURRENCY to higher values, up to 48, to allow for more concurrent FVM execution.
- `LOTUS_FEVM_ENABLEETHRPC`: Enables the Eth RPC feature and allows storing a mapping of Eth transaction hashes to Filecoin message CIDs.
- `LOTUS_FEVM_ETHTXHASHMAPPINGLIFETIMEDAYS`: The number of days after which a transaction hash lookup database will delete mappings that have been stored.
- `LOTUS_FEVM_EVENTS_DISABLEREALTIMEFILTERAPI` : Disables the RealTimeFilterAPI that can create and query filters for actor events as they are emitted. 
- `LOTUS_FEVM_EVENTS_DISABLEHISTORICFILTERAPI` : Disables the HistoricFilterAPI that can create and query filters for actor events that occurred in the past.
- `LOTUS_FEVM_EVENTS_MAXFILTERS` : Maximum number of filters that can exist at any one time.
- `LOTUS_FEVM_EVENTS_MAXFILTERRESULTS` : Maximum number of results that can be accumulated by an actor event filter.
- `LOTUS_FEVM_EVENTS_MAXFILTERHEIGHTRANGE` : Maximum range of heights that can be used in a filter to avoid querying the entire chain.
- `LOTUS_FEVM_EVENTS_DATABASEPATH` : The full path to a SQLite database that will be used to index actor events to support the HistoricFilterAPI. If the database does not exist, it will be created. 

### Utilities

The Lotus command line interface also has a new set of commands that allow you to interact with the Filecoin EVM runtime:
```shell
NAME:
   lotus evm - Commands related to the Filecoin EVM runtime
USAGE:
   lotus evm command [command options] [arguments...]
COMMANDS:
     deploy            Deploy an EVM smart contract and return its address
     invoke            Invoke an EVM smart contract using the specified CALLDATA
     stat              Print eth/filecoin addrs and code cid
     call              Simulate an eth contract call
     contract-address  Generate contract address from smart contract code
     help, h           Shows a list of commands or help for one command
```

Examples:

Create a new f4 address:

```shell
lotus wallet new delegated
```
```
f410fu7h6rd7gqwhcxip6t2xmc5f6odjy5yvxaih7xey
```

Find the corresponding ETH account:

```shell
lotus evm stat f410fu7h6rd7gqwhcxip6t2xmc5f6odjy5yvxaih7xey
```
```
Filecoin address:  f410fu7h6rd7gqwhcxip6t2xmc5f6odjy5yvxaih7xey
Eth address:  0xa7cfe88fe6858e2ba1fe9eaec174be70d38ee2b7
Code cid:  bafk2bzacedfvut2myeleyq67fljcrw4kkmn5pb5dpyozovj7jpoez5irnc3ro
```

Deploy a contract:

```shell
lotus evm deploy --from=f410fu7h6rd7gqwhcxip6t2xmc5f6odjy5yvxaih7xey testcoin.bin
```
```
sending message...
waiting for message to execute...
Actor ID: 1008
ID Address: f01008
Robust Address: f2mf75wcwurklloyc6zbrew2wqj4gyiih2cgcwjbi
Eth Address: 0xfe6173918b2448ce93f4710f71a1051e405fdc29
f4 Address: f410f7zqxhemlerem5e7uoehxdiifdzaf7xbjawmljkq
Return: gxkD8FUCYX/bCtSKlrdgXshiS2rQTw2EIPpU/mFzkYskSM6T9HEPcaEFHkBf3Ck=
```

Invoke the contract:

```shell
lotus evm invoke --from=f410fu7h6rd7gqwhcxip6t2xmc5f6odjy5yvxaih7xey f01008 f8b2cb4f000000000000000000000000ff00000000000000000000000000000000000064
```
```
sending message...
waiting for message to execute...
Gas used:  2459725
0000000000000000000000000000000000000000000000000000000000000000
```
