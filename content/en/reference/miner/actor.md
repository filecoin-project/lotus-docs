---
title: "Actor"
draft: false
menu:
    reference:
             parent: "reference-miner"
toc: true
---

## ActorAddress

Perms: read

Inputs: `null`

Response: `"f01234"`

## ActorAddressConfig

Perms: read

Inputs: `null`

Response:

```json
{
  "PreCommitControl": [
    "f01234"
  ],
  "CommitControl": [
    "f01234"
  ],
  "TerminateControl": [
    "f01234"
  ],
  "DealPublishControl": [
    "f01234"
  ],
  "DisableOwnerFallback": true,
  "DisableWorkerFallback": true
}
```

## ActorSectorSize

Perms: read

Inputs:

```json
[
  "f01234"
]
```

Response: `34359738368`

