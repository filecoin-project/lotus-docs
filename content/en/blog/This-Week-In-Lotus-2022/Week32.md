---
title: "This Week in Lotus - Week 32"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-08-12T00:00:55+00:00
lastmod: 2022-08-12T00:00:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

The first release candidate for v1.17.1 was released this week. It has been undergoing internal testing, and over the next week we will begin testing with the SPX group. In addition to many new Lotus features, this release also includes the new `rust-fil-proofs` version, which allows you to put multiple multicore SDR jobs in a CCX group, in case there is not enough available CCX groups. It will allow you to take full advantage of Zen3 and Xeon 3rd-gen CPUs.

:bug: Bugfixes:
- Lotus will now [close the storage path](https://github.com/filecoin-project/lotus/pull/9153) on the `lotus-worker` when you run `lotus-worker stop`. This fixes an error message seen when running `lotus-miner storage list` after the lotus-worker got disconnected.
- The `lotus-miner` could panic if a sector was added to the ProveCommitAggregate batcher and its PreCommit info was not on-chain (expired or not there). [A fix to that panic has been merged](https://github.com/filecoin-project/lotus/pull/9141).

:rocket: Upcoming features/enhancements:
- The worker hostname is now [added to the assignment logs](https://github.com/filecoin-project/lotus/pull/9151). Expect to see `assign worker sector xx to "Your-Worker-Hostname"` in your logs for easier debugging and scheduling overview.
- A PR to refactor some parts of the [sealing pipeline code](https://github.com/filecoin-project/lotus/pull/9142) has been made. It should clean up some technical debt, and make it easier to work on features like `supporting importing (partially) sealed sectors`.
- Allowing users to [send the DeclareFaultsRecovered message manually](https://github.com/filecoin-project/lotus/pull/9144) rather then waiting for the automatic declaring before windowPoSt is currently in review.

That’s it for the week! Have a great weekend! :sunny: