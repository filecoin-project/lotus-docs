---
title: "Multisig"
description: "A multi-signature (multisig) wallet refers to a wallet that requires multiple keys to authorize a `FIL` transactions."
lead: "A multi-signature (multisig) wallet refers to a wallet that requires multiple keys to authorize a `FIL` transactions."
draft: false
menu:
    lotus:
        parent: "lotus-management"
aliases:
    - /docs/set-up/multisig/
weight: 415
toc: true
---

## Create a multisig wallet

You can use the `lotus msig create` command to create a multisig wallet:

```shell with-output
lotus msig create signerAddress1 signerAddress2 signerAddress3...
```
```
Created new multisig:  f01002 f24mscgjtgymb3dqtm4ycwydh4nhygktgxm3nbgva
```

In the above example, the `f01002` output is the id address and `f24mscgjtgymb3dqtm4ycwydh4nhygktgxm3nbgva` is the actor address. Both addresses represent the newly created multisig wallet.

By default, signatures from all signers are required for approving a transaction. However, you can change the number of required approvals by using the `--required` option:

```shell
lotus msig create --required=2 signerAddress1 signerAddress2 signerAddress3
```

The above example creates a multisig wallet with three signers but only requires two approvals for a transaction to be executed.

## Propose and approve a transaction

Any signer of a multisig wallet can _propose_ a transaction. The _proposer_ automatically approves a transaction upon the proposal. A transaction will only be executed when the number of approvals received equals the number of required approvals. A [multisig wallet can be inspected](#inspect-a-multisig-wallet) to get the number of required approvals. If a multisig wallet only requires one signer, then a transaction will be executed immediately upon its proposal.

Use `lotus msig propose` to propose a transaction:

````shell with-output
lotus msig propose --from=proposerAddress walletAddress destinationAddress value
````
````
send proposal in message:  bafy2bzaceajm2mghc5rludlbcr3bnpqgcz5m6gmldq6ycrc4trkejz36tnrqe
Transaction ID: 0
````

In the above example `bafy2bzaceajm2mghc5rludlbcr3bnpqgcz5m6gmldq6ycrc4trkejz36tnrqe` is the `messageID`, and `0` is the `transactionID`.

Other signers can then use `lotus msig approve` to approve this messages:

```shell
lotus msig approve walletAddress transactionID proposerAddress destinationAddress value
```

The value of `transactionID`, `proposerAddress`, `destinationAddress` and `value` must match the values used in the proposal.

## Cancel a pending multisig proposal

Use `lotus msig cancel` to cancel a pending multisig transaction. 

```shell
lotus msig cancel walletAddress transactionID destinationAddress value
```

The value of `walletAddress`, `transactionID`, `destinationAddress` and `value` must match the values used in the proposal.

Output of a successful cancel process.

```shell
sent cancel in message:  bafy2bzacebjy2limeu6mw4b6x5yqgdupxaqabprojwu72xlfhwkhgb5jcyr7c
```
## Inspect a multisig wallet

Use `lotus msig inspect` to get information about the multisig wallet:

```shell with-output
lotus msig inspect walletaddress
```
```
Balance: 0 FIL
Spendable: 0 FIL
Threshold: 2 / 3 # number of signature required / number of signers the wallet has
Signers:
ID      Address
t01001  t1ai2gcr2xlpyxcbjlegojbpr3ovdyfdyzigjoyza
t0100   t3r4d3avth4agwxy6ko35reeuydcqaa6cq4mt6owg3zjq23pxqc6xvn7scb43dyhaf2cjnjhtioek6innbpgda
t01003  t3rpukrggza4jjt6vpihiqoekth6tiopzhvxbp36qhrzfu4xpk6n3mxo5geh6bdavkkkhqk7owt2an2wrundtq
Transactions:  1
ID      State    Approvals  To                                         Value   Method   Params
0       pending  1          t1fjswymsauvfh5zxw34t2pgz7iev2fn56unyw6ci  20 FIL  Send(0)
```

## Changing the approval threshold

You can propose setting a different signing threshold on a multisignature wallet with the `lotus msig propose-threshold` command.

```shell
lotus msig propose-threshold --from signerAddress multisigAddress newThreshold
```

This will send a propose message that the other signers will need to approve. The new threshold will be approved when the old `propose-threshold` has been met.

## Inspect a multisig proposal
Use `lotus-shed msg` to inspect the params of a message. The `lotus-shed` tool can be installed [following the steps here]({{< relref "../../kb/lotus-shed-not-installed/" >}})

```shell
lotus-shed msg messageID
```

Output of a successful inspection on a multisig message.

```plaintext
---
Message Details:
Value: 0 FIL
Max Fees: 0.00000031548776754 FIL
Max Total Cost: 0.00000031548776754 FIL
Method: Propose
Params: {
  "To": "t1m2oqtdwx2kporl3dgq4schl46jnu63fqwchf4wq",
  "Value": "5000000000000000000",
  "Method": 0,
  "Params": null
}
---
Params message:
Msig Propose:
HEX: 845501669d098ed7d29ee8af633439211d7cf25b4f6cb049004563918244f400000040
B64: hFUBZp0JjtfSnuivYzQ5IR188ltPbLBJAEVjkYJE9AAAAEA=
JSON: {
  "To": "t1m2oqtdwx2kporl3dgq4schl46jnu63fqwchf4wq",
  "Value": "5000000000000000000",
  "Method": 0,
  "Params": null
}

---
```
