---
title: "Backup"
description: "Lorem ipsum."
draft: false
menu:
    reference:
             parent: "reference-cli"
toc: true
weight: 5
---

Backup this node's metadata.

The backup command writes a copy of node metadata under the specified path
   
Online backups: For security reasons, the daemon must be have `LOTUS_BACKUP_BASE_PATH` env var set to a path where backup files are supposed to be saved, and the path specified in this command must be within this base path

```shell
lotus backup [command options] [backup file path]
```

## stop

Stops the running daemon.

```shell
lotus daemon stop
```

| Name | Option(s) | Description | Default |
| --- | --- | --- | --- |
| Help | `--help`, `--h` | Shows the help options. | `false` |

