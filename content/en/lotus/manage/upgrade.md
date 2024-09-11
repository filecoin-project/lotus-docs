---
title: "Upgrade"
description: "This guide will show you how to safely upgrade a Lotus node to a newer version."
lead: "This guide will show you how to safely upgrade a Lotus node to a newer version."
draft: false
menu:
    lotus:
        parent: "lotus-management"
aliases:
    /docs/set-up/upgrade/
weight: 440
toc: true
---

## Installing an update

Usually, if you are updating Lotus, it as simple as rebuilding and re-installing the software after pulling the latest state for the chosen branch and repository. You can do that with:

```shell
git pull
LATEST_RELEASE=$(git tag -l 'v*' | grep -v "-" | sort -V -r | head -n 1) # Finds the latest Lotus Node release
git checkout $LATEST_RELEASE
# if you need a specific release use 
# git checkout <tag_or_release>
git submodule update
```

Once the new version is checked-out, rebuild and re-install as explained in the installation guide.

You can verify your current version with:

```shell
lotus --version # for the lotus binary
lotus version   # for the currently running daemon
```

{{< alert icon="callout">}}
**You will need to stop and start the daemon again after installing the new version**.
{{< /alert >}}

## Cross-check your config file

All upgrades require that you double-check that your configuration files are up-to-date. You can do this by exporting the default configuration files from Lotus and comparing them to your configuration files.

To export the default configuration files from Lotus, run:

```shell
lotus config default
```

This will output something like:

```toml
[API]
  # Binding address for the Lotus API
  #
  # type: string
  # env var: LOTUS_API_LISTENADDRESS
  #ListenAddress = "/ip4/127.0.0.1/tcp/1234/http"

...
```

If you would prefer to have Lotus export the default configuration to a file, run:

```shell
lotus config default >> ~/default-lotus-client-configuration.toml
```

Once you have the default configuration file, compare it with your configuration file and make sure that you're not missing any sections. See the [Lotus release notes](https://github.com/filecoin-project/lotus/releases) for details on what new sections have been added.

## Switching networks

If you want to switch networks, use the [switching networks guide]({{< relref "switch-networks" >}}).

