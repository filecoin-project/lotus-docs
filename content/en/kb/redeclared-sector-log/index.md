---
title: "Sector redeclared in xxx-xxx-xxx logs"
description: "This is article explains why you might see Sector redeclared in xxx-xxx-xxx in your lotus-miner logs."
date: 2022-05-30T12:00:35+01:00
lastmod: 2022-05-30T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["Lotus Miner"]
---

In your lotus-miner logs you might see these logs being printed:

```
2023-05-22T13:51:12.915Z	INFO	stores	paths/index.go:181	New sector storage: d8cfac01-4999-45d5-8231-8aa9423224e2
2023-05-22T13:51:12.919Z	WARN	stores	paths/index.go:369	sector {1278 1072} redeclared in d8cfac01-4999-45d5-8231-8aa9423224e2
```

These logs appear:

1. On startup the lotus-miner process will scan all sector storage paths to see where the sectors are located, and as such you will see these logs outputted.

2. Boost added index integrity checks in Boost version v1.7.0 and higher, which is why you would see this logging at certain intervals. The storage list api that Boost relies on in the Lotus-Miner unfortunately doesn’t automatically update removed sectors or removed unsealed copies, so they ask lotus-miner to update the list via the redeclare storage api, which should be a fairly light call.

In Boost you can configure how often this API call occurs in your config file. Check the [Boost documentation for more information](https://boost.filecoin.io).
