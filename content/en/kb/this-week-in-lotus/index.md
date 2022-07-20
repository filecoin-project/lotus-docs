---
title: "This Week In Lotus"
description: "Database of all the This Week In Lotus newsletters"
lead: "Database of all the historical This Week in Lotus newsletters"
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["This Week In Lotus"]
---

<h3 align="center"> This Week in Lotus - Week 28 </h3>

:wave: **Hey everyone and welcome to This Week in Lotus!**

As the network 16 upgrade is now in the rearview mirror, it is back to more normal operations for the Lotus team. Since it is also summertime for many, some of the Lotus team members might be on vacation and therefore not respond as fast as usually.

**Issues we have seen frequently this week:**

- We have gotten a couple of reports of memory and OOM-issues. Our community member @marco-StorSwift identified a slow memory leak and also created a fix for it, so a huge thank you for that :blue_heart: :clap:. It will be added to Lotus [with this PR](https://github.com/filecoin-project/lotus/pull/9042).

**New Features:**

- The ability to separate between unsealed and sealed sectors on storage paths has been [implemented with this PR](https://github.com/filecoin-project/lotus/pull/9013). For example you can now add `"DenyTypes": ["unsealed"]` to storage paths where you do not want the unsealed copies to be replaced.

- On top of the above feature, the ability to redeclare and refresh storage path metadata without restarting the lotus-miner process is is [coming with this PR](https://github.com/filecoin-project/lotus/pull/9032). This will also include the ability to detach a storage path with a lotus-miner command.

*Reminder* :heavy_exclamation_mark: that it is recommended to compact your partitions with the `lotus-miner sectors compact-partitions` command to save on SubmitWindowPoSt messages. The network enforces a security measure that disallows compacting a partition in a deadline until 1800 epochs (15 hours) have passed. This is to enforce that compacting a deadline cannot be used to prevent invalid posts from being disputed.

The Lotus `v1.17.0-rc3` version is out, and we will start broader testing on this branch to check that everything is okay before we release a stable version. The feature release includes a lot of market-related fixes, and a bunch of nice features like limiting tasks run in parallel, option to make compute tasks opt-in, single task benchmarking+++

That’s it for the week! **Have a great weekend!**

---

<h3 align="center"> This Week in Lotus - Week 27 </h3>

:wave: **Hey everyone and welcome to This Week in Lotus!**

What a week this has been!! The Filecoin network upgraded successfully to the network 16 at `epoch 1960320, on July 6th at 2022-07-06T14:00:00Z`, and we experienced some large spikes in the basefee after the upgrade, but it seems to have stabilized a bit more now.

**We will continue to monitor the network post-upgrade, and stay reactive to any circumstances that may occur.** Over the next week(s) we will also transition to focus on more non network 16 things, and start working on bugfixes, enhancements and new features.

:new: **patch release:**

- We issued an [Optional Patch release v1.16.1](https://github.com/filecoin-project/lotus/releases/tag/v1.16.1) for storage providers who failed to publish messages due to messages approaching or exceeding the block gas limit.
  - The patch included two PRs that allow storage providers to set how many partitions to include in DeclareFaultsRecovered and SubmitWindowPoSt messages.

**Gas Fees:**
- We recommend all users to review and increase their default **Max Fee** configs as suggested in this post. Especially the `MaxWindowPoStGasFee` as the penalty for not proving your storage will result in a higher gas cost fee for sending the `DeclareFaultsRecovered` message.


- It is highly recommended to remove expired, terminated and re-ordering sectors in your proving deadline as a weekly chore with the `lotus-miner sectors compact-partitions` command to save gas. [You can read the reason for it here](https://filecoinproject.slack.com/archives/C027TQMUVJN/p1657220917835759?thread_ts=1657094066.189799&cid=C027TQMUVJN).


If you are wondering :thinking_face: why we saw such spikes in the base fee after the upgrade, you can check out this [public service announcement](https://filecoinproject.slack.com/archives/C027TQMUVJN/p1657220946427869?thread_ts=1657094066.189799&cid=C027TQMUVJN).

That’s it for the week! **Have a great weekend!** :sunny: