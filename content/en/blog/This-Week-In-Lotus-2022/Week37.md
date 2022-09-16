---
title: "This Week in Lotus - Week 37"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-09-16T00:00:55+00:00
lastmod: 2022-09-16T00:00:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

The Lotus team is hosting our very first **Lotus & Friends Day** [@FilLisbon](https://hub.fil.org/fil-lisbon) on **Nov 2nd**! :smile: There will be a lot of talks, workshops & panel from Lotus, Filecoin Crypto, Data onboarding team and more. Registration is opening soon!

:rocket: **Upcoming features/enhancements:**

- *Sealing-as-a-service:* The main piece for implementing all `SaaS<->Lotus` interactions needed for the service to work [is now finalized and in review](https://github.com/filecoin-project/lotus/pull/9210). For an updated comment on the current implementation status, and the `sector number management APIs`, check out [this comment](https://github.com/filecoin-project/lotus/discussions/9079#discussioncomment-3652044).
- *Redundant chain nodes:* A PR for adding the raft consensus for lotus nodes in a cluster [is now in review](https://github.com/filecoin-project/lotus/pull/9294).

Both the above features are quite big PRs, so it will take some time to get them thoroughly reviewed. The lotus v1.17.2 code freeze where extended for a week, and is targeted early next week due to our goal of landing the Sealing-as-a-service enablement in that release.

- An enhancement displaying the `update` & `update-cache` files in the `lotus-miner storage list` command has [been merged](https://github.com/filecoin-project/lotus/pull/9323).

:bug: **fixes:**

- A fix for the [issue](https://github.com/filecoin-project/lotus/issues/8686) where available CC snap-up sectors being prematurely upgraded to `UpdateReplica` status is currently in review.
- The ability to send a terminate message with either an [owner address or a worker address fixed](https://github.com/filecoin-project/lotus/issues/8664) an issue where the owner-address was a multi-signature owner.

**Protocol development:**
- A lot of work for implementing `FIP0029 - Beneficiary address for SPs` into Lotus happened this week:
    - Adding a CLI for [changing the the beneficiary address](https://github.com/filecoin-project/lotus/pull/9307).
    - Adding [beneficiary withdraw api and CLI](https://github.com/filecoin-project/lotus/pull/9296), adding caller for actorWithdrawCmd was also included in this PR.

All community members are welcome to cast a vote on `FIP0036` via FIL Poll to either `approve` or `reject` FIP0036. [Read the announcement here](https://filecoinproject.slack.com/archives/C01EU76LPCJ/p1663189570934929).

That´s it for the week! **Have a great weekend!** :sunny: