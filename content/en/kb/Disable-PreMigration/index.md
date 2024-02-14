---
title: "How to disable premigration in network upgrade"
description: "This is article explains how a node operator can disable a premigration, and only run migration at the upgrade epoch."
date: 2024-02-14T12:00:35+01:00
lastmod: 2024-02-14T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["Lotus"]
---

In certain scenarios, such as when users are operating full nodes or systems with large amounts of state, running pre-migrations might not be feasible. For example, the pre-migration might take such a long time that it would be canceled, and the pre-migration work would be wasted.

For these node operators, disabling the pre-migration and only running the migration at the upgrade height might be more useful, despite the downsides of being out of sync or in maintenance mode until the migration has finished.

To disable pre-migrations, node operators can set the `LOTUS_DISABLE_PRE_MIGRATIONS` environment variable to `1`. This environment variable needs to be set before the node is started. Running nodes would need to be restarted for the environment variable to take effect.

Here's how to set the environment variable in a Unix-like operating system:

```
export LOTUS_DISABLE_PRE_MIGRATIONS=1
```

This command sets the `LOTUS_DISABLE_PRE_MIGRATIONS` environment variable to `1` for the current shell session. If you want to set the environment variable permanently, you can add this command to your shell's startup file (such as `~/.bashrc` or `~/.zshrc`).