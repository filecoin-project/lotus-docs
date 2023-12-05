---
title: "Multisignature address as owner address"
description: "This is a step-by-step guide on how to set a multisignature address as the owner address of a storage provider"
lead: "This is a step-by-step guide on how to set a multisignature address as the owner address of a storage provider. This tutorial is for experienced Lotus users. Setting a multisignature address as an owner address has some serious UX drawbacks but adds additional layers of security."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 225
toc: true
---

## Prerequisites

To change the owner address of the storage provider to a multisignature address you will need to have:

- A [multisignature address]({{< relref "../../../lotus/manage/multisig/" >}}).
- [Lotus-shed]({{< relref "../../../kb/lotus-shed-not-installed/" >}}) installed.

### Advantages

Using a multisignature address adds a lot of security to the owner address as multiple signers need to sign a message for it to be executed.

### Disadvantages

Some commands like `lotus-miner actor withdraw` currently do not support multisignature addresses, and you will need to use the `lotus-shed` tool to withdraw from the available actor balance.

## Change owner to a msig address

First one needs to initiate a change of the owner address from the original single signature address to the multisignature address:

```shell
lotus-miner actor set-owner --really-do-it <msigID> <current-owner-address>
```

After the initial change, one of the multisignature address signers needs to propose the change to the other multisignature signers:

```shell
lotus-shed miner-multisig --from <msig-signer-1> --multisig <msigID> --miner <minerID> propose-change-owner <new-owner-address>
```

Depending on what kind of signature threshold the multisignature address has, the rest of the multisignature signers need to approve the owner change proposal message:

```shell
lotus-shed miner-multisig --from <msig-signer-2> --multisig <msigID> --miner  <minerID> approve-change-owner <msigID> <txnId> <proposer-address>
```

To find the txnId, you can inspect the multisignature address `lotus msig inspect <msigID>`.

## Withdraw balance with multisig owner

The `lotus-miner actor withdraw` command does not support withdrawals from multisignature owner addresses. To initiate a withdrawal with a multisignature owner address you currently need to use the `lotus-shed` tool.

One of the multisignature signers needs to propose the withdrawal:

```shell
lotus-shed miner-multisig --from <msig-signer-1> --multisig <msigID> --miner <MinerID> propose-withdraw <amount>
```

The other signers of the multisignature address will have to approve the withdrawal. They can approve the withdrawal request by:

```shell
lotus-shed miner-multisig --from <msig-signer-2> --multisig <msigID> --miner <MinerID> approve-withdraw <amount> <txnID> <proposer-address>
```

## Reverting back to a single signature address

Propose the change of the owner address from one of the multisignature signers:

```shell
lotus-shed miner-multisig --from <msig-signer-1> --multisig <msigID> --miner <MinerID> propose-change-owner <new-owner-address>
```

Depending on what kind of signature threshold the multisignature address has, the rest of the multisignature signers need to approve the owner change proposal message:

```shell
lotus-shed miner-multisig --from <msig-signer-2> --multisig <msigID> --miner <MinerID> approve-change-owner <new-owner-address> <txnId> <proposer-address>
```

Lastly, the single signature address needs to confirm the change of ownership with:

```shell
lotus-miner actor set-owner --really-do-it <new-owner-address> <new-owner-address>
```