---
title: "This Week in Lotus - Week 34"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-08-26T00:00:55+00:00
lastmod: 2022-08-26T00:00:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

If you are interested in enabling SplitStoreV2 on your Lotus node, which will reduce the performance impact of large blockstores, you can read the [documentation for it here](https://lotus.filecoin.io/lotus/manage/chain-management/#splitstore). The feature will be available in the v1.17.1 release.

:rocket: **Upcoming features/enhancements:**
- *Sealing-as-a-service:* The PR for managing [sector number assignment between a potential sealing service and the lotus-miner](https://github.com/filecoin-project/lotus/pull/9183) is currently in review. And the work towards actually [supporting importing partially sealed sectors in Lotus is happening here](https://github.com/filecoin-project/lotus/pull/9210). It is a very early work in progress, but has been opened early for visibility.
- *Redundant chain nodes:* Some good progress towards implementing consensus between multiple chain nodes where made this week, which will be needed to [enable support for multiple chain nodes per miner node](https://github.com/filecoin-project/lotus/issues/9130) feature.

**Protocol development:**

The Lotus team has been drafting `FIP 44 - Standard Authentication Method for Actors`. The FIP is a starting point to evolve a convention where any actor can verify the authenticity of a piece of data. It does so by proposing a special “authenticate” message that actors can choose to implement. Discussions about the FIP will open soon.

**Lotus community:**

As stated in the last newsletter, the Lotus team will be at both `FIL Singapore` and `FIL Lisbon`. In Lisbon we will host a **Lotus & friends day** on the 2nd of November, and we hope to see many of you there :smile:

**PSA:** :page_with_curl: For everybody that looks at the Lotus Documentation often, you might have noticed that the top-bar changed a little bit. The Developer section in the top navigation is now a sidebar section under the Lotus top navigation. In the top-navigation we have made space for a Blog section that currently consists of all the This Week in Lotus newsletters. [We will update this Blog section](https://lotus.filecoin.io/blog/) with Lotus events, recaps and more.

That´s it for the week! **Have a great weekend!** :sunny: