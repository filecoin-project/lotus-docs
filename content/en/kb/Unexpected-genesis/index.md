---
title: "Unexpected genesis in repo"
description: "This is a solution for the unexpected genesis in the repo error."
date: 2022-03-18T12:00:35+01:00
lastmod: 2022-03-18T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["Lotus Node"]
---

## Problem

When trying to to run the lotus daemon command you encounter an error that ends with:

```text
Genesis in the repo is not the one expected by this version of Lotus!
```

## Resolution
This error happens when you you have some blocks from a different network type in you chain folder, then what is expected by the current network you are trying to run.

So if you where syncing the the mainnet (downloading some blocks, etc), and then rebuild to sync on the calibnet, or vice versa, it will throw that error.

Before syncing on another network you need to remove your old chain files:

```
rm -r .lotus/datastore/chain/*
```

Then you can follow the normal [upgrade in-place procedure](https://lotus.filecoin.io/storage-providers/operate/upgrades/#upgrade-in-place).