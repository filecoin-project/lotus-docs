---
title: "Benchmarks"
description: "Lotus comes with a benchmarking tool that can be used to test how long each resource-intensive sealing task takes. This guide describes how to install the benchmarking tool, and some basic operations."
lead: "Lotus comes with a benchmarking tool that can be used to test how long each resource-intensive sealing task takes. This guide describes how to install the benchmarking tool, and some basic operations."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-operate"
        identifier: "storage-provider-benchmarks"
aliases:
    - /docs/storage-providers/benchmarks/
weight: 305
toc: true
---

## Installation

1. You must have the Lotus repository on your computer. If you do not have an existing copy of the repository, [clone it from GitHub](https://github.com/filecoin-project/lotus/):

   ```shell
   git clone https://github.com/filecoin-project/lotus.git ~/lotus
   ```

   ```plaintext
   Cloning into '/root/lotus'...
   remote: Enumerating objects: 93, done.
   ...
   Resolving deltas: 100% (51531/51531), done.
   ```

1. The `lotus` binary must be built and within the `~/lotus` repository folder. If you just cloned the repository or have misplaced the `lotus` binary, build the project:

   ```shell with-output
   cd ~/lotus
   make clean all && make install
   ```

   ```plaintext
   rm -rf  build/.filecoin-install build/.update-modules  lotus lotus-miner lotus-worker lotus-shed lotus-gateway lotus-seed lotus-pond lotus-townhall lotus-fountain lotus-chainwatch lotus-bench lotus-stats lotus-pcr lotus-health lotus-wallet testground
   make -C extern/filecoin-ffi/ clean
   ...
   install -C ./lotus /usr/local/bin/lotus
   install -C ./lotus-miner /usr/local/bin/lotus-miner
   install -C ./lotus-worker /usr/local/bin/lotus-worker
   ```

1. Call `make lotus-bench` to build the Lotus benchmark binary:

   ```shell with-output
   make lotus-bench
   ```

   ```plaintext
   rm -f lotus-bench
   go build -o lotus-bench ./cmd/lotus-bench
   ...
   go run github.com/GeertJohan/go.rice/rice append --exec lotus-bench -i ./build
   ```

   This will produce a `lotus-bench` binary in the current folder.

1. You can now run `lotus-bench` against your system.

## Usage

Use the self-documenting feature of the tool to explore the different commands.

```shell
./lotus-bench --help
```

```plaintext
NAME:
   lotus-bench - Benchmark performance of lotus on your hardware

USAGE:
   lotus-bench [global options] command [command options] [arguments...]

VERSION:
   1.15.4-dev+mainnet

COMMANDS:
   prove    Benchmark a proof computation
   sealing  Benchmark seal and winning post and window post
   simple   Run basic sector operations
   import   Benchmark chain import and validation
   help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --help, -h     show help (default: false)
   --version, -v  print the version (default: false)
```

## Benchmark

### Sealing

Benchmark a sealing computation using `lotus-bench sealing [command options] [arguments...]`. For example:

```shell with-output
./lotus-bench sealing
```

```plaintext
2022-04-13T18:37:41.141+0200    INFO    lotus-bench	lotus-bench/main.go:103	Starting lotus-bench
...
----
results (v28) SectorSize:(536870912), SectorNumber:(1)
seal: addPiece: 1.815989865s (281.9 MiB/s)
seal: preCommit phase 1: 23.512164789s (21.78 MiB/s)
seal: preCommit phase 2: 11.748902504s (43.58 MiB/s)
seal: commit phase 1: 18.391743ms (27.19 GiB/s)
seal: commit phase 2: 5.698575481s (89.85 MiB/s)
seal: verify: 1.536285ms
unseal: 26.136081682s  (19.59 MiB/s)

generate candidates: 101.562µs (4.808 TiB/s)
compute winning post proof (cold): 665.669815ms
compute winning post proof (hot): 624.667643ms
verify winning post proof (cold): 17.949129ms
verify winning post proof (hot): 1.26867ms

compute window post proof (cold): 446.549819ms
compute window post proof (hot): 450.785891ms
verify window post proof (cold): 8.572963ms
verify window post proof (hot): 1.517569ms
```

Available options:

| Option                                     | Description                                                                                  |
| ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `--storage-dir value`                      | Path to the storage directory that will store sectors long term (default: "~/.lotus-bench"). |
| `--sector-size value`                      | Size of the sectors in bytes, i.e. 32GiB (default: "512MiB").                                |
| `--no-gpu`                                 | Disable gpu usage for the benchmark run (default: false).                                    |
| `--miner-addr value`                       | Pass miner address (only necessary if using existing sectorbuilder) (default: "t01000")      |
| `--benchmark-existing-sectorbuilder value` | pass a directory to run post timings on an existing sectorbuilder                            |
| `--json-out`                               | output results in json format (default: false)                                               |
| `--skip-commit2`                           | skip the commit2 (snark) portion of the benchmark (default: false)                           |
| `--skip-unseal`                            | skip the unseal portion of the benchmark (default: false)                                    |
| `--save-commit2-input value`               | Save commit2 input to a file                                                                 |
| `--num-sectors value`                      | (default: 1)                                                                                 |
| `--parallel value`                         | (default: 1)                                                                                 |
| `--help, -h`                               | show help (default: false)                                                                   |

### Prove

Benchmark a proof computation using `lotus-bench prove [command options] [arguments...]`. For example:

```shell
./lotus-bench prove
```

Available options:

| Options              | Description                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `--no-gpu`           | Disable gpu usage for the benchmark run (default: false).                                |
| `--miner-addr value` | Pass miner address (only necessary if using existing sectorbuilder) (default: "t01000"). |
| `--help, -h`         | Show help (default: false).                                                              |

### Import

Benchmark chain import and validation using `lotus-bench import command [command options] [arguments...]`. For example:

```shell
./lotus-bench import analyze import.car
```

Available commands:

| Command   | Description                |
| --------- | -------------------------- |
| `analyze` | Analyze a `.car` file.     |
| `help`    | Show the help information. |

Available options:

| Option                              | Description                                                                                                                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--start-tipset value`              | start validation at the given tipset key; in format cid1,cid2,cid3...                                                                                                                                                                   |
| `--end-tipset value`                | halt validation at the given tipset key; in format cid1,cid2,cid3...                                                                                                                                                                    |
| `--genesis-tipset value`            | genesis tipset key; in format cid1,cid2,cid3...                                                                                                                                                                                         |
| `--start-height value`              | start validation at given height; beware that chain traversal by height is very slow (default: 0)                                                                                                                                       |
| `--end-height value`                | halt validation after given height; beware that chain traversal by height is very slow (default: 0)                                                                                                                                     |
| `--batch-seal-verify-threads value` | set the parallelism factor for batch seal verification (default: 4)                                                                                                                                                                     |
| `--repodir value`                   | set the repo directory for the lotus bench run (defaults to /tmp)                                                                                                                                                                       |
| `--syscall-cache value`             | read and write syscall results from datastore                                                                                                                                                                                           |
| `--export-traces`                   | should we export execution traces (default: true)                                                                                                                                                                                       |
| `--no-import`                       | should we import the chain? if set to true chain has to be previously imported (default: false)                                                                                                                                         |
| `--global-profile`                  | (default: true)                                                                                                                                                                                                                         |
| `--only-import`                     | (default: false)                                                                                                                                                                                                                        |
| `--use-pebble`                      | (default: false)                                                                                                                                                                                                                        |
| `--use-native-badger`               | (default: false)                                                                                                                                                                                                                        |
| `--car value`                       | path to CAR file; required for import; on validation, either a CAR path or the --head flag are required                                                                                                                                 |
| `--head value`                      | tipset key of the head, useful when benchmarking validation on an existing chain store, where a CAR is not available; if both --car and --head are provided, --head takes precedence over the CAR root; the format is cid1,cid2,cid3... |
| `--help, -h`                        | show help (default: false)                                                                                                                                                                                                              |
| `--version, -v`                     | print the version (default: false)                                                                                                                                                                                                      |
## Single task benchmark

Sometimes you may only want to test the performance of a single task without running through the whole sealing task pipeline. For this, you can use the `lotus-bench simple` command.

Available options:

| Option                                     | Description                                                                                  |
| ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `--sector-size`                            | Specify the sector-size (supports: 2K, 512MiB, 32GiB, 64GiB) (default: 512MiB)               |
| `--miner-addr`                             | pass miner address (only necessary if using existing sectorbuilder) (default: "t01000")      |

### Create sector file

Before we can run sealing benchmarks, we need to create an unsealed sector file. You can specify which sector-size you want to create with the --sector-size flag.

```shell
./lotus-bench simple addpiece --sector-size <size> /dev/zero /your/path/unsealed
```

Note that the `unsealed` in `/your/path/` is the file that will be created by the command, and not a directory.

Together with the performance, the command will output a piece CID and the number of bytes in the created unsealed sector. You will need both of these to perform the PreCommit 1 benchmark.

```
AddPiece 1m26.991655711s (376.7 MiB/s)
baga6ea4seaqao7s73y24kcutaosvacpdjgfe5pw76ooefnyqw4ynr3d2y6x2mpq 34359738368
```

### Sealing tasks

**PreCommit1:**

To run a single PreCommit 1, you will need the CID and amount of bytes in the unsealed sector created in the AddPiece step. You will also need to specify where the path to the unsealed file is, and where the sealed sector and the cache file will be placed.

```shell
./lotus-bench simple precommit1 --sector-size <size> /your/path/unsealed /your/path/sealed /your/path/cache [piece cid] [piece size]
```

Together with the performance, the command will create a PreCommit1 encoding that you will need if you want to perform the PreCommit 2 benchmark.

```
PreCommit1 3h10m38.942613688s (2.865 MiB/s)
eyJfbG90dXNfU2VhbFJhbmRvbW5lc3MiOi[...]==
```

**PreCommit2:**

To run a single PreCommit 2 you will need to specify the path of the sealed sector, the cache file, and the PreCommit1 encoding from the previous step.

```shell
./lotus-bench simple precommit2 --sector-size <size> /your/path/sealed /your/path/cache [pc1 encoding]
```

Together with the performance, the command will output the `commD` and `commR` that you will need if you want to perform the Commit 1 benchmark.

```
seal: preCommit phase 2: 14m17.347652736s (38.22 MiB/s)
d:baga6ea4seaqdsvqopmj2soyhujb72jza76t4wpq5fzifvm3ctz47iyytkewnubq r:bagboea4b5abcbztu2gpgzz746m537wntioqm5mjnfay5dwsugfqyshv4zljmnwyb
```

**Commit1:**

To run a single Commit1 you will need to specify the path of the sealed sector, the cache file, and the `commD` and `commR` output from the PreCommit2 step. You will also need to specify the path for the json output from the Commit1 step.

```shell
./lotus-bench simple commit1 --sector-size <size> /your/path/sealed /your/path/cache <commD> <commR> /your/path/c1.json
```

Together with the performance, the command will save a `.json` file in the path you specified. This file is needed to perform the Commit2 step.

```
Commit1 352.760466ms (90.71 GiB/s)
```

**Commit2:**

To run a single Commit2 you only need to specify the `.json` file from the Commit1 step.

```shell
./lotus-bench simple commit2 /your/path/c1.json
```

Together with the performance, the command will output the final proof for the sector.

```
Commit2 21m45.831527979s (25.09 MiB/s)
proof: 972929647be634d708e071bb0834d28e45[...]==
```

### PoSt tasks

**WindowPoSt:**

To benchmark a single WindowPoSt you will need to specify the path of the sealed sector, the cache file, and the `commR` output you got in the PreCommit2 step. Specifying the correct sector number is only needed if you are using an existing sectorbuilder and want to benchmark a real sector. Else you can specify any integer as the sector number, it won´t affect the performance.

```shell
./lotus-bench simple window-post --sector-size <size> /your/path/to/sealed-sector-file /your/path/to/sector-cache-folder <commR> [sector num]
```

Together with the performance, the command will output the proof for the WindowPoSt.

```
Vanilla 24.765454ms (20.19 GiB/s)
Proof 1.6556735s (309.2 MiB/s)
tfhJc8rPBfUEe/b1GFOPCD9pd[...]=
```

**WinningPoSt:**

To benchmark a single WinningPoSt you will need to specify the path of the sealed sector, the cache file, and the `commR` output you got in the PreCommit2 step. Specifying the correct sector number is only needed if you are using an existing sectorbuilder and want to benchmark a real sector. Else you can specify any integer as the sector number, it won´t affect the performance.

```shell
./lotus-bench simple winning-post --sector-size <size> /your/path/to/sealed-sector-file /your/path/to/sector-cache-folder <commR> [sector num]
```

Together with the performance, the command will output the proof for the WinningPoSt.

```
Vanilla 58.265476ms (8.581 GiB/s)
Proof 5.05608944s (101.3 MiB/s)
uEK4wgt2qG20ymd0Kee7Z+M[...]=
```

### SnapDeal tasks

**Unsealed update sector:**

Before we can run any SnapDeal sealing benchmarks, we need to create an new unsealed sector file that we are going to update.

```shell
./lotus-bench simple addpiece --sector-size <size> /dev/urandom /your/path/new-unsealed
```

Note that the `new-unsealed` in `/your/path/` is the file that will be created by the command, and not a directory.

Together with the performance, the command will output a piece CID and the number of bytes in the created new-unsealed sector. You will need both of these to perform the ReplicaUpdate benchmark.

```
AddPiece 1m26.991655711s (376.7 MiB/s)
baga6ea4seaqmbj3lw5365pwbqfh6pmf2rkc65t2ovobqt6zbtjn2frx4uvkyumy 34359738368
```

**ReplicaUpdate:**

To run a single ReplicaUpdate benchmark and create an updated sealed file, you will need to specify the path of the sealed sector, the cache, and the new-unsealed sector. You will also need to specify the path for the updated sector, the updated cache file, and the piece CID and piece size from the `add-piece` step.

```shell
./lotus-bench simple addpiece --sector-size <size> /your/path/sealed /your/path/cache /your/path/sealed /your/path/new-unsealed /your/path/updated /your/path/updated-cache <piece cid> <piece size>
```

Together with the performance, the command will output the `commD` and `commR` of the updated sector that you will need if you want to perform the ProveReplicaUpdate 1 & 2 benchmarks.

```
ReplicaUpdate 17.796460491s (28.77 MiB/s)
d:baga6ea4seaqgfbyx6wi2zuff5c5njfhrpzrdbv7rgyulnl7ypashh7z62hercha r:bagboea4b5abcazijqwde3greyittndi6qvg6euem6gmc5qt6l6a3t2dbevijlsaa
```

**ProveReplicaUpdate1:**

To run a single ProveReplicaUpdate1 benchmark you will need to specify the path of the original sealed sector and its cache file, together with the updated sector and its updated cache file. You will also have to specify the original sectors sector-key (The `commR`), and the updated sectors `commR` and `commD`. Lastly, you will need to specify the path for the json output from this benchmark.

```shell
./lotus-bench simple provereplicaupdate1 --sector-size <size> /your/path/sealed /your/path/cache /your/path/updated /your/path/updated-cache <sectorKey> <ReplicaUpdate commR> <ReplicaUpdate commD> /your/path/PRU1.json
```

Together with the performance, the command will save a `.json` file in the path you specified. This file is needed to perform the ProveReplicaUpdate 2 step.

```
ProveReplicaUpdate1 1.480227714s (345.9 MiB/s)
```

**ProveReplicaUpdate2:**

To run a single ProveReplicaUpdate2 you need to specify the path for the original sectors sector-key, and the updated sectors `commR`and `commD` together with the `.json` file from the ProveReplicaUpdate 1 step.

```shell
./lotus-bench simple provereplicaupdate2 --sector-size <size> <sectorKey> <ReplicaUpdate commR> <ReplicaUpdate commD> /your/path/PRU1.json
```

Together with the performance, the command will output the final proof for the SnapDeal sector.

```
ProveReplicaUpdate2 21m45.831527979s (25.09 MiB/s)
p: ixvQ/W+Npy9Q0xQ2/K7hLjeM0if/yPYi1TY[...]==
```

## GPUs

It is recommended to configure and use the [CUDA architecture for Lotus]({{< relref "../../tutorials/lotus-miner/cuda/" >}}).

### Testing whether the GPU is used

First, to watch GPU utilization run `nvtop` in one terminal, then in a separate terminal, run a sealing benchmark to simulate sealing of a sector of small size:

```shell
./lotus-bench sealing --sector-size=2KiB
```

This process uses a small amount of GPU, and generally takes only a couple of minutes to complete. If you do not see any activity in nvtop from lotus during the entire process, it is likely something is misconfigured with your GPU.
