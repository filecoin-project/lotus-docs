---
title: "Add"
draft: false
menu:
    reference:
             parent: "reference-worker"
toc: true
---

## AddPiece

storiface.WorkerCalls

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
  [
    1024
  ],
  1024,
  {}
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
