---
title: "Lotus Slasher & Lotus Disputer"
description: "Lotus Slasher and Lotus Disputer are essential services provided by the Filecoin protocol. They help maintain network integrity, prevent bad actors, and reward active participants."
lead: "Lotus Slasher and Lotus Disputer are essential services provided by the Filecoin protocol. They help maintain network integrity, prevent bad actors, and reward active participants."
draft: true
menu:
    lotus:
        parent: "lotus-management"
aliases:
    - /docs/set-up/chain-management/
weight: 455
toc: true
---

# The Lotus Slasher & Lotus Disputer

Lotus Slasher and Lotus Disputer are essential services provided by the Filecoin protocol. They help maintain network integrity, prevent bad actors, and reward active participants. 

The Slasher and Disputer services are designed to be highly efficient and lightweight processes that require minimal resources. Enabling these services will have no detrimental effect on the performance of your Lotus node.

# The Lotus Slasher

The Filecoin protocol enforces penalties for three types of Consensus Faults that can be committed by block producers. To detect and report these faults, any user running a Lotus node can leverage the Lotus Slasher service. This service monitors all incoming blocks for potential Consensus Faults, and invokes the `ReportConsensusFault` method on the respective miner actor. Detailed information about these three Consensus Faults can be found [here](https://github.com/filecoin-project/lotus/blob/dbbcf4b2ee9626796e23a096c66e67ff350810e4/chain/vm/fvm.go#L113-L132).

When a consensus fault is successfully identified by the Lotus Slasher, the block producer responsible for the fault is subjected to a fine equivalent to 5 times the current epoch's block reward value. Additionally, they are ineligible to produce any further blocks for a full finality period of 900 epochs. Furthermore, the offending block producer is prohibited from pre-committing or recovering storage during the same finality period.

The succesful Lotus Slasher operator receives a reward equal to 25% of the current epoch's block reward value.

## Run the Slasher

The Lotus Slasher is already packagaed with Lotus so no additional installation steps are required. You **do not** need to be running `lotus-miner` to operate a Slasher.

The Lotus Slasher functionality is activated by simply providing additional flags to the `lotus daemon` launch command as shown below.

```shell
lotus daemon --slash-consensus=true --slashdb-dir="/your/path"
```

The `--slash-consensus` and `--slashdb-dir` flags are both required to succesfully invoke the Slasher service.

The `--slasher-sender` flag is also provided to optionally set the account to report consensus faults from. If this flag is not set, the default wallet address will be used.


# The Lotus Disputer

Prior to the introduction of [FIP-0010](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0010.md), Storage Providers were required to verify and record proofs of continued data storage in the form of on-chain WindowPoST messages. This approach often led to high costs and bandwidth usage associated with verifying proofs, especially during periods of congestion and rising gas fees. 

To address this issue, [FIP-0010](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0010.md) was proposed and accepted to optimistically accept and record the proofs off-chain, reducing the burden on Storage Providers and network bandwidth by eliminating the need for extensive on-chain proof checking.

Third-party Lotus node operators now enable off-chain verification of accepted WindowPoST proofs through the use of the Lotus Disputer service, utilizing the `DisputeWindowedPoSt` functionality.

In the event that a Lotus Disputer successfully challenges an optimistically accepted Window PoST, the Storage Provider responsible for the faulty proof is fined based on the proportion of the expected block reward they would have received from each incorrectly proved sector. Additionally, all sectors with incorrect proofs are appropriately labelled as faulty. 

The successful Lotus Disputer operator is also rewarded with a fixed `DisputeReward`, which is presently set at 4FIL.

Any Lotus node operator is eligible to run a Lotus Disputer as outlined below.


## Configure the Disputer

The Lotus Disputer is already packagaed with Lotus so no additional installation steps are required. You **do not** need to be running `lotus-miner` to operate a Disputer.

Once the node is fully synced, you can configure `lotus chain disputer` with the following options:

```shell
   --max-fee value  Spend up to X FIL per DisputeWindowedPoSt message
   --from value     optionally specify the account to send messages from
```

## Run the Disputer

Simply run `lotus chain disputer start` to start the disputer. The Disputer will automatically begin to dispute proofs from the current epoch unless a specific height is set using the `--start-epoch` flag.

{{< alert icon="tip" >}}
The Lotus Disputer will take a couple of minutes to fully start. Any `rpc output message buffer` warning messages displayed during the the initiation process can be safely ignored.
{{< /alert >}}
