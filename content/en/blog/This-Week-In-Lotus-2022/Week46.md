---
title: "This Week in Lotus - Week 46"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-11-18T00:00:55+00:00
lastmod: 2022-11-18T00:00:55+00:00
draft: false
images: []
---

**Lotus v1.18.0** :shark:
- The final release of the mandatory [Lotus v1.18.0 version is now out](https://github.com/filecoin-project/lotus/releases/tag/v1.18.0). It delivers numerous Filecoin Improvement Proposals like: `Beneficiary Addresses for SPs`, `Decoupling FIL+ from marketplace`, `Forward compatibility for PreCommit` and more. Check the release notes for all the FIP-details.
- **Migration! Please read this twice:** We are expecting a heavier then normal state migration for this upgrade due to the amount of state changes introduced with all the FIPs. All node operator, storage providers included, should be aware that two pre-migrations are being scheduled. We recommend node operators (who haven’t enabled splitstore `universal` mode) that do not care about historical chain states, to prune the chain blockstore by syncing from a snapshot 1-2 days before the upgrade!
- **Lotus-Market End-of-Life notice:** As mentioned in the release notes for [Lotus v1.17.0](https://github.com/filecoin-project/lotus/releases/tag/v1.17.0), markets related features, enhancements and fixes are now a lower priority for Lotus. We recommend our users to migrate to other deal making focused software, like [Boost](https://boost.filecoin.io/) as soon as possible. In Q2 2023, we will be deprecating/removing lotus-market related code from the Lotus repository. If you have any questions or concerns, please raise them in a [Lotus discussion](https://github.com/filecoin-project/lotus/discussions/categories/market)!
- For Boost-users, please note that `Boost v1.5.0` is a [mandatory release](https://github.com/filecoin-project/boost/releases/tag/v1.5.0) to keep Boost compatible with Lotus v1.18.0.

**Enhancements and bugfixes** :bug::
- The issue where the `lotus-miner proving check` command without the `--slow` flag always outputted Error: rg is nil has now been fixed and merged.
- The [Raft Consensus / Redundant chain nodes](https://github.com/filecoin-project/lotus/pull/9294) features has now been merged into the codebase after extensive code reviews. The feature will be included in the upcoming `v1.19.0` release.
- Adding the [beneficiary address info](https://github.com/filecoin-project/lotus/pull/9632) to the `lotus-miner actor control list` command has been merged.
- We have added two new configuration knobs which makes [previously hard-coded windowPoSt pre-check timeouts configurable](https://github.com/filecoin-project/lotus/pull/9680). Now you can set the maximum amount of time a proving pre-check can take for a sector, and for an entire partition.

:zap: **fast SnapShots:**
- The Snapshot service migrated to Cloudflare R2 backend this week. This will provide globally distributed Filecoin network snapshots. In addition to the migration, the snapshots now provide zstandard compressed snapshots which cuts down the size by almost 50%, from 100GB to 55GB. So its time to update your tooling if you depend on snapshots. [Check the full announcement here](https://filecoinproject.slack.com/archives/CPFTWMY7N/p1668465634862469).

**SnapDeals:**
- One of the focus areas for the rest of Q4 is squashing outstanding SnapDeals-issues - and the team is doing an amazing job on clearing out the backlog and testing the fixes!! We will release special edition SnapDeals-updates starting from next week, summing up all the bug fixes and improvements that has happened, current SnapDeals-issues we are still working on and how to configure your setup for successful Snaps.

:mega: **To storage providers**, the Lotus team has been looking into ways to support and improve the Lotus-Miner for enterprise SP deployments (both current and aspiring). We gathered all the high-level area we have identified and potential solutions we have been looking into. Please check out this Github discussion: [Architechtural/System-level problems for enterprise-level Storage Providers](https://github.com/filecoin-project/lotus/discussions/9686) and add your feedback.

**That’s it for the week! Have a great weekend!** :sunny: