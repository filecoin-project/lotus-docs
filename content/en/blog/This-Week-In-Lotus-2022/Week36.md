---
title: "This Week in Lotus - Week 36"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-09-09T00:00:55+00:00
lastmod: 2022-09-09T00:00:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

**Lotus v1.17.1** was released this week. One of the main features in the release is SplitStoreV2 (beta), which aims to reduce the node performance impact that's caused by Filecoin’s large and continuously growing datastore. The release also includes many other features like storage path filtering, updating sector location, and detaching storage paths. You can read the [full release notes here](https://github.com/filecoin-project/lotus/releases/tag/v1.17.1).

:rocket: **Upcoming features/enhancements:**

- *Sealing-as-a-service:* [Supporting partially sealed sectors](https://github.com/filecoin-project/lotus/pull/9210) is close to done and being able to support potential sealing-as-a-service solutions. All the functionality is there and tested, it just need some finishing touches.
- *Redundant chain nodes:* Integration of the raft consensus between multiple node into the existing APIs continued this week. Current results for keeping state in sync between multiple nodes are promising.

**Protocol development:**
- We are getting ready to implement `FIP0045 - De-couple verified registry from markets` in Lotus, you can track the [open work items here](https://github.com/filecoin-project/lotus/issues?q=is%3Aopen+is%3Aissue+label%3AFIP-0045). The *TL;DR* for FIP0045 is to enable the development of markets and market-like actors on the FVM, once user-programability is supported.
- Migration for `FIP0029 - Beneficiary address for SPs` and `FIP0034 - Fix pre-commit deposit independent of sector content` for the upgrade to network 17 has landed.

**NB:** If you are storage provider using Boost, check the `Boost <> Lotus` [compatibility matrix](https://boost.filecoin.io/getting-started#boost-and-lotus-compatibility-matrix) before upgrading to v1.17.1.

That´s it for the week! **Have a great weekend!** :sunny: