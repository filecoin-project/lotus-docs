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

:bug: **Bugfixes:**
- Lotus will now [close the storage path](https://github.com/filecoin-project/lotus/pull/9153) on the `lotus-worker` when you run `lotus-worker stop`. This fixes an error message seen when running `lotus-miner storage list` after the lotus-worker got disconnected.
- The `lotus-miner` could panic if a sector was added to the ProveCommitAggregate batcher and its PreCommit info was not on-chain (expired or not there). [A fix to that panic has been merged](https://github.com/filecoin-project/lotus/pull/9141).

:rocket: **Upcoming features/enhancements:**
- The worker hostname is now [added to the assignment logs](https://github.com/filecoin-project/lotus/pull/9151). Expect to see `assign worker sector xx to "Your-Worker-Hostname"` in your logs for easier debugging and scheduling overview.
- A PR to refactor some parts of the [sealing pipeline code](https://github.com/filecoin-project/lotus/pull/9142) has been made. It should clean up some technical debt, and make it easier to work on features like `supporting importing (partially) sealed sectors`.
- Allowing users to [send the DeclareFaultsRecovered message manually](https://github.com/filecoin-project/lotus/pull/9144) rather then waiting for the automatic declaring before windowPoSt is currently in review.

:seal: **Sealing-as-a-Service:**

One of our priorities in Q3 is to enable sealing/snark as a service. So for potential developers wanting to build such services, please take a look at this [Sealing-as-a-Service API Design](https://github.com/filecoin-project/lotus/discussions/9079) and leave some feedback if you have.

**FIPs:**

Meanwhile, the Lotus team has been working closely with [protocol opportunity team to develop protocol changes for the upcoming nv17 upgrade](https://pl-strflt.notion.site/Filecoin-nv17-technical-scope-proposal-c7733fe047d8412eacd713ec5905d7e5):

- Started work for implementing the [Decoupling of FIL+ term for storage marketplaces](https://github.com/filecoin-project/FIPs/discussions/313).
- Writing a [FIP for Standard Authentication Method for Actors](https://github.com/filecoin-project/FIPs/pull/424).
- [Migration for FIP-0034](https://github.com/filecoin-project/go-state-types/pull/48).
- Participated in the [Sector Duration Multiplier discussion](https://github.com/filecoin-project/FIPs/discussions/421).

That’s it for the week! Have a great weekend! :sunny: