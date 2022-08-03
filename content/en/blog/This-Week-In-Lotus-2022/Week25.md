---
title: "This Week in Lotus - Week 25"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-06-24T08:49:55+00:00
lastmod: 2022-06-24T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

:mega: It`s only **12 days left until the Filecoin network v16 upgrade!!!** We highly recommend all lotus users start to deploy lotus v1.16.0 and start testing ASAP.

The Lotus-team will keep an extra eye open for issues about upgrading and using v1.16.0. If you experience any issues, please post in either the `#fil-lotus-help` or `#fil-help` channel and we will help out as fast as possible.

**Network 16 updates:**
- [Lotus v1.16.0 is here!](https://github.com/filecoin-project/lotus/releases/tag/v1.16.0) We recommend that you read carefully through the release notes. Remember that your Go-version needs to be >= 1.17.9 for this version.

- There was an AMA for the network v16 upgrade in the `#fil-ama` channel this Wednesday with many great questions. It's worth checking it out!

**Bug fixes:**

- The deal-making command used mainnet parameters for block time, and as such making deals on a 2k-devnet were not possible since the block time on a devnet is 4s. This bug has now been fixed by making the command [get the block time specific to the build](https://github.com/filecoin-project/lotus/pull/8896).

- Previously, if a storage provider could not unseal data when a client requested it, there was no return value for this, and the command would hang on the client side. This has now been fixed. [The client command will now exit](https://github.com/filecoin-project/lotus/pull/8912) the retrieval if they receive a cancel message from the storage provider.

- If you have broken indexes in your market’s datastore, you can try to recover it by using `lotus-miner dagstore register-shard`.

Storage Providers :mega:! We are gathering some metrics about block production times, and we would really appreciate your input. If you have some extra time, please [fill out the form in this thread](https://github.com/filecoin-project/lotus/discussions/8891).

**That’s it for the week! Have a great weekend!** :sunny:
