---
title: "Backup"
draft: false
menu:
    reference:
             parent: "reference-cli-lotus"
toc: true
---

```plaintext
NAME:
   lotus backup - Create node metadata backup

USAGE:
   lotus backup [command options] [backup file path]

DESCRIPTION:
   The backup command writes a copy of node metadata under the specified path
   
   Online backups:
   For security reasons, the daemon must be have LOTUS_BACKUP_BASE_PATH env var set
   to a path where backup files are supposed to be saved, and the path specified in
   this command must be within this base path

OPTIONS:
   --offline   create backup without the node running (default: false)
   --help, -h  show help (default: false)
   
```
