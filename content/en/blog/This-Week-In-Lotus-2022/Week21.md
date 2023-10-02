---
title: "This Week in Lotus - Week 21"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-05-27T08:49:55+00:00
lastmod: 2022-05-27T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

This week´s update is filled with a massive amount of new upcoming features!! We have seen some great PRs from community members this week, so a big thanks for all the contributions :blue_heart:

**NV16 Updates:**
- FIP0030, FIP0031, and FIP0032 have passed out of Last Call status and are now accepted! :tada::rocket::fire: These FIPs, which jointly support the introduction of the non-programmable [Filecoin Virtual Machine](https://fvm.filecoin.io), are now ready for implementation.
- The nv16 upgrade has undergone testing on the Caterpillar network this week, and numerous bugs have been surfaced and fixed. We will continue the testing on the Butterfly network next week.
- The network upgrade is expected late June/early July; for more information, see [HERE](https://github.com/filecoin-project/tpm/discussions/90#discussioncomment-2426261).

**Bugfixes for common issues**
- The `lotus-miner proving compute window-post <Deadline>` command lets you manually trigger a window-post computation, even on [deadlines/partitions](https://github.com/filecoin-project/lotus/pull/8737) that are faulty.
- Aliases to the `Discover` method have been [re-added](https://github.com/filecoin-project/lotus/pull/8738) which should fix the rpc.discover not found issue.
- PoSt-workers now [check the proof parameter on startup.](https://github.com/filecoin-project/lotus/pull/8736)

**New Features**
- A new [simpler worker assigning logic](https://github.com/filecoin-project/lotus/pull/8700) has been enabled in the configuration file. The new `spread` configuration allows you to ignore worker utilization, and rather spread the tasks to as many eligible workers for that task as possible.
- On top of the above PR, there is now an option to `DisallowRemoteFinalize` in the [configuration file](https://github.com/filecoin-project/lotus/pull/8710). When set to true it will force all `Finalize` tasks to run on workers with local access to both long-term storage and the sealing path containing the sector.
- **And as if that was not enough**, Magik :magic_wand: has created another big scheduler improvement: Now you can set a [per worker maximum concurrent task count limit](https://github.com/filecoin-project/lotus/pull/8725) without tweaking the cpu/memory resource numbers. Just set it with this resource environment variable: `[short task type]_[sector size]_MAX_CONCURRENT=[limit]`.
- The `lotus-gateway` now also [supports OpenRPC](https://github.com/filecoin-project/lotus/pull/8738).
- Ever wanted to benchmark just a single sealing task without running the whole sealing pipeline?:male-scientist::female-scientist: `lotus-bench simple` is now a thing, and it lets you benchmark the performance of a single task. It supports all tasks you want to benchmark: `AP, PC1, PC2, C1, C2, windowPoSt, winningPoSt, RU, PRU1, PRU2`. [It is currently in review](https://github.com/filecoin-project/lotus/pull/8373), so you can expect it to be merged into the code soon.

Do you want to clean up your environment variables a bit and have `FIL_PROOFS_MAXIMIZE_CACHING` in your variables list? This variable can be discarded as it isn´t a thing anymore, and has not been for a while. :broom:

For storage providers in the community: We have created a dedicated discussion for Lotus Task Benchmarks. We would love to see more storage providers share their numbers, [so add your benchmarks following the template if you want to contribute](https://github.com/filecoin-project/lotus/discussions/8605) :smile:

That’s it for the week! **Have a great weekend!** :sunny: