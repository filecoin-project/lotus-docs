---
title: "This Week in Lotus - Week 49"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-12-09T00:00:55+00:00
lastmod: 2022-12-09T00:00:55+00:00
draft: false
images: []
---

The final release of the Lotus v1.19.0 will be released this weekend. This feature r:star-struck: SplitStore, the :new: [experimental Lotus node cluster feature](https://lotus.filecoin.io/lotus/configure/clusters/), as well as numerous enhancements and bugfixes.

**Avoid Add-Piece panic!**
We have gotten multiple reports about panics during the AddPiece phase after the network version 17 upgrade.

We have [issued and merged a fix for the panic](https://github.com/filecoin-project/lotus/pull/9822), **which will be backported to the v1.19.0 release coming this weekend. We will also issue a patch release v1.18.2 with the fix.**

**Network version 18 - Hygge**:
The Lotus team has focused on preliminary work for the upcoming network version 18, codenamed Hygge, this week!

In addition to all the *FEVM-related* Filecoin improvement proposals that have been accepted, there are a couple of drafted/pending FIPs that are being considered for the upcoming version:

- A FIP [proposing increased max sector duration.](https://github.com/filecoin-project/FIPs/blob/7a098c8003ff559d6a9a66663967c14ef0026c01/FIPS/fip-xxxx-sector-commitment-duration.md)
- [MarketNotifyDeal called by market actor on proposal client](https://github.com/filecoin-project/FIPs/discussions/549)
- A FIP [revisiting the Sector Duration Multiplier.](https://github.com/filecoin-project/FIPs/discussions/554)

You can check [out the current scope of nv18 here!](https://github.com/filecoin-project/tpm/discussions/115#discussioncomment-4337719)

:milky_way: **For builders excited about FVM:**
[Check out Space Warp](https://spacewarp.fvm.dev/) - it is a jam-packed program for builders leading up to the launch of Filecoin’s Virtual Machine on mainnet.

We have some secret projects that we are working on, we will reveal more later :shushing_face: **PeSto and FilFil coming soon...**

That’s it for the week! **Have a great weekend!** :sunny: