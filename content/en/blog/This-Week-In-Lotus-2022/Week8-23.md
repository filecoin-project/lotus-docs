---
title: "This Week in Lotus - Week 8 - 2023"
description: "Stay up to date with what has happened in Lotus this week"
date: 2023-02-24T08:49:55+00:00
lastmod: 2023-02-24T08:49:55+00:00
draft: false
images: []
---

**Network version 18**

The calibration network upgraded successfully this week - and we can look forward to the network version 18 upgrade in the Mainnet, in approximately 2.5 weeks :rocket:

We are actually ahead of schedule, so we might ship the final `Lotus v1.20.0` release already today, and no later then the estimated time of `2023-02-28`. The stable release will have everything set for the mainnet upgrade.

**:mag_right: SplitStore**

We are actively investigating on the rather peculiar issue where some splitstore nodes is not discarding, and the expected GC work is not getting done. While on other nodes with the exact same hw/settings it is working fine. You can follow the [issue here.](https://github.com/filecoin-project/lotus/issues/9840#issuecomment-1428484861)

We have narrowed the reason for the unwanted behaviour down quite a bit - but due to issue having no clear repro steps, it has unfortunately taken a bit longer then we wanted to get in a fix. But its our team member Zen’s top of the line work item to get down to the bottom of it, and find a fix.

**A big thanks to everyone that has provided detailed logs for us to review.**

**:keyboard: Lotus-Miner megathread**

After a long period of gathering feedback from all of you in the [Architectural/System-level problems for enterprise-level Storage Providers](https://github.com/filecoin-project/lotus/discussions/9686) Github discussion, the Storage Provider Working Group (SPWG) and Decentralized Storage Alliance calls, we have now published the [🗺 Mega Lotus-Miner project issue.](https://github.com/filecoin-project/lotus/issues/10340)

We believe that this roadmap will help ease the pain points that have been identified, and lead to a better experience for our awesome storage providers!

That’s it for the week! Have a great weekend! :sunny: