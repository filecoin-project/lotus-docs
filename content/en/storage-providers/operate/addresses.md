---
title: "Addresses"
description: "A miner can be configured with an owner address, a worker address, and additional control addresses. These allow granularity in how the funds sent and received from the miner are managed and provide additional security to the mining operation."
lead: "A miner can be configured with an owner address, a worker address, and additional control addresses. These allow granularity in how the funds sent and received from the miner are managed and provide additional security to the mining operation."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-operate"
        identifier: "storage-provider-addresses"
aliases:
    - /docs/storage-providers/addresses/
weight: 310
toc: true
---

During miner initialization, a _miner actor_ is created on the chain, and this actor gives the miner its ID `f0...`. The miner actor is in charge of collecting all the payments sent to the miner. For example, when a payment is sent for honoring the different types of deals, that payment goes to the miner actor, not the miner itself.

The Lotus Miner daemon performs the operations required by the network and can use different Lotus node wallets to pay the fees or interact with the _miner actor_. Check out the set up section for more information on how to [manage Lotus wallets]({{< relref "manage-fil" >}}).

The currently configured addresses used by a miner can be listed with:

```shell
lotus-miner actor control list
```

The different types of addresses associated with a miner are described below:

## The owner address

The owner address corresponds to a Lotus node address provided during the miner initialization. The _owner address_ is only needed when:

- Changing the owner or the worker address in the _miner actor_.
- Withdrawing balance from the _miner actor_.
- Submit _WindowPoSts_, **unless _control addresses_ are defined and have enough balance** (continued below).

The address chosen to be the miner's _owner address_ is designed to be kept offline in _cold storage_, or backed up by a [hardware wallet]({{< relref "manage-fil" >}}). In production environments, we strongly recommend using separate _owner_ and _worker_ addresses.

The owner address can be updated with the following command:

```shell
lotus-miner actor set-owner --really-do-it <new address> <old address> && lotus-miner actor set-owner --really-do-it <new address> <new address>
```

The old and the new address must be available to the Lotus node. You can [create a new address or import an existing one]({{< relref "manage-fil" >}}).

{{< alert >}}
Want to add an additional layer of security for the owner's address? Check out how to setup a msig as a owner address [here.]({{< relref "tutorials/lotus-miner/msig-as-owner" >}})
{{< /alert >}}

## The worker address

The _worker address_ is used to send and pay for day-to-day operations performed by the miner:

- Initializing the miner on the chain.
- Changing the miner peer id or the multiaddresses.
- Interacting with market and payment channel actors.
- Signing new blocks.
- Submitting proofs, declaring faults. _WindowPoSts_ are submitted using the _worker address_ if:
  - Control addresses are not defined or do not have enough balance.
  - The _owner address_ does not have enough balance.

Unlike the _owner address_, the address set as the miner's _worker address_ should be part of the Lotus local wallet and accessible by the miner. The Lotus Miner will trigger all the necessary transactions using the Lotus node to which it is connected. The _worker address_ must have enough funds to pay for the day-to-day operations of the miner, including initialization.

## Control addresses

_Control addresses_ are used to submit _WindowPoSts_ proofs to the chain. _WindowPoSt_ is the mechanism through which storage is verified in Filecoin and is required by miners to submit proofs for all sectors every 24 hours. Those proofs are submitted as messages to the blockchain and therefore need to pay the respective fees.

Many mining-related actions require sending messages to the chain, but not all of those are as high-value as _WindowPoSts_. By using _control addresses_ you can stop the first transaction holding up a line of transactions. This blocking problem is known as [head-of-line blocking.](https://en.wikipedia.org/wiki/Head-of-line_blocking)

Multiple _control addresses_ can be created and configured. The first _control address_ that has enough funds to submit a _WindowPoSt_ transaction will be used. If there are no control addresses with sufficent funds then the owner address will be used. If the owner address has insufficent funds, or is unavailable, then the worker address will be used to submit a _WindowPoSt_.

Otherwise, Lotus fails over to the _owner_ and ultimately to the _worker_ address.

To set up a _control address_:

1. Create a new address and send it some funds for gas fees:

   ```shell with-output
   lotus wallet new bls
   ```

   ```output
   f3defg...
   ```

   ```shell
   lotus send --from <address> f3defg... 100
   ```

2. Inform the miner of the new address:

   ```shell with-output
   lotus-miner actor control set --really-do-it f3defg...
   ```

   ```output
   Add f3defg...
   Message CID: bafy2...
   ```

3. Wait for the message to land on chain:

   ```shell with-output
   lotus state wait-msg bafy2...
   ```

   ```output
   ...
   Exit Code: 0
   ...
   ```

4. Check the miner control address list to make sure the address was correctly added:

   ```shell with-output
   lotus-miner actor control list
   ```

   ```output
   name       ID      key        use              balance
   owner      f01234  f3defg...                   300 FIL
   worker     f01111  f3abcd...  other            300 FIL
   control-0  f02222  f3defg...  post             100 FIL
   ```

Repeat this procedure to add additional addresses.

5. You can specify other actor to check control address:

```shell
lotus-miner --actor f01000 actor control list
```

### Use control addresses for all messages

Clean up the tasks required for your worker address by setting your control addresses to perform pre-commits, commits, publish deals and terminate. By default, the worker address will act as a fallback address if any of the control addresses are out of funds. See .lotusminer `config.toml` for more information. 

1. Create five control addresses. Control addresses can be any _type_ of address: `secp256k1 ` or `bls`:

   ```shell with-output
   lotus wallet new bls
   ```

   ```shell
   f3defg...
   ```

   ```shell with-output
   lotus wallet new bls
   ```

   ```output
   f3vst2...
   ```

   ```shell with-output
   lotus wallet new bls
   ```

   ```output
   f3uuyr...
   ```

   ```shell with-output
   lotus wallet new bls
   ```

   ```output
   f3wywg...
   ```

   ```shell with-output
   lotus wallet new bls
   ```

   ```output
   f3qtma...
   ```

   ```shell with-output
   lotus wallet list
   ```

   ```output
   Address    Balance  Nonce  Default
   f3defg...  0 FIL    0      X
   f3vst2...  0 FIL    0
   f3uuyr...  0 FIL    0
   f3wywg...  0 FIL    0
   f3qtma...  0 FIL    0
   ```

2. Add some funds into those five addresses.
3. Wait for around 5 minutes for the addresses to be assigned IDs.
4. Get ID of those addresses:

   ```shell with-output
   lotus wallet list -i
   ```

   ```output
    Address    ID        Balance                   Nonce  Default
    f3defg...  f02222    0.59466768102284489 FIL   1      X
    f3vst2...  f03333    0.4 FIL                   0
    f3uuyr...  f04444    0.4 FIL                   0
    f3wywg...  f05555    0.4 FIL                   0
    f3qtma...  f06666    0.4 FIL                   0
   ```

5. Add control addresses:

   ```shell with-output
   lotus-miner actor control set --really-do-it f02222 f03333 f04444 f05555 f06666
   ```

   ```output
    Add f3defg...
    Add f3vst2...
    Add f3uuyr...
    Add f3wywg...
    Add f3qtma...
    Message CID: bafy2bzacecfryzmwe5ghsazmfzporuybm32yw5q6q75neyopifps3c3gll6aq
   ```

3. Wait for around 5 minutes to be sure that the message has landed.

6. Add the newly created addresses into the miner config under the `[Addresses]` section:

   ```yaml
   [Addresses]
       PreCommitControl = ["f3vst2..."]
       CommitControl = ["f3uuyr..."]
       TerminateControl = ["f3qtma..."]
       DealPublishControl = ["f3wywg..."]
   ```

7. Restart `lotus-miner`.

8. Done! 

   ```shell with-output
     lotus-miner actor control list
   ```

   ```output
   name       ID      key        use              balance
   owner      f01234  f3zdes...                   300 FIL
   worker     f01111  f3abcd...  other            0.4 FIL
   control-0  f02222  f3defg...  post             0.4 FIL
   control-1  f03333  f3vst2...  precommit        0.4 FIL
   control-2  f04444  f3uuyr...  commit           0.4 FIL
   control-3  f05555  f3wywg...  deals            0.4 FIL
   control-4  f06666  f3qtma...  terminate        0.4 FIL
   ```

## Managing balances

Get the balances associated with a miner wallet by calling `info`:

```shell with-output
lotus-miner info
```

```output
Miner: f01000 (32 GiB sectors)
Power: 1 Pi / 1 Ei (100.0000%)
        Raw: 1 PiB / 1 PiB (100.0000%)
        Committed: 1 PiB
        Proving: 1 PiB
Projected average block win rate: 1000/week (every 1h0m0s)
Projected block win with 99.9% probability every 2h0m0s
(projections DO NOT account for future network and miner growth)

Miner Balance:    123456.789 FIL
      PreCommit:  0
      Pledge:     122965.789 FIL
      Vesting:    250 FIL
      Available:  250 FIL
Market Balance:   0 FIL
       Locked:    0 FIL
       Available: 0 FIL
Worker Balance:   500 FIL
       Control:   600 FIL
Total Spendable:  1350 FIL
```

In this example, the miner ID is `f01000`, it has a total balance of `123456.789 FIL`, and an available balance of `250 FIL` that can be used as collateral or to pay for the pledge. The worker balance is `500 FIL` and the control balance is `600 FIL`. Control balance combines all funds in the control addresses and Total Spendable combines Available, Worker Balance and Control balances.

Control addresses is a good way to avoid stuck messages in your local mpool, but it can still happen occasionally.
A good pratice is to keep track of the basefee and always have enough FIL in the control addresses. 
Adjust your fees limits in .lotusminer `config.toml` accordingly. 

   ```yaml
   [Fees]
       MaxPreCommitGasFee = "0.025 FIL"
       MaxCommitGasFee = "0.05 FIL"
       MaxTerminateGasFee = "0.5 FIL"
       MaxWindowPoStGasFee = "5 FIL"
       MaxPublishDealsFee = "0.05 FIL"
   ```

 ```output
   name       ID      key        use              balance
   owner      f01234  f3zdes...                   300 FIL
   worker     f01111  f3abcd...  other            50 FIL
   control-0  f02222  f3defg...  post             10 FIL
   control-1  f03333  f3vst2...  precommit        100 FIL
   control-2  f04444  f3uuyr...  commit           200 FIL
   control-3  f05555  f3wywg...  deals            50 FIL
   control-4  f06666  f3qtma...  terminate        10 FIL
   ```


## Withdrawing funds from the Miner actor

Transfer funds from the Miner actor address to the owner address by calling `actor withdraw`:

```shell
lotus-miner actor withdraw <amount>
```

{{< alert icon="tip" >}}
Tip: If no amount entered it will withdraw all Available funds. 
{{< /alert >}}


{{< alert >}}
The owner's address will need to be available in the Lotus node and have enough funds to pay for the gas for this transaction. Cold addresses will need to be temporally imported for the operation to succeed.
{{< /alert >}}
