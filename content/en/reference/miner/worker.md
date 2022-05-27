---
title: "Worker"
draft: false
menu:
    reference:
             parent: "reference-miner"
toc: true
---

## WorkerConnect

WorkerConnect tells the node to connect to workers RPC

Perms: admin

Inputs:

```json
[
  "string value"
]
```

Response: `{}`

## WorkerJobs

Perms: admin

Inputs: `null`

Response:

```json
{
  "ef8d99a2-6865-4189-8ffa-9fef0f806eee": [
    {
      "ID": {
        "Sector": {
          "Miner": 1000,
          "Number": 100
        },
        "ID": "76081ba0-61bd-45a5-bc08-af05f1c26e5d"
      },
      "Sector": {
        "Miner": 1000,
        "Number": 100
      },
      "Task": "seal/v0/precommit/2",
      "RunWait": 0,
      "Start": "2020-11-12T09:22:07Z",
      "Hostname": "host"
    }
  ]
}
```

## WorkerStats

Perms: admin

Inputs: `null`

Response:

```json
{
  "ef8d99a2-6865-4189-8ffa-9fef0f806eee": {
    "Info": {
      "Hostname": "host",
      "IgnoreResources": false,
      "Resources": {
        "MemPhysical": 274877906944,
        "MemUsed": 2147483648,
        "MemSwap": 128849018880,
        "MemSwapUsed": 2147483648,
        "CPUs": 64,
        "GPUs": [
          "aGPU 1337"
        ],
        "Resources": {
          "post/v0/windowproof": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 1073741824,
              "MaxMemory": 1610612736,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10737418240
            },
            "3": {
              "MinMemory": 32212254720,
              "MaxMemory": 103079215104,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 34359738368
            },
            "4": {
              "MinMemory": 64424509440,
              "MaxMemory": 128849018880,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 68719476736
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 1073741824,
              "MaxMemory": 1610612736,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10737418240
            },
            "8": {
              "MinMemory": 32212254720,
              "MaxMemory": 103079215104,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 34359738368
            },
            "9": {
              "MinMemory": 64424509440,
              "MaxMemory": 128849018880,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 68719476736
            }
          },
          "post/v0/winningproof": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10737418240
            },
            "3": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 34359738368
            },
            "4": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 68719476736
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10737418240
            },
            "8": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 34359738368
            },
            "9": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 68719476736
            }
          },
          "seal/v0/addpiece": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "3": {
              "MinMemory": 4294967296,
              "MaxMemory": 4294967296,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "4": {
              "MinMemory": 8589934592,
              "MaxMemory": 8589934592,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "8": {
              "MinMemory": 4294967296,
              "MaxMemory": 4294967296,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "9": {
              "MinMemory": 8589934592,
              "MaxMemory": 8589934592,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            }
          },
          "seal/v0/commit/1": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "3": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "4": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "8": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "9": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            }
          },
          "seal/v0/commit/2": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 1073741824,
              "MaxMemory": 1610612736,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10737418240
            },
            "3": {
              "MinMemory": 32212254720,
              "MaxMemory": 161061273600,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 34359738368
            },
            "4": {
              "MinMemory": 64424509440,
              "MaxMemory": 204010946560,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 68719476736
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 1073741824,
              "MaxMemory": 1610612736,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10737418240
            },
            "8": {
              "MinMemory": 32212254720,
              "MaxMemory": 161061273600,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 34359738368
            },
            "9": {
              "MinMemory": 64424509440,
              "MaxMemory": 204010946560,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 68719476736
            }
          },
          "seal/v0/fetch": {
            "0": {
              "MinMemory": 1048576,
              "MaxMemory": 1048576,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 0
            },
            "1": {
              "MinMemory": 1048576,
              "MaxMemory": 1048576,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 0
            },
            "2": {
              "MinMemory": 1048576,
              "MaxMemory": 1048576,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 0
            },
            "3": {
              "MinMemory": 1048576,
              "MaxMemory": 1048576,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 0
            },
            "4": {
              "MinMemory": 1048576,
              "MaxMemory": 1048576,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 0
            },
            "5": {
              "MinMemory": 1048576,
              "MaxMemory": 1048576,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 0
            },
            "6": {
              "MinMemory": 1048576,
              "MaxMemory": 1048576,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 0
            },
            "7": {
              "MinMemory": 1048576,
              "MaxMemory": 1048576,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 0
            },
            "8": {
              "MinMemory": 1048576,
              "MaxMemory": 1048576,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 0
            },
            "9": {
              "MinMemory": 1048576,
              "MaxMemory": 1048576,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 0
            }
          },
          "seal/v0/precommit/1": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 805306368,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1048576
            },
            "3": {
              "MinMemory": 60129542144,
              "MaxMemory": 68719476736,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10485760
            },
            "4": {
              "MinMemory": 120259084288,
              "MaxMemory": 137438953472,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10485760
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 805306368,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1048576
            },
            "8": {
              "MinMemory": 60129542144,
              "MaxMemory": 68719476736,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10485760
            },
            "9": {
              "MinMemory": 120259084288,
              "MaxMemory": 137438953472,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10485760
            }
          },
          "seal/v0/precommit/2": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 1073741824,
              "MaxMemory": 1610612736,
              "GPUUtilization": 0,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "3": {
              "MinMemory": 16106127360,
              "MaxMemory": 16106127360,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 1073741824
            },
            "4": {
              "MinMemory": 32212254720,
              "MaxMemory": 32212254720,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 1073741824
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 1073741824,
              "MaxMemory": 1610612736,
              "GPUUtilization": 0,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "8": {
              "MinMemory": 16106127360,
              "MaxMemory": 16106127360,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 1073741824
            },
            "9": {
              "MinMemory": 32212254720,
              "MaxMemory": 32212254720,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 1073741824
            }
          },
          "seal/v0/provereplicaupdate/1": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "3": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "4": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "8": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "9": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 0,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            }
          },
          "seal/v0/provereplicaupdate/2": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 1073741824,
              "MaxMemory": 1610612736,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10737418240
            },
            "3": {
              "MinMemory": 32212254720,
              "MaxMemory": 161061273600,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 34359738368
            },
            "4": {
              "MinMemory": 64424509440,
              "MaxMemory": 204010946560,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 68719476736
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 1073741824,
              "MaxMemory": 1610612736,
              "GPUUtilization": 1,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10737418240
            },
            "8": {
              "MinMemory": 32212254720,
              "MaxMemory": 161061273600,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 34359738368
            },
            "9": {
              "MinMemory": 64424509440,
              "MaxMemory": 204010946560,
              "GPUUtilization": 1,
              "MaxParallelism": -1,
              "MaxParallelismGPU": 6,
              "BaseMinMemory": 68719476736
            }
          },
          "seal/v0/regensectorkey": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "3": {
              "MinMemory": 4294967296,
              "MaxMemory": 4294967296,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "4": {
              "MinMemory": 8589934592,
              "MaxMemory": 8589934592,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "8": {
              "MinMemory": 4294967296,
              "MaxMemory": 4294967296,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "9": {
              "MinMemory": 8589934592,
              "MaxMemory": 8589934592,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            }
          },
          "seal/v0/replicaupdate": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "3": {
              "MinMemory": 4294967296,
              "MaxMemory": 4294967296,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "4": {
              "MinMemory": 8589934592,
              "MaxMemory": 8589934592,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 1073741824,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "8": {
              "MinMemory": 4294967296,
              "MaxMemory": 4294967296,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            },
            "9": {
              "MinMemory": 8589934592,
              "MaxMemory": 8589934592,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1073741824
            }
          },
          "seal/v0/unseal": {
            "0": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "1": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "2": {
              "MinMemory": 805306368,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1048576
            },
            "3": {
              "MinMemory": 60129542144,
              "MaxMemory": 68719476736,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10485760
            },
            "4": {
              "MinMemory": 120259084288,
              "MaxMemory": 137438953472,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10485760
            },
            "5": {
              "MinMemory": 2048,
              "MaxMemory": 2048,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 2048
            },
            "6": {
              "MinMemory": 8388608,
              "MaxMemory": 8388608,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 8388608
            },
            "7": {
              "MinMemory": 805306368,
              "MaxMemory": 1073741824,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 1048576
            },
            "8": {
              "MinMemory": 60129542144,
              "MaxMemory": 68719476736,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10485760
            },
            "9": {
              "MinMemory": 120259084288,
              "MaxMemory": 137438953472,
              "GPUUtilization": 0,
              "MaxParallelism": 1,
              "MaxParallelismGPU": 0,
              "BaseMinMemory": 10485760
            }
          }
        }
      }
    },
    "Tasks": null,
    "Enabled": true,
    "MemUsedMin": 0,
    "MemUsedMax": 0,
    "GpuUsed": 0,
    "CpuUse": 0
  }
}
```
