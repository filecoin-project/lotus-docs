---
title: "Economics"
description: "This guide documents the basic economics of being a storage provider in filecoin."
lead: "This guide documents the basic economics of being a storage provider in filecoin."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-get-started"
        identifier: "storage-providers-economics"
weight: 115
toc: true
---

## Rewards

There are two main types of rewards for their efforts: storage fees and block rewards.

### Storage fees

_PoSt (Proof-of-Spacetime)_ window checks are performed at 24 hour intervals across the network to ensure that storage providers are continuing to host their required sectors as normal. Correspondingly, each storage provider’s set of pledged sectors is partitioned into subsets, one subset for each window. Within a given window, each storage provider must submit a PoSt for each sector in their respective subset. For each day a storage provider is inactive it will receive a [fault fee](#penalty).

**Storage fees** are the fees paid regularly by clients after a deal has been reached, in exchange for storing data. These fees are automatically deposited into a provider’s associated withdrawal wallet as they continue to perform their duties over time, and are briefly locked upon being received.

### Block rewards

**Block rewards** are large sums that are given to the storage provider credited for a new block. Unlike storage fees, these rewards do not come from an associated client; rather, the network "prints" new FIL as both an inflationary measure and an incentive to providers advancing the chain. All active storage providers on the network have a chance at receiving a block reward, their chance at such being directly proportional to the amount of storage space currently being contributed to the network.

{{< alert icon="warning" >}}
A storage provider needs to have 10 TiB minimum raw power in the network to be eligible for block rewards.
{{< /alert >}}
 
The mechanism to earn the right to _provide_ a new block is called _WinningPoSt_. In the Filecoin network, time is discretized into a series of epochs – the blockchain's height corresponds to the number of elapsed epochs. At the beginning of each epoch, a small number of storage providers are elected to provide new blocks. Additionally to the block reward, each storage provider can collect the fees associated to each message included in the block.

The number of blocks on every tipset is based on a Poisson distribution of a random variable with λ = 5. Provider implementations may use several strategies to choose which messages to include in every block to minimize overlap. Only the "first execution" of each message will collect the associated fees, with executions ordered per the hash of the VRF (Verifiable Random Function) ticket associated to the block.

When storage provider get block rewards from the network, 25% percent of the reward will be immediately released to your storage provider actor's available balance and the remaining 75% will become locked funds and be released linearly in 180 days.

### Verified clients

To further incentivize the storage of "useful" data over simple capacity commitments, storage providers have the additional opportunity to compete for special deals offered by _verified clients_. Such clients are certified with respect to their intent to offer deals involving the storage of meaningful data, and the power a storage provider earns for these deals is augmented by a multiplier. The total amount of power a given storage provider has, after accounting for this multiplier, is known as **quality-adjusted power**.

### Retrieval fees

Retrieval fees are paid incrementally using _payment channels_ as the retrieval deals are fulfilled (by sending portions of the data to the client. This happens off-chain.

## Penalty

In Filecoin, storage providers are succeptible to two different kinds of slashing: _storage fault slashing_, and _consensus fault slashing_.

### Storage fault slashing

This term encompasses a broader set of penalties which are to be paid by storage providers if they fail to provide sector reliability or decide to voluntarily exit the network. These include:

- **Fault fees**: a penalty that a storage provider incurs for each day a storage provider's sector is offline (fails to submit Proofs-of-Spacetime to the chain). Fault fees continue until the associated wallet is empty and the storage provider is removed from the network. In the case of a faulted sector, there will be an additional sector penalty added immediately following the fault fee.
- **Sector penalties**: a penalty that a storage provider incurs for a faulted sector that was not declared faulted before a _WindowPoSt_ check occurs. The sector will pay a fault fee after a Sector Penalty once the fault is detected.
- **Termination fees** is a penalty that a storage provider incurs when a sector is voluntarily or involuntarily terminated and is removed from the network.

### Consensus fault slashing

This penalty is incurred when committing consensus faults. This penalty is applied to storage providers that have acted maliciously against the network's consensus functionality.

## Storage provider accounting

A storage provider’s financial gain or loss is affected by the following three actions:

1. The deposited tokens to act as collateral for their PreCommitted and ProveCommitted Sectors
2. Storage providers earn tokens from block rewards when they are elected to mine a new block and extend the blockchain.
3. Storage providers lose tokens if they fail to prove storage of a sector and are given penalties as a result.

### Balance requirements

A storage provider’s token balance MUST cover ALL of the following:

- **PreCommit Deposits**: When a storage provider PreCommits a Sector, they must supply a "precommit deposit" for the Sector, which acts as collateral. If the Sector is not ProveCommitted on time, this deposit is removed and burned.
- **Initial Pledge**: When a storage provider ProveCommits a Sector, they must supply an "initial pledge" for the Sector, which acts as collateral. If the Sector is terminated, this deposit is removed and burned along with rewards earned by this sector up to a limit.
- **Locked Funds**: When a storage provider receives tokens from block rewards, the tokens are locked and added to the storage provider vesting table to be unlocked linearly over future epochs.

### Faults, Penalties and Fee Debt

**Faults**

A Sector's PoSts must be submitted on time, or that Sector is marked "faulty." There are three types of faults:

- **Declared Fault**: When the storage provider explicitly declares a Sector "faulty" _before_ its Deadline's FaultCutoff. Recall that `WindowPoSt` proofs are submitted per partition for a specific `ChallengeWindow`. A storage provider has to declare the sector as faulty before the `ChallengeWindow` for the particular partition opens. Until the sectors are recovered they will be masked from proofs in subsequent proving periods.
- **Detected Fault**: Partitions of sectors without PoSt proof verification records, which have not been declared faulty before the `FaultCutoff` epoch's deadline are marked as detected faults.
- **Skipped Fault**: If a sector is currently in active or recovering state and has not been declared faulty before, but the storage provider’s PoSt submission does not include a proof for this sector, then this is a "skipped fault" sector (also referred to as "skipped undeclared fault"). In other words, when a storage provider submits PoSt proofs for a partition but does not include proofs for some sectors in the partition, then these sectors are in "skipped fault" state. This is in contrast to the "detected fault" state, where the storage provider does not submit a PoSt proof for any section in the partition at all. The skipped fault is helpful in case a sector becomes faulty after the `FaultCutoff` epoch. Skip faults happen when windowPost process is not able to acquire certain sectors on the disk during the deadline. These sectors can be found in the wdPost message submitted to the chain.

Note that the "skipped fault" allows for sector-wise fault penalties, as compared to partition-wide faults and penalties, as is the case with "detected faults".
