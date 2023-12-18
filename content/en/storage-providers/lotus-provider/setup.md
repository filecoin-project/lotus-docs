---
title: "Migrate to Lotus-Provider"
description: "This guide will show you the three steps for migrating to Lotus-Provider, from Lotus-Miner"
lead: "This guide will show you the three steps for migrating to Lotus-Provider, from Lotus-Miner"
draft: false
menu:
    storage-providers:
        parent: "lotus-provider"
weight: 110
toc: true
---

{{< alert icon="warning" >}}
Lotus-Provider is in alpha state, and we recommend our users to only run and get used to lotus-provider in a testing enviroment.
{{< /alert >}}

## Setup YugaByteDB

For this guide, we're setting up a single YugaByteDB. However, you can setup multiple YugaByteDB in a cluster to enable high availability.

Ensure that you have the following available before we install setup YugabyteBD:

1. One of the following operating systems:

- CentOS 7 or later
- Ubuntu 16.04 or later

For other operating systems, running YugabyteDB in docker or Kubernetes. Please check out the [YugabyteDB documentation](https://docs.yugabyte.com/preview/quick-start/).

2. **Python 3.** To check the version, execute the following command:

```shell with-output
python --version
```
```
Python 3.7.3
```

```shell with-output

```

**Note: avoid using ZFS as the backing drive because of advanced filesystem commands so-far unavailable there.**
