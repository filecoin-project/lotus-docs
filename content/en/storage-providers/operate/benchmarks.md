---
title: "Benchmarks"
description: "Lotus comes with a benchmarking tool that can be used to test how long each resource-intensive mining operation takes. This guide describes how to install the benchmarking tool, and some basic operations."
lead: "Lotus comes with a benchmarking tool that can be used to test how long each resource-intensive mining operation takes. This guide describes how to install the benchmarking tool, and some basic operations."
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

   ```shell with-output
   git clone https://github.com/filecoin-project/lotus.git ~/lotus
   ```

   This will output something like:

   ```
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

   This will output something like:

   ```
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

   This will output something like:

   ```
   rm -f lotus-bench
   go build -o lotus-bench ./cmd/lotus-bench
   ...
   go run github.com/GeertJohan/go.rice/rice append --exec lotus-bench -i ./build
   ```

   This will produce a `lotus-bench` binary in the current folder.

1. You can now run `lotus-bench` against your system.

## Usage

Use the self-documenting feature of the tool to explore the different commands.

```shell with-output
    ./lotus-bench --help
```

This will output something like:

```
  NAME:
  lotus-bench - Benchmark performance of lotus on your hardware

  USAGE:
  lotus-bench [global options] command [command options] [arguments...]

  VERSION:
  1.15.1

  COMMANDS:
  prove    Benchmark a proof computation
  sealing
  import   benchmark chain import and validation
  help, h  Shows a list of commands or help for one command

  GLOBAL OPTIONS:
  --help, -h     show help (default: false)
  --version, -v  print the version (default: false)
```

## Commands

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

### Sealing

Benchmark a sealing computation using `lotus-bench sealing [command options] [arguments...]`. For example:

```shell with-output
./lotus-bench sealing
```

This will output something like:

```
2022-04-13T18:37:41.141+0200	INFO	lotus-bench	lotus-bench/main.go:103	Starting lotus-bench
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

## GPUs

The list of known-to-work supported GPUs is in the [hardware-requirements]({{< relref "hardware-requirements" >}}).

### Enabling a custom GPU

If you want to test a GPU that is not explicitly supported, set the following environment variable:

```shell
export BELLMAN_CUSTOM_GPU="<NAME>:<NUMBER_OF_CORES>"
```

Here is an example of trying a GeForce GTX 1660 Ti with 1536 cores:

```shell
export BELLMAN_CUSTOM_GPU="NVIDIA GeForce 3090 Ti:10752"
```

{{< alert icon="warning" >}}
To get the number of cores for your GPU, you will need to check your card's specifications.
{{< /alert >}}

### Testing whether the GPU is used

First, to watch GPU utilization run `nvtop` in one terminal, then in a separate terminal, run the [benchmarking tool]({{< relref "benchmarks" >}}) to simulate sealing of a sector of small size:

```shell
./lotus-bench sealing --sector-size=2KiB
```

This process uses a fair amount of GPU, and generally takes ~4 minutes to complete. If you do not see any activity in nvtop from lotus during the entire process, it is likely something is misconfigured with your GPU.
