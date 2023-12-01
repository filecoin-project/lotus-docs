---
title: "SupraSeal PC2 Setup"
description: "This is a step by step guide on how to enable th experimental SupraSeal PC2 features on your Lotus-Workers."
lead: "This is a step by step guide on how to enable the experimental SupraSeal C2 feature on your Lotus-Workers that is in the Lotus v1.25.0 release."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 220
toc: true
---

## Pre-requisites 

- You need to have CUDA configured on your server. Check out the CUDA installation tutorial.
- Rust installed.
- Ubuntu 22.04 LTS or higher for the server running SupraSeal PC2.
- Your lotus-miner and workers needs to be built from source with the `FFI_USE_FIXED_ROWS_TO_DISCARD=1` enviroment variable.

{{< alert icon="warning" >}}
SupraSeal PC2, when invoked via the `lotus-worker`, has been verified to function properly with Committed Capacity (CC) sectors, both Synthetic and non-Synthetic. However, we have experienced reliable errors when using it with deal sectors. As a result, we advise against using SupraSeal PC2 called through the lotus-worker for now with deal sectors in the sealing pipeline, except in testing environments. We will update this guide once the issues with sealing deal sectors have been resolved.
{{< /alert >}}

## Benchmarks
Some early benchmarks with different GPUs (More coming):

| GPU            | Speedup | CUDA (sec) | SupraSeal PC2 (sec) |
| -------------- | ------- | ---------- | ------------------- |
| RTX A5000      |         |            |         151         |

## Setup

{{< alert icon="warning" >}}
Please note that the `FFI_USE_FIXED_ROWS_TO_DISCARD=1` environment variable must be exported, and your entire lotus-miner cluster must be built from source with this enviroment variable to be able to run SupraSeal PC2. SupraSeal PC2 cannot work with sectors sealed without this environment variable set.
{{< /alert >}}

1. Install dependencies needed for building and using the SupraSeal PC2 binary

```shell
sudo apt install build-essential libconfig++-dev libgmp-dev wget git curl
``` 

2. Checkout [Lotus v1.25.1-rc1](https://github.com/filecoin-project/lotus/releases/tag/v1.25.1-rc1).
3. [Build from source]({{< relref "../../lotus/install/linux/#native-filecoin-ffi" >}}) with the environment variable `FFI_USE_FIXED_ROWS_TO_DISCARD=1` exported.

**Please note that you also need to export and build with this enviroment variable across the lotus-miner stack of machines. Else the SupraSeal PC2 will fail!**

4. Run the build script for SupraSeal PC2 located in the `../lotus/scripts/` folder

```
cd /lotus/scripts
./supraseal-pc2.sh
```

## Run with benchmark-tool:

1. First generate a sector with some random data, we will use a 512MiB in this benchmark:

```shell with-output
./lotus-bench simple addpiece --sector-size 512M /dev/random s-unsealed
```
```
AddPiece 1.613019762s (317.4 MiB/s)
baga6ea4seaqdsvqopmj2soyhujb72jza76t4wpq5fzifvm3ctz47iyytkewnubq 536870912
```

2. Generate the PreCommit1 for the sector. Remember to adjust the CID and size according to your inputs and outputs from the previous step:

```shell with-output
./lotus-bench simple precommit1 --sector-size 512M s-unsealed s-sealed s-cache baga6ea4seaqi646o3xo3mgwctpxyd5imoijluw2nm4rzwt532wcqqjqcpgvxmna 536870912
```
```
PreCommit1 2m45.338767868s (3.097 MiB/s)
eyJfbG90dXNfU2VhbFJhbmRvbW5lc3MiOiJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFPSIsImNvbW1fZCI6WzU3LDg2LDE0LDEyMywxOSwxNjksNTksNywxNjIsNjcsMjUzLDM5LDMyLDI1NSwxNjcsMjAzLDYyLDI5LDQ2LDgwLDkwLDE3OSw5OCwxNTgsMTIxLDI0NCw5OSwxOSw4MSw0NCwyMTgsNl0sImNvbmZpZyI6eyJpZCI6InRyZWUtZCIsInBhdGgiOiJzLWNhY2hlIiwicm93c190b19kaXNjYXJkIjowLCJzaXplIjozMzU1NDQzMX0sImxhYmVscyI6eyJTdGFja2VkRHJnNTEyTWlCVjEiOnsiX2giOm51bGwsImxhYmVscyI6W3siaWQiOiJsYXllci0xIiwicGF0aCI6InMtY2FjaGUiLCJyb3dzX3RvX2Rpc2NhcmQiOjAsInNpemUiOjE2Nzc3MjE2fSx7ImlkIjoibGF5ZXItMiIsInBhdGgiOiJzLWNhY2hlIiwicm93c190b19kaXNjYXJkIjowLCJzaXplIjoxNjc3NzIxNn1dfX0sInJlZ2lzdGVyZWRfcHJvb2YiOiJTdGFja2VkRHJnNTEyTWlCVjFfMSJ9
```

3. Now call the SupraSeal PC2 binary with the `--external-pc2` flag.

```shell with-output
GOLOG_LOG_LEVEL=debug RUST_LOG=trace ./lotus-bench simple precommit2 --sector-size 512MiB --external-pc2 './pc2 -b 512MiB -c supra_seal.cfg -i "${EXTSEAL_PC2_CACHE}" -o "${EXTSEAL_PC2_CACHE}" -d "${EXTSEAL_PC2_UNSEALED}" && rm -f "${EXTSEAL_PC2_SEALED}" && mv "${EXTSEAL_PC2_CACHE}/sealed-file" "${EXTSEAL_PC2_SEALED}"' s-sealed s-cache eyJfbG90dXNfU2VhbFJhbmRvbW5lc3MiOiJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFQkFRRUJBUUVCQVFFPSIsImNvbW1fZCI6WzU3LDg2LDE0LDEyMywxOSwxNjksNTksNywxNjIsNjcsMjUzLDM5LDMyLDI1NSwxNjcsMjAzLDYyLDI5LDQ2LDgwLDkwLDE3OSw5OCwxNTgsMTIxLDI0NCw5OSwxOSw4MSw0NCwyMTgsNl0sImNvbmZpZyI6eyJpZCI6InRyZWUtZCIsInBhdGgiOiJzLWNhY2hlIiwicm93c190b19kaXNjYXJkIjowLCJzaXplIjozMzU1NDQzMX0sImxhYmVscyI6eyJTdGFja2VkRHJnNTEyTWlCVjEiOnsiX2giOm51bGwsImxhYmVscyI6W3siaWQiOiJsYXllci0xIiwicGF0aCI6InMtY2FjaGUiLCJyb3dzX3RvX2Rpc2NhcmQiOjAsInNpemUiOjE2Nzc3MjE2fSx7ImlkIjoibGF5ZXItMiIsInBhdGgiOiJzLWNhY2hlIiwicm93c190b19kaXNjYXJkIjowLCJzaXplIjoxNjc3NzIxNn1dfX0sInJlZ2lzdGVyZWRfcHJvb2YiOiJTdGFja2VkRHJnNTEyTWlCVjFfMSJ9
```
```
pc2 took 3 seconds utilizing 87381.3 iOPS
PreCommit2 6.91751121s (74.02 MiB/s)
d:baga6ea4seaqdsvqopmj2soyhujb72jza76t4wpq5fzifvm3ctz47iyytkewnubq r:bagboea4b5abcbgfzry2gavrhgzhefwz3pyozaheii5kcjako55zr65zolhwmwbbq
```

And there you have the SupraSeal PC2 performance running `lotus-bench`.

## Use with the lotus-worker:
