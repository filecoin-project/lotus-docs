---
title: "Daemon"
draft: false
menu:
    reference:
             parent: "reference-cli-lotus"
toc: true
---

## lotus daemon

```plaintext
NAME:
   lotus daemon - Start a lotus daemon process

USAGE:
   lotus daemon command [command options] [arguments...]

COMMANDS:
   stop     Stop a running lotus daemon
   help, h  Shows a list of commands or help for one command

OPTIONS:
   --api value               (default: "1234")
   --genesis value           genesis file to use for first node run
   --bootstrap               (default: true)
   --import-chain value      on first run, load chain from given file or url and validate
   --import-snapshot value   import chain state from a given chain export file or url
   --halt-after-import       halt the process after importing chain from file (default: false)
   --lite                    start lotus in lite mode (default: false)
   --pprof value             specify name of file for writing cpu profile to
   --profile value           specify type of node
   --manage-fdlimit          manage open file limit (default: true)
   --config value            specify path of config file to use
   --api-max-req-size value  maximum API request size accepted by the JSON RPC server (default: 0)
   --restore value           restore from backup file
   --restore-config value    config file to use when restoring from backup
   --help, -h                show help (default: false)
   
```

### lotus daemon stop

```plaintext
NAME:
   lotus daemon stop - Stop a running lotus daemon

USAGE:
   lotus daemon stop [command options] [arguments...]

OPTIONS:
   --help, -h  show help (default: false)
   
```
