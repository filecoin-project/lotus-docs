---
title: "This Week in Lotus - Week 1 - 2024"
description: "Stay up to date with what has happened in Lotus this week"
date: 2024-01-07T08:49:55+00:00
lastmod: 2024-01-07T08:49:55+00:00
draft: false
images: []
---

First of all, Happy New Year :fireworks:! We hope everyone had time to recharge over the holiday and are ready for 2024!

**:up: Network version 22 timeline & scope**
We start the new year where we left off and are preparing code by implementing FIPs for the coming network upgrade - network version 22. Some important preliminary dates for the coming network upgrade:

- **January 30th:** Actor/FVM code freeze
- **February 19th:** Calibration upgrade
- **March 18th:** Mainnet upgrade

Check the more detailed estimated nv22 timeline in the image attached in. So what is in scope for nv22:

- [FIP-0063: Switching to new Drand mainnet network](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0063.md)
- [FIP-0074: Remove cron-based automatic deal settlement](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0074.md)
- [FIP-0076: Direct Data Onboarding](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0076.md)
- [FIP-0081: Introduce lower bound for sector initial pledge](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0081.md)
- [FIP-0083: Actor events for the verified registry, miner, and market actors](https://github.com/filecoin-project/FIPs/blob/7eb8da9f5d50f2664e059bd56c930272d6189a57/FIPS/fip-0083.md)
- [FIP-XXXX: Convert f090 Mining Reserve actor to a keyless account actor](https://github.com/filecoin-project/FIPs/discussions/901)

:exclamation:Please note that many of these proposals are currently in a draft state and need to enter last call, as well as being accepted or rejected by the governance process before being confirmed for network version 22. Either way, the implementer teams want to prepare code in case these proposals get accepted.

You can check out the [summary from the last implementers sync between Lotus, Forest and Venus here.](https://github.com/filecoin-project/core-devs/discussions/148#discussioncomment-7858442)

:mega: We would also like to extend an early invitation to the community to help us test **Direct Data Onboarding** and built-in actor events later in January. Direct Data Onboarding provides methods for direct data commitment into sectors, offering a more cost-effective approach. It also introduces a new deal activation scheme to facilitate transactions via user-programmed smart contracts. The **initial built-in actor events** will provide observability for events from the Verified Registry, Storage Market, and Storage Miner Actors, simplifying the process for clients to obtain necessary information by subscribing to these events and querying the chain state.

**:racing_car: Fast Finality - F3 update**
[Fast Finality in Filecoin](https://github.com/filecoin-project/FIPs/discussions/809), often referred to as F3, aims to finalize tipsets within tens of seconds during regular network operation, a significant improvement over the current 900-epoch finalization delay. All implementers concurred in the last sync that [Fast Finality is a high-priority project](https://github.com/filecoin-project/FIPs/discussions/809), as it unlocks various opportunities within the Filecoin ecosystem.

Therefore, the Lotus team will continue to dedicate resources and give priority to implementing F3 in January, with the goal of having it ready as quickly and securely as possible. However, given the challenges associated with delivering a well-tested and audited implementation, we recognize that it may not be feasible within the proposed timeline for network version 22 (nv22).

**:station: v1.25.2 update**
We expect to release the stable version of Lotus v1.25.2 next week. It introduces a very exciting alpha feature that we encourage the community to test on testnets and provide feedback. Additionally, it includes bug fixes for the synchronization issues some users encountered during and after the network upgrade.

-  **:new: Alpha release of Lotus-Provider binary - High Availability of WindowPoSt and WinningPoSt.**
   - Lotus-Provider is an entirely new binary in the Lotus ecosystem, often referred to as “Lotus-Miner-V2”. It is designed for high availability, simplicity and durability in mind. [Checkout how you can test it out in a test network here.](https://lotus.filecoin.io/storage-providers/lotus-provider/setup/) It currently supports **High Availability of WindowPoSt and WinningPoSt.** But on the near term development map, **multiple MinerIDs** and **sealing** is of the highest priority.
-  **Ability to call external PC2-binaries** - This allows storage providers to levereage the SupraSeal PC2 binary, which has been shown to improve sealing speed in the PC2-phase. Check out the docs for it here.

Again, Happy new year! :fireworks: **The Lotus team is excited to continue :cattyping: and make Filecoin better with y’all in 2024!**