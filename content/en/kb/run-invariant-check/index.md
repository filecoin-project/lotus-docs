---
title: "Run an invariant check"
description: "This guide will walk you through how to run a invariant check"
date: 2024-07-07T12:00:35+01:00
lastmod: 2024-07-07T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["Lotus"]
---

## Prerequisites

To run an invariant check on your Lotus node, you need:

- A lotus node that can be stopped
- [`lotus-shed` installed]({{< relref "../../kb/lotus-shed-not-installed//" >}})

## Run invariant check

1. On your currently synced and running Lotus node, run:

```shell with-output
lotus chain list --count 1 | awk -F '[:, ]+' '{print $1, $8}' | xargs -n2 sh -c 'echo -n "Chain Height: $1, ParentStateRoot: "; lotus chain get-block $2 | jq -r ".ParentStateRoot[\"/\"]"' sh
```
```
Chain Height: 4062673, ParentStateRoot: bafy2bzacebzxikpluchiv6by7gjnexh4cg3aojyimdtgcieiqs3loah76ejkm
```

2. Stop the Lotus daemon

```shell
lotus daemon stop
```

3. Run the invariant check

```shell
./lotus-shed check-invariants --repo=[path-to-your-.lotus-repo] [ParentStateRoot] [ChainHeight] > /path/to/saved/file/invariants
```

In the above command, replace `[ParentStateRoot]` and `[ChainHeight]` with the output from step 1. Running the invariant check command will take a while (up to two hours depending on your hardware).