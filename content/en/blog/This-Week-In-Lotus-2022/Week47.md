---
title: "This Week in Lotus - Week 47"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-11-25T00:00:55+00:00
lastmod: 2022-11-25T00:00:55+00:00
draft: false
images: []
---

The [second release candidate for v1.19.0](https://github.com/filecoin-project/lotus/releases/tag/v1.19.0-rc2) was released this week. This release includes the production ready SplitStoreV2 feature, with the new `message` mode that replaces the previous AutoPrune logic. In addition it includes numerous bug-fixes and enhancements.

**SnapDeals:**
The team has been actively testing and reviewing the SnapDeal fixes and enhancements created the last couple of weeks. [Check the full SnapDeals update here.](https://filecoinproject.slack.com/archives/CP50PPW2X/p1669209446105499)

**Enhancements and bugfixes** :bug::
- A typo caused the wrong task count to be displayed in the `lotus-miner sealing workers` command. [It has now been fixed](https://github.com/filecoin-project/lotus/pull/9708) and accurately shows the task count.
- [A PR has been merged](https://github.com/filecoin-project/lotus/pull/9704) to fix a panic that would occur if you aborted a withdrawal before the confirmation time of 5 epochs had passed. It now will output the message CID instead.
- A regression in the `lotus-miner sectors renew` command caused a panic if you tried to extend a sector that had expired. This has now [been fixed by failing earlier when the sector is not found.](https://github.com/filecoin-project/lotus/pull/9703)

Reminder that the **Filecoin network 17 upgrade** is next week, and is scheduled to upgrade to network 17 on epoch `2383680, Nov 30th on 2022-11-30T14:00:00Z`. We recommend node operators that do not care about historical chain states, to prune the chain blockstore by syncing from a snapshot 1-2 days before the upgrade.

That’s it for the week! **Have a great weekend!** :sunny: