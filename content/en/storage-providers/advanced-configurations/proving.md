---
title: "Proving"
description: "Lotus has a lot of advanced configurations you can tune to optimize your storage provider setup. This guide explains the advanced configuration options for proving in Lotus-Miner"
lead: "This guide explains the advanced configuration options available for tuning proving parameters"
draft: false
menu:
    storage-providers:
        parent: "storage-providers-advanced-configurations"
weight: 520
toc: true
---

While the Lotus-Miner has very reasonable default settings, some storage providers might want to configure some proving parameters according to their setup. Please note that some adanced proving configurations only apply if you are using windowPoSt and/or winningPoSt workers. You can find configurations for these in the [advanced configurations for workers]({{<relref "../..//storage-providers/advanced-configurations/workers/#advanced-post-worker-configurations/" >}})

## Proving section

This section controls some of the behavior around proving in a storage provider setup:

### Pre-check sector timeout

This configuration allows you to set a custom amount of time a proving pre-check for a single sector can take before it will be skipped.

{{< alert icon="warning">}}
Setting this value too low risks sectors being skipped even though they are accessible. Setting this value too high risks missing PoSt deadline in case IO operations related to a single sector are blocked (e.g in case of disconnected mounts)
{{< /alert >}}

```toml
  # type: Duration
  # env var: LOTUS_PROVING_SINGLECHECKTIMEOUT
  #SingleCheckTimeout = "10m0s"
```

### Pre-check partition timeout

This configuration allows you to set a custom amount of time a proving pre-check for a partition can take before it will be skipped.

{{< alert icon="warning">}}
Setting this value too low risks partitions being skipped even though they are accessible. Setting this value too high risks missing PoSt deadline in case IO operations related to this partition are blocked or slow
{{< /alert >}}

```toml
  # type: Duration
  # env var: LOTUS_PROVING_PARTITIONCHECKTIMEOUT
  #PartitionCheckTimeout = "20m0s"
```

### Disable Builtin WindowPoSt

This configuration allows you to disable the windowPoSt comuptation on the lotus-miner process even if no windowPoSt-workers are present.

{{< alert icon="warning">}}
If no windowPoSt workers are connected, window PoSt WILL FAIL resulting in faulty sectors which will need to be recovered. Before enabling this option, make sure your PoSt workers work correctly.
{{< /alert >}}

```toml
# type: bool
# env var: LOTUS_PROVING_DISABLEBUILTINWINNINGPOST
#DisableBuiltinWinningPoSt = false
```

### Disable Builtin WinningPoSt

This configuration allows you to disable the winningPoSt comuptation on the lotus-miner process even if no winningPoSt-workers are present.

{{< alert icon="warning">}}
If no WinningPoSt workers are connected, WinningPoSt will fail resulting in lost block rewards.
{{< /alert >}}

```toml
# type: bool
# env var: LOTUS_PROVING_DISABLEBUILTINWINNINGPOST
#DisableBuiltinWinningPoSt = false
```

### Max partitions per PoSt-message

The maximum number of sectors which can be proven in a single PoSt message is 25000 in network version 16, which means that a single message can prove at most 10 partitions. Note that setting this value lower may result in less efficient gas use - more messages will be sent, to prove each deadline, resulting in more total gas use (but each message will have lower gas limit). Setting this value above the network limit has no effect.

```toml
# type: int
# env var: LOTUS_PROVING_MAXPARTITIONSPERPOSTMESSAGE
#MaxPartitionsPerPoStMessage = 0
```

### Max partitions per recovery message

In some cases when submitting DeclareFaultsRecovered messages, there may be too many recoveries to fit in a BlockGasLimit. In those cases it may be necessary to set this value to something low (eg 1); Note that setting this value lower may result in less efficient gas use - more messages will be sent than needed, resulting in more total gas use (but each message will have lower gas limit).

```toml
# type: int
# env var: LOTUS_PROVING_MAXPARTITIONSPERRECOVERYMESSAGE
#MaxPartitionsPerRecoveryMessage = 0
```

### Single recovery message per partition

In cases when submitting PoSt messages which contain recovering sectors, the default network limit may still be too high to fit in the block gas limit. In those cases, it becomes useful to only house the single partition with recovering sectors in the post message. Note that setting this value lower may result in less efficient gas use - more messages will be sent, to prove each deadline, resulting in more total gas use (but each message will have lower gas limit).

```toml
# type: bool
# env var: LOTUS_PROVING_SINGLERECOVERINGPARTITIONPERPOSTMESSAGE
#SingleRecoveringPartitionPerPostMessage = false
```