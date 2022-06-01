---
title: "Sector"
draft: false
menu:
    reference:
              parent: "reference-miner"
              identifier: "reference-miner-methods-sector"
toc: true
---

## SectorAbortUpgrade

SectorAbortUpgrade can be called on sectors that are in the process of being upgraded to abort it

Perms: admin

Inputs:

```json
[
  9
]
```

Response: `{}`

## SectorAddPieceToAny

Add piece to an open sector. If no sectors with enough space are open,
either a new sector will be created, or this call will block until more
sectors can be created.

Perms: admin

Inputs:

```json
[
  1024,
  {},
  {
    "PublishCid": null,
    "DealID": 5432,
    "DealProposal": {
      "PieceCID": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "PieceSize": 1032,
      "VerifiedDeal": true,
      "Client": "f01234",
      "Provider": "f01234",
      "Label": "string value",
      "StartEpoch": 10101,
      "EndEpoch": 10101,
      "StoragePricePerEpoch": "0",
      "ProviderCollateral": "0",
      "ClientCollateral": "0"
    },
    "DealSchedule": {
      "StartEpoch": 10101,
      "EndEpoch": 10101
    },
    "KeepUnsealed": true
  }
]
```

Response:

```json
{
  "Sector": 9,
  "Offset": 1032
}
```

## SectorCommitFlush

SectorCommitFlush immediately sends a Commit message with sectors aggregated for Commit.
Returns null if message wasn't sent

Perms: admin

Inputs: `null`

Response:

```json
[
  {
    "Sectors": [
      123,
      124
    ],
    "FailedSectors": {
      "123": "can't acquire read lock"
    },
    "Msg": null,
    "Error": "string value"
  }
]
```

## SectorCommitPending

SectorCommitPending returns a list of pending Commit sectors to be sent in the next aggregate message

Perms: admin

Inputs: `null`

Response:

```json
[
  {
    "Miner": 1000,
    "Number": 9
  }
]
```

## SectorGetExpectedSealDuration

SectorGetExpectedSealDuration gets the expected time for a sector to seal

Perms: read

Inputs: `null`

Response: `60000000000`

## SectorGetSealDelay

SectorGetSealDelay gets the time that a newly-created sector
waits for more deals before it starts sealing

Perms: read

Inputs: `null`

Response: `60000000000`

## SectorMarkForUpgrade

Perms: admin

Inputs:

```json
[
  9,
  true
]
```

Response: `{}`

## SectorMatchPendingPiecesToOpenSectors

Perms: admin

Inputs: `null`

Response: `{}`

## SectorPreCommitFlush

SectorPreCommitFlush immediately sends a PreCommit message with sectors batched for PreCommit.
Returns null if message wasn't sent

Perms: admin

Inputs: `null`

Response:

```json
[
  {
    "Sectors": [
      123,
      124
    ],
    "Msg": null,
    "Error": "string value"
  }
]
```

## SectorPreCommitPending

SectorPreCommitPending returns a list of pending PreCommit sectors to be sent in the next batch message

Perms: admin

Inputs: `null`

Response:

```json
[
  {
    "Miner": 1000,
    "Number": 9
  }
]
```

## SectorRemove

SectorRemove removes the sector from storage. It doesn't terminate it on-chain, which can
be done with SectorTerminate. Removing and not terminating live sectors will cause additional penalties.

Perms: admin

Inputs:

```json
[
  9
]
```

Response: `{}`

## SectorSetExpectedSealDuration

SectorSetExpectedSealDuration sets the expected time for a sector to seal

Perms: write

Inputs:

```json
[
  60000000000
]
```

Response: `{}`

## SectorSetSealDelay

SectorSetSealDelay sets the time that a newly-created sector
waits for more deals before it starts sealing

Perms: write

Inputs:

```json
[
  60000000000
]
```

Response: `{}`

## SectorStartSealing

SectorStartSealing can be called on sectors in Empty or WaitDeals states
to trigger sealing early

Perms: write

Inputs:

```json
[
  9
]
```

Response: `{}`

## SectorTerminate

SectorTerminate terminates the sector on-chain (adding it to a termination batch first), then
automatically removes it from storage

Perms: admin

Inputs:

```json
[
  9
]
```

Response: `{}`

## SectorTerminateFlush

SectorTerminateFlush immediately sends a terminate message with sectors batched for termination.
Returns null if message wasn't sent

Perms: admin

Inputs: `null`

Response: `null`

## SectorTerminatePending

SectorTerminatePending returns a list of pending sector terminations to be sent in the next batch message

Perms: admin

Inputs: `null`

Response:

```json
[
  {
    "Miner": 1000,
    "Number": 9
  }
]
```
