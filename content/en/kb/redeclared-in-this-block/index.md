---
title: "Redeclared in this block build error"
description: "This is a solution for the redeclared in this block build error."
date: 2023-02-28T12:00:35+01:00
lastmod: 2023-02-28T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["Lotus Build"]
---

## Problem

When trying to build Lotus, you encounter an error stating that some code has been redeclared in a block. It usually looks something similar to this:

```shell
/usr/local/go/../...go:15:6 xxxx redeclared in this block
```

## Resolution
This error stems from a Go version being installed on top of the previous Go version. To fix the issue:

1. Uninstall the existing Go version

```shell
sudo rm -rf /usr/local/go
```

2. Install the new Go version needed to run Lotus.

This [docs page]({{< relref "../../lotus/install/linux/#go" >}}) will always be up to date with which Go version is needed to build Lotus.