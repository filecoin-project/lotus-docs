---
title: "This Week in Lotus - Week 6 - 2023"
description: "Stay up to date with what has happened in Lotus this week"
date: 2023-02-10T08:49:55+00:00
lastmod: 2023-02-10T08:49:55+00:00
draft: false
images: []
---

**:hourglass_flowing_sand: NV18 timeline:**

The updated releases and network upgrade timelines are as follow:

- **2023-02-14** - The first release candidate of v1.20.0 will be released. Please note that this release candidate only sets upgrade epoch for the Calibration-testnet, and does not set the upgrade epochs for mainnet.
- **2023-02-21** - Calibration-testnet network upgrade
- **2023-02-28** - The final Lotus v1.20.0 will be released with everything set for mainnet.
- **2023-03-14** - The mainnet network upgrade

Get ready for a day full of :pie: (π day) **and FEVM launch!**

It also is a great coincidence that the [Filecoin mainnet Ethereum chain is also 314!](https://chainlist.org/chain/314)

**:toolbox: Enhancements/fixes:**

- A new `lotus chain export-range` command is [currently in review](https://github.com/filecoin-project/lotus/pull/10145), it will let you create archival-grade ranged exports of the chain quickly.
- Is your `lotus-miner sectors list` taking a really long time to load? We have opened a PR that will make the sector checks running in parallel - which should speed up the process from 2x-10x. [It is currently in review.](https://github.com/filecoin-project/lotus/pull/10202)
- Calling `lotus backup` or `lotus-miner backup` on file which already exists will now error out explaining that another file name should be used to not cause corruption. [The PR has been reviewed and merged](https://github.com/filecoin-project/lotus/pull/10209)
- We have added the option to specify `lotus-miner sectors set-seal-delay` in seconds. [The PR has been merged.](https://github.com/filecoin-project/lotus/pull/10208)

**Boost monitoring stack:**

As a storage provider, it can be challenging to monitor the various Boost processes in additional to the other operational and management work. With this in mind, the Boost team have built a monitoring stack which storage providers can use out of the box:

The monitoring stack includes the following:
- **Grafana** provides visualization tools and dashboards for all metrics and traces
- **Prometheus** collects metrics and powers dashboards in Grafana.
- **Tempo** collects traces and powers traces search in Grafana with Jaeger.

As a storage provider, you’ll be able to easily monitor memory usage, and additional insight for specific processes (such as success and failure for different retrieval requests).

[Check out the documentation here.](https://boost.filecoin.io/tutorials/setting-up-a-monitoring-stack-for-boost)

**Legacy Lotus Markets EOL:**

Also a kind reminder that the Legacy Lotus Markets sub-system reached its end-of-life at the end of the 31st January 2023. We recommend our users to migrate to other deal making focused software, like [boost](https://boost.filecoin.io/) :blue_heart: as soon as possible.

That’s it for the week! **Have a great weekend!** :sunny: