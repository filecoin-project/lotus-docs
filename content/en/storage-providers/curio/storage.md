---
title: "Curio Storage Configuration"
description: "This guide describes how to attach and configure sealing and permanent storage for Curio nodes"
lead: "This guide describes how to attach and configure sealing and permanent storage for Curio nodes"
draft: false
menu:
    storage-providers:
        parent: "curio"
weight: 131
toc: true
---

Each Curio node keeps track of defined storage locations in `~/.curio/storage.json` (or `$CURIO_REPO_PATH/storage.json`) and uses `~/.curio` path as default.

Upon initialization of a storage location, a `<path-to-storage>/sectorstorage.json` file is created that contains the UUID assigned to this location, along with whether it can be used for sealing or storing.

### Adding sealing storage location

Before adding your sealing storage location you will need to consider where the sealing tasks are going to be performed.
This command must be run locally from the Curio node where you want to attach the storage.


```sh
curio cli --machine <Machine IP:Port> storage attach --init --seal <PATH_FOR_SEALING_STORAGE>
```

### Adding long-term storage location

**Custom location for storing:** After the _sealing_ process is completed, sealed sectors are moved to the _store_ location, which can be specified as follows:

```sh
curio cli --machine <Machine IP:Port> storage attach --init --store <PATH_FOR_LONG_TERM_STORAGE>
```

This command must be run locally from the Curio node where you want to attach the storage.
This location can be made of large capacity, albeit slower, spinning-disks.
