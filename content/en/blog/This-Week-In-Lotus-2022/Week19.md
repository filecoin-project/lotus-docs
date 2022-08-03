---
title: "This Week in Lotus - Week 19"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-05-13T08:49:55+00:00
lastmod: 2022-05-13T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

The Lotus Team are currently collocating in Toronto and have been super busy this week sharing cool new ideas and squashing bugs! In this update, we highlight some new features and focus on a few trending topics and questions that have caught our attention over the last 7 days.

**Bugfixes for common issues**
- [We have a fix](https://github.com/filecoin-project/lotus/pull/8635) for the "reorg channel is heavily backlogged" issue that a number of node operators have reported. Please upgrade to [v1.15.3-rc1](https://github.com/filecoin-project/lotus/releases/tag/v1.15.3-rc1) and let us know if you still see any issues.

:eyes: **Issues we have seen frequently this week:**
- We continue to see various retrieval issues highlighted by the awesome [EverGreen program](https://evergreen.filecoin.io). Thank you for all your detective work EverGreen participants!! :male-detective: Please keep those issue reports coming and we will ensure that they reach the right team as quickly as possible!!
- We have seen some reports of system hangs when moving data over NFS into long-term storage. The Lotus Team is actively working on this issue and we expect a fix to land very soon. You can monitor development progress [here](https://github.com/filecoin-project/lotus/pull/8589).

**New features:**
-  [v1.15.3-rc1](https://github.com/filecoin-project/lotus/releases/tag/v1.15.3-rc1) has landed! This is an optional release candidate that features multiple fixes.
- v1.15.3-rc1 disables the `kvlog` [by default](https://github.com/filecoin-project/lotus/pull/8477) for the first time!!:tada: We know `kvlog` issues have caused a few headaches for SPs in the past so we're happy to see this change!! :raised_hands:
- The much-anticipated ability to compact and remove expired sectors from partitions [is imminent](https://github.com/filecoin-project/lotus/pull/8637). :party-cat:

The FVM M1 development freeze sprint for nv16 is scheduled for early next week. Once activated, the team will go into bug-fixing mode, and pivot focus to M2 (user-programmability). FVM M1 will officially be on a ship towards mainnet via the testnet plan in FIP-0031 :ship:

The Lotus Team will be collocating in Toronto :flag-ca: for the remainder of May so may be a little less active in community channels than usual. The TSE Team are back at full strength and standing by to help in any way we can!! :muscle:

That’s it for the week! **Have a great weekend!** :sunny: