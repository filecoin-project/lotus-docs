---
title: "This Week in Lotus - Week 16"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-04-22T08:49:55+00:00
lastmod: 2022-04-22T08:49:55+00:00
draft: false
images: []
---

:wave: **Really, is it Friday / Saturday already?** This week passed quickly, but that did not stop things from moving forward in Lotus.

**Issues we have seen frequently this week:**
- We have seen some `datastore: key not found` reports when trying to import offline deals. This happens when the deal proposal never reaches the `lotus-miner`, and is usually caused by some [connectivity issue on the storage provider side](https://lotus.filecoin.io/storage-providers/operate/connectivity/#testing-connectivity-to-your-an-ip-addressport) or an issue on the client side when sending out the deal proposal.
- We are aware of the `wdPoSt scheduler notifs channel` issue - where the channel can close under heavy load, and we are looking into it. **But it is really hard to reproduce easily** - so if anyone in the community has more information on how we can reproduce it easily, please add a comment/steps in this [issue-thread](https://github.com/filecoin-project/lotus/issues/8362#issuecomment-1104833658). :pray:

**Bugfixes for common issues:**
- SnapDeals is getting more and more stable with only some minor issues left. We are also seeing that the number of sectors snapped is going :chart_with_upwards_trend:. The v1.15.2 (currently in rc) is the most stable version in terms of the SnapDeals feature.

**Upcoming features:**
- The second release candidate for v1.15.2 is expected to be released soon. And it introduces a couple of backports, most noteworthy the ability to run the index provider on testnets. The current testing of v1.15.2-rc1 has not uncovered any big issues, which is a good sign of how stable this release candidate has been. **NB:** Setting the file descriptor limit high enough has become a requirement for all workers on v1.15.2 - so make sure that you have [raised the ulimit](https://lotus.filecoin.io/kb/soft-fd-limit/) on the workers before upgrading.
- The Lotus devs has been working really hard on FIP31 this week. :cattyping: It represents an important preparatory step in the trajectory towards full on-chain user-programmability on Filecoin. You can read more about [FIP31 (Filecoin Improvement Proposal 31)](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0031.md) here.

That’s it for the week! **Have a great weekend!** :sunny: