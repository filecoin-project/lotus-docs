---
title: "This Week in Lotus - Week 3 - 2023"
description: "Stay up to date with what has happened in Lotus this week"
date: 2023-01-20T08:49:55+00:00
lastmod: 2023-01-20T08:49:55+00:00
draft: false
images: []
---

**HyperSpace:milky_way::**

A new Filecoin network was born this week, the **Hyperspace Testnet**, a developer-oriented testnet! It serves as the main pre-production developer test ground, where developers can test their applications, tooling, and smart contracts before launching them on the mainnet. The launch of this network also means that we are getting close to the home stretch for making the Filecoin mainnet user-programmable for the first time!! :tada:

**Refactors and fixes:hammer_and_wrench::**

- For quite some time there has been two different commands to extend a sector in lotus, the `lotus-miner sectors renew` and `lotus-miner sectors extend`. To reduce confusion we decided to only keep one of these command, and the refactor has now been merged. From now on there will only be the `lotus-miner sectors extend` command, but it has been replaced with the functionality of `lotus-miner sectors renew`.
- The commands for proposing and confirming beneficiary address changes [has now been added](https://github.com/filecoin-project/lotus/pull/10037) to lotus-shed for easier usability when wanting to change the beneficiary address.
- A PR has been opened to add timestamps to retrieval events in the `lotus client retrieve` command.

That’s it for the week! **Have a great weekend!** :sunny: