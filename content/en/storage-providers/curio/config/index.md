---
title: "Config"
description: "This guide provides detailed information about Curio configuration"
date: 2024-03-22T19:32:32+04:00
lastmod: 2024-03-22T19:32:32+04:00
draft: false
menu:
  storage-providers:
    parent: "curio"
weight: 135
---

The configuration for Curio is stored in the HarmonyDB in a table called `harmony_config`.
When a Curio node is started, one or more layer names are supplied to get the desired configuration for the node.

## Configuration Layers
Configuration layers provide a set of configuration parameters that determine how a system will operate.
These layers can be defined at different levels, meaning that higher layer can override the lower layer, and the system will behave based on the final stacked output.

Configuration layers can be arranged in a hierarchy, often from `base`(most general) to most specific.
The `base` layer defines default configuration values.
More specific layers override these defaults with more targeted configurations.

For example, in a simple two-layer configuration system, layers could be organized in the following order:
Base Layer - This is the most general layer. It is always included, so add any modifications to defaults here. If you include all your miner IDs here (defined in the addresses section) all hardware will be used for all miner needs.
Task Layer - This layer enables SDR tasks. Consider the included layers (below).

If a Curio node is started with above 2 layers then it will perform SDR tasks for all miner IDs and will use default values of any other configuration parameter.

Example Use of Layers:  (`base` is always included)
`curio run --layers=post`

{{< alert icon="warning" >}}
If `base` layers is always applied by default when a Curio node is started.
{{< /alert >}}

### Advantages of Configuration Layers
Flexibility: Configuration layers allow different parts of the system or different users to behave differently according to predefined settings.
Scalability: By separating concerns and allowing for specific configuration, the systems become easier to manage as they scale.
Maintainability: Changes to configuration can be made on an appropriate layer without affecting the entire system.

### Layer Stacking
The configuration layers are stack in the supplied order. The `base` layer is always applied by default so it can be skipped.

For example, if a Curio node is started with the following layers:

```text
--layers miner1,sdr,wdPost,pricing
```

These layer will be stacked on top of each other to create the final configuration for the node.
The order of stacking will base > miner1 > sdr > wdPost > pricing. If a configuration parameter is defined in multiple layers then the final layer value will be used.

### Working with layers

Curio allows you to manage node configurations using layers.
Each layer can be applied or modified independently, with the 'base' layer being essential at startup.

#### Print default configuration
The default configuration is used in base layer by default.

```shell
curio config default
```

#### Adding a New Layer
To add a new configuration layer or update an existing one, you can provide a filename or input directly via stdin.

```shell
curio config set --title <stdin/Filename>
```

#### List all layers
List all configuration layers present in the database.

```shell
curio config ls
```

#### Editing a Layer
Directly edit a configuration layer.

- Edit with `vim` editor
    ```shell
    curio config edit --editor vim <layer name>
    ```

- Edit with a different editor like nano
    ```shell
    curio config edit --editor nano <layer name>
    ```

#### Interpreting Stacked Layers
Interpret and view the combined effect of all applied configuration layers, including system-generated comments.

```shell
curio config view --layers [layer1,layers2]
```

#### Removing a Layer
Remove a specific configuration layer by name.

```shell
curio config rm <layer name>
```


### Pre-built Layers
When the first Curio miner is initialized or when the first Lotus-Miner is migrated to Curio, the process creates some layers by default for the users.
These layers mostly define if a particular task should be picked by the machine or not.

#### post

```toml

[Subsystems]
EnableWindowPost = true
EnableWinningPost = true
```


#### sdr

```toml
[Subsystems]
EnableSealSDR = true
```

#### seal

```toml
[Subsystems]
EnableSealSDR = true
EnableSealSDRTrees = true
EnableSendPrecommitMsg = true
EnablePoRepProof = true
EnableSendCommitMsg = true
EnableMoveStorage = true
```

#### seal-gpu

```toml
[Subsystems]
EnableSealSDRTrees = true
EnableSendPrecommitMsg = true
```

#### seal-snark

```toml
[Subsystems]
EnablePoRepProof = true
EnableSendCommitMsg = true
```

#### gui

```toml
[Subsystems]
EnableWebGui = true
```

### Configuration management in UI
The Curio GUI provides a user-friendly interface for managing configurations.
To access this feature, navigate to the "Configurations" page from the UI menu.
On this page, all available layers in the database are listed.
Users can edit each layer by clicking on it.

![Configurations](config.png)


To update a configuration field, users must first enable it by checking the corresponding box.
After enabling, the field value can be populated.
To comment out the field, simply uncheck the box.

![Configuration edit](config-edit.png)

## Alert Manager
Curio comes with a default integration with [PagerDuty.com](https://www.pagerduty.com/), allowing the sending of critical alerts to storage providers.
To configure your Curio cluster to send alerts, you must set up a PagerDuty account.
{{< alert icon="warning" >}}
Nobody associated with the development of this software has any business relationship with PagerDuty.
This integration is provided as a convenient gateway to the storage provider's alert system of choice.
{{< /alert >}}
1. Sign up for a free PagerDuty account [here](https://www.pagerduty.com/sign-up-free/?type=free).
2. Create a new service that will handle the alerts from the Curio cluster.
3. During the service creation, on the "Integration" page, choose "Events API V2".
4. Once the service creation is complete, copy the "Integration Key" from the service and paste it in the "base" layer configuration for "PagerDutyIntegrationKey".
5. Restart one of the nodes, and it will now generate critical alerts every hour.

{{< alert icon="info" >}}
Contributions to new critical alerts or integrations with other alerting systems are welcome.
{{< /alert >}}
