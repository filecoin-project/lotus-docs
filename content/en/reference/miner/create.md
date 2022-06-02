---
title: "Create"
draft: false
menu:
    reference:
              parent: "reference-miner"
              identifier: "reference-miner-methods-create"
toc: true
---

## CreateBackup

CreateBackup creates node backup onder the specified file name. The
method requires that the lotus-miner is running with the
LOTUS_BACKUP_BASE_PATH environment variable set to some path, and that
the path specified when calling CreateBackup is within the base path

Perms: admin

Inputs:

```json
[
  "string value"
]
```

Response: `{}`
