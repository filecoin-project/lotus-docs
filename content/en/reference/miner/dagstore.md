---
title: "Dagstore"
draft: false
menu:
    reference:
             parent: "reference-miner"
toc: true
---

## DagstoreGC

DagstoreGC runs garbage collection on the DAG store.

Perms: admin

Inputs: `null`

Response:

```json
[
  {
    "Key": "baga6ea4seaqecmtz7iak33dsfshi627abz4i4665dfuzr3qfs4bmad6dx3iigdq",
    "Success": false,
    "Error": "\u003cerror\u003e"
  }
]
```

## DagstoreInitializeAll

DagstoreInitializeAll initializes all uninitialized shards in bulk,
according to the policy passed in the parameters.

It is recommended to set a maximum concurrency to avoid extreme
IO pressure if the storage subsystem has a large amount of deals.

It returns a stream of events to report progress.

Perms: write

Inputs:

```json
[
  {
    "MaxConcurrency": 123,
    "IncludeSealed": true
  }
]
```

Response:

```json
{
  "Key": "string value",
  "Event": "string value",
  "Success": true,
  "Error": "string value",
  "Total": 123,
  "Current": 123
}
```

## DagstoreInitializeShard

DagstoreInitializeShard initializes an uninitialized shard.

Initialization consists of fetching the shard's data (deal payload) from
the storage subsystem, generating an index, and persisting the index
to facilitate later retrievals, and/or to publish to external sources.

This operation is intended to complement the initial migration. The
migration registers a shard for every unique piece CID, with lazy
initialization. Thus, shards are not initialized immediately to avoid
IO activity competing with proving. Instead, shard are initialized
when first accessed. This method forces the initialization of a shard by
accessing it and immediately releasing it. This is useful to warm up the
cache to facilitate subsequent retrievals, and to generate the indexes
to publish them externally.

This operation fails if the shard is not in ShardStateNew state.
It blocks until initialization finishes.

Perms: write

Inputs:

```json
[
  "string value"
]
```

Response: `{}`

## DagstoreListShards

DagstoreListShards returns information about all shards known to the
DAG store. Only available on nodes running the markets subsystem.

Perms: read

Inputs: `null`

Response:

```json
[
  {
    "Key": "baga6ea4seaqecmtz7iak33dsfshi627abz4i4665dfuzr3qfs4bmad6dx3iigdq",
    "State": "ShardStateAvailable",
    "Error": "\u003cerror\u003e"
  }
]
```

## DagstoreLookupPieces

DagstoreLookupPieces returns information about shards that contain the given CID.

Perms: admin

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:

```json
[
  {
    "Key": "baga6ea4seaqecmtz7iak33dsfshi627abz4i4665dfuzr3qfs4bmad6dx3iigdq",
    "State": "ShardStateAvailable",
    "Error": "\u003cerror\u003e"
  }
]
```

## DagstoreRecoverShard

DagstoreRecoverShard attempts to recover a failed shard.

This operation fails if the shard is not in ShardStateErrored state.
It blocks until recovery finishes. If recovery failed, it returns the
error.

Perms: write

Inputs:

```json
[
  "string value"
]
```

Response: `{}`
