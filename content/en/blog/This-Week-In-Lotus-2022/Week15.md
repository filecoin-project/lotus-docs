---
title: "This Week in Lotus - Week 15"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-04-15T08:49:55+00:00
lastmod: 2022-04-15T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!** First of all, a big thanks to everybody that is helping out in the channels, sharing knowledge and helping each other out! You are the best :raised_hands:

**Issues we have seen frequently this week:**
- We´ve had a couple of questions about unnecessarily moving of data between workers. [Sector storage groups](https://lotus.filecoin.io/storage-providers/seal-workers/seal-workers/#sector-storage-groups) lets you create dedicated groups for multipurpose workers.
- The GasFee has fluctuated a bit more recently, which can cause messages to get stuck in the mpool. For an easy way to update your messages with an updated GasFee, [check this post.](https://filecoinproject.slack.com/archives/CEGN061C5/p1623335009007600?thread_ts=1623334260.499800&cid=CEGN061C5)

**Bugfixes for common issues:**
- :octagonal_sign: KVLog has been a constant source for problems for a while. In newer versions of Lotus it will be disabled by default as we haven´t seen any metadata corruption that couldn´t be repaired with normal leveldb repair tools. We will create some docs for this soon in the [knowledge base.](https://lotus.filecoin.io/kb/)

**Upcoming features:**
- [v1.15.2-rc1](https://github.com/filecoin-project/lotus/releases/tag/v1.15.2-rc1) has been released and is currently undergoing testing by the [SPX group](https://github.com/filecoin-project/lotus/discussions/8484). :file_folder: Setting the file descriptor limit high enough has become a requirement for all workers - so make sure that you have [raised the ulimit](https://lotus.filecoin.io/kb/soft-fd-limit/) on the workers before upgrading.
- With the new command `lotus client list-asks --protocols` you can find Storage Providers using Boost, just grep for `'mk/1.2.0'` to see them.
- `ClientCalcCommP` is now multithreaded :zap: - so calculating commP for your files should be way faster.
- Improved Scheduler :fire: The worker assigning logic has been drastically improved and early feedback indicates that it helps distribute work better on larger setups.

**Wishing everyone a nice weekend!**