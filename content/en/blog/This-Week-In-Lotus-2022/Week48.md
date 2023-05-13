---
title: "This Week in Lotus - Week 48"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-12-02T00:00:55+00:00
lastmod: 2022-12-02T00:00:55+00:00
draft: false
images: []
---

The Filecoin-network upgraded successfully to **network version 17** at epoch `2383680` this week. After two pre-migrations, the actual migration and some expected null-rounds, we saw a healthy chain emerge.

We will continue to monitor the network, and stay reactive to any circumstances that may occur.

**SnapDeals :bug:-sprint:**
One the focus areas for the Lotus-team in Q4 has been squashing outstanding SnapDeals-issues, and the team has done an amazing job clearing out the backlog, and testing the fixes. For this effort we have created a sprint report, detailing all the fixes that got fixed:

[Read the full sprint report, with SnapDeal-configuration recommendations and benchmarks here.](https://pl-strflt.notion.site/pl-strflt/Snap-BugFix-Sprint-2db34178fb6946059b68ebd55819303b)

**Enhancements :rocket::**
- The new snapshot service introduced `.zst` compressed snapshots which cut the size by almost ~50% compared to the non-compressed snapshot. A PR that got merged this week [added support for .zst imports in Lotus](https://github.com/filecoin-project/lotus/pull/9741). Now you do not have to uncompress the snapshot before importing it to Lotus.
    - The PR also increased the loading parallelism! Internal testing proved that this makes data import ~2x faster, going at ~200MiB/s. This made snapshot import take ~4 min :racing_car:
- A PR that added tags to storage-path related metrics [got merged this week](https://github.com/filecoin-project/lotus/pull/9748). It will enable the creation of storage-related dashboards :bar_chart: much easier.

**Scheduler metrics:**
- The scheduler has gotten some new metrics that allows us to get [better insights into scheduling cycle durations](https://github.com/filecoin-project/lotus/pull/9738). It will allow us to do some initial A/B-testing :test_tube: about the scheduler that could be really valuable later on. We will create a testing-assignment soon, and hope that larger SPs will participate and gather some metrics for us.

That’s it for the week! **Have a great weekend!** :sunny: