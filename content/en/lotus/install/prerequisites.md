---
title: "Prerequisites"
description: "This page provide details on Lotus installation prerequisites and supported platforms."
draft: false
menu:
    lotus:
        parent: "lotus-install"
        identifier: "lotus-install-prerequisites"
aliases:
    - /docs/set-up/install/
    - /get-started/lotus/installation
weight: 205
toc: true
---

Please make sure to read the pages in the [Get started section]({{< relref "../../lotus/get-started/what-is-lotus/" >}}) before proceeding with the installation of Lotus.
This page provide details on prerequisites before Lotus installation prerequisites and supported platforms.

## Minimal requirements

To run a Lotus node your computer must have:

- macOS or Linux installed. Windows is not yet supported.
- 8-core CPU and 32 GiB RAM. Models with support for _Intel SHA Extensions_ (AMD since Zen microarchitecture or Intel since Ice Lake) will significantly speed things up.
- Enough space to store the current Lotus chain (preferably on an SSD storage medium). The chain grows at approximately 38 GiB per day. The chain can be [synced from trusted state snapshots and compacted or pruned]({{< relref "../../lotus/manage/chain-management/" >}}).

{{< alert icon="warning" >}}
These are the minimal requirements to run a Lotus node. [Hardware requirements for storage providers]({{< relref "../../storage-providers/get-started/hardware-requirements/" >}}) are different.
{{< /alert >}}

## Supported Platforms

Currently, lotus installation is supported on the following platforms.

- [Linux]({{< relref "linux" >}})
- [MacOS]({{< relref "macos" >}})