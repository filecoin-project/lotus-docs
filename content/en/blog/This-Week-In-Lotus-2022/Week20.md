---
title: "This Week in Lotus - Week 20"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-05-20T08:49:55+00:00
lastmod: 2022-05-20T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

The reference FVM is now in a development freeze :ice_cube:. And the team will now go into bug-fixing mode before pivoting their focus to M2 (user-programmability). The FVM milestone 1 (M1) will officially be on a ship towards the Filecoin mainnet via the testnet plan in FIP-0031 :ship:.

**Shout-out**
- `@zenground0` & `#fil-forest-dev` for their built-in test coverage effort this week :clap:
- A special thanks to the Chainsafe Forest engineers for all the testing and for catching critical :bug: `@David H [ChainSafe Forest Dev] @[ChainSafe Forest Dev] Hubert Bugaj @Josh Jones [ChainSafe Forest dev] @connor[ChainSafe; Forest Dev]`

:eyes: **Issues we have seen frequently this week:**
- Storage Providers are still struggling with overloaded storage, especially when using NFS. The scheduler should now deal with hangs better but SPs should configure, tune and limit their systems if they see persistent I/O issues. [This comment by @Magik6k](https://github.com/filecoin-project/lotus/pull/8589) has some great tips for tuning your storage, and we will create some tutorials based on those at some point.

**New Features:**
- A new feature to make the `lotus-worker` tasks opt-in is currently in testing. It makes it a lot easier to spin up a worker without disabling or enabling every task. Add the `--no-default` flag and only opt-in for the tasks you want the worker to do.
- The SPX fellows has been testing a [new release of multicore SDR](https://github.com/filecoin-project/lotus/discussions/8598). It should enable you to have multiple multicore SDR jobs running in the same CCX-group. Now you can fully utilize your Zen3 and Xeon 3rd-gen CPUs!

In the upcoming nv16 upgrade FIPs [27](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0027.md), [30](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0030.md), [31](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0031.md) and [32](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0032.md) will be included. 31 & 32 is in Last Call so all community members please take an :eyes: at them.

That’s it for the week! **Have a great weekend!** :sunny: