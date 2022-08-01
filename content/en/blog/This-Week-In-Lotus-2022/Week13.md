---
title: "This Week in Lotus - Week 13"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-04-01T08:49:55+00:00
lastmod: 2022-04-01T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone** and welcome to anyone who is new in this channel!
It has been yet another busy week in Lotus-land and in this update we will highlight some of the issues we have seen lately, recent bugfixes for common issues and upcoming features that are in testing.

:eyes: **Issues we have seen frequently this week**
- We have seen multiple instances of looping logs which makes the kvlog grow huge and cause data corruption issues. The dev-team has merged a couple of fixes that should address this (see bugfix-section). There still might be edge cases so we will be on the lookout for those going forward.
- Chain options / which chain to use - it´s not clear enough on our docs that SP´s do not need the full chain. We´ll be doing a docs-audit the next couple of weeks so hopefully we can make this clearer.

**Bugfixes for common issues**
- Making Lotus build with Go 1.18 has been fixed [and is now merged.](https://github.com/filecoin-project/lotus/pull/8410)
- A lot of the SnapDeals bugs that has been reported is fixed in the upcoming stable v1.15.1. [List of recent SnapDeals issues that has been fixed.](https://github.com/filecoin-project/lotus/issues?q=is%3Aissue+label%3ASnapDeals+is%3Aclosed)
- Bugfixes for the kvlog / looping issues will be put into the v1.15.1-rc5 release which should come later today.
- The full list of recent bug fixes can always be seen in the [release notes.](https://github.com/filecoin-project/lotus/releases)

**New features**
- You can now sync your Lotus-node with the FVM!! Checkout the [v1.15.1-rc4](https://github.com/filecoin-project/lotus/releases/tag/v1.15.1-rc4) and set the `LOTUS_USE_FVM_EXPERIMENTAL=1` environment variable before you run Lotus. **NOTE: The current build can only sync main-net! Calibnet is not supported.**
- The long awaited PoSt-workers are now in initial testing with the SPX-group. Check the [PoSt worker testing discussion](https://github.com/filecoin-project/lotus/discussions/8375) to follow along the testing phase. Hopefully we can comfortably recommend Storage Providers to start testing this next week.

**That’s it for the week! Have a great weekend!** :sunny: