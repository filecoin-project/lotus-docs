---
title: "Local network"
description: "This tutorial describes how set up and run a local Filecoin network (local-net) with 2 KiB sectors and root key holders using the regular Lotus binaries. A local-net is useful for developing applications and testing features, like Filecoin+ (Fil+)."
lead: "This section tutorial how set up and run a local Filecoin network (local-net) with 2 KiB sectors and root key holders using the regular Lotus binaries. A local-net is useful for developing applications and testing features, like Filecoin+ (Fil+)."
draft: false
menu:
    lotus:
        parent: "lotus-developers"
        identifier: "developers-networks-local-network"
weight: 305
toc: true
aliases:
    - /docs/developers/developer-network
    - /docs/developers/local-network/
    - /developers/local-network/
---

If you are unfamiliar with the process of setting up and running a local network, it's highly recommended that you set up a local network without Fil+ first.

Before completing this tutorial, complete the prerequisites.

## Complete the prerequisites

1. Ensure that your system meets the [minimum requirements]({{<relref "/lotus/install/prerequisites" >}}).

1. Complete the appropriate steps to build the Lotus executables from source based on your operating system:

    - [Linux]({{<relref "../../lotus/install/linux#build-from-source/" >}})
    - [MacOS]({{<relref "../../lotus/install/macos#build-from-source" >}})

1. (Optional) Because this tutorial requires multiple terminal windows, install a terminal multiplexer like [Tmux](https://github.com/tmux/tmux).

Now that you've completed the prerequisites, set up a Lotus node.

## Set up a Lotus node

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
   git checkout releases
    ```

   {{< alert >}}
   Checking out `releases` will always check out the latest stable release. If you need a specific release, specify a specific `<tag_or_release>`. For example: `git checkout v1.17.0`.
    {{< /alert >}}

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

## Start the nodes

Now that you've set up your Lotus nodes, you can start the `lotus` and `lotus-miner` nodes.

1. Start the first node:

    ```shell
    ./lotus daemon --lotus-make-genesis=devgen.car --genesis-template=localnet.json --bootstrap=false 
    ```

    This command will continue to run while outputting information.

1. Leaving the first terminal window open, switch to a second window so that the `lotus` daemon can continue to run. Complete all further steps in another terminal window.
1. Because environmental variables are reset when you open a new terminal window, you must re-export the `LOTUS_PATH`, `LOTUS_MINER_PATH`, `LOTUS_SKIP_GENESIS_CHECK`, `CGO_CFLAGS_ALLOW` and `CGO_CFLAGS` variables:

   {{< alert >}}
   <u>Warning</u>: Don't add the variables to your system-wide settings (`/etc/enviroment`, `/etc/profile.d`, etc.), as they will collide with variables in real networks like calibnet or mainnet.
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
1. Because environmental variables are reset when you open a new terminal window, you must re-export the `LOTUS_PATH`, `LOTUS_MINER_PATH`, `LOTUS_SKIP_GENESIS_CHECK`, `CGO_CFLAGS_ALLOW` and `CGO_CFLAGS` variables:

   {{< alert >}}
   <u>Warning</u>: Don't add the variables to your system-wide settings (`/etc/enviroment`, `/etc/profile.d`, etc.), as they will collide with variables in real networks like calibnet or mainnet.
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
    lotus wallet import bls-<root-key-1>.keyinfo 
    ```

1. (**Local network with Fil+**) Import the second root key holder address:

    ```shell
    lotus wallet import bls-<root-key-2>.keyinfo 
    ```

Congratulations! You've set up a fully functioning local Filecoin network.

## Next steps

Now that your local network is running, you can test various Filecoin features, like adding additional nodes or notaries. Select one of the options below:

- [Connect multiple nodes](#connect-multiple-nodes)
- (**Local network with Fil+**) [Add notaries](#add-notaries)

### Connect multiple nodes

In this section, you will add additional nodes to your local network by copying the `devgen.car` file in your `lotus-local-net` folder to new nodes.

1. Start a new node:

    ```shell
    ./lotus daemon  --genesis=devgen.car
    ```

1. Using the `<MULTIADDRESS_OF_THE_FIRST_NODE>`, connect the new node to the first node:

    ```shell
    ./lotus net connect <MULTIADDRESS_OF_THE_FIRST_NODE>
    ```

### Add notaries

In this section, you will add two notaries to your local network with Fil+.

{{< alert >}}
<u>Remember</u>: These steps won't work if you don't have a local network with Fil+ set up.
{{< /alert >}}

1. Create a wallet addresses for the first notary `<notary-1>`:

    ```shell
    lotus wallet new secp256k1
    ```

    ```plaintext
    t1ek4mmfiulovffg3jen4a3ruaovrvlimhd6dzmjy
    ```

1. Create a wallet addresses for the second notary `<notary-2>`:

    ```shell
    lotus wallet new secp256k1
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
    lotus msig inspect f080
    ```

    ```plaintext
    Balance: 0 FIL
    Spendable: 0 FIL
    Threshold: 2 / 2
    Signers:
    ID      Address
    t0100   t3wjygqclp4bmahoxlf3ncm2pe4m2mray275fqcjgj3l4actndmmpx3wwbxkjwgianbj33mp76ngb542ugtpdq
    t0101   t3uzbu6ey3wqop6uesj5tr6g4ntl3rocdymrxfhej2cuwmjmtdvughkhelijcr6rv4ewdghfxxswvqjtit5adq
    Transactions:  1
    ID      State    Approvals  To      Value   Method          Params
    0       pending  1          t06     0 FIL   AddVerifier(2)  82550122b8c615145baa529b6923780dc680756355a1874400989680
    ```

1. Using the parameters displayed in the previous step, have the second root key holder `<root-key-2>` approve the proposal from `<root-key-1>`:

    ```shell
    lotus msig approve  --from=t3wjygqclp4bmahoxlf3ncm2pe4m2mray275fqcjgj3l4actndmmpx3wwbxkjwgianbj33mp76ngb542ugtpdq f080 0 t0101 f06 0 2 82550122b8c615145baa529b6923780dc680756355a1874400989680
    ```

    ```plaintext
    sent approval in message:  bafy2bzaceboalihtoo6yds2ptev5ysdkbslc2j5vwgwhl2fr6d6ukee3dzd56
    ```

1. Check that `<notary-1>` is in the list of notaries:

    ```shell
    lotus filplus list-notaries
    ```

    ```plaintext
    t01002: 100000
    ```

1. To add `<notary-2>` to your local network, repeat steps 3 through 6.
