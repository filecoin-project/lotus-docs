---
title: "LevelDB metadata corruption recovery"
description: "This is a guide for how to recover LevelDB metadata in case of corruption"
date: 2022-08-15T12:00:35+01:00
lastmod: 2022-08-15T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["leveldb", "Lotus Miner"]
---

## Problem:

Corruption in the LevelDB metadata might happen due to a bad RAM-stick. In such cases you will encounter issues restarting the `lotus-miner` process again. The error log will look something similar to this: 

```shell
  - leveldb/table: corruption on data-block (pos=1352397): checksum mismatch, want=0x972e02b got=0x43ac9dfa [file=xxxx.ldb]
```

{{< alert icon="warning" >}}
You should only try this solution if you do not have a recent backup of the `lotus-miner`.
{{< /alert >}}

## Environment:

- Mainnet
- Calibnet

## Resolution:

First start by copying the corrupted metadata-folder to another location:

```shell with-output
rclone copy -P .lotusminer/datastore/metadata ./oldmeta
```
```
Transferred:      218.913k / 218.913 kBytes, 100%, 80.787 MBytes/s, ETA 0s
Errors:                 0
Checks:                 0 / 0, -
Transferred:            7 / 7, 100%
Elapsed time:          0s
```

Then install [plyvel](https://plyvel.readthedocs.io/en/latest/), a Python interface to LevelDB.

```shell with-output
pip install plyvel
```
```
Collecting plyvel
  Downloading plyvel-1.5.0-cp38-cp38-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (766 kB)
     |████████████████████████████████| 766 kB 27.2 MB/s 
Installing collected packages: plyvel
Successfully installed plyvel-1.5.0
```

Then we can write our Python program to recover the metadata. Type `python3` and write the program in the prompts:

```shell with-output
python3
```
```
Python 3.8.10 (default, Jun 22 2022, 20:18:18) 
[GCC 9.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import plyvel
>>> db = plyvel.DB('oldmeta')
>>> db2 = plyvel.DB('newmeta', create_if_missing=True)
>>> for key, v in db:
...     db2.put(key, v)
... 
>>> db2.close()
>>> [exit]
```

You should now have a new folder called `newmeta` with the recovered metadata. Move the original and corrupted metadata to a backup location.

```shell
rclone move -P .lotusminer/datastore/metadata ./backup-meta
```

We can now move and rename the recovered metadata in the `newmeta` folder into the `.lotusminer/datastore/` folder.

```shell
rclone move -P ./newmeta .lotusminer/datastore/metadata
```

You can now restart the `lotus-miner` process and see that it has been recovered.
 
## Extras:

These steps are only needed in cases where no proper metadata backup has been generated. It is advised to setup [proper automated backups of the metadata]({{<relref "../../storage-providers/operate/backup-and-restore/#backup" >}})