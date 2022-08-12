---
title: "Remote lotus-wallet management"
description: "This is a step-by-step guide on how to set up the lotus-wallet for remote wallet management of the lotus-miner."
lead: "This is a step-by-step guide on how to set up the lotus-wallet for remote wallet management of the lotus-miner. This tutorial is for experienced Lotus users."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 225
toc: true
---

## Prerequisites

- [lotus-wallet](../../) installed

### Advantages

Using lotus-wallet allows you to 


## Filtering rules
`lotus-wallet` api tokens can carry filtering rules, limiting what actions can be performed with the token.

### Examples

### Special rules

These rules are valid anywhere

- `{"Accept":{}}` - Finish rule execution, accept action
- `{"Reject":{}}` - Finish rule execution, reject action
- `[Rule...], {"First": [Rule...]}` - Accepts when at least one sub-rule accepts; Stops on first Accept or Reject

### Action rules

These rules

- `{"New": Rule}` - If WalletNew is called, execute the sub-rule
- `{"Sign": Rule}` - If WalletSign is called, execute the sub-rule

### Sign rules

- `{"Signer": {"Addr":["fXXX",..], "Next": Rule}}` - Check that the signer address is one of the specified addresses
- `{"Message": Rule}` - WalletSign signing a chain message
- `{"Block": Rule}` - WalletSign signing a block header
- `{"DealProposal": Rule}` - WalletSign signing a deal proposal

### Messages rules

- `{"Source": {"Addr":["fXXX",..], "Next": Rule}}` - Check that the source address is one of the specified addresses
- `{"Destination": {"Addr":["fXXX",..], "Next": Rule}}` - Check that the destination address is one of the specified addresses
- `{"Method": {"Method":[number..], "Next": Rule}}` - Check that the method number is one of the specified numbers
- `{"Value":{("LessThan"|"MoreThan"): "[fil]", "Next": Rule}}` - Check that message value is less/more that the specified value
- `{"MaxFee":{("LessThan"|"MoreThan"): "[fil]", "Next": Rule}}` - Check that maximum message fees are less/more that the specified value.

### Block rules

- `{"Miner": {"Addr":["fXXX",..], "Next": Rule}}` - Check that the block miner address is one of the specified addresses