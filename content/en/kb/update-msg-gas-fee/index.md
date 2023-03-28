---
title: "Replace message with updated gas fee"
description: "This is a solution to fix messages stuck in mpool due to low gas fee."
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["mpool"]
---

## Problem

The following error shows up in the lotus and lotus-miner logs

```shell
error sending message: GasEstimateMessageGas error: estimating gas used: message execution failed: exit 16, reason: no valid updates (RetCode=16)
```

Typically, Lotus components use `MpoolPushMessage` API to send messages to the chain. This API does an automatic calculation of the required gas fee. Sometimes, this calculation does not hold valid in the next epoch and message gets stuck in the `mpool` due to the low gas fee.

## Environment

- Calibnet
- Mainnet 

## Resolution

The messages stuck in `mpool` due to low gas fee can be updated with a higher gas fee. This allows them to be included in the blocks and executed on chain.

1. Check the current base fee prices.

    ```shell
    lotus chain head | awk 'NR==1{print; exit}' | xargs lotus chain getblock | jq -r .ParentBaseFee
    ```
  
2.  Replace the message with updated gas fee in the `mpool` using the below command
    
    ```shell
    lotus mpool replace --gas-premium <previous GasPremium * 1.25> --gas-feecap <output of above> <address> <nonce>
    ```
