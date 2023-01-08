---
title: "This Week in Lotus - Week 1 - 2023"
description: "Stay up to date with what has happened in Lotus this week"
date: 2023-01-04T08:49:55+00:00
lastmod: 2023-01-04T08:49:55+00:00
draft: false
images: []
---

We hope everyone had a nice winter holiday and are recharged and ready to build a stronger and better ecosystem for Filecoin. As many on the team are catching up and aligning on tasks after the break, this weeks update is a bit lighter. As shared earlier in this channel, we are super excited that [Travis is officially joining (coming back to) the Lotus/Actor team](https://filecoinproject.slack.com/archives/C027TQMUVJN/p1672695634266989).:tada:

**Network version 18 - Hygge:**
- FIP0050 - which proposes an API between user-programmed an built-in actors, has now passed out of last call status and is now accepted. [Check out FIP0050 here](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0050.md).
- [A new PR ensures that the](https://github.com/filecoin-project/lotus/pull/9960) SplitStore compaction keeps H(TipSetKey) CIDs that is needed for the FEVM-upgrade, this is now being pinned in the hotstore.

A new option for setting the maximum amount of sectors to be extended with the `lotus-miner sectors renew` command [has been reviewed and merged](https://github.com/filecoin-project/lotus/pull/9941). It´s useful when you want to extend a lot sectors in one go, and do not want the message to exceed the block limit.

That’s it for the week! **Have a great weekend!** :sunny: