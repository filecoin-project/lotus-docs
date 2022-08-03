---
title: "This Week in Lotus - Week 27"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-07-08T08:49:55+00:00
lastmod: 2022-07-08T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

What a week this has been!! The Filecoin network upgraded successfully to network 16 at `epoch 1960320, on July 6th at 2022-07-06T14:00:00Z`, and we experienced some large spikes in the basefee after the upgrade, but it seems to have stabilized a bit more now.

**We will continue to monitor the network post-upgrade, and stay reactive to any circumstances that may occur.** Over the next week(s) we will also transition to focus on more non network 16 things, and start working on bug fixes, enhancements and new features.

:new: **patch release:**

- We issued an [Optional Patch release v1.16.1](https://github.com/filecoin-project/lotus/releases/tag/v1.16.1) for storage providers who failed to publish messages due to messages approaching or exceeding the block gas limit.

- The patch included two PRs that allow storage providers to set how many partitions to include in DeclareFaultsRecovered and SubmitWindowPoSt messages.  

**Gas Fees:**

- We recommend all users to review and increase their default **Max Fee** configs as suggested in this post. Especially the `MaxWindowPoStGasFee` as the penalty for not proving your storage will result in a higher gas cost fee for sending the `DeclareFaultsRecovered` message.

- It is highly recommended to remove expired, terminated and re-ordering sectors in your proving deadline as a weekly chore with the `lotus-miner sectors compact-partitions` command to save gas. [You can read the reason for it here](https://filecoinproject.slack.com/archives/C027TQMUVJN/p1657220917835759?thread_ts=1657094066.189799&cid=C027TQMUVJN).  

If you are wondering :thinking_face: why we saw such spikes in the base fee after the upgrade, you can check out this [public service announcement](https://filecoinproject.slack.com/archives/C027TQMUVJN/p1657220946427869?thread_ts=1657094066.189799&cid=C027TQMUVJN).

That’s it for the week! **Have a great weekend!** :sunny:
