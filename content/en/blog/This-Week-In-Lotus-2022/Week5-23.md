---
title: "This Week in Lotus - Week 5 - 2023"
description: "Stay up to date with what has happened in Lotus this week"
date: 2023-02-03T08:49:55+00:00
lastmod: 2023-02-03T08:49:55+00:00
draft: false
images: []
---

**PeSto!**

As you may know, the Lotus team has been starting a project codenamed PeSto to explore how a smart contracts can act as a deal client, and how storage providers can take deals from these client contracts!

We published our first walkthrough in the [smart contract as a deal client series here](https://pl-strflt.notion.site/Smart-Contract-as-a-Client-Part-I-b939f665adb242528299d995793fbfe4). We highly recommend both developers and storage providers to check out the video.

**Enhancements/fixes:**

- A PR has been updated to add the add the ability to extract data from sectors from a running lotus-miner deployment. [The PR is currently in review here.](https://github.com/filecoin-project/lotus/pull/10169)
- With the upcoming network upgrade you will be able to create fevm (f410) addresses with the `lotus wallet new` command. A PR to make that [clear in the arguments have been opened](https://github.com/filecoin-project/lotus/pull/10179). If you want to learn more about the f4-address class [you can read through the f4-address FIP.](https://github.com/filecoin-project/FIPs/discussions/473)
- A fix to allow f4-addresses to send to any address has been opened. [The PR has is currently in review](https://github.com/filecoin-project/lotus/pull/10160) and will be added to the upcoming release/v1.20.0 branch.
- Additional cleanup of some lotus-miner commands that where missing `ArgsUsage` [in their help text has been merged.](https://github.com/filecoin-project/lotus/pull/10147)

We are currently looking into a couple of different ideas for optimizing network migrations to make the upgrade process more graceful. We will come back with more information and enhancements in the next weeks.

That’s it for the week! **Have a great weekend!** :sunny: