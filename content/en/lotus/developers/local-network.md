---
title: "Devnet - Local network"
description: "This tutorial describes how to set up and run a local Filecoin network (devnet) with 2 KiB sectors and root key holders using the slightly different Lotus binaries. A devnet is useful for developing applications and testing features, like Filecoin+ (Fil+)."
lead: "This section tutorial shows how to set up and run a local Filecoin network (devnet) with 2 KiB sectors and root key holders using the slightly different Lotus binaries. A devnet is useful for developing applications and testing features, like Filecoin+ (Fil+)."
draft: false
menu:
    lotus:
        parent: "lotus-developers"
        identifier: "developers-networks-local-network"
weight: 105
toc: true
aliases:
    - /docs/developers/developer-network
    - /docs/developers/local-network/
    - /developers/local-network/
    - /developers/devnet/
---

If you are unfamiliar with setting up and running a devnet, it's highly recommended that you do so without Fil+ first.

Before completing this tutorial, complete the prerequisites.

## Prerequisites

1. Ensure that your system meets the [minimum requirements]({{<relref "/lotus/install/prerequisites" >}}).

1. To set up the environment, you would need:
   - an internet connection to download the software and the code;
   - superuser privileges;
   - operating system Linux or MacOS;
   - git and a git user.
  
1. Complete the appropriate steps to install software dependencies, build the regular Lotus executables from source based on your operating system:

    - [Lotus on Linux]({{<relref "../../lotus/install/linux#build-from-source/" >}})
    - [Lotus on MacOS]({{<relref "../../lotus/install/macos#build-from-source" >}})  

1. (Optional) Because this tutorial requires multiple terminal windows, install a terminal multiplexer like [Tmux](https://github.com/tmux/tmux).

Now that you've completed the prerequisites, set up a Lotus node for devnet.

## Set up a Lotus node for Devnet

Filecoin local networks use slightly different binaries than those used in the Filecoin mainnet. This section describes how to set up the Lotus environment and build the binaries.

{{< alert >}}
<u>Remember</u>: Steps marked as **Local network with Fil+**, such as setting up root key holders and adding notaries, are specific to a local network with the Fil+ feature enabled. Skip these steps if you are setting up a local network without Fil+.
{{< /alert >}}

1. In your terminal, create the following environment variables:

    ```shell
    export LOTUS_PATH=~/.lotus-local-net
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    ```

1. From the `lotus` repository, clone the `lotus-local-net` folder:

    ```shell
    git clone https://github.com/filecoin-project/lotus lotus-local-net
    ```

    The `filecoin-project/lotus` repository is the same one that you would use to join the Filecoin mainnet. For this tutorial, you don't need to clone the entire repository.

1. Navigate to the `lotus-local-net`:

    ```shell
   cd lotus-local-net
    ```

1. Checkout to the latest stable branch:

    ```shell
   git checkout <latest-version>
    ```

   The latest production release can be found on [GitHub](https://github.com/filecoin-project/lotus/releases) or via the [command line](https://github.com/filecoin-project/lotus/blob/master/LOTUS_RELEASE_FLOW.md#why-is-the-releases-branch-deprecated-and-what-are-alternatives).

1. Remove any existing repositories.

    ```shell
    rm -rf ~/.genesis-sectors
    ```

1. Build the `2k` binary for Lotus:

    ```shell
    make 2k
    ```

1. Fetch the proving parameters for a 2048-byte sector size:

    ```shell
    ./lotus fetch-params 2048
    ```

    ```plaintext
    2021-02-23T10:58:01.469-0500    INFO    build   go-paramfetch@v0.0.2-0.20200701152213-3e0f0afdc261/paramfetch.go:138  Parameter file /var/tmp/filecoin-proof-parameters/v28-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-0-0-0cfb4f178bbb71cf2ecfcd42accce558b27199ab4fb59cb78f2483fe21ef36d9.vk is ok
    ...
    c261/paramfetch.go:162  parameter and key-fetching complete
    ```

    This command may take several minutes to complete.

1. (**Local network with Fil+**) Build `lotus-shed`:

    ```shell
    make lotus-shed
    ```

1. (**Local network with Fil+**) Create a BLS-addresses to serve as the first root key holder:

    ```shell
    ./lotus-shed keyinfo new bls
    ```

    ```plaintext
    t3wjygqclp4bmahoxlf3ncm2pe4m2mray275fqcjgj3l4actndmmpx3wwbxkjwgianbj33mp76ngb542ugtpdq
    ```

    Make a note of this address `<root-key-1>`, as you will need it in a later step.

1. (**Local network with Fil+**) Create a BLS-addresses to serve as the second root key holder:

    ```shell
    ./lotus-shed keyinfo new bls
    ```

    ```plaintext
    t3uzbu6ey3wqop6uesj5tr6g4ntl3rocdymrxfhej2cuwmjmtdvughkhelijcr6rv4ewdghfxxswvqjtit5adq
    ```

    Make a note of this address `<root-key-2>`, as you will need it in a later step.

1. Pre-seal 2 sectors for the genesis block:

    ```shell
    ./lotus-seed pre-seal --sector-size 2KiB --num-sectors 2
    ```

    ```plaintext
    sector-id: {{1000 0} 0}, piece info: {2048 baga6ea4seaqoej3hzxzqr5y25ibovtjrhed7yba5vm6gwartr5hsgcbao7aluki}
    ...
    2021-02-23T10:59:36.937-0500    INFO    preseal seed/seed.go:232        Writing preseal manifest to /home/user/.genesis-sectors/pre-seal-t01000.json
    ```

1. Create the genesis block:

    ```shell
    ./lotus-seed genesis new localnet.json
    ```

    This command doesn't output anything on success.

1. (**Local network with Fil+**) Using `<root-key-1>` and `<root-key-2>`, set the root key holders in the genesis block with a signature threshold of 2 for the f080 actor:

    ```shell
    ./lotus-seed genesis set-signers --threshold=2 --signers <root-key-1> --signers <root-key-2> localnet.json
    ```

1. Create a pre-miner and an address with some funds:

    ```shell
    ./lotus-seed genesis add-miner localnet.json ~/.genesis-sectors/pre-seal-t01000.json
    ```

    ```plaintext
    2022-02-08T15:44:19.734-0500    INFO    lotus-seed      lotus-seed/genesis.go:129       Adding miner t01000 to genesis template 
    2022-02-08T15:44:19.734-0500    INFO    lotus-seed      lotus-seed/genesis.go:146       Giving t3xe5je75lkrvye32tfl37gug3az42iotuu3wxgkrhbpbvmum4lu26begiw74ju5a35nveqaw4ywdibj4y6kxq some initial balance 
    ```

## Start a Lotus daemon and a Lotus-Miner

Now that you've set up your Lotus nodes, you can start the `lotus` and `lotus-miner` nodes.

   {{< alert >}}
   <u>Warning</u>: Don't add the variables to your system-wide settings (`/etc/environment`, `/etc/profile.d`, etc.), as they will collide with variables in real networks like calibnet or mainnet.
   {{< /alert >}}

### Terminal window 1: Lotus daemon 1

1. Navigate to the `lotus-local-net` directory created in the previous steps:
      ```shell
      cd ~/lotus-local-net
      ```
  
1. Check if the Lotus environment variables are set from earlier:

    ```shell
    echo LOTUS_PATH 
    echo LOTUS_MINER_PATH
    echo LOTUS_SKIP_GENESIS_CHECK 
    echo CGO_CFLAGS_ALLOW
    echo CGO_CFLAGS 
    ```

    If the variables are empty, export them:

    ```shell
    export LOTUS_PATH=~/.lotus-local-net 
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_ 
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__" 
    export CGO_CFLAGS="-D__BLST_PORTABLE__" 
    ```

1. Start the first node - Lotus daemon:

    ```shell
    ./lotus daemon --lotus-make-genesis=devgen.car --genesis-template=localnet.json --bootstrap=false 
    ```

   This command will continue to run while outputting information.
   As a result of this command, a genesis block and a state tree will be generated and stored in a devgen.car as a snapshot. Use the path to a copy of this file as a `--genesis` parameter when syncing other devnet nodes later.
   
   By default, the `lotus` daemon will start listening on port `1234`. Do not reuse this port for other nodes on the devnet.

1. Leaving the first terminal window open, switch to a second window so that the `lotus` daemon can continue to run. Complete all further steps in another terminal window.

### Terminal window 2: Lotus-Miner

1. Because environmental variables are reset when you open a new terminal window, you must re-export the `LOTUS_PATH` `LOTUS_MINER_PATH`, `LOTUS_SKIP_GENESIS_CHECK`, `CGO_CFLAGS_ALLOW`, and `CGO_CFLAGS` variables:

   {{< alert >}}
   <u>Warning</u>: Don't add the variables to your system-wide settings (`/etc/environment`, `/etc/profile.d`, etc.), as they will collide with variables in real networks like calibnet or mainnet.
   {{< /alert >}}

    ```shell
    export LOTUS_PATH=~/.lotus-local-net 
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_ 
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__" 
    export CGO_CFLAGS="-D__BLST_PORTABLE__" 
    ```

1. Import the genesis miner key:

    ```shell
    ./lotus wallet import --as-default ~/.genesis-sectors/pre-seal-t01000.key 
    ```

    ```plaintext
    imported key t3xe5je75lkrvye32tfl37gug3az42iotuu3wxgkrhbpbvmum4lu26begiw74ju5a35nveqaw4ywdibj4y6kxq successfully! 
    ```

1. Start the genesis miner. This process can take several minutes:

    ```shell
    ./lotus-miner init --genesis-miner --actor=t01000 --sector-size=2KiB --pre-sealed-sectors=~/.genesis-sectors --pre-sealed-metadata=~/.genesis-sectors/pre-seal-t01000.json --nosync 
    ```

    ```plaintext
    Miner successfully created, you can now start it with 'lotus-miner run' 
    ```

1. Start the `lotus-miner`:

    ```shell
    ./lotus-miner run --nosync 
    ```

    This command will continue to run while outputting information.

1. Leaving the second terminal window open, switch to a third window. Complete all further steps in the new terminal window so that the `lotus-miner` and `lotus` daemon can continue to run.

### Terminal window 3: Network prompts (1)

1. Because environmental variables are reset when you open a new terminal window, you must re-export the `LOTUS_PATH`, `LOTUS_MINER_PATH`, `LOTUS_SKIP_GENESIS_CHECK`, `CGO_CFLAGS_ALLOW`, and `CGO_CFLAGS` variables:

   {{< alert >}}
   <u>Warning</u>: Don't add the variables to your system-wide settings (`/etc/environment`, `/etc/profile.d`, etc.), as they will collide with variables in real networks like calibnet or mainnet.
   {{< /alert >}}

    ```shell
    export LOTUS_PATH=~/.lotus-local-net 
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    export LOTUS_SKIP_GENESIS_CHECK=_yes_ 
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__" 
    export CGO_CFLAGS="-D__BLST_PORTABLE__" 
    ```

1. (**Local network with Fil+**) Import the first root key holder address:

    ```shell
    ./lotus wallet import bls-<root-key-1>.keyinfo 
    ```

1. (**Local network with Fil+**) Import the second root key holder address:

    ```shell
    ./lotus wallet import bls-<root-key-2>.keyinfo 
    ```

    Congratulations! You've set up a fully functioning local Filecoin network of two nodes. Keep the terminals open if you are going to [connect multiple nodes and notaries](#next-steps-connect-nodes-and-notaries), or prompt for the network information.

    Now we can prompt for the network information:

1. `MULTIADDRESS_OF_THE_FIRST_NODE`. Fetch the address + peer ID in `multiaddr` format from the genesis node. It
    ```shell
    ./lotus net listen
    ```
    ```plaintext
    # Example of the response
    /ip4/172.16.100.22/tcp/40395/p2p/12D3KooWAPNpm3n3PTaK2gkaZbCNeaNWMg18eLyxUe9PschraUqk
    ```

1. **List of tipsets.** You can get a list of the tipsets in a reverse chronological order, showing the latest blocks first. Each entry includes metadata for the tipset at a given epoch, such as `<Height>: (<Timestamp>) [CID: Miner,]`.
     ```shell
     ./lotus chain list
     ```

1. To stop the lotus daemon.
  ```shell
  ./lotus daemion stop
  ```

## Next steps: Connect nodes and notaries

Now that your local network is running, you can test various Filecoin features, like adding additional nodes or notaries. Select one of the options below:

- [Connect multiple nodes](#connect-multiple-nodes)
- (**Local network with Fil+**) [Add notaries](#add-notaries)

### Connect multiple nodes

**Node synchronization strategy.** In this section, you will add a third node to your local network by copying the `devgen.car` file in your `lotus-local-net` folder to the new node. We will have to connect the new node to the original genesis node manually, as there's no DHT or bootstrapping for your local network. Alternatively, we can reference the existing copy of the file in the `~/.lotus-local-net/devgen.car`.

**RPC endpoint port.** A different port for the third node must be specified to avoid a collision by using `--api` parameter on the `lotus` daemon start. The port and IP can be configured by using the LIBP2P variables in your [config or environment variables](https://github.com/filecoin-project/lotus/blob/master/node/config/def.go#L57-L60). By default, LIBP2P will listen on port `1234` and on all available IP addresses. 

**Current state of a local machine.** At this point, we assume that 
- terminals 1, 2, and 3 are still open and
- the `lotus` daemon and `lotus-miner` from the [Start a Lotus daemon and a Lotus miner](#start-a-lotus-daemon-and-a-lotus-miner) are still running.
- Also, the `MULTIADDRESS_OF_THE_FIRST_NODE` is still valid, and
- `~/.lotus-local-net/devgen.car` still exists.

#### Terminal window 4: Lotus daemon 2

1. **Different LOTUS_PATH** In this new terminal, we will export different `LOTUS_PATH`, `LOTUS_MINER_PATH` environmental variables, and same `LOTUS_SKIP_GENESIS_CHECK`, `CGO_CFLAGS_ALLOW`, and `CGO_CFLAGS` variables:

   {{< alert >}}
   <u>Warning</u>: Don't add the variables to your system-wide settings (`/etc/environment`, `/etc/profile.d`, etc.), as they will collide with variables in real networks like calibnet or mainnet.
   {{< /alert >}}

    ```shell
    export LOTUS_PATH=~/.lotus-local-net2 
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net2
    export LOTUS_SKIP_GENESIS_CHECK=_yes_ 
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__" 
    export CGO_CFLAGS="-D__BLST_PORTABLE__" 
    ```
    
1. Start a new node on port `4444` with a reference to the snapshot created by the genesis node [Lotus daemon 1](#terminal-window-1-lotus-daemon-1)

    ```shell
    lotus daemon  --genesis=~/lotus-local-net/devgen.car --api=4444
    ```
1. Leaving the forth terminal window open, switch to a third window. Complete all further steps in the new terminal window so that the second `lotus` daemon can continue to run.


#### Terminal window 5: Network prompts (2)

1. Export the `LOTUS_PATH`, `LOTUS_MINER_PATH`, `LOTUS_SKIP_GENESIS_CHECK`, `CGO_CFLAGS_ALLOW`, and `CGO_CFLAGS` variables, that we used for the `lotus` daemon 2 in the previous step in the [Terminal window 4](#terminal-window-4-lotus-daemon-2):

   {{< alert >}}
   <u>Warning</u>: Don't add the variables to your system-wide settings (`/etc/environment`, `/etc/profile.d`, etc.), as they will collide with variables in real networks like calibnet or mainnet.
   {{< /alert >}}

    ```shell
    export LOTUS_PATH=~/.lotus-local-net2 
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net2
    export LOTUS_SKIP_GENESIS_CHECK=_yes_ 
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__" 
    export CGO_CFLAGS="-D__BLST_PORTABLE__" 
    ```

1. Using the `<MULTIADDRESS_OF_THE_FIRST_NODE>` from the [Terminal window 3](#terminal-window-3-network-prompts-1) in the previous section, connect the new node to the first node:

    ```shell
    lotus net connect <MULTIADDRESS_OF_THE_FIRST_NODE>
    ```

1. You should now see your new node is getting synchronized with the chain. You can check the progress:
   ```shell
   lotus sync wait
   ```
   In case you see a `success` result, but no established connection (e.g., errors in your genesis daemon) - make sure you are using the same genesis block `.car` file (`devgen.car`).

1. You can list peers on the current devnet:

   ```shell
   lotus net peers
   ```

1. List of the tipsets in a reverse chronological order, showing the latest blocks first. Each entry includes metadata for the tipset at a given epoch, such as `<Height>: (<Timestamp>) [CID: Miner,]`.
     ```shell
     ./lotus chain list
     ```

### Add notaries

In this section, you will add two notaries to your local network with Fil+.

{{< alert >}}
<u>Remember</u>: These steps won't work if you don't have a local network with Fil+ set up.
{{< /alert >}}

1. Create a wallet address for the first notary `<notary-1>`:

    ```shell
    ./lotus wallet new secp256k1
    ```

    ```plaintext
    t1ek4mmfiulovffg3jen4a3ruaovrvlimhd6dzmjy
    ```

1. Create a wallet address for the second notary `<notary-2>`:

    ```shell
    ./lotus wallet new secp256k1
    ```

    ```plaintext
    t1fbmwxevaj6iawvg3idycg77vxdi2b2paps5nn2i
    ```

    You should now have a list of addresses for two root key holders and two notaries, like the following:

    | Node type | ID | Address |
    | ---| --- | --- |
    | `<root-key-1>`| t0100                 | t3uzbu6ey3wqop6uesj5tr6g4ntl3rocdymrxfhej2cuwmjmtdvughkhelijcr6rv4ewdghfxxswvqjtit5adq |
    | `<root-key-2>`| t0101                 | t3wjygqclp4bmahoxlf3ncm2pe4m2mray275fqcjgj3l4actndmmpx3wwbxkjwgianbj33mp76ngb542ugtpdq |
    | `<notary-1>`  | t01003                 |t1ek4mmfiulovffg3jen4a3ruaovrvlimhd6dzmjy |
    | `<notary-2>`  | t01004                 |t1fbmwxevaj6iawvg3idycg77vxdi2b2paps5nn2i |

1. Have the first root key holder `<root-key-1>` propose adding `<notary-1>` to the network as a notary:

    ```shell
    ./lotus-shed verifreg add-verifier <root-key-1> <notary-1> 10000000
    ```

    ```plaintext
    message sent, now waiting on cid: bafy2bzacecegetr32x4jceywpeivbhlahnst4373emx5f3dp6oo4gg4o6sdpc
    ```

1. Inspect the `f080` actor to view the parameters needed by `<root-key-2>` to approve the proposal created in the previous step:

    ```shell
    ./lotus msig inspect f080
    ```

    ```plaintext
    Balance: 0 FIL
    Spendable: 0 FIL
    Threshold: 2 / 2
    Signers:
    ID      Address
    t0100   t3uzbu6ey3wqop6uesj5tr6g4ntl3rocdymrxfhej2cuwmjmtdvughkhelijcr6rv4ewdghfxxswvqjtit5adq
    t0101   t3wjygqclp4bmahoxlf3ncm2pe4m2mray275fqcjgj3l4actndmmpx3wwbxkjwgianbj33mp76ngb542ugtpdq
    Transactions:  1
    ID      State    Approvals  To      Value   Method          Params
    0       pending  1          t06     0 FIL   AddVerifier(2)  82550122b8c615145baa529b6923780dc680756355a1874400989680
    ```

1. Using the parameters displayed in the previous step, have the second root key holder `<root-key-2>` approve the proposal from `<root-key-1>`:

    ```shell
    ./lotus msig approve --from=<root-key-2> f080 0 <root-key-1> t06 0 2 82550122b8c615145baa529b6923780dc680756355a1874400989680
    ```

    ```plaintext
    sent approval in message:  bafy2bzaceboalihtoo6yds2ptev5ysdkbslc2j5vwgwhl2fr6d6ukee3dzd56
    ```

1. Check that `<notary-1>` is in the list of notaries:

    ```shell
    ./lotus filplus list-notaries
    ```

    ```plaintext
    t01002: 100000
    ```

1. To add `<notary-2>` to your local network, repeat steps 3 through 6.

### Grant datacap

In this section, you will grant datacap to a client from a notary.

{{< alert >}}
<u>Remember</u>: These steps won't work if you don't have a local network with Fil+ and notaries added on the network.
{{< /alert >}}

1. Grant datacap from `<notary-1>` to a client, and specify the amount of bytes in datacap you want to give the client.

```shell
./lotus filplus grant-datacap --from=<notary-1> <client-address> <bytes>
```

```plaintext
message sent, now waiting on cid: bafy2bzaceacajb2hpk6ywlk7xzghnm2n5rxndhaikwyvuvo2m2taynpaqrclc
```

### FEVM features

Using the Filecoin EVM runtime features within a Lotus node, you can deploy and interact with Solidity contracts on the Filecoin network.

1. Enable Filecoin EVM runtime features by setting `EnableEthRPC` to `true` within your `config.toml` file:

    ```toml
    [Fevm]
      # EnableEthRPC enables eth_ rpc, and enables storing a mapping of eth transaction hashes to filecoin message Cids.
      # This will also enable the RealTimeFilterAPI and HistoricFilterAPI by default, but they can be disabled by config options above.
      #
      # type: bool
      # env var: LOTUS_FEVM_ENABLEETHRPC
       EnableEthRPC = true
    ```

1. Create a new `f4` address:

    ```shell
    ./lotus wallet new delegated
    ```
    
    ```plaintext
    f410fu7h6rd7gqwhcxip6t2xmc5f6odjy5yvxaih7xey
    ```

1. Using the output of the previous command, find the associated Ethereum address using `lotus evm stat`:

    ```shell
    ./lotus evm stat f410fu7h6rd7gqwhcxip6t2xmc5f6odjy5yvxaih7xey
    ```

    ```plaintext
    Filecoin address:  f410fu7h6rd7gqwhcxip6t2xmc5f6odjy5yvxaih7xey
    Eth address:  0xa7cfe88fe6858e2ba1fe9eaec174be70d38ee2b7
    Code cid:  bafk2bzacedfvut2myeleyq67fljcrw4kkmn5pb5dpyozovj7jpoez5irnc3ro
    ```

    You can also supply `lotus evm stat` an ethereum address to get the corresponding Filecoin address:

    ```shell
    ./lotus evm stat 0xa7cfe88fe6858e2ba1fe9eaec174be70d38ee2b7
    ```

    ```plaintext
    Filecoin address:  f410fu7h6rd7gqwhcxip6t2xmc5f6odjy5yvxaih7xey
    Eth address:  0xa7cfe88fe6858e2ba1fe9eaec174be70d38ee2b7

    ...
    ```

1. Deploy the `testcoin.bin` using `emv deploy`:

    ```shell
    ./lotus evm deploy --from=f410fu7h6rd7gqwhcxip6t2xmc5f6odjy5yvxaih7xey testcoin.bin
    ```

    ```plaintext
    sending message...
    waiting for message to execute...
    Actor ID: 1008
    ID Address: f01008
    Robust Address: f2mf75wcwurklloyc6zbrew2wqj4gyiih2cgcwjbi
    Eth Address: 0xfe6173918b2448ce93f4710f71a1051e405fdc29
    f4 Address: f410f7zqxhemlerem5e7uoehxdiifdzaf7xbjawmljkq
    Return: gxkD8FUCYX/bCtSKlrdgXshiS2rQTw2EIPpU/mFzkYskSM6T9HEPcaEFHkBf3Ck=
    ```

1. Call the contract by running the `evm invoke` command and supplying the `ID Address` from the previous command and `calldata`:


    ```shell
    ./lotus evm invoke <ID address> <calldata>
    ```

    For example:

    ```shell
    ./lotus evm invoke --from=f410fu7h6rd7gqwhcxip6t2xmc5f6odjy5yvxaih7xey f01008 f8b2cb4f000000000000000000000000ff00000000000000000000000000000000000064
    ```

    ```plaintext
    sending message...
    waiting for message to execute...
    Gas used:  2459725
    0000000000000000000000000000000000000000000000000000000000000000
    ```

If you encounter any issues, you can add a `--help` or `-h` behind the cmd you are trying to execute:

```plaintext
NAME:
   lotus evm - Commands related to the Filecoin EVM runtime

USAGE:
   lotus evm command [command options] [arguments...]

COMMANDS:
     deploy            Deploy an EVM smart contract and return its address
     invoke            Invoke an EVM smart contract using the specified CALLDATA
     stat              Print eth/filecoin addrs and code cid
     call              Simulate an eth contract call
     contract-address  Generate contract address from smart contract code
     help, h           Shows a list of commands or help for one command
```
