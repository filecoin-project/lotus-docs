---
title: "This Week in Lotus - Week 32 - 2023"
description: "Stay up to date with what has happened in Lotus this week"
date: 2023-08-10T08:49:55+00:00
lastmod: 2023-08-10T08:49:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

**SynthPoRep space savings :razor:**

This week, we continued testing SyntheticPoReps on the Butterfly-network :butterfly:. Thanks to some additional space-saving improvements introduced by the proofs team last week, we’ve achieved some additional reduction in the cache storage between PreCommits and ProveCommits for Synthetic PoReps:

- For 32 GiB sectors, the cache size has been reduced from `453 GiB` down to `11 GiB` after completing the PreCommit 2 sealing process. That’s **a reduction of 97.57% !**
- Similarly, for 64 GiB sectors, SyntheticPoReps reduces the cache size from 907 GiB to 11 GiB post the PreCommit 2 sealing process, marking **a reduction of 98.79% !**

We aim to conclude the SyntheticPoReps testing on the Butterfly by next week. Once that’s done, these space-saving enhancements will be integrated into the main network during the nv21 upgrade. For more details, [view the nv21 timeline here.](https://github.com/filecoin-project/core-devs/discussions/140#discussion-5202703)

**Lotus v1.23.3 :new:**

The stable release of Lotus v1.23.3 was published this week. It includes numerous bugfixes and enhancements. Some of the highlights include:

- *Enhanced PieceReader:* The lotus-miner piece reader now supports parallel reads, improving retrieval speed.
- *Ethereum Compatibility:* The RPC provided by Lotus now aligns with EIP-1898.

This Lotus version also includes a Slasher tool to monitor the network for Consensus Faults. It examines incoming blocks for any of the three Consensus Faults defined by the Filecoin protocol. Check out the [Lotus Slasher & Disputer video](https://youtu.be/akJd6-2kR3Q), or the [documentation for how you can run this yourself](https://lotus.filecoin.io/lotus/manage/slasher-and-disputer/).

:exclamation:Please note that for this release you need to have Go version v1.19.12 or higher for building Lotus. While Go version 1.20 is supported, 1.21 is not.

[Check out the detailed release log for more information.](https://github.com/filecoin-project/lotus/releases/tag/v1.23.3)

**FIL Dev Summit :microphone:**

The Filecoin community is excited to announce the FIL Dev Summit. This event aims to unify the Filecoin developer community to discuss and shape the protocol’s future, tooling, and network. Participants will collaborate on best practices, data onboarding enhancements, FVM scalability, and map out the evolution of the Filecoin protocol for 2024 and beyond.

- :flag-sg: Part 1 is in Singapore, **Sep 12-14**
There will be English <—> Mandarin translators in as many rooms as possible at this event.
- :flag-is: Part 2 is in Iceland, **Sep 25-27**

Sounds interesting? Check out the [tracks in the announcement message](https://filecoinproject.slack.com/archives/C01AC6999KQ/p1691702731658139), the website, [and apply to attend here.](https://airtable.com/shran7li4slfQSB04)

That’s it for the week! **Have a great weekend!** :sunny: