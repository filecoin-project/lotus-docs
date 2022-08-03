---
title: "This Week in Lotus - Week 29"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-07-22T08:49:55+00:00
lastmod: 2022-07-22T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

:person_doing_cartwheel: **SplitStoreV2:**
- SplitStoreV1 was built a long time ago but never made it out of the alpha stage. We are currently working towards making this feature production-ready (**SplitStoreV2**) in Q3. We hope to make it more user-friendly to enable node operators and storage providers a better chain management solution to ensure high uptime. We will share more updates about this feature over the coming weeks and months.
- *For those that are not so familiar with what the SplitStore feature is* :book:: SplitStore allows you to separate out a hot blockstore and reliably archive out-of-scope objects in a coldstore, allowing you to lower the hardware/resources required for keeping the Lotus chain. With V2 we also plan to make the garbage collection automatic and reliable. No more manually deleting the datastores and downloading snapshots as a garbage collection:exclamation:

:new: **features/enhancements:**
- The compact partitions command [has gotten some enhancements](https://github.com/filecoin-project/lotus/pull/9070). Now it will simulate the message if `really-do-it` is not passed, and will report the gas-cost beforehand. It will also auto split into smaller messages as needed, if a single message wouldn’t fit in a block.

Lotus `v1.17.0-rc4` will be released soon which adds the fix for the [slow memory leak issue](https://filecoinproject.slack.com/archives/C027TQMUVJN/p1657901627082689) that was discovered last week. Testing of the Lotus v1.17.0 release candidates are still ongoing and is currently showing quite stable results. It is expected that the stable feature release will be published next week.

As noted last week: it is summertime for many, so some of the Lotus team members might be on vacation and therefore not respond as fast as usually :beach_with_umbrella::swimmer:

That’s it for the week! **Have a great weekend!** :sunny:
