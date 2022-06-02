---
title: "Storage"
draft: false
menu:
    reference:
              parent: "reference-miner"
              identifier: "reference-miner-methods-storage"
toc: true
---

## StorageAddLocal

Perms: admin

Inputs:

```json
[
  "string value"
]
```

Response: `{}`

## StorageAttach

SectorIndex

Perms: admin

Inputs:

```json
[
  {
    "ID": "76f1988b-ef30-4d7e-b3ec-9a627f4ba5a8",
    "URLs": [
      "string value"
    ],
    "Weight": 42,
    "MaxStorage": 42,
    "CanSeal": true,
    "CanStore": true,
    "Groups": [
      "string value"
    ],
    "AllowTo": [
      "string value"
    ]
  },
  {
    "Capacity": 9,
    "Available": 9,
    "FSAvailable": 9,
    "Reserved": 9,
    "Max": 9,
    "Used": 9
  }
]
```

Response: `{}`

## StorageBestAlloc

Perms: admin

Inputs:

```json
[
  1,
  34359738368,
  "sealing"
]
```

Response:

```json
[
  {
    "ID": "76f1988b-ef30-4d7e-b3ec-9a627f4ba5a8",
    "URLs": [
      "string value"
    ],
    "Weight": 42,
    "MaxStorage": 42,
    "CanSeal": true,
    "CanStore": true,
    "Groups": [
      "string value"
    ],
    "AllowTo": [
      "string value"
    ]
  }
]
```

## StorageDeclareSector

Perms: admin

Inputs:

```json
[
  "76f1988b-ef30-4d7e-b3ec-9a627f4ba5a8",
  {
    "Miner": 1000,
    "Number": 9
  },
  1,
  true
]
```

Response: `{}`

## StorageDropSector

Perms: admin

Inputs:

```json
[
  "76f1988b-ef30-4d7e-b3ec-9a627f4ba5a8",
  {
    "Miner": 1000,
    "Number": 9
  },
  1
]
```

Response: `{}`

## StorageFindSector

Perms: admin

Inputs:

```json
[
  {
    "Miner": 1000,
    "Number": 9
  },
  1,
  34359738368,
  true
]
```

Response:

```json
[
  {
    "ID": "76f1988b-ef30-4d7e-b3ec-9a627f4ba5a8",
    "URLs": [
      "string value"
    ],
    "BaseURLs": [
      "string value"
    ],
    "Weight": 42,
    "CanSeal": true,
    "CanStore": true,
    "Primary": true
  }
]
```

## StorageGetLocks

Perms: admin

Inputs: `null`

Response:

```json
{
  "Locks": [
    {
      "Sector": {
        "Miner": 1000,
        "Number": 123
      },
      "Write": [
        0,
        0,
        1,
        0,
        0
      ],
      "Read": [
        2,
        3,
        0,
        0,
        0
      ]
    }
  ]
}
```

## StorageInfo

Perms: admin

Inputs:

```json
[
  "76f1988b-ef30-4d7e-b3ec-9a627f4ba5a8"
]
```

Response:

```json
{
  "ID": "76f1988b-ef30-4d7e-b3ec-9a627f4ba5a8",
  "URLs": [
    "string value"
  ],
  "Weight": 42,
  "MaxStorage": 42,
  "CanSeal": true,
  "CanStore": true,
  "Groups": [
    "string value"
  ],
  "AllowTo": [
    "string value"
  ]
}
```

## StorageList

Perms: admin

Inputs: `null`

Response:

```json
{
  "76f1988b-ef30-4d7e-b3ec-9a627f4ba5a8": [
    {
      "Miner": 1000,
      "Number": 100,
      "SectorFileType": 2
    }
  ]
}
```

## StorageLocal

Perms: admin

Inputs: `null`

Response:

```json
{
  "76f1988b-ef30-4d7e-b3ec-9a627f4ba5a8": "/data/path"
}
```

## StorageLock

Perms: admin

Inputs:

```json
[
  {
    "Miner": 1000,
    "Number": 9
  },
  1,
  1
]
```

Response: `{}`

## StorageReportHealth

Perms: admin

Inputs:

```json
[
  "76f1988b-ef30-4d7e-b3ec-9a627f4ba5a8",
  {
    "Stat": {
      "Capacity": 9,
      "Available": 9,
      "FSAvailable": 9,
      "Reserved": 9,
      "Max": 9,
      "Used": 9
    },
    "Err": "string value"
  }
]
```

Response: `{}`

## StorageStat

Perms: admin

Inputs:

```json
[
  "76f1988b-ef30-4d7e-b3ec-9a627f4ba5a8"
]
```

Response:

```json
{
  "Capacity": 9,
  "Available": 9,
  "FSAvailable": 9,
  "Reserved": 9,
  "Max": 9,
  "Used": 9
}
```

## StorageTryLock

Perms: admin

Inputs:

```json
[
  {
    "Miner": 1000,
    "Number": 9
  },
  1,
  1
]
```

Response: `true`
