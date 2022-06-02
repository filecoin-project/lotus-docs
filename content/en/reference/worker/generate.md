---
title: "Generate"
draft: false
menu:
    reference:
             parent: "reference-worker"
toc: true
---

## GenerateSectorKeyFromData

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
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response:

```json
{
  "Sector": {
    "Miner": 1000,
    "Number": 9
  },
  "ID": "07070707-0707-0707-0707-070707070707"
}
```

## GenerateWindowPoSt

Perms: admin

Inputs:

```json
[
  8,
  1000,
  [
    {
      "SealProof": 8,
      "SectorNumber": 9,
      "SealedCID": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "Challenge": [
        42
      ],
      "Update": true
    }
  ],
  123,
  "Bw=="
]
```

Response:

```json
{
  "PoStProofs": {
    "PoStProof": 8,
    "ProofBytes": "Ynl0ZSBhcnJheQ=="
  },
  "Skipped": [
    {
      "Miner": 1000,
      "Number": 9
    }
  ]
}
```

## GenerateWinningPoSt

Perms: admin

Inputs:

```json
[
  8,
  1000,
  [
    {
      "SealProof": 8,
      "SectorNumber": 9,
      "SealedCID": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "Challenge": [
        42
      ],
      "Update": true
    }
  ],
  "Bw=="
]
```

Response:

```json
[
  {
    "PoStProof": 8,
    "ProofBytes": "Ynl0ZSBhcnJheQ=="
  }
]
```
