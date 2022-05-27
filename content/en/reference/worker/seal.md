---
title: "Seal"
draft: false
menu:
    reference:
             parent: "reference-worker"
toc: true
---

## SealCommit1

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
  "Bw==",
  "Bw==",
  [
    {
      "Size": 1032,
      "PieceCID": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      }
    }
  ],
  {
    "Unsealed": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Sealed": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    }
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

## SealCommit2

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
  "Bw=="
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

## SealPreCommit1

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
  "Bw==",
  [
    {
      "Size": 1032,
      "PieceCID": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      }
    }
  ]
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

## SealPreCommit2

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
  "Bw=="
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
