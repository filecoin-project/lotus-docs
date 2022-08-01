---
title: "This Week in Lotus - Week 22"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-06-03T08:49:55+00:00
lastmod: 2022-06-03T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

A WASM-based :butterfly:-network was born when the butterfly-network upgraded at `epoch 333258` this week. A [stable release of v1.15.3](https://github.com/filecoin-project/lotus/releases/tag/v1.15.3) was released earlier this week, it includes some nice-to-have features, bug fixes, and improvements for both node operators and storage providers.

**NV16 Updates:**
- We uncovered that some platforms have issues when trying to build the FVM. So this is a **call-out** :loudspeaker: to all node operators to try to build the preliminary v16 release candidate ([v1.16.0-pre-rc](https://github.com/filecoin-project/lotus/releases/tag/v1.16.0-pre-rc)) and report build issues if you experience them, so that we can avoid surprises later on!
- Testing on the Butterfly-network will continue throughout the next week, and we will go through our checklist/to-dos. If you operate a node on the butterfly network and want to help out, [add a comment with what you tested and the corresponding CID](https://github.com/filecoin-project/lotus/discussions/8346#discussioncomment-2877098) (if applicable).
- The Calibration-network is planned to be upgraded after the testing on Butterfly ends. [Subscribe to network updates here](https://status.filecoin.io) to get information about the update.

**Bugfixes for common issues**
- Lotus has been updated with a patch release of go-libp2p, which should fix a bug in yamux that resulted in too much memory being released in the resource-manager. This should fix the `BUG: too much memory released` log a lot of storage providers have experienced.

**New Features**
- Lotus(-miner) net stat has now a much more [readable output](https://github.com/filecoin-project/lotus/pull/8797).
- HTTP [healthz and livez endpoints](https://github.com/filecoin-project/lotus/pull/8692) for Lotus.
- A command to return the [built-in actor bundle manifest ID & system actor cids](https://github.com/filecoin-project/lotus/pull/8670). This is very useful for validating that you have the correct system actors CIDs before and after upgrades.

Lotus :blue_heart: contributions from community members, and we appreciate every PR submitted. Did you know that the PL Network Goods team built retroactive funding infrastructure based on experiments on Filecoin repositories earlier this year? [Read more about it here.](https://filecoin.io/blog/posts/a-public-goods-experiment-on-filecoin-retroactively-funding-impact-with-quadratic-voting/)

The Lotus-team is currently planning our projects, goals and priorities for the second half of the year. We will talk about and publish those later.

Are you planning to go to [FIL Austin](https://hub.fil.org/filaustin)? Say hi :wave: if you bump into some of the Lotus team members. 
`@Daniel Leon` will also give an update on the Lotus roadmap :world_map:

That’s it for the week! **Have a great weekend!** :sunny: