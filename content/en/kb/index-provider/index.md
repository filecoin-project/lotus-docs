---
title: "Index provider"
description: "Index provider is the backbone of content routing in Filecoin network: it advertises the availability of the content provided by a storage provider to indexer nodes."
date: 2023-02-14T12:00:35+01:00
lastmod: 2023-02-14T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
aliases:
     - /docs/storage-providers/index-provider/
     - /storage-providers/operate/index-provider/
toc: false
pinned: false
types: ["article"]
areas: ["Deprecated"]
---

{{< alert icon="warning" >}}
The Legacy Lotus/Lotus-Miner Markets sub-system reached EOL at the [end of the 31st January 2023](https://github.com/filecoin-project/lotus/releases/tag/v1.18.0). It has been fully removed from the Lotus/Lotus-Miner codebase as of 10th June 2024. We recommend our users to use the [Boost markets sub-system](https://github.com/filecoin-project/boost) instead.
{{< /alert >}}

The index provider is a component of the _markets_ subsystem that enables content routing backed by the Filecoin network: it announces what content is stored by a storage provider by advertising the list of multihashes extracted from CARv2 indices stored by [DagStore]({{< relref "../../kb/dagstore/" >}}) along with metadata on how to retrieve the content. The indexing announcements are then published onto a gossipsub topic, which is listened to by a set of indexer nodes.

The indexer nodes then process the advertisements to facilitate a service where a client can look up the storage provider that stores a given CID or multihash.

The index provider component leverages the latest indexing format of [CARv2](https://github.com/ipld/ipld/blob/master/specs/transport/car/carv2/index.md) to enable efficient extraction and lookup of the list of multihashes stored in CAR files via [DagStore].

The index provider component consists of two layers:

1. **Indexing Advertisement Generation** - Receives notifications about the deals made, slashed, or expired by the storage provider and updates an append-only log of the multihashes that are stored or no longer available in the form of an IPLD DAG.
2. **Announcement of Changes** - Publishes a notification onto the indexing gossipsub topic to announce that a change has been made to the append-only log of indexing advertisements. This also exposes an endpoint that allows indexer nodes to fetch the advertisements IPLD DAG over DataTransport protocol.

## Terminology

The following is an overview of terms used in the index provider context:

- **Advertisement:** a unit of change in the content added or removed by the storage provider. Advertisements are represented as an IPLD DAG, where each advertisement links to the previous advertisement. Each advertisement contains a list of multihashes, the content provided by the storage provider, and metadata on how to retrieve the content.
- **Entries:** represents the list of multihashes the content hosted by the storage provider. The entries are represented as an IPLD DAG, divided across a set of interlinked IPLD nodes, referred to as _Entries Chunk_.
- **Retrieval Addresses:** a list of addresses included in each advertisement that points to where you can retrieve from the advertised content.

## Expected Behaviour

### New CAR index format in DagStore

The index provider leverages the latest CARv2 indexing format [`MultihashIndexSorted`](https://ipld.io/specs/transport/car/carv2/#format-0x0401-multihashindexsorted), which stores the multihash code as well as the digest of all CIDs in a CAR file. The size of DagStore index files, as a result, are slightly larger.

### Index Provider GossipSub Announcements

The index provider announces changes to the chain of advertisements onto a gossipsub topic, named `/indexer/ingest/mainnet`, which is propagated through the Lotus daemon onto the indexer nodes. As a result, a protected connection is made from the markets process to the daemon process so that gossipsub announcements are propagated out onto the network.

### Index Provider GraphSync Server

The index provider exposes a GraphSync server on the market's host, which serves requests from indexer nodes to sync the list of advertised multihashes provided by the SP.

### Index Provider storage usage

The index provider shares a datastore with the `markets` process, wrapped under the namespace `index-provider`. The datastore entries stored include:

1. internal mappings used by the index provider engine, and
2. cache of chained multihash chunks.

The storage used by the internal mappings is negligible.

The storage used by caching is bound by an LRU cache, with the default maximum size of `1024`, which corresponds to the number of chained chunks cached. The maximum number of multihashes included in each chunk is set to `16,384` by default.

The exact storage usage depends on the number of multihashes stored in a single chunk, the number of chunks in the entire chain, and the size of each multihash. For example, you can calculate the size of the cache on disk with default values as:

```plaintext
1024 * 16384 * <multihash-length> * <chain-length>
```

Based on the equation above, caching 128-bit long multihashes will result in chunk sizes of 0.25MiB with maximum cache growth of 256 MiB for advertisements with a single chunk.

## Become an index provider

New Storage Providers who initialized with v1.15.1 or greater will have the new CARv2 indexing format and can [announce](#bulk-index-announcement) their indices after sealing their first storage deal. Existing Storage Providers initialized before v1.15.1 will need to follow the [one-off migration](#one-off-migration) guide to enable the indexing integration.

### One-off migration

If you are a Storage Provider who has previously run the markets-module, you´ll need to do a one-off migration to re-generate the DagStore with the new CARv2 indexing format. 

1. Stop the `daemon` `miner` and  `markets` processes

   Stop all lotus processes to suspend any changes to the state of DagStore during the rollout.

   You must stop the daemon to roll-out a change to the API that protects connections between markets and the libp2p node.

2. Back up the existing DagStore repository

   By default, the DagStore repository is located at `$LOTUS_MARKETS_PATH/dagstore` if the market subsystem has been split from the miner. For a monolith miner, the DagStore repository is located at `$LOTUS_MINER_PATH/dagstore`. Make a copy of this directory. This is necessary for:

  - verifying that the expected shard indices are re-generated after migration, and
  - rolling back the changes in case of an error.

3. Delete the existing DagStore repository

   By default, delete the DagStore repository located at `$LOTUS_MARKETS_PATH/dagstore` for the split miner or `$LOTUS_MINER_PATH/dagstore` for monolith miner. The absence of the repository signals to the Lotus instance that a DagStore migration is needed and will automatically trigger one upon `markets` instance start-up.

4. Rotate any existing Lotus log files and adjust log level

   For easier debugging, rotate any existing logs so that the new logs only include output generated by the target release.

5. Install Lotus Release

   Install the Lotus release v1.15.1 or higher. The index-provider enabled by default in v1.15.1 and newer releases.

6. Start `daemon` and `miner` processes

   Start `daemon` and `miner` processes and await until they are fully started and ready. They are ready when the following commands succeed:

    ```shell
    lotus-miner sectors list
    lotus-miner storage-deals list
    ```

7. Start the `markets` process
   {{< alert icon="tip" >}}
   This step is only required when the market subsystem has been split from the miner.
   {{< /alert >}}

   Start only the `markets` process and wait for the following line in the markets process logs: `dagstore migration completed successfully`

   This indicates that the list of shards requiring initialization has been queued for processing. See [DagStore First-time Migration](https://lotus.filecoin.io/docs/storage-providers/dagstore/#first-time-migration) for more information.

8. Configure logging subsystems

   Make sure your lotus installation persists the log files for future debugging.
   Set the log level for the following subsystems on market node to `INFO` :

   - `go-legs-gpubsub`
   - `provider/engine`
   - `dagstore`

   To do this run the following command:
   
   - For monolith miner
   
       ```shell
       lotus-miner log set-level --system provider/engine --system go-legs-gpubsub --system dagstore info
       ```
       
   - For split market subsystem

        ```shell
        lotus-miner --call-on-markets log set-level --system provider/engine --system go-legs-gpubsub --system dagstore info
        ```

9. Initialise the DagStore shards

   To start the initialization of DagStore shards, run:

   `lotus-miner dagstore initialize-all --concurrency=N` if you run a monolith miner process or `lotus-miner --call-on-markets dagstore initialize-all --concurrency=N` if you have split your market subsystem.

   {{< alert icon="warning" >}}
   Initialization places IO workload on your storage system. `N` controls the number of deals that are concurrently initialized. See [DagStrore Force Bulk Initialisation](https://lotus.filecoin.io/docs/storage-providers/dagstore/#forcing-bulk-initialization) docs for more information.
   {{< /alert >}}

   Wait for the initialization to complete. The initialization time is a factor of the volume of data stored since it involves re-indexing the data blocks.

10. Verify re-creation of DagStore repository

    The previous step should recreate the DagStore repository, located at `$LOTUS_MARKETS_PATH/dagstore` or `$LOTUS_MINER_PATH/dagstore`(for monolith miner). Navigate to that directory. Under the subfolder `index`, verify that matching `*.full.idx` files can be found for all files under the same sub-directory in the backup of DagStore taken in step 2.

11. Announce all indices to the indexers

    To announce all the indices in bulk to the indexers, run:

    `lotus-miner index announce-all`  if you run a monolith miner process or `lotus-miner --call-on-markets index announce-all` if you have split your market subsystem.

    This command generates advertisements and publishes indices onto the indexer gossipsub channel. Look for a series of logs in the markets logs that include `deal announcement sent to index provider`. You should see one such log per deal. The log-line also includes the advertised CID, the deal proposal CID to which it belongs, and the shard key from which its multihash entries are generated. The logs should also include information about the number of multihash entries each advertisement includes. For example:

    ```plaintext
    deal announcement sent to index provider	{"advertisementCid": "baguqeeqqvr2irdrq45d7npj7elogzpaaam", "shard-key": "baga6ea4seaqegic2h4qoao4urcwhin7tgwlb4cguqymtriheqoyjjaabz6viegq", "proposalCid": "bafyreihhqszkcv3egsb7xkuhyswqjdy3oa2kboi2zjvrbkuj3jgq2g4d4m"}
    Generated linked chunks of multihashes	{"totalMhCount": 32449, "chunkCount": 2}
    ```

    Note that the bulk advertisement only announces deals that are not expired and handed over to the sealing subsystem. The daemon will not advertise the expired deals. For any remaining deals, the advertisement will occur after they are given to the sealing subsystem.

    Wait for the bulk indexing announcement to complete. The bulk announcement is complete when `finished announcing active deals to index provider` is logged.

## Bulk Index Announcement

You can use the following CLI command to bulk-announce all deals made by the storage provider:

```shell
lotus-miner index announce-all
```

{{< alert icon="tip" >}}
Note that if you have split your markets subsystem, you will need to specify `--call-on-markets`.
{{< /alert >}}

## Configuration

You can adjust the values under the `IndexProvider` section in the `config.toml` of your market process to configure indexes' announcement to the indexer.

If the section doesn't exist, you can manually add it:

```toml
[IndexProvider]
  # Enable set whether to enable indexing announcement to the network and expose endpoints that
  # allow indexer nodes to process announcements. Disabled by default.
  #
  # type: bool
  # env var: LOTUS_INDEXPROVIDER_ENABLE
  #Enable = true

  # EntriesCacheCapacity sets the maximum capacity to use for caching the indexing advertisement
  # entries. Defaults to 1024 if not specified. The cache is evicted using LRU policy. The
  # maximum storage used by the cache is a factor of EntriesCacheCapacity, EntriesChunkSize and
  # the length of multihashes being advertised. For example, advertising 128-bit long multihashes
  # with the default EntriesCacheCapacity, and EntriesChunkSize means the cache size can grow to
  # 256MiB when full.
  #
  # type: int
  # env var: LOTUS_INDEXPROVIDER_ENTRIESCACHECAPACITY
  #EntriesCacheCapacity = 1024

  # EntriesChunkSize sets the maximum number of multihashes to include in a single entries chunk.
  # Defaults to 16384 if not specified. Note that chunks are chained together for indexing
  # advertisements that include more multihashes than the configured EntriesChunkSize.
  #
  # type: int
  # env var: LOTUS_INDEXPROVIDER_ENTRIESCHUNKSIZE
  #EntriesChunkSize = 16384

  # TopicName sets the topic name on which the changes to the advertised content are announced.
  # Defaults to '/indexer/ingest/mainnet' if not specified.
  #
  # type: string
  # env var: LOTUS_INDEXPROVIDER_TOPICNAME
  #TopicName = "/indexer/ingest/mainnet"

  # PurgeCacheOnStart sets whether to clear any cached entries chunks when the provider engine
  # starts. By default, the cache is rehydrated from previously cached entries stored in
  # datastore if any is present.
  #
  # type: bool
  # env var: LOTUS_INDEXPROVIDER_PURGECACHEONSTART
  #PurgeCacheOnStart = false
```