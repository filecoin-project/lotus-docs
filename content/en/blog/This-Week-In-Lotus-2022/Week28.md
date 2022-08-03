---
title: "This Week in Lotus - Week 28"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-07-15T08:49:55+00:00
lastmod: 2022-07-15T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

As the network 16 upgrade is now in the rearview mirror, it is back to more normal operations for the Lotus team. Since it is also summertime for many, some of the Lotus team members might be on vacation and therefore not respond as fast as usually.

**Issues we have seen frequently this week:**

- We have gotten a couple of reports of memory and OOM-issues. Our community member @marco-StorSwift identified a slow memory leak and also created a fix for it, so a huge thank you for that :blue_heart: :clap:. It will be added to Lotus [with this PR](https://github.com/filecoin-project/lotus/pull/9042).  

**New Features:**

- The ability to separate between unsealed and sealed sectors on storage paths has been [implemented with this PR](https://github.com/filecoin-project/lotus/pull/9013). For example you can now add `"DenyTypes": ["unsealed"]` to storage paths where you do not want the unsealed copies to be replaced.  

- On top of the above feature, the ability to redeclare and refresh storage path metadata without restarting the lotus-miner process is [coming with this PR](https://github.com/filecoin-project/lotus/pull/9032). This will also include the ability to detach a storage path with a lotus-miner command.

*Reminder* :heavy_exclamation_mark: that it is recommended to compact your partitions with the `lotus-miner sectors compact-partitions` command to save on SubmitWindowPoSt messages. The network enforces a security measure that disallows compacting a partition in a deadline until 1800 epochs (15 hours) have passed. This is to enforce that compacting a deadline cannot be used to prevent invalid posts from being disputed.

The Lotus `v1.17.0-rc3` version is out, and we will start broader testing on this branch to check that everything is okay before we release a stable version. The feature release includes a lot of market-related fixes, and a bunch of nice features like limiting tasks run in parallel, option to make compute tasks opt-in, single task benchmarking+++

That’s it for the week! **Have a great weekend!**
