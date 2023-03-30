---
title: "Lightweight Filecoin Chain Snapshots"
description: "Lightweight Filecoin chain snapshots are a segment of the Filecoin chain exported to a Content Addressable aRchives (CAR) file."
date: 2022-03-17T12:00:35+01:00
lastmod: 2021-11-16T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["chain"]
---

Lightweight Filecoin chain snapshots are a segment of the Filecoin chain exported to a Content Addressable aRchives (CAR) file. They contain a chain segment large enough to allow the Filecoin network consensus protocol to apply messages successfully (2x+ finality; 1 for consensus; 1 for reorgs). Lightweight snapshots become less useful the older they are (as the chain progresses). The goal of providing lightweight snapshots is to allow users to join the network as quickly as possible.

{{< alert icon="warning" >}}
These lightweight snapshots do not contain any message receipts.
{{< /alert >}}

## Snapshot Links

The snapshot links issue a `302 Found` redirecting to the latest snapshot file. Snapshots files are named in the format of `<height>_YYYY_MM_DDTHH_MM_SSZ.car.zst` where the date & time is the chain timestamp for the given height. The height is the highest TipSet height in the chain.

These links can be used directly with Lotus `--chain-import` flag, the redirect will be followed.

## Verify a snapshot

Every snapshot has a sibling sha256sum file that can be downloaded to verify the snapshot before use.

```shell with-output
curl -I https://snapshots.mainnet.filops.net/minimal/latest
```
```
HTTP/1.1 302 Found
Date: Mon, 14 Nov 2022 21:53:28 GMT
Location: https://pub-fd31751bcb69400eb39e694385c19457.r2.dev/minimal/2338080_2022_11_14T18_00_00Z.car
Connection: keep-alive
```

You can then verify the snapshot:

```shell with-output
curl https://pub-fd31751bcb69400eb39e694385c19457.r2.dev/minimal/2338080_2022_11_14T18_00_00Z.sha256sum
```
```
192fa03d6451fd8f30f16b7904a591d2177a105d615a23432632fd40504ae375 *2338080_2022_11_14T18_00_00Z.car
5cd4d033e261429a41d8936ce1557b2f81feb764487f863b69978781c3c09128 *2338080_2022_11_14T18_00_00Z.car.zst
```


## Feedback & Issues

If you run into issues with the snapshots provided or have feedback you can open a discussion topic on the [Filecoin Chain Archiver repository](https://github.com/filecoin-project/filecoin-chain-archiver/discussions/new?category=feedback).
