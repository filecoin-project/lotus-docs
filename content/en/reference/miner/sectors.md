---
title: "Sectors"
draft: false
menu:
    reference:
              parent: "reference-miner"
              identifier: "reference-miner-methods-sectors"
toc: true
---

## SectorsList

List all staged sectors

Perms: read

Inputs: `null`

Response:

```json
[
  123,
  124
]
```

## SectorsListInStates

List sectors in particular states

Perms: read

Inputs:

```json
[
  [
    "Proving"
  ]
]
```

Response:

```json
[
  123,
  124
]
```

## SectorsRefs

Perms: read

Inputs: `null`

Response:

```json
{
  "98000": [
    {
      "SectorID": 100,
      "Offset": 10485760,
      "Size": 1048576
    }
  ]
}
```

## SectorsStatus

Get the status of a given sector by ID

Perms: read

Inputs:

```json
[
  9,
  true
]
```

Response:

```json
{
  "SectorID": 9,
  "State": "Proving",
  "CommD": null,
  "CommR": null,
  "Proof": "Ynl0ZSBhcnJheQ==",
  "Deals": [
    5432
  ],
  "Pieces": [
    {
      "Piece": {
        "Size": 1032,
        "PieceCID": {
          "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
        }
      },
      "DealInfo": {
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
    }
  ],
  "Ticket": {
    "Value": "Bw==",
    "Epoch": 10101
  },
  "Seed": {
    "Value": "Bw==",
    "Epoch": 10101
  },
  "PreCommitMsg": null,
  "CommitMsg": null,
  "Retries": 42,
  "ToUpgrade": true,
  "ReplicaUpdateMessage": null,
  "LastErr": "string value",
  "Log": [
    {
      "Kind": "string value",
      "Timestamp": 42,
      "Trace": "string value",
      "Message": "string value"
    }
  ],
  "SealProof": 8,
  "Activation": 10101,
  "Expiration": 10101,
  "DealWeight": "0",
  "VerifiedDealWeight": "0",
  "InitialPledge": "0",
  "OnTime": 10101,
  "Early": 10101
}
```

## SectorsSummary

Get summary info of sectors

Perms: read

Inputs: `null`

Response:

```json
{
  "Proving": 120
}
```

## SectorsUnsealPiece

Perms: admin

Inputs:

```json
[
  {
    "ID": {
      "Miner": 1000,
      "Number": 9
    },
    "ProofType": 8
  },
  1040384,
  1024,
  "Bw==",
  null
]
```

Response: `{}`

## SectorsUpdate

Perms: admin

Inputs:

```json
[
  9,
  "Proving"
]
```

Response: `{}`
