---
title: "Return"
draft: false
menu:
    reference:
             parent: "reference-miner"
toc: true
---

## ReturnAddPiece

storiface.WorkerReturn

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
  },
  {
    "Size": 1032,
    "PieceCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    }
  },
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnFetch

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
  },
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnFinalizeReplicaUpdate

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
  },
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnFinalizeSector

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
  },
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnGenerateSectorKeyFromData

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
  },
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnMoveStorage

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
  },
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnProveReplicaUpdate1

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
  },
  [
    "Ynl0ZSBhcnJheQ=="
  ],
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnProveReplicaUpdate2

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
  },
  "Bw==",
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnReadPiece

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
  },
  true,
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnReleaseUnsealed

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
  },
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnReplicaUpdate

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
  },
  {
    "NewSealed": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "NewUnsealed": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    }
  },
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnSealCommit1

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
  },
  "Bw==",
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnSealCommit2

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
  },
  "Bw==",
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnSealPreCommit1

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
  },
  "Bw==",
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnSealPreCommit2

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
  },
  {
    "Unsealed": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "Sealed": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    }
  },
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`

## ReturnUnsealPiece

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
  },
  {
    "Code": 0,
    "Message": "string value"
  }
]
```

Response: `{}`
