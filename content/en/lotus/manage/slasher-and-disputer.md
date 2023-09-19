---
title: "Lotus Slasher & Lotus Disputer"
description: "Lotus Slasher and Lotus Disputer are essential services provided by the Filecoin protocol. They help maintain network integrity, prevent bad actors, and reward active participants."
lead: "Lotus Slasher and Lotus Disputer are essential services provided by the Filecoin protocol. They help maintain network integrity, prevent bad actors, and reward active participants."
draft: false
menu:
    lotus:
        parent: "lotus-management"
aliases:
    - /docs/set-up/slasher-and-disputer/
weight: 455
toc: true
---

The Slasher and Disputer services are designed to be highly efficient and lightweight processes that require minimal resources. Enabling these services will have no detrimental effect on the performance of your Lotus node.

# Lotus Slasher

The Filecoin protocol enforces penalties for three types of Consensus Faults that can be committed by block producers. To detect and report these faults, any user running a Lotus node can leverage the Lotus Slasher service. This service monitors all incoming blocks for potential Consensus Faults, and invokes the `ReportConsensusFault` method on the respective miner actor. Detailed information about these three Consensus Faults can be found [here](https://github.com/filecoin-project/lotus/blob/dbbcf4b2ee9626796e23a096c66e67ff350810e4/chain/vm/fvm.go#L113-L132).

When a consensus fault is successfully identified by the Lotus Slasher, the block producer responsible for the fault is subjected to a fine equivalent to 5 times the current epoch's block reward value. Additionally, they are ineligible to produce any further blocks for a full finality period of 900 epochs. Furthermore, the offending block producer is prohibited from pre-committing or recovering storage during the same finality period.

The successful Lotus Slasher operator receives a reward equal to 25% of the current epoch's block reward value.

## Run the Slasher

The Lotus Slasher is already packagaed with Lotus so no additional installation steps are required. You **do not** need to be running `lotus-miner` to operate a Slasher.

The Lotus Slasher functionality is configured and activated in the Lotus daemon `config.toml`. Simply set `EnableConsensusFaultReporter` to `true` and provide a local directory path for `ConsensusFaultReporterDataDir`. 
A specific wallet address may be set using the `ConsensusFaultReporterAddress` which will be responsible for submitting `ReportConsensusFault` messages. If no wallet address is specified, the default wallet will be used.

```toml
[FaultReporter]
  # EnableConsensusFaultReporter controls whether the node will monitor and
  # report consensus faults. When enabled, the node will watch for malicious
  # behaviors like double-mining and parent grinding, and submit reports to the
  # network. This can earn reporter rewards, but is not guaranteed. Nodes should
  # enable fault reporting with care, as it may increase resource usage, and may
  # generate gas fees without earning rewards.
  #
  # type: bool
  # env var: LOTUS_FAULTREPORTER_ENABLECONSENSUSFAULTREPORTER
  EnableConsensusFaultReporter = true

  # ConsensusFaultReporterDataDir is the path where fault reporter state will be
  # persisted. This directory should have adequate space and permissions for the
  # node process.
  #
  # type: string
  # env var: LOTUS_FAULTREPORTER_CONSENSUSFAULTREPORTERDATADIR
  ConsensusFaultReporterDataDir = "/path/to/slasher/directory"

  # ConsensusFaultReporterAddress is the wallet address used for submitting
  # ReportConsensusFault messages. It will pay for gas fees, and receive any
  # rewards. This address should have adequate funds to cover gas fees.
  #
  # type: string
  # env var: LOTUS_FAULTREPORTER_CONSENSUSFAULTREPORTERADDRESS
  ConsensusFaultReporterAddress = "f1123..."
```

# Lotus Disputer

WindowPoSTs are important proofs submitted daily to ensure continued storage of all data on the Filecoin network. These proofs are accepted and recorded off-chain, reducing the burden on Storage Providers and network bandwidth by eliminating the need for extensive on-chain proof checking.

Instead, the network relies on third-party Lotus node operators who enable off-chain verification of accepted WindowPoST proofs through the use of the Lotus Disputer service, utilizing the `DisputeWindowedPoSt` functionality.

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
