---
title: "This Week in Lotus - Week 52"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-12-31T00:00:55+00:00
lastmod: 2022-12-31T00:00:55+00:00
draft: false
images: []
---

The end of 2022 is close, and what a year it has been! In the last `This Week in Lotus` newsletter for the year we will explore some of the highlights and features implemented in Lotus in 2022.

**Network upgrades:**
- The first network upgrade for 2022 was the `Network v15 OhSnap` upgrade in early March. It enabled updating CC-sectors to store real data without incurring a full re-sealing of the sector - a huge improvement over the existing way of updating CC-sectors to store data.
    - This upgrade required new proofs, which meant that a trusted setup was needed. A big shout-out :clap: to the Proofs-team for setting up the ceremony and circuits, and to the community participants that contributed their resources to participate in generating secure and verifiable parameters for SnapDeals proofs :tada:
- The second network upgrade in 2022 was the `Network v16 Skyr (FVM M1)` upgrade in July. Although on the surface this did not look like a big upgrade, it was one of the biggest changes of the year. All the Filecoin actors got rewritten to Rust, and a new gas model was activated to account for execution costs. It was a huge cross-collaboration effort between multiple teams, and set the stage for further work on the Filecoin Virtual Machine milestones.
- The third and last upgrade for the year was the `Network v17 Shark` upgrade in late November. It delivered a wave of protocol refinements that will allow for useful smart contracts to be written using the FVM (eg. programmable markets, lending contracts, etc.). It also introduced the first fungible token contract on Filecoin network by decoupling FIL+ from the marketplace and adding a Datacap actor on the network.

We have learned a lot through implementing, migrating, and shipping these network upgrades this year. With some very important network upgrades on the roadmap for 2023, these experiences will come in handy as we strive to make our upgrades and migrations as graceful and stable as possible.

**Lotus** :chains::
- While supporting numerous other ecosystem teams, it was quite evident that Filecoins ever expanding chain size and the need to prune the chain was a pain point in most businesses. We brushed the dust off the old SplitStore-function in Lotus, added improvements, functionality and squashed outstanding bugs with the SplitStoreV2 effort. We are now well on our way to making it production ready.
- We have shipped the experimental Node cluster feature to maintain consistent state for nonces and messages being published in the event of Lotus node failure.
- For the upcoming FEVM milestone, we have had a workshop for programming the Filecoin deal market and making Filecoin Data DAOs compatible with the FVM.

**Lotus-Miner**

*Scheduler/Sealing:*
- The sealing code was refactored this year, and a lot of code has been moved into directories that make more sense. We have gotten rid of external dependencies that slowed down development on the sealing code, and structured packages in a way that makes future refactors easier. On top of the refactors we have paid down some technical debt by removing useless proxy code in the sealing pipeline. All these efforts have happened while numerous sealing scheduler enhancements and new assigning logic were implemented.
- While we try to set reasonable default settings, adding configurability for fine tuning is important. Storage Providers got more configurability options to how sectors are allowed to be transferred to the long-term storage with the ability to disallow remote finalization, and the ability to filter for sector types in storage paths, by setting up Deny, and Allow-filters.
- The lotus-workers got the ability to create sector storage groups to have better control of data flow between lotus-workers, the ability to set a per-worker maximum concurrent task count limit, and also be aware of cgroup memory limits. The lotus-workers also got the ability to compute commP for scaling Boost throughput.
- The Proofs team created and helped push out the ability to run multiple multicore SDR jobs in the same CCX-group, so that storage providers could fully utilize their Zen3 and Xeon 3rd-gen CPUs!
- We created a new benchmark tool that allows for benchmarking the performance of a single task, greatly reducing the time it takes to optimize and test new hardware and software configurations in an SPs sealing pipeline.

*Proving:*
- We built out the entirely new Proof-of-SpaceTime workers, which gives you the ability to separate both the winningPoSt and windowPoSt processes to separate workers instead of being computed in the monolith lotus-miner.
- After gathering newer block mining metrics from the community, as well as research and analysis from the CryptoNet team, we raised the PropagationDelay for SPs. The time you wait for blocks to arrive from the network before computing winningPoSt has been raised to 10 seconds
- We added handy tooling to test, compute and check that you are able to compute your windowPoSt partitions. Both for sanity checking new configurations, and for debugging why an windowPoSt might have failed.
- We improved windowPoSt processing speed, and added configurability options for setting your own pre-check timeouts, and the ability to compact your windowPoSt partitions to save gas.

**Other noteworthy** :toolbox::
- Relocating storage across multiple storage servers can be a daunting task, so we added the ability to redeclare and refresh storage path metadata without restarting the `lotus-miner` process.
- We created Sealing-as-a-Service interfaces for Lotus-Miner, to accelerate the ability to onboard data to the network and facilitate the onboarding of new SPs. New SPs can use a sealing service to onboard to the network without purchasing sealing hardware. Existing SPs can either use sealing-as-a-service to accelerate sealing sectors, or provide sealing-as-a-service to generate new lines of business.
- We added better support and tooling for multi-signature owner accounts for Storage Providers.
- The `Index Provider`, a project developed by the Bedrock team, was integrated into Lotus. The index provider projects aims to solve content routing in the Filecoin network, and facilitate retrieval of content by any CID.

On top of all the above, we focused a lot more on community updates in 2022 by shipping explanation videos, tutorials, FIP walkthroughs, AMA sessions and improving our Lotus documentation processes and release notes. We were also able to host our first community meetup in November with the `Lotus, Data Onboarding and Friends day` - we where humbled by the excitement, energy and constructive discussions about the challenges ahead.

As we look forward there are multiple challenges and opportunities ahead for Lotus, Lotus-Miner and the ecosystem as a whole. But we are dedicated to deliver the improvements and reliability that is needed for our community to meet Filecoins goals. We will be here day by day, together with all of you, to help build a stronger and better ecosystem and community for Filecoin to become the decentralized storage network, designed to store humanity´s most important information!

Thank you for all the memories we created and shared together this year! :blue_heart: **Happy New Year!** :tada::fireworks: