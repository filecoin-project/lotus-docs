---
title: "This Week in Lotus - Week 50"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-12-16T00:00:55+00:00
lastmod: 2022-12-16T00:00:55+00:00
draft: false
images: []
---

**Videos from Lotus, Data Onboarding and Friends day:**

All presentations and videos from our Lotus, Data Onboarding and Friends day in November are now out on the Lotus YouTube-channel. It´s a treasure trove of knowledge and insights for many aspects of the Filecoin network. To list a few:

- [Filecoin Roadmap](https://youtu.be/LI3K-BkGitg)
- [Once upon a Lotus](https://youtu.be/oIMvMb5wVO4)
- [Wander the Lotus-Miner](https://youtu.be/FOCC6UTgGbg)
- [Lotus’ Best Friend: Boost](https://youtu.be/5GhfeUCV1l0)
- [Deep Dive Into Filecoin Proofs](https://youtu.be/RhEVZcsWkx0)

[Check out the full playlist here.](https://www.youtube.com/watch?v=LI3K-BkGitg&list=PLhmonklIHGmXfYI9jUxZPx-_HF0REhq5Q&index=1) *Like & subscribe* :blue_heart:

**Network version 18 - Hygge:**

As mentioned last week, the Lotus team has been focusing on a lot of preliminary work and work scope for next network upgrade, nv18 - codenamed Hygge. And this week has no different!

Check in on this thread to [see the current scope of nv18!](https://github.com/filecoin-project/tpm/discussions/115#discussioncomment-4337719) Jennijuju will send a timeline and scope update soon!

:screwdriver: **Fixes and Enhancements:**
- A PR that adds the ability to list and remove expired claims for FIL+ deals is [now in review.](https://github.com/filecoin-project/lotus/pull/9875)
- We have added [printing the address](https://github.com/filecoin-project/lotus/pull/9873) when a user encounters the `failed to sign message: key not found` error message.
- [A fix to the issue](https://github.com/filecoin-project/lotus/pull/9874) where `lotus daemon --import-snapshot` is started, but cannot be interrupted apart from using SIGKILL has now been merged. The listener has now been installed before running the cli-app, so that it closes on SIGINT/ctrl+c.
- [There is a PR in draft](https://github.com/filecoin-project/lotus/pull/9878) for checking the allocation expirations, this is to make sure the deals lands on chain before the allocation is expired.

**Scheduler :a:/:b:-testing and metrics:**

One of the areas in the Architectural/System-level problems for enterprise-level Storage Providers [discussion](https://github.com/filecoin-project/lotus/discussions/9686) has been around the Sealing tasks scheduling inefficiencies. We are now at the point where we need to have actual metrics and numbers to move forward. **If we can´t measure it, we can´t improve it!**

Please check out the `Scheduler A/B-testing and metrics` post, and help out with gathering metrics: https://github.com/filecoin-project/lotus/discussions/9857

:snowflake: **Winter holidays**

A reminder that the majority of the Lotus team will be taking ~2 weeks off in December as we approach the winter holiday. Because of that, we will not start a new feature release this month. We will be back in January, rested and ready to work!!

That’s it for the week! **Have a great weekend!** :sunny: