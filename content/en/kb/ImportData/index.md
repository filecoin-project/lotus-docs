---
title: "Where does the ImportData function get executed"
description: "This is a solution for the ImportData function."
date: 2022-03-17T12:00:35+01:00
lastmod: 2022-03-17T13:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["function", "bidbot", "Lotus Node", "Markets Node"]
---

## Problem:

Where does the `ImportData` function get executed? 

### Example 

> During normal operation bidbot listens, bids, downloads data, and then calls ImportData. https://github.com/textileio/bidbot/blob/v0.1.6/service/store/store.go#L615-L622

The question is: How do you organize your API access/where bidbot runs? Does it expect the above to happen on the market node, or do you actually give bidbot miner-node credentials? Something else?

## Environment:

- Mainnet 
- Calibnet 
- Split markets node

## Resolution:

The `ImportData` function is always called/processed on the market node, regardless of any split configurations between a market node and the main miner-node. 

## Extras:

[https://filecoinproject.slack.com/archives/C02GQUMFQVA/p1638191739163300](https://filecoinproject.slack.com/archives/C02GQUMFQVA/p1638191739163300)
