---
title: "This Week in Lotus - Week 14 - 2023"
description: "Stay up to date with what has happened in Lotus this week"
date: 2023-04-07T08:49:55+00:00
lastmod: 2023-04-07T08:49:55+00:00
draft: false
images: []
---

**Network version 19 - Lightning :zap:**

The implementation scope for network version 19 has now been settled. The Filecoin improvement proposals (FIPs) that have been accepted for the coming network upgrade are:

- [FIP0060 - Set market deal maintenance interval to 30 days](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0060.md)

To reduce block validation costs, this proposal changes the built-in storage market actor’s deal maintenance interval from 1 day to 30 days. This will alleviate cron execution demands, buying the network more time to develop a more permanent solution as deal growth continues in the Filecoin network.

:exclamation: As many users have experienced, catching up sync from a snapshot has been taking a lot longer lately, and this FIP will help cut down the time it takes to get up to sync.

- [FIP0061 - WindowPoSt Grindability Fix](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0061.md)

This FIP makes the generation of WindowPoSt challenges independent of the order of the provided sectors, improving network security.

👌 From a Lotus perspective this FIP will also simplify and improve multiple aspects of Proof-of-SpaceTime, most notably, if there is a failure to read challenges for a single sector today, Lotus needs to re-read new sector challenges for all the sectors in the partition. After this network upgrade when there are failed sector challenges, we will be able to just skip those.

- [FIP0062 - Fallback Method Handler for the Multisig Actor](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0062.md)

:lower_left_fountain_pen: This improvement proposal adds a no-operation handler to the multi-sig actor, allowing it to accept value transfers from smart contracts, Eth accounts, and placeholders. This change aligns multi-sig actors with account actors, enabling smoother interactions between them and solving issues encountered with Wrapped FIL tokens on multi-signature wallets.

- [Builtin actor bug fix: sector activation epoch](https://github.com/filecoin-project/builtin-actors/pull/1229)

FIP-0019 SnapDeals changed the value of a sector’s activation epoch, which has broken its intended use and may cause issues in administering maximum commitment duration, proof refresh windows, and new sector policies. Although the true activation epoch can still be computed, there was a risk that future mistakes that could worsen the issue.
The problem was not urgent, but it was recommended to fix as soon as possible to avoid potential complications.

**Network version 20 (ghost upgrade)  - Thunder :zap:**

Something that is a bit special about the network version 19 upgrade is that `FIP0061 - WindowPoSt Grindability` proposes a two-stage network version rollout (nv19 and nv20) to allow a smooth transition for accepting the new proof types.
Clients will start generating the new proof types after the nv19 upgrade, while the second upgrade (nv20) is a “ghost upgrade”, with no migration or code changes, except that clients will report the new network version of nv20 to the FVM.

**:hourglass_flowing_sand: NV19 & NV20 timeline:**

The expected timeline for the network upgrades is as follows:

- Apr 18: Calibration network upgrade
- May 9: Mainnet v19
- May 16: Mainnet v20

For the network upgrade we will have both a Lotus v1.22.0 and Lotus v1.23.0 version:

- v1.22.0 is branched off v1.20.4 and will include everything needed for the network upgrade.
   - The first release candidate will be shipped next week.
- v1.23.0 will be the next feature release and will include all the enhancements in v1.21.0 + newer enhancements currently not in any version. This version will of course also include everything needed for the network upgrade.


That’s it for the week! **Have a great weekend!** :sunny: