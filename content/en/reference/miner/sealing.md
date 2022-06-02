---
title: "Sealing"
draft: false
menu:
    reference:
             parent: "reference-miner"
toc: true
---

## SealingAbort

Perms: admin

Inputs:

```json
[
  {
    "Sector": {
      "Miner": 1000,
      "Number": 9
    },
    "ID": "07070707-0707-0707-0707-070707070707"
  }
]
```

Response: `{}`

## SealingSchedDiag

SealingSchedDiag dumps internal sealing scheduler state

Perms: admin

Inputs:

```json
[
  true
]
```

Response: `{}`
