---
title: "Go command not found"
description: "This explains the go command not found"
date: 2022-09-22T12:00:35+01:00
lastmod: 2022-09-22T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["Lotus Node"]
---

## Problem:

You may encounter an error saying that the `go` command was not found:

```shell with-output
sudo make install
```

```
bash: go: command not found
expr: syntax error: unexpected argument '14'
install -C ./lotus /usr/local/bin/lotus
install -C ./lotus-miner /usr/local/bin/lotus-miner
install -C ./lotus-worker /usr/local/bin/lotus-worker
...
```

## Environment:

* Mainnet
* Calibnet
* Devnet

## Resolution

You can ignore this error during the `sudo make install` step; it does not affect the install.