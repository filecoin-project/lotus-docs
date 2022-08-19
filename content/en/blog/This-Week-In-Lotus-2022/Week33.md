---
title: "This Week in Lotus - Week 33"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-08-19T00:00:55+00:00
lastmod: 2022-08-19T00:00:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

The [third release candidate for Lotus v1.17.1](https://github.com/filecoin-project/lotus/releases/tag/v1.17.1-rc3) was published this week and are currently going through extensive testing. The [SPX group is especially testing the new SplitStoreV2](https://github.com/filecoin-project/lotus/discussions/9179), which can be run in `universal`, `discard` and now `AutoPrune` modes. They will be collecting storage metrics over a period of 4 weeks to show differences between each setting.

The full documentation :book: for **SplitStoreV2** is currently in review, and will be published soon.

:rocket: **Upcoming features/enhancements:**
- The option to only extend CC-sectors with the lotus-miner sectors renew command has been reviewed and merged this week.
- Work towards supporting multiple chain nodes per storage provider progressed nicely this week. Adding a UUID to messages sent by the storage provider to the lotus daemon has been merged, and a PR for retrying pushing messages to the message pool in case of unavailability of a lotus chain node is currently in review.
- Enabling Sealing-as-a-Service is a priority this quarter, and we made some progress towards that goal this week. A draft for managing sector number assignment between a potential service and the lotus-miner was published.

:bug: **Bugfixes:**

A UX-fix to exclude negative available balance from spendable amount if a storage provider was in debt was merged yesterday.

**FIPs:**

That’s it for the week! **Have a great weekend!** :sunny: