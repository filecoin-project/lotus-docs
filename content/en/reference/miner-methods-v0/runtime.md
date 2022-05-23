---
title: "Runtime"
draft: false
menu:
    reference:
             parent: "reference-miner-methods-v0"
toc: true
---

## RuntimeSubsystems

RuntimeSubsystems returns the subsystems that are enabled
in this instance.

Perms: read

Inputs: `null`

Response:

```json
[
  "Mining",
  "Sealing",
  "SectorStorage",
  "Markets"
]
```
