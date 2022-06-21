---
title: "Mark for upgrade is deprecated"
description: "Marking sectors for upgrade has been depreciated as of Lotus v1.15.0"
date: 2022-03-17T12:00:35+01:00
lastmod: 2021-11-16T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["Deprecated"]
---

The `lotus-miner sectors mark-for-upgrade` command which allowed you to mark commited capacity sectors for replacement by a sector with deals has been deprecated, as of Lotus v1.15.0. It´s replaced by the `lotus-miner sectors snap-up` command, which allows you to mark committed capacity sectors to be filled with deals instead. Learn more about [Snap-deals here]({{< relref "../../storage-providers/operate/snap-deals/" >}}).