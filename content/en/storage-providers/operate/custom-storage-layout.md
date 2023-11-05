---
title: "Custom storage layout"
description: "This guide describes how to specify custom storage locations for the Lotus Miner, depending on the needs and available hardware."
lead: "This guide describes how to specify custom storage locations for the Lotus Miner, depending on the needs and available hardware."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-operate"
        identifier: "storage-providers-configure-custom-storage-layout"
aliases:
    - /docs/storage-providers/custom-storage-layout/
weight: 315
toc: true
---

If you used the `--no-local-storage` flag during the [miner initialization]({{< relref "../setup/initialize#miner-initialization" >}}), you should specify the disk locations for sealing (fast SSD recommended) and long-term storage.

The `lotus-miner` keeps track of defined storage locations in  `~/.lotusminer/storage.json` (or `$LOTUS_MINER_PATH/storage.json`) and uses the `~/.lotusminer` path as default.

Upon initialization of a storage location, a `<path-to-storage>/sectorstorage.json` file is created that contains the UUID assigned to this location, along with whether it can be used for sealing or storing.

## Custom location for sealing

The _seal_ storage location is used when sealing sectors. It should be a really fast storage medium so that the disk does not become the bottleneck that delays the sealing process. It can be specified with:

```sh
lotus-miner storage attach --init --seal <PATH_FOR_SEALING_STORAGE>
```

### Filter sector types

You can filter for what sectors types are allowed in each sealing path by adjusting the configuration file in: `<path-to-storage>/sectorstorage.json`.

```json
{
  "ID": "1626519a-5e05-493b-aa7a-0af71612010b",
  "Weight": 10,
  "CanSeal": false,
  "CanStore": true,
  "MaxStorage": 0,
  "Groups": [],
  "AllowTo": [],
  "AllowTypes": null,
  "DenyTypes": null
}
```

Valid values for `AllowTypes` and `DenyTypes` are:

```
"unsealed"
"sealed"
"cache"
"update"
"update-cache"
```

These values must be put in an array to be valid (e.g `"AllowTypes": ["unsealed", "update-cache"]`), any other values will generate an error on startup of the `lotus-miner`. A restart of the `lotus-miner` is also needed for changes to take effect. 

{{< alert icon="tip" >}}
If you'd like to have a clear overview of the storage list, it is possible to edit the "ID": "1626519a-5e05-493b-aa7a-0af71612010b" <-> "ID": "Sealing-Server" in `sectorstorage.json`.
{{< /alert >}}

## Custom location for storing

Once the _sealing_ process is completed, sealed sectors are moved to the _store_ location, which can be specified as follows:

```sh
lotus-miner storage attach --init --store <PATH_FOR_LONG_TERM_STORAGE>
```

This location can be made of large capacity, albeit slower, spinning-disks.

### Separate sealed and unsealed

A very basic setup where you want to separate unsealed and sealed sectors could be achieved by:

- Add `"DenyTypes": ["unsealed"]` to long-term storage path(s) where you want to store the sealed sectors.
- Add `"AllowTypes": ["unsealed"]` to long-term storage path(s) where you want to store the unsealed sectors.

Setting only `unsealed` for `AllowTypes` will still allow `cache` and `update-cache` files to be placed in this storage path. If you want to completely deny all other types of sectors in this path, you can add additional valid values to the `"DenyTypes"` field.

{{< alert icon="tip">}}
If there are existing files with disallowed types in a storage path, those files will remain readable for PoSt/Retrieval. So the worst that can happen in case of misconfiguration in the storage path is that sealing tasks will get stuck waiting for storage to become available.
{{< /alert >}}

## Listing storage locations

You can see all your storage locations with the `lotus-miner storage list` command:

```shell
lotus-miner storage list
```
```output
Sealing-Server:
[##########                             ] 1.521 TiB/6.93 TiB 21%
  Unsealed: 15; Sealed: 10; Caches: 10; Updated: 7; Update-caches: 7; Reserved: 1.007 TiB
  Weight: 10; Use: Seal 
  Local: /root/sealing
  URL: http://127.0.0.1:2345/remote

Storage-Unsealed:
[###########################            ] 326.8 TiB/420.2 TiB 77%
  Unsealed: 6520; Sealed: 0; Caches: 0; Updated: 0; Update-caches: 0; Reserved: 0 B
  Weight: 10; Use: Store
  Allow Types: unsealed
  Local: /root/storage2
  URL: http://127.0.0.1:2345/remote

Storage-Sealed:
[###########################            ] 326.8 TiB/420.2 TiB 77%
  Unsealed: 0; Sealed: 5960; Caches: 5960; Updated: 560; Update-caches: 560; Reserved: 0 B
  Weight: 10; Use: Store
  Allow Types: sealed
  Local: /root/storage3
  URL: http://127.0.0.1:2345/remote
```

### Detach storage paths

You can detach a storage path with the `lotus-miner storage detach /path/to/storage` command. Please note that if you are permanently detaching a storage path you should make sure that there are no leftover sectors in the storage path. 

## Updating locations

You can update sector locations without restarting the `lotus-miner` with the `lotus-miner storage redeclare` command if you want to move sector data from one storage path to another storage path. If moving sectors to a storage path on a separate server it's recommended to use a utility like r-sync or similar that has checksum on both ends. If moving data to a separate server, it is also good practice to keep a backup of important sector files like sealed sectors and cache until you have passed the first WindowPoSt with the new storage location.

1. To redeclare sector(s) in another storage path, first copy the sector file to the new location:

```shell
rsync -avP <source> <destination>
```
```output
sending incremental file list
s-t01024-1
[......]
sent 537,002,093 bytes  received 35 bytes  358,001,418.67 bytes/sec
total size is 536,870,912  speedup is 1.00
```

2. Redeclare the sector(s) in the new storage path.

```shell
lotus-miner storage redeclare --all
```

You should now be able to see that the sectors has been redeclared in the new path. You also have the option to specify the `--id` of the storage path when redeclaring instead of using the actual path.

3. Move sector(s) from the old storage-path to a backup folder.

```shell
rsync -avP --remove-source-files <old-path> <backup-destination>
```
```output
sending incremental file list
sealed/
sealed/s-t01024-1
[......]
sent 537,002,093 bytes  received 35 bytes  358,001,418.67 bytes/sec
total size is 536,870,912  speedup is 1.00
```

4. Drop index entries with missing files in the old storage path

```shell
lotus-miner storage redeclare --all
```

You should now be able to see that the sectors entries has been removed from the old path.

5. Pass windowPoSt and remove the backup

After passing you first windowPoSt(s), or running `lotus-miner proving compute window-post [deadlineIndex]` for the deadline(s) that includes the sectors moved to the new storage path, you can safely delete the backup files.
