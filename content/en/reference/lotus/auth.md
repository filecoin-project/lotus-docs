---
title: "Auth"
draft: false
menu:
    reference:
              parent: "reference-lotus"
              identifier: "reference-methods-auth"
toc: true
aliases:
    - /developers/apis/json-rpc/
---

## AuthNew

Perms: admin

Inputs:

```json
[
  [
    "write"
  ]
]
```

Response: `"Ynl0ZSBhcnJheQ=="`

## AuthVerify

Perms: read

Inputs:

```json
[
  "string value"
]
```

Response:

```json
[
  "write"
]
```

## Beacon

The Beacon method group contains methods for interacting with the random beacon (DRAND)

## BeaconGetEntry

BeaconGetEntry returns the beacon entry for the given filecoin epoch. If
the entry has not yet been produced, the call will block until the entry
becomes available

Perms: read

Inputs:

```json
[
  10101
]
```

Response:

```json
{
  "Round": 42,
  "Data": "Ynl0ZSBhcnJheQ=="
}
```
