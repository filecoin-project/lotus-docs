---
title: "This Week in Lotus - Week 17"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-04-29T08:49:55+00:00
lastmod: 2022-04-29T08:49:55+00:00
draft: false
images: []
---

Happy Friday :wave: April is almost over, and so is week 17. We appreciate everyones contributions in the help channels, Github-issues, discussions and pull requests during this week. :blob-clap:

:eyes: **Issues we have seen frequently this week:**
- We have seen multiple questions about Nvidia-drivers. If you use CUDA, any newer version should work. You can [follow this guide for enabling CUDA with Lotus](https://lotus.filecoin.io/tutorials/lotus-miner/cuda/). For OpenCL, we have a [community maintained list here](https://github.com/filecoin-project/community/discussions/172).
- Do you feel like downloading the chain-snapshot, and/or pruning the chain takes too long? :hourglass_flowing_sand: [The tips shared here](https://github.com/filecoin-project/lotus/discussions/8562#discussioncomment-2654942), and [here](https://filecoinproject.slack.com/archives/CEGN061C5/p1650996802517779?thread_ts=1650996650.015409&cid=CEGN061C5) might help speed that up.

**New features:**
- Code making it possible to use [AP-workers to compute commP has been merged](https://github.com/filecoin-project/lotus/pull/8557#issue-1216398999). It will need initial testing and getting cut into a release candidate, but this is an important feature in Lotus for everyone excited about scaling markets throughput in [Boost](https://boost.filecoin.io). It´s expected that this feature will get throughput deep into the Gbps territory per Boost node.

**FVM / nv16:**
- The Lotus dev team has been heads down working on the Filecoin Virtual Machine (FVM) and network v16 upgrade this week. Checkout the `#fvm` channel to follow along with what is happening with regards to the FVM.

Have you ever wondered how the Lotus release flow works? You can find the [document describing it here](https://github.com/filecoin-project/lotus/blob/master/LOTUS_RELEASE_FLOW.md#lotus-release-flow). A small note for next week: the Lotus team will have a colocation-week, so the team might be a bit less responsive at times.

That’s it for the week! **Have a great weekend!** :sunny: