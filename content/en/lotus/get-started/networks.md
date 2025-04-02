---
title: "Networks"
description: "This page provide details on available Filecoin networks and their uses."
draft: false
menu:
    lotus:
        parent: "lotus-get-started"
        identifier: "lotus-get-started-networks"
aliases:
    - /about-filecoin/networks
weight: 110
toc: true
---

There are three networks available for Filecoin:

- [Mainnet](#mainnet), the only production Filecoin network.
- [Calibration](#calibration), the primary testing network for Filecoin.
- [Devnet]({{<relref "../../lotus/developers/local-network/">}}), the local development network designed to run with minimal resources for development testing.

### Mainnet

Mainnet is the primary Filecoin network. Mainnet began on block 148,888. It supports 32 GiB and 64 GiB sectors.

**Genesis**:

- CAR File: `QmavMCf95w2UMYGD1J5GpHcWBWXR2jTFYmtAkgeroMmpk1`
- Reset Timestamp: `2020-08-24T22:00:00Z`
- Genesis Block CID: `bafy2bzacecnamqgqmifpluoeldx7zzglxcljo6oja4vrmtj7432rphldpdmm2`
- sha1 Digest: `4782cb42b4b01793b5cd9f593cc3dc87b6d3c7b4`

**Network parameters**:

- Supported Sector Sizes: `32 GiB` and `64 GiB`
- Consensus Miner Min Power: `10 TiB`
- Epoch Duration Seconds: `30`
- Expected Leaders per Epoch: `5`
- WindowPoSt Proving Period: `2880`
- WindowPoSt Challenge Window: `60`
- WindowPoSt Period Deadlines: `48`
- Pre-Commit Challenge Delay: `150`

**Bootstrap peers**:

See https://github.com/filecoin-project/lotus/blob/master/build/bootstrap/mainnet.pi

**Resources**:

- [Latest chain snapshot (lightweight)](https://forest-archive.chainsafe.dev/latest/mainnet/)
- [Status page and incidents](https://filecoin.statuspage.io/)
- [Stats dashboard: Starboard](https://dashboard.starboard.ventures/dashboard)
- [Slack Channel for Updates: #fil-network-announcements](https://filecoinproject.slack.com/archives/C01AC6999KQ)
- [Slack Channel for Questions: #fil-help](https://filecoinproject.slack.com/archives/CEGN061C5)
- [Block explorer: Filfox](https://filfox.info/en)
- [Block explorer: Filscan](https://filscan.io/)
- [Block explorer: Filutils](https://www.filutils.com/)
- [Block explorer: Beryx](https://beryx.io)

### Calibration

Calibration network is the most realistic simulation of the Filecoin mainnet:

- Prospective storage providers can experience realistic sealing performance and hardware requirements due to the use of final proofs constructions and parameters.
- Prospective storage clients can store and retrieve real data on the network. Clients can participate in deal-making workflows and storage + retrieval functionality.
- Same sector size as mainnet. The calibration network supports 32 GiB and 64 GiB sectors.

**Maintainer**: [ChainSafe](https://chainsafe.io)

**Genesis**:

- CAR File: `QmY581cXXtNwHweiC69jECupu9EBx274huHjSgxPNv1zAAj`
- Reset Timestamp: `2021-02-19T23:10:00Z`
- Genesis Block CID: `bafy2bzaceapb7hfdkewspic7udnogw4xnhjvhm74xy5snwa24forre5z4s2lm`
- sha1 Digest: `944c0c13172b9f552dfed5dfaffaba95113c8254`

**Network parameters**:

- Supported Sector Sizes: `32 GiB` and `64 GiB`
- Consensus Miner Min Power: `32 GiB`
- Epoch Duration Seconds: `30`
- Expected Leaders per Epoch: `5`
- WindowPoSt Proving Period: `2880`
- WindowPoSt Challenge Window: `60`
- WindowPoSt Period Deadlines: `48`
- Pre-Commit Challenge Delay: `150`

**Bootstrap peers**:

See https://github.com/filecoin-project/lotus/blob/master/build/bootstrap/calibnet.pi

**Resources**:

- [Latest chain snapshot (lightweight)](https://forest-archive.chainsafe.dev/latest/calibnet/)
- [Calibration Faucet - ChainSafe](https://faucet.calibnet.chainsafe-fil.io/funds.html)
- [Calibration Faucet - Zondax](https://beryx.zondax.ch/faucet)
- [Slack Channel for Updates: #fil-network-announcements](https://filecoinproject.slack.com/archives/C01AC6999KQ)
- [Slack Channel for Questions: #fil-net-calibration-discuss](https://filecoinproject.slack.com/archives/C01D42NNLMS)
- [Block explorer - Filfox for Calibration](https://calibration.filfox.info/en)
- [Block explorer - Filscan for Calibration](https://calibration.filscan.io/)
- [Block explorer - Beryx for Calibration](https://beryx.io)

### Devnet

The development network is designed to run locally with minimal resources for development testing. You can read the [setup guide here]({{<relref "../../lotus/developers/local-network/">}}).

**Network parameters**:

- Supported Sector Sizes: `2 KiB` and `8 MiB`
- Consensus Miner Min Power: `2 KiB`
- Epoch Duration Seconds: `4`
- Pre-Commit Challenge Delay: `10`
