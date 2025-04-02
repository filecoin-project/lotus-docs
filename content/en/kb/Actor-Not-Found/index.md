---
title: "Actor Not Found"
description: "This is a solution for the actor not found error."
date: 2022-03-18T12:00:35+01:00
lastmod: 2022-03-18T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["sealing", "Lotus Worker", "Lotus Miner"]
---

## Problem

Attempting to [create a deal](https://lotus.filecoin.io/tutorials/lotus/store-and-retrieve/store-data)) results in the following error.

```json
"ERROR: resolve address f1qim...jjy: actor not found"
```

## Environment

- Calibnet
- Mainnet 

## Resolution
You need Fil in your wallet prior to the start of a deal or any process that interacts with datacap. Please [add fil](https://docs.filecoin.io/get-started/store-and-retrieve/setup/#adding-fil-to-your-wallet-or-using-filecoin-plus) to your wallet and try again.

## Extras

[Github Issue Report](https://github.com/filecoin-project/lotus/issues/8817). 


