---
title: "This Week in Lotus - Week 38"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-09-23T00:00:55+00:00
lastmod: 2022-09-23T00:00:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

The first release candidate for `Lotus v1.17.2` was released this week and is currently under testing by the [SPX group](https://github.com/filecoin-project/lotus/discussions/9349). This version enables the sealing-as-a-service API in Lotus. This will allow builders to create sealing services on top of Lotus. If you have a special interest in that subject please check out the `#fil-sealing-as-a-service` channel on Slack. In addition to the SaaS-feature, the v1.17.2 release also includes a lot of bug fixes, enhancements and new features. You can read the [full releaselog here](https://github.com/filecoin-project/lotus/releases/tag/v1.17.2-rc1).

:mega: **Please note that Lotus v1.17.2** will require a Go-version of v1.18.1 or higher!

:bug: **fixes:**
- A bug where running `lotus-miner sectors update-state` on a sector in the `ReplicaUpdateFailed` state caused the `lotus-miner` to crash. A [fix to avoid the panic has been merged](https://github.com/filecoin-project/lotus/pull/9331), and is also included in the v1.17.2-rc1 version.
- The [FFI has been updated](https://github.com/filecoin-project/lotus/pull/9330) to fix an issue where sectors on [read-only storage was skipped](https://github.com/filecoin-project/lotus/issues/9298) during windowPoSt. (This fix is also in v1.17.2-rc1)
- A fix to revert the `lotus-miner init` default size back to 32GiB [has been merged](https://github.com/filecoin-project/lotus/pull/9364).
- A price-per-byte calculation fix for retrievals to make the calculation correct [has been merged](https://github.com/filecoin-project/lotus/pull/9353).
- A regression on the master-branch caused the `lotus state compute-state` command to return too much information for it to unmarshal. The [regression was fixed](https://github.com/filecoin-project/lotus/pull/9335) and is now in the master branch.

**Protocol development:**
A lot of work on implementing and integrating `FIP0045 - De-couple verified registry from markets` has happened this week:
- On the builtin-actors side of the code, you can see all the [work items finished this week here](https://github.com/filecoin-project/builtin-actors/issues?q=is%3Aissue+label%3AFIP-0045+is%3Aclosed+sort%3Aupdated-desc).
- On the Lotus side:
    - A PR to [integrate the builtin-actors changes for FIP-0045](https://github.com/filecoin-project/lotus/pull/9355) has been opened.
    - [Integrating DataCap actors](https://github.com/filecoin-project/lotus/pull/9348) into Lotus

**N.B** for Storage Providers: In v1.17.2 the default `PropagationDelay` has been raised from 6 seconds -> 10 seconds, and you can tune this yourself with an environment variable. That means you will now wait for 10 seconds for other blocks to arrive from the network before computing a winningPoSt (if eligible). In your lotus-miner logs that means you will see this `"baseDeltaSeconds": 10` as default. You can [read the full post about why this was raised here](https://github.com/filecoin-project/lotus/issues/5128#issuecomment-1252049487).

That´s it for the week! **Have a great weekend!** :sunny: