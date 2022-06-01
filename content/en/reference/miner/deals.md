---
title: "Deals"
draft: false
menu:
    reference:
             parent: "reference-miner"
toc: true
---

## DealsConsiderOfflineRetrievalDeals

Perms: admin

Inputs: `null`

Response: `true`

## DealsConsiderOfflineStorageDeals

Perms: admin

Inputs: `null`

Response: `true`

## DealsConsiderOnlineRetrievalDeals

Perms: admin

Inputs: `null`

Response: `true`

## DealsConsiderOnlineStorageDeals

Perms: admin

Inputs: `null`

Response: `true`

## DealsConsiderUnverifiedStorageDeals

Perms: admin

Inputs: `null`

Response: `true`

## DealsConsiderVerifiedStorageDeals

Perms: admin

Inputs: `null`

Response: `true`

## DealsImportData

Perms: admin

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "string value"
]
```

Response: `{}`

## DealsList

Perms: admin

Inputs: `null`

Response:

```json
[
  {
    "Proposal": {
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
    "State": {
      "SectorStartEpoch": 10101,
      "LastUpdatedEpoch": 10101,
      "SlashEpoch": 10101
    }
  }
]
```

## DealsPieceCidBlocklist

Perms: admin

Inputs: `null`

Response:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

## DealsSetConsiderOfflineRetrievalDeals

Perms: admin

Inputs:

```json
[
  true
]
```

Response: `{}`

## DealsSetConsiderOfflineStorageDeals

Perms: admin

Inputs:

```json
[
  true
]
```

Response: `{}`

## DealsSetConsiderOnlineRetrievalDeals

Perms: admin

Inputs:

```json
[
  true
]
```

Response: `{}`

## DealsSetConsiderOnlineStorageDeals

Perms: admin

Inputs:

```json
[
  true
]
```

Response: `{}`

## DealsSetConsiderUnverifiedStorageDeals

Perms: admin

Inputs:

```json
[
  true
]
```

Response: `{}`

## DealsSetConsiderVerifiedStorageDeals

Perms: admin

Inputs:

```json
[
  true
]
```

Response: `{}`

## DealsSetPieceCidBlocklist

Perms: admin

Inputs:

```json
[
  [
    {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    }
  ]
]
```

Response: `{}`
