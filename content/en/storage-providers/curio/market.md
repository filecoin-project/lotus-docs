---
title: "Boost Integration"
description: "This guide describes how to connect your Boost instance to the Curio cluster"
lead: "This guide describes how to connect your Boost instance to the Curio cluster"
draft: false
menu:
  storage-providers:
    parent: "curio"
weight: 140
toc: true
---

Curio has a market submodule which allow integrating with Boost without any changes to the Boost code base.
The deal data is added to a sector in TreeD stage instead of AddPiece in Lotus-Miner.

- Intro
- How to enable market in Curio with config
- PiecePark should be enabled on TreeD and TreeRC nodes (data will be closer to sector)
- How to connect exiting Boost
- How to init new Boost
- Branch to use in Boost
