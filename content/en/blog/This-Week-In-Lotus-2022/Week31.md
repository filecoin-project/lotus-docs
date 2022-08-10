---
title: "This Week in Lotus - Week 31"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-08-05T08:49:55+00:00
lastmod: 2022-08-05T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

A soft launch of a new lightweight snapshot service was announced yesterday. It will eventually replace the current documented snapshot steps in the Lotus Docs. [We really recommend you check it out](https://pl-strflt.notion.site/pl-strflt/Lightweight-Filecoin-Chain-Snapshots-17e4c386f35c44548f5863afb7b5e024), and adjust your operations accordingly if you rely on snapshots.

[Lotus V1.17.0](https://github.com/filecoin-project/lotus/releases/tag/v1.17.0) was released this week. It includes a lot of new features and improvements! AppImage build targets are working again with v1.17.0, and homebrew installs now also supports M1 based macs.

**SplitStore V2 Update:**
- A PR for [auto pruning the coldstore](https://github.com/filecoin-project/lotus/pull/9123) is currently in review.
- Extensive testing of the SplitStore function will happen over the next couple of weeks, and we are gathering and monitoring information about data size and growth when using SplitStore.

**Upcoming features:**

- There is now a `lotus-shed` command for getting [raw bytes stored in active storage deals](https://github.com/filecoin-project/lotus/pull/9113) on the Filecoin network.
- The `lotus-miner proving deadline` command can now show you [live sectors in a deadline](https://github.com/filecoin-project/lotus/pull/9109), which will make it easier to find out if its time to compact a deadline or not. On top of that, it will also show some helpful debugging information about a proving deadlines bitfield if you use the `--bitfield` flag
- There is a new `WithdrawBalance` API which allows you to [withdraw balance from the miner actor](https://github.com/filecoin-project/lotus/pull/9098). Currently that can only be done within the CLI code.
- `Lotus-worker? has now a [stop command](https://github.com/filecoin-project/lotus/pull/9101). And you can also [override the worker hostname](https://github.com/filecoin-project/lotus/pull/9116) for easier management of workers.
- A feature that allows you to [remove a request from the scheduler](https://github.com/filecoin-project/lotus/pull/9064) is now merged. This will help fixing up issue where the scheduler has assigned a task to a worker that no longer exists for example.
- A new [SectorPipelineStats API method](https://github.com/filecoin-project/lotus/pull/9124) returns number of sectors currently staged/sealing, list of bytes available in each open/staging sector, plus a lot more useful information.

A couple of the team members are back after a holiday break, and some are going on a holiday next week. If you see an OOO tag in their name tag, please try to direct the request through others on the team.

We are also very happy that @Shrenuj Bansal is joining the Lotus team as an SWE :tada:

That’s it for the week! **Have a great weekend!** :sunny: