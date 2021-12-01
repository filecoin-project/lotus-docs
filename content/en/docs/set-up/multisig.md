---
title: "Multisig"
description: "A multi-signature (multisig) wallet refers to a wallet that requires multiple keys to authorize a `FIL` transactions."
lead: "A multi-signature (multisig) wallet refers to a wallet that requires multiple keys to authorize a `FIL` transactions."
draft: false
menu:
    docs:
        parent: "node-set-up"
weight: 70
toc: true
---

## Create a multsig wallet

Use `lotus msig create` to a multisig wallet:

```shell with-output
lotus msig create signerAddress1 signerAddress2 signerAddress3...
```
```
Created new multisig:  f01002 f24mscgjtgymb3dqtm4ycwydh4nhygktgxm3nbgva
```

In the above example, `f01002` is the id address and `f24mscgjtgymb3dqtm4ycwydh4nhygktgxm3nbgva` is the actor address. Both addresses represent the newly created multisig wallet.

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

Other signers can use `lotus msig approve` to approve the messages:

```shell
lotus msig approve walletAddress transactionID proposerAddress destinationAddress value
```

The value of `transactionID`, `proposerAddress`, `destinationAddress` and `value` must match the values used in the proposal.

## Cancel a pending multisig transaction


Use `lotus msig cancel` to cancel a pending multisig transaction. 

```shell with-output
lotus msig cancel walletAddress transactionID destinationAddress value

```
The value of `walletAddress`, `transactionID`, `destinationAddress` and `value` must match the values used in the proposal.

Output of a successful cancel process.
```
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
## Inspect a multisig transaction


Use `lotus-shed msg` to inspect the params of a transaction.

```shell with-output
lotus lotus-shed msg messageID

```
Output of a successful inspection on a multisig transaction.

```
Signed:
CID: bafy2bzacedjtwkmqjo3zdx2vdaq7pku55fy22vqlizmviofxznm7smy2hexme
HEX: 828a0055029bafccef76d1c6dddd085a6748745619ec4562735501d0ae53fafa449c3f51d75f0463324c4f788dfcac07401a002f7bfd4400018c0444000187e6025823845501669d098ed7d29ee8af633439211d7cf25b4f6cb049004563918244f400000040584201a1cf805c298614d0cd550313489566d8e925e4e8cdd2ab6a878e5b1ab358da9e1f0a31801260b6f4f8536506304c5bd9e528570adb4093178c3e6496302062af00
B64: gooAVQKbr8zvdtHG3d0IWmdIdFYZ7EVic1UB0K5T+vpEnD9R118EYzJMT3iN/KwHQBoAL3v9RAABjAREAAGH5gJYI4RVAWadCY7X0p7or2M0OSEdfPJbT2ywSQBFY5GCRPQAAABAWEIBoc+AXCmGFNDNVQMTSJVm2Okl5OjN0qtqh45bGrNY2p4fCjGAEmC29PhTZQYwTFvZ5ShXCttAkxeMPmSWMCBirwA=
JSON: {
  "Message": {
    "Version": 0,
    "To": "t2tox4z33w2hdn3xiiljtuq5cwdhwekytt6zfw7uy",
    "From": "t12cxfh6x2isod6uoxl4cggmsmj54i37fmn43wboy",
    "Nonce": 7,
    "Value": "0",
    "GasLimit": 3111933,
    "GasFeeCap": "101380",
    "GasPremium": "100326",
    "Method": 2,
    "Params": "hFUBZp0JjtfSnuivYzQ5IR188ltPbLBJAEVjkYJE9AAAAEA=",
    "CID": {
      "/": "bafy2bzacebtldblnlop5up3hq7w4c4cwkyja6jlqbwvf3hca72rpgscfeexby"
    }
  },
  "Signature": {
    "Type": 1,
    "Data": "oc+AXCmGFNDNVQMTSJVm2Okl5OjN0qtqh45bGrNY2p4fCjGAEmC29PhTZQYwTFvZ5ShXCttAkxeMPmSWMCBirwA="
  },
  "CID": {
    "/": "bafy2bzacedjtwkmqjo3zdx2vdaq7pku55fy22vqlizmviofxznm7smy2hexme"
  }
}

---
Signed Message Details:
Signature(hex): a1cf805c298614d0cd550313489566d8e925e4e8cdd2ab6a878e5b1ab358da9e1f0a31801260b6f4f8536506304c5bd9e528570adb4093178c3e6496302062af00
Signature(b64): oc+AXCmGFNDNVQMTSJVm2Okl5OjN0qtqh45bGrNY2p4fCjGAEmC29PhTZQYwTFvZ5ShXCttAkxeMPmSWMCBirwA=
Signature type: 1 (secp256k1)
-------
Unsigned:
CID: bafy2bzacebtldblnlop5up3hq7w4c4cwkyja6jlqbwvf3hca72rpgscfeexby
HEX: 8a0055029bafccef76d1c6dddd085a6748745619ec4562735501d0ae53fafa449c3f51d75f0463324c4f788dfcac07401a002f7bfd4400018c0444000187e6025823845501669d098ed7d29ee8af633439211d7cf25b4f6cb049004563918244f400000040
B64: igBVApuvzO920cbd3QhaZ0h0VhnsRWJzVQHQrlP6+kScP1HXXwRjMkxPeI38rAdAGgAve/1EAAGMBEQAAYfmAlgjhFUBZp0JjtfSnuivYzQ5IR188ltPbLBJAEVjkYJE9AAAAEA=
JSON: {
  "Version": 0,
  "To": "t2tox4z33w2hdn3xiiljtuq5cwdhwekytt6zfw7uy",
  "From": "t12cxfh6x2isod6uoxl4cggmsmj54i37fmn43wboy",
  "Nonce": 7,
  "Value": "0",
  "GasLimit": 3111933,
  "GasFeeCap": "101380",
  "GasPremium": "100326",
  "Method": 2,
  "Params": "hFUBZp0JjtfSnuivYzQ5IR188ltPbLBJAEVjkYJE9AAAAEA=",
  "CID": {
    "/": "bafy2bzacebtldblnlop5up3hq7w4c4cwkyja6jlqbwvf3hca72rpgscfeexby"
  }
}

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
Message Details:
Value: 5 FIL
Max Fees: 0 FIL
Max Total Cost: 5 FIL
Method: Send
Params: {}
```