---
title: "Setting a user-defined Propagation Delay"
description: "This article explains what propagation delay is, and how you can change the default value"
date: 2022-03-18T12:00:35+01:00
lastmod: 2022-03-18T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
areas: ["Lotus Miner"]
types: ["article"]
---

This article explains what propagation delay is, and how you can change the default value

## Propagation Delay

Propagation delay is the amount of time a storage provider is waiting for other blocks to arrive from the Filecoin network before they start generating their block (if they were eligible) on top of those.

The propagation delay is not how long a storage provider waits to release a block, it is only how long they wait for other blocks to arrive from the network. A generated block will still be released exactly at epoch time independently of what the propagation delay is, so there is no way to game the system by changing this value high.

The default propagation delay is set to 10 seconds. Based on current block mining metrics and the propagation time of blocks, this setting should allow for sufficient time to receive all parent blocks from the previous tipset, while still giving you ample time to compute a block if you were eligible.

## Changing the default

{{< alert icon="warning">}}
This is a highly advanced setting, and you should understand the implications of changing this to something else than the default. Also, be sure that your system can generate a block in time when changing this. Raising this setting high only puts you in a position where you might be too slow to compute a block.
{{< /alert >}}

A storage provider can set the `PropagationDelay` themself with the `PROPAGATION_DELAY_SECS` environment variable. This setting will need to be set before running the `lotus-miner`.

You can confirm that the setting is being applied by checking your `lotus-miner` logs. The `baseDeltaSeconds": xx` should show the value you set with the environment variable.