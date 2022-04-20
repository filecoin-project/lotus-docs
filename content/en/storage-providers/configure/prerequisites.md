---
title: "Prerequisites"
description: "This guide describes the necessary prerequisites before configuring a Lotus miner for production."
lead: "This guide describes the necessary prerequisites before configuring a Lotus miner for production.."
draft: false
menu:
    storage-providers:
        parent: "storage-providers-configure"
aliases:
    - /docs/storage-providers/setup/
weight: 100
toc: true
---

Mining will only work if you fully cover the [minimal hardware requirements]({{< relref "../get-started/hardware-requirements" >}}) for the network in which you will mine. As the mining process is very demanding for the machines on several aspects and relies on precise configuration, we strongly recommend Linux systems administration experience before embarking.

## Pre-requisites

Before attempting to follow this guide:

- Make sure you meet the [minimal hardware requirements]({{< relref "hardware-requirements" >}}).
- Make sure you have followed the instructions to [install the Lotus suite]({{< relref "../../lotus/install/prerequisites" >}}) and make sure you have built Lotus with "Native Filecoin FFI". Once the installation is complete, `lotus`, `lotus-miner` and `lotus-worker` will be installed.
- Make sure your Lotus Node is running as the miner will communicate with it and cannot work otherwise.
- If you are in China, read the [tips for running in China]({{< relref "../../lotus/install/prerequisites#node-in-china" >}}) page first.

{{< alert icon="callout" >}}
Be warned: if you decide to skip any of the sections below, things will not work! Read and tread carefully.
{{< /alert >}}
