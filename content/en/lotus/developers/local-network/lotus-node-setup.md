## Lotus node setup

Local-nets use slightly different binaries to those used in the Filecoin mainnet. This section shows you how to setup the Lotus environment and build those binaries.

1. Create the following environment variable in your terminal:

    ```shell
    export LOTUS_PATH=~/.lotus-local-net
    ```

    ```shell
    export LOTUS_MINER_PATH=~/.lotus-miner-local-net
    ```

    ```shell
    export LOTUS_SKIP_GENESIS_CHECK=_yes_
    ```
    
    ```shell
    export CGO_CFLAGS_ALLOW="-D__BLST_PORTABLE__"
    ```

    ```shell
    export CGO_CFLAGS="-D__BLST_PORTABLE__"
    ```

2. Clone the `lotus-local-net` folder in the `lotus` repo:

    ```shell
    git clone https://github.com/filecoin-project/lotus lotus-local-net
    ```

    The `filecoin-project/lotus` repository is the same one that you would use to join the Filecoin mainnet. For the purpose of this tutorial, you only need to `git clone` into the `lotus-local-net` folder to keep this guide organized.

3. Navigate to the `lotus-local-net`:

   ```shell
   cd lotus-local-net
   ```

3. Checkout to the latest stable branch:

   ```shell
   git checkout releases
   ```

   > Info
   >
   > Checking out 'releases' will always checks out the latest stable release. If you need a specific release, specify a
   > `<tag_or_release>`:
   > ```shell
   > git checkout <tag_or_release>
   > ```
   > For example, to checkout `v1.17.0`:
   > ```shell
   > git checkout v1.17.0 
   > ```
   ```

4. Remove any existing repositories.

    <!-- TODO: test if this section is necessary. -->

    ```shell
    rm -rf ~/.genesis-sectors
    ```

5. Build the `2k` binary for Lotus:

    ```shell
    make 2k
    ```


6. Recursively update submodules and initiate any new submodules:

    ```shell
    git submodule update --init --recursive
    ```

    Submodule 'extern/filecoin-ffi' (https://github.com/filecoin-project/filecoin-ffi.git) registered for path 'extern/filecoin-ffi'
    ...
    go build  -ldflags="-X=github.com/filecoin-project/lotus/build.CurrentCommit=+git.8d5be1c01" -tags=2k -o lotus-gateway ./cmd/lotus-gateway
    ```

6. Fetch the proving parameters for a 2048 byte sector size:

    ```shell
    ./lotus fetch-params 2048
    ```

    > Info
    >
    > This command may take several minutes to complete.

    Upon success, the output of this command will look similar to the following:

    ```plaintext
    2021-02-23T10:58:01.469-0500    INFO    build   go-paramfetch@v0.0.2-0.20200701152213-3e0f0afdc261/paramfetch.go:138  Parameter file /var/tmp/filecoin-proof-parameters/v28-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-0-0-0cfb4f178bbb71cf2ecfcd42accce558b27199ab4fb59cb78f2483fe21ef36d9.vk is ok
    ...
    c261/paramfetch.go:162  parameter and key-fetching complete
    ```

7. Build `lotus-shed`:

```shell
make lotus-shed
```

8. Create the two BLS keyinfo files to be used as the root key holder addresses:

   a. Create the first root key holder address:
      ```shell
      ./lotus-shed keyinfo new bls
      ```

      Upon success, the command will output something like the following:
      ```output
      t3wjygqclp4bmahoxlf3ncm2pe4m2mray275fqcjgj3l4actndmmpx3wwbxkjwgianbj33mp76ngb542ugtpdq
      ```

   b. Create the second address:
      ```shell
      ./lotus-shed keyinfo new bls
      ```

      Upon success, the command will output something like the following:
      
      ```output
      t3uzbu6ey3wqop6uesj5tr6g4ntl3rocdymrxfhej2cuwmjmtdvughkhelijcr6rv4ewdghfxxswvqjtit5adq
      ```

7. Pre-seal 2 sectors using the default size of 2KiB for the genesis block:

```shell
./lotus-seed pre-seal --sector-size --num-sectors 2
```

Upon success, the command will output something like the following:

```plaintext
sector-id: {{1000 0} 0}, piece info: {2048 baga6ea4seaqoej3hzxzqr5y25ibovtjrhed7yba5vm6gwartr5hsgcbao7aluki}
...
2021-02-23T10:59:36.937-0500    INFO    preseal seed/seed.go:232        Writing preseal manifest to /home/user/.genesis-sectors/pre-seal-t01000.json
```

8. Create the genesis block:

```shell
./lotus-seed genesis new localnet.json
```

This command does not output anything upon success.

9. Using the accounts generated in step 8, set the root key holders in the genesis block with a signature `threshold` of `2` for the f080 actor.

```shell
./lotus-seed genesis set-signers --threshold=2 --signers t3wjygqclp4bmahoxlf3ncm2pe4m2mray275fqcjgj3l4actndmmpx3wwbxkjwgianbj33mp76ngb542ugtpdq --signers t3uzbu6ey3wqop6uesj5tr6g4ntl3rocdymrxfhej2cuwmjmtdvughkhelijcr6rv4ewdghfxxswvqjtit5adq localnet.json
```

9. Create a preminer and an address with some funds:

```shell
./lotus-seed genesis add-miner localnet.json ~/.genesis-sectors/pre-seal-t01000.json
```

Upon success, the command will output something like the following:

```plaintext
2022-02-08T15:44:19.734-0500    INFO    lotus-seed      lotus-seed/genesis.go:129       Adding miner t01000 to genesis template
2022-02-08T15:44:19.734-0500    INFO    lotus-seed      lotus-seed/genesis.go:146       Giving t3xe5je75lkrvye32tfl37gug3az42iotuu3wxgkrhbpbvmum4lu26begiw74ju5a35nveqaw4ywdibj4y6kxq some initial balance
```
