---
title: "This Week in Lotus - Week 9 - 2023"
description: "Stay up to date with what has happened in Lotus this week"
date: 2023-03-03T08:49:55+00:00
lastmod: 2023-03-03T08:49:55+00:00
draft: false
images: []
---

**Lotus v1.20.0 & RC for v1.21.0**

**Its happening** :fire: the stable release of Lotus v1.20.0 was released this week. This is a MANDATORY release of Lotus that delivers the [Hygge network upgrade](https://github.com/filecoin-project/community/discussions/74?sort=top#discussioncomment-4313888), introducing Filecoin network version 18 with upgrade epoch `2683348`, on `March 14th at 2023-03-14T15:14:00Z`. Check out the [full release notes for additional information here.](https://github.com/filecoin-project/lotus/releases/tag/v1.20.0)

We have a code freeze for our first feature release of the year, on March 7th, so you can expect the first release candidate for Lotus v1.21.0 to be coming out next week. [Check out our release calendar here.](https://pl-strflt.notion.site/LOTUS-ROADMAP-2ab7bcc9c9344a29b50eeef926e63ba7#4ee685acf34247b486c7188e7c835e4d)

:man-running: **Lotus Miner Issue Backlog Sprint**

We have been heads down on the first [[Epic] Lotus-Miner V2 milestone](https://github.com/filecoin-project/lotus/issues/10340) this week, [the Lotus-Miner backlog sprint.](https://github.com/filecoin-project/lotus/issues/10338).

- After a really long battle with the dreaded `Notifs channel closed` issue which has been haunting SPs for a long time, we have finally found [a fix, tested it, and also have unittest for it. Along the way we also fixed a bunch of other go-jsonrpc bugs.](https://github.com/filecoin-project/go-jsonrpc/pull/97) Its currently in review a will be included in the v1.21.0 release.
- There are some experimental assigner features in the scheduler which should help mitigate some issues around tasks not being properly assigned when using multiple `storage only lotus-workers`. [The PR is currently in review](https://github.com/filecoin-project/lotus/pull/10356), and is coming as experimental features in the v1.21.0 release.
   - The `experiment-spread-tasks-qcount` assigner is similar to the spread assigner, but also takes into account task counts which are running/preparing/queued, as well as counting running tasks on a per-task-type basis. You can see how it performed on the `storage only lotus-workers` [here.](https://github.com/filecoin-project/lotus/issues/8566#issuecomment-1446978856)
   - :game_die: The `experiment-random` assigner, is as the name suggest random. You can check the results for the `storage only lotus-workers` test [with this assigner here.](https://github.com/filecoin-project/lotus/issues/8566#issuecomment-1447064218)
- We have pushed a fix for the environment variable `GET_xx_MAX_CONCURRENT` not being enforced issue. GETs tasks will now be properly limited if the environment variable is set. The fix will be included in v1.21.0.
- Have you seen the `state machine error: %!s(<nil>)` error message in sector logs, hopefully you will soon see it a lot less. We are currently testing out a potential fix for it. If proven to be successful, it will also be included in the coming v1.21.0 release. :mountain_railway:.
- A PR that removes the legacy market info in the `Lotus-Miner info` command has been merged, and is targeted for the v1.21.0 feature release.

:person_doing_cartwheel: **SplitStore improvements**

We have been gathering feedback from the community on some [SplitStore related product ideas](https://filecoinproject.slack.com/archives/CPFTWMY7N/p1677712792604559) we have that we want to implement. Thanks to everybody that provided their opinions on these matters, it really helps us define what to build towards :pray: We are still actively trying to get to the root cause of the discard mode on the SplitStore not doing the expected GC work.

But we are hoping to finish up a hot store online garbage collection command for the SplitStore today, so that we can ship it into the Lotus v1.21.0 release.

That’s it for the week! **Have a great weekend!** :sunny: