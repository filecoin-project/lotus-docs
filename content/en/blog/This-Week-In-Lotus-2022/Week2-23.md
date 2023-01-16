---
title: "This Week in Lotus - Week 2 - 2023"
description: "Stay up to date with what has happened in Lotus this week"
date: 2023-01-13T08:49:55+00:00
lastmod: 2023-01-13T08:49:55+00:00
draft: false
images: []
---

**Network version 18 - Hygge:**

The [final landable version of the FVM Milestone 2.1](https://github.com/filecoin-project/lotus/pull/9998) (Filecoin EVM compatibility) implementation has now been merged into the release/v1.20.0 branch, which means that we are on step closer to FEVM compatibility in the Filecoin mainnet :tada:.

It also includes the Lotus-side implementation of the following FIPs:
- [FIP-0048](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0048.md) (f4 address class)
- [FIP-0049](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0049.md) (Actor Events)
- [FIP-0054](https://github.com/filecoin-project/FIPs/pull/569) (Filecoin EVM Runtime)
- [FIP-0055](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0055.md) (Supporting Ethereum Accounts, Addresses, and Transactions)

**ChainNotify-panics:**

We are aware that some users have gotten panics and a subsequent node-crash when the `ChainNotify` method has been invoked. We are investigating the issue and will report back once we have more information.

**A sneak peak of the future** :eyes::

A PR that extends the consensus interface in order to prepare it for the implementation of other consensus algorithms got merged this week.
Its important for the InterPlanetary Consensus (IPC) work that is on the Fileceoin roadmap. Unsure what IPC is and want to learn more about it, check out this video.

That’s it for the week! **Have a great weekend!** :sunny: