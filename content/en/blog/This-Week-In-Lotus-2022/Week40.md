---
title: "This Week in Lotus - Week 40"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-10-07T00:00:55+00:00
lastmod: 2022-10-07T00:00:55+00:00
draft: false
images: []
---

The **stable release of Lotus v1.17.2** is now out :tada: This feature release introduces the sector number management APIs in Lotus that enables all the Sealing-as-a-Service and Lotus interactions needed to function. Deep dive into the new APIs here: [#9079 (comment)](https://github.com/filecoin-project/lotus/discussions/9079#discussioncomment-3652044). This version also raises the default propagation delay to 10 seconds for storage providers, so from now on you will see `"baseDeltaSeconds": 10` as default in your `lotus-miner` logs.

The release has numerous other enhancements and bug fixes, so make sure to [check out the full release notes here](https://github.com/filecoin-project/lotus/releases/tag/v1.17.2).

:warning: Please note that Lotus v1.17.2 will require a Go-version of v1.18.1 or higher!

:rocket: **Features / Enhancements:**
- A pull request to [add the uptime of your lotus daemon](https://github.com/filecoin-project/lotus/pull/9436) to the `lotus info` command has been opened, and is currently in review.
- We are currently testing the `redundant chain nodes feature`, and will test it over the next couple of weeks/month. If you feel adventurous and want to play with the feature early, [here is a guide to how you can set it up in a local developer network](https://github.com/filecoin-project/lotus/discussions/9449).

**Protocol development:**
- A [second release candidate for builtin-actors v9.0.0](https://github.com/filecoin-project/builtin-actors/releases/tag/v9.0.0-rc.2) was released this week. We currently integrating the remaining work items of Network 17 into Lotus.
- Network version 17 is now deployed to the Butterfly network :butterfly: The network will most likely be reset multiple times as we test out different network upgrade test cases.

As you may know by now, we are hosting a Lotus, data onboarding, and friends day on Nov 2nd in Lisbon! The registration for the event is finally open, and the schedule has been finalised. **Come meet us in Lisbon, on Nov 2nd!**
- Full schedule can be seen here: [https://bit.ly/lotusnfriends](https://lotusandfriends.com/)
- Get your ticket to the event here: [https://bit.ly/lotusnfriends](https://bit.ly/lotusnfriends) 

That´s it for the week! **Have a great weekend!** :sunny: