---
title: "This Week in Lotus - Week 7 - 2023"
description: "Stay up to date with what has happened in Lotus this week"
date: 2023-02-17T08:49:55+00:00
lastmod: 2023-02-17T08:49:55+00:00
draft: false
images: []
---

The Hyperspace network upgraded successfully this week :rocket: :partying_face: That means we can now look forward to the next step in the network upgrade cycle, the Calibration network upgrade, set to epoch `322354` on `2023-02-21T16:30:00Z`.

For more information about the network 18 calibration upgrade, [check out this post](https://github.com/filecoin-project/lotus/discussions/10219#discussioncomment-4977906) 

:up: **Mainet upgrade epoch:**

The mainnet has now a final upgrade epoch set. The mainnet will be upgraded to network version 18, codenamed Hygge, at epoch `2683348` around `2023-03-14 03:14 PM UTC`. And yes, the time for the upgrade is conveniently set to the same number as [Filecoins Mainnet Ethereum ID](https://chainlist.org/chain/314) :pie:

**Network migration:**

The network version 18 migration is expected to be very light compared to the rather heavy nv17 migration, so we do not expect any heavy CPU or memory usage during the coming upgrade.

Even so, we have been looking to improve the migration experience for node user, and of these enhancements that are included in the `v1.20.0-rc1` are the ability to limits the number of actors being migrated simultaneously, thus reducing the overall memory footprint required by migrations via the environment variable `LOTUS_MIGRATION_MAX_WORKER_COUNT`.

For a full rundown of the additional ideas we are exploring, [check out this comment](https://github.com/filecoin-project/lotus/issues/10048#issuecomment-1430372953). We will also add a dedicated migration guide to our Lotus documentation.

That’s it for the week! **Have a great weekend!** :sunny: