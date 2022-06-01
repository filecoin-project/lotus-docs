---
title: "Indexer"
draft: false
menu:
    reference:
             parent: "reference-miner"
toc: true
---

## IndexerAnnounceAllDeals

IndexerAnnounceAllDeals informs the indexer nodes aboutall active deals.

Perms: admin

Inputs: `null`

Response: `{}`

## IndexerAnnounceDeal

IndexerAnnounceDeal informs indexer nodes that a new deal was received,
so they can download its index

Perms: admin

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `{}`
