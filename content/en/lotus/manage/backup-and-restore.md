---
title: "Backup and restore"
description: "You can backup your Lotus node. You can then restore this backup if something goes wrong, or you simply wish to move your Lotus node from one computer to another."
lead: "You can backup your Lotus node. You can then restore this backup if something goes wrong, or you simply wish to move your Lotus node from one computer to another."
draft: false
menu:
    lotus:
        parent: "lotus-management"
        identifier: "lotus-management-backup-and-restore"
aliases:
    - /docs/set-up/backup-and-restore/
weight: 435
toc: true
---

This backup process is different to that of the [`lotus-miner` backup]({{< relref "../../storage-providers/operate/backup-and-restore/" >}}). This backup process does not retain information related to a storage provider, it only backs up metadata for the Lotus daemon.

{{< alert icon="warning" >}}
This does not backup your addresses private keys. For that you need to [export your wallet addresses]({{< relref "../../lotus/manage/manage-fil/#exporting-and-importing-addresses" >}})
{{< /alert >}}

## Backup

1. Stop your `lotus` daemon if it is already running.
1. Run `lotus daemon backup`:

    ```shell
    lotus backup --offline ~/lotus-backup.cbor
    ```

    ```shell output
    2021-09-24T20:21:03.986Z        INFO    backupds        backupds/datastore.go:75Starting datastore backup
    2021-09-24T20:21:03.987Z        INFO    backupds        backupds/datastore.go:130
    Datastore backup done
    ```

1. Your Lotus daemon data is now backed up into `lotus-backup.cbor`.

## Restore

1. Stop your `lotus` daemon if it is already running.
1. Run `lotus daemon` while using the `--restore` option:

    ```shell
    lotus daemon 2>&1 --restore=offline-backup.cbor
    ```

    ```shell output
    2021-09-24T20:24:51.729Z        INFO    main    lotus/daemon.go:218     lotus repo: /root/.lotus
    2021-09-24T20:24:51.730Z        INFO    paramfetch      go-paramfetch@v0.0.2/paramfetch.go:191  Parameter file /var/tmp/filecoin-proof-parameters/v28-proof-of-spacetime-fallback-merkletree-poseidon_hasher-8-0-0-7d739b8cf60f1b0709eeebee7730e297683552e4b69cab6984ec0285663c5781.vk is ok
    ...
    2021-09-24T20:24:52.296Z        INFO    badger  v2@v2.2007.2/value.go:1178      Replay took: 2.975µs
    2021-09-24T20:24:52.297Z        INFO    backupds        backupds/log.go:125     opening log     {"file": "/root/.lotus/kvlog/metadata/1632514590.log.cbor"}
    ```

1. The `lotus daemon` should continue to run from the block height at which your backup was taken.
