---
title: "Logging"
description: "This guide covers the Lotus Miner log configuration and logging usage."
lead: "This guide describes how to capture logs to a file and search through the file for important events."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-advanced-configurations"
aliases:
    - /storage-providers/operate/journal/
weight: 525
toc: true
---

## Log file configuration

The `lotus-miner` process generates Go logs and Rust logs. Both of these can be redirected to individual files.

{{< alert icon="callout" >}}
This section is not applicable if you are running `lotus-miner` as a systemd service.
{{< /alert >}}

### Redirect Go logs to a file

By default, lotus-miner redirect all logs to the standard output if not running as a systemd service. To change this behavior, add the following variable to the `.bashrc` file and restart the Lotus miner process to start redirecting all logs to the file.

```shell
export GOLOG_OUTPUT=FILE >> ~/.bashrc
export GOLOG_FILE="$HOME/miner.log" >> ~/.bashrc && source ~/.bashrc
```

### Redirect Rust logs to a standard output

By default the `fil_logger` library used by `rust-fil-proof` doesn't log anything. You can change this by setting the RUST_LOG environment variable to another level. This will show log output on stderr which can be redirected to a file in the shell while launching the `lotus-miner` command.

```shell
export RUST_LOG=info >> ~/.bashrc && source ~/.bashrc
```

The log-level can be chosen between 5 options:

- trace
- debug
- info
- warn
- error

## Change logging verbosity

The verbosity of the `lotus` and `lotus-miner` logs can be changed without restarting the lotus. The following command can be used to list different subsystems within the `lotus-miner` process and change the verbosity of individual subsystem to get more/less detailed logs.

```shell
lotus-miner log list
```

To change the verbosity, please run:

```shell
lotus-miner log set-level --system chain debug
```

The log-level can be chosen between 4 options:

- debug
- info
- warn
- error

You can specify multiple subsystems to change the log level of multiple subsystems at once.

```shell
lotus-miner log set-level --system chain --system chainxchg debug
```

## Searching through logs

1. To look for logs related to mining a block, you can check with following commands.
    ```shell
    cat /path/to/log | grep "mined"
    ```

2. To look for logs related to winning a block, you can check with following commands.
    ```shell
    cat /path/to/log | grep "isEligible"
    ```
