---
title: "How to install lotus-shed"
description: "This is a guide for installing lotus-shed."
date: 2022-03-17T12:00:35+01:00
lastmod: 2021-11-16T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["lotus-shed", "Linux", "Lotus Node"]
---

## Problem:

When installing lotus for mainnet, lotus-shed is not installed by default. 

## Environment:

- Mainnet

## Resolution:

After lotus installs (completely) run `make lotus-shed`

## Extras:

Note that lotus-shed is not required for lotus to run on the network. It only contains tools for various types of inspections or troubleshooting operations. It is installed by default when lotus is configured for calibnet.
