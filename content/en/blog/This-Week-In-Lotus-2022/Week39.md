---
title: "This Week in Lotus - Week 39"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-09-30T00:00:55+00:00
lastmod: 2022-09-30T00:00:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

The [second release candidate](https://github.com/filecoin-project/lotus/releases/tag/v1.17.2-rc2) for the upcoming `Lotus v1.17.2` was released this week. :mega: **Please note that Lotus v1.17.2** will require a Go-version of v1.18.1 or higher, so check which version you are on before upgrading!

:rocket: **Features / Enhancements:**
- *Redundant chain nodes:* We are getting [closer to merging the PR](https://github.com/filecoin-project/lotus/pull/9294) that will enable support for redundant Lotus chain nodes. Going forward we will start testing it properly to see if we need additional tools to properly support the feature.
- The requirement for [checking parameters on startup](https://github.com/filecoin-project/lotus/pull/9391/files) has been disabled on `lotus-miner` nodes that have disabled all tasks (`PoSt / C2 / PR2`) that require parameters. This makes startups much faster :zap: and reducing downtime when restarts are needed.
- A work-in-progress tool that allows you to explore data on the Filecoin network was opened as a draft. It is uncertain if this tool will live in the Lotus codebase, but it was opened up as others might find it useful.
- A PR to add retrieval deal ID and bytes transferred to the lotus client retrieve output has been merged.

:bug: **fixes:**
- A fix to prevent Homebrew updates when release-candidates are published [was merged this week](https://github.com/filecoin-project/lotus/pull/9350). It now only updates for stable releases.
- During testing of the v1.17.2-rc1/2 it was uncovered that the `lotus-miner sectors renew --only-cc` option does not apply when specifying sectors with a sector-file. A fix [has been merged into master](https://github.com/filecoin-project/lotus/pull/9402), and will be backported to v1.17.2.

**Protocol development:**
- The first release candidate for `builtin actors v9.0.0` for the network 17 (nickname: Shark) upgrade is out.
   - The first release candidate has been integrated into Lotus and testing will begin soon.
   - The [beneficiary info has been added to the lotus-miner info](https://github.com/filecoin-project/lotus/pull/9308) command.

We hope everyone that attended FIL-Singapore had a good time! !e are looking forward to see many of you @ FIL-Lisbon in approximately a month. Reminder that we will host a `Lotus, data onboarding, and friends` day on the 2nd of November, so save the date!

That´s it for the week! **Have a great weekend!** :sunny: