---
title: "This Week in Lotus - Week 45"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-11-11T00:00:55+00:00
lastmod: 2022-11-11T00:00:55+00:00
draft: false
images: []
---

**Network v17** :shark::
- The calibration network upgraded successfully this week and we have run a lot of tests to confirm that nothing is suspicious or wrong after the upgrade. We will continue to monitor and test the network 17 on the calibration network.
- With the calibration network successfully upgraded, we can move our :eyes: to the mainnet upgrade. [The upgrade date has been set to November 30th](https://github.com/filecoin-project/community/discussions/74#discussioncomment-3825422). The exact upgrade epoch will be announced soon.

**Enhancements and bugfixes:**
- Are you doing SnapDeals and have seen error-messages and `p_aux` issues when the proving deadline for the given Snap-sector that is upgraded is open? Expect to see them a lot less! These Snap-sectors will now wait in a `WaitMutable` state until the deadline is over before it progresses to the `SectorReplicaUpdateSubmitted` and so forth. [The PR has been tested to be successful and is awaiting approval](https://github.com/filecoin-project/lotus/pull/9598).
- The new :woman-cartwheeling: SplitStore-mode `messages` has now been merged and has been running successfully on our system and is pruning correctly. You can expect to see this new SplitStore mode in the upcoming `v1.19.0`. In Lotus v1.19.0 we consider the SplitStore feature production ready!!
- The [windowPoSt cycle logic](https://github.com/filecoin-project/lotus/pull/9613) has gotten some additional logging to it.
   - `GenerateSingleVanillaProof` now also respects context, which means that it will skip slow to read sectors :snail: and return a context error. Instead of being blocked forever if storage reads where blocked (e.g disconnected NFS).
- On top of the above, this [PR adds parallel windowPoSt batching processing](https://github.com/filecoin-project/lotus/pull/9615). This enhancement should make WindowPoSt drastically faster :zap::bullettrain_side: for SPs with multiple partitions per deadline makes good use of multiple WindowPoSt workers.

That’s it for the week! **Have a great weekend!** :sunny: