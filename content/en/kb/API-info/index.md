---
title: "Debugging GetAPIInfo errors"
description: "A article to help you troubleshoot GetAPIInfo error messages"
date: 2022-03-22T12:00:35+01:00
lastmod: 2022-03-22T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["env", "Lotus Miner", "Lotus Node"]
---

## Failing API Info

A `GetAPIInfo error` in Lotus can mean a couple of things:

- Repo environment variable or flag is not set, or pointing at a wrong path.
- There is a missing repo
- Corrupted repo (e.g. missing API file)

## Environment

- Mainnet 
- Calibnet
- Devnet

## Resolution

The most common issue for a `GetAPIInfo error` error is that the correct environment variable for a repo is not set in the active terminal. Depending on which process you are running, check that one or multiple of these environment variables is set correctly in your current terminal:

```plaintext
FULLNODE_API_INFO=...
MINER_API_INFO=...
MARKETS_API_INFO=...
LOTUS_MINER_PATH=...
LOTUS_MARKETS_PATH=...
```
