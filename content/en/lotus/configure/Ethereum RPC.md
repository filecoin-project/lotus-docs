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

To enable the service, set both values below to `true`:

```toml
[Fevm]
  # EnableEthRPC enables eth_ RPC methods.
  # Note: Setting this to true will also require that ChainIndexer is enabled, otherwise it will cause an error at startup.
  # Set EnableIndexer in the ChainIndexer section of the config to true to enable the ChainIndexer.
  #
  # type: bool
  # env var: LOTUS_FEVM_ENABLEETHRPC
  EnableEthRPC = true

[ChainIndexer]
  # EnableIndexer controls whether the chain indexer is active.
  # The chain indexer is responsible for indexing tipsets, messages, and events from the chain state.
  # It is a crucial component for optimizing Lotus RPC response times.
  # If EnableEthRPC or EnableActorEventsAPI are set to true, the ChainIndexer must be enabled using
  # this option to avoid errors at startup.
  #
  # type: bool
  # env var: LOTUS_CHAININDEXER_ENABLEINDEXER
  EnableIndexer = true
```

{{< alert icon="important" >}}
**ChainIndexer Requirement**: The ChainIndexer (`EnableIndexer = true`) is mandatory when enabling EthRPC. The ChainIndexer maintains the required indices for Ethereum-compatible queries and proper EthRPC operation.
{{< /alert >}}

Once you have enabled EthRPC in your Lotus node, you can start using it to interact with Ethereum smart contracts. To do so, you can use any Ethereum client library that supports JSON-RPC over HTTP or WebSocket, such as web3.js or ethers.js.

To use the Ethereum client library with your Lotus node, you need to configure it to connect to the `eth_rpc` API of your Lotus node. 
By default, the `eth_rpc` API is available at `http://127.0.0.1:1234/rpc/v1`.

### Configuration Options

Note: these configuration options are a subset snapshot from [default-lotus-config.toml](https://github.com/filecoin-project/lotus/blob/master/documentation/en/default-lotus-config.toml).  Please consult the latest default configuration for the most updated options, defaults, and documentation.

```toml
[Fevm]
  # EnableEthRPC enables eth_ RPC methods.
  # Note: Setting this to true will also require that ChainIndexer is enabled, otherwise it will cause an error at startup.
  # Set EnableIndexer in the ChainIndexer section of the config to true to enable the ChainIndexer.
  #
  # type: bool
  # env var: LOTUS_FEVM_ENABLEETHRPC
  #EnableEthRPC = false

  # EthTraceFilterMaxResults sets the maximum results returned per request by trace_filter
  #
  # type: uint64
  # env var: LOTUS_FEVM_ETHTRACEFILTERMAXRESULTS
  #EthTraceFilterMaxResults = 500

  # EthBlkCacheSize specifies the size of the cache used for caching Ethereum blocks.
  # This cache enhances the performance of the eth_getBlockByHash RPC call by minimizing the need to access chain state for
  # recently requested blocks that are already cached.
  # The default size of the cache is 500 blocks.
  # Note: Setting this value to 0 disables the cache.
  #
  # type: int
  # env var: LOTUS_FEVM_ETHBLKCACHESIZE
  #EthBlkCacheSize = 500

[ChainIndexer]
  # See the "ChainIndexer" section below for more info on the ChainIndexer.
  # 
  # EnableIndexer controls whether the chain indexer is active.
  # The chain indexer is responsible for indexing tipsets, messages, and events from the chain state.
  # It is a crucial component for optimizing Lotus RPC response times.
  # If EnableEthRPC or EnableActorEventsAPI are set to true, the ChainIndexer must be enabled using
  # this option to avoid errors at startup.
  #
  # type: bool
  # env var: LOTUS_CHAININDEXER_ENABLEINDEXER
  #EnableIndexer = false

  # GCRetentionEpochs specifies the number of epochs for which data is retained in the Indexer.
  # The garbage collection (GC) process removes data older than this retention period.
  # Setting this to 0 disables GC, preserving all historical data indefinitely.
  #
  # See https://github.com/filecoin-project/lotus/blob/master/documentation/en/chain-indexer-overview-for-operators.md#chainindexer-config for more info.
  #
  # type: int64
  # env var: LOTUS_CHAININDEXER_GCRETENTIONEPOCHS
  #GCRetentionEpochs = 0

[Events]
  # EnableActorEventsAPI enables the Actor events API that enables clients to consume events
  # emitted by (smart contracts + built-in Actors).
  # Note: Setting this to true will also require that ChainIndexer is enabled, otherwise it will cause an error at startup.
  #
  # type: bool
  # env var: LOTUS_EVENTS_ENABLEACTOREVENTSAPI
  #EnableActorEventsAPI = false

  # FilterTTL specifies the time to live for actor event filters. Filters that haven't been accessed longer than
  # this time become eligible for automatic deletion.
  #
  # type: Duration
  # env var: LOTUS_EVENTS_FILTERTTL
  #FilterTTL = "1h0m0s"

  # MaxFilters specifies the maximum number of filters that may exist at any one time.
  #
  # type: int
  # env var: LOTUS_EVENTS_MAXFILTERS
  #MaxFilters = 100

  # MaxFilterResults specifies the maximum number of results that can be accumulated by an actor event filter.
  #
  # type: int
  # env var: LOTUS_EVENTS_MAXFILTERRESULTS
  #MaxFilterResults = 10000

  # MaxFilterHeightRange specifies the maximum range of heights that can be used in a filter (to avoid querying
  # the entire chain)
  #
  # type: uint64
  # env var: LOTUS_EVENTS_MAXFILTERHEIGHTRANGE
  #MaxFilterHeightRange = 2880
```

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

## ChainIndexer

The ChainIndexer is a critical component introduced in Lotus v1.31.0 that provides indexing capabilities for the Filecoin blockchain. It's essential for EthRPC functionality and various blockchain query operations.

For comprehensive information about ChainIndexer configuration, operation, and troubleshooting, please refer to the [ChainIndexer Overview for Operators](https://github.com/filecoin-project/lotus/blob/master/documentation/en/chain-indexer-overview-for-operators.md) documentation in the Lotus GitHub repository.

### Key ChainIndexer Features

- **Blockchain Indexing**: Provides efficient indexing of data for faster queries
- **Backfill Support**: Allows backfilling of historical data when needed
- **Performance Optimization**: Improves query performance for applications requiring blockchain data access

### ChainIndexer Configuration

For detailed configuration options, operational procedures, and advanced settings, consult the [complete ChainIndexer documentation](https://github.com/filecoin-project/lotus/blob/master/documentation/en/chain-indexer-overview-for-operators.md).
