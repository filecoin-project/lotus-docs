---
title: "Lotus-Provider Setup and Configuration"
description: "Lotus-Provider simplifies setting up and managing multiple Miner IDs in a cluster, offering high availability, simplicity, and durability. It integrates with Yugabyte DB for efficient data management and scalability."
lead: "Lotus-Provider offers an efficient solution for managing storage providers in a Lotus network, with a focus on high availability, easy setup, and robust data management using Yugabyte DB."
draft: false
menu:
    storage-providers:
        parent: "lotus-provider"
        identifier: "storage-providers-lotus-provider-setup"
weight: 500
toc: true
---

## Overview
Lotus-Provider is designed to simplify the setup process, allowing multiple Miner IDs to flow seamlessly through a cluster. Key features include:
- **High Availability:** Run multiple instances with NxN Yugabyte DB cluster connections.
- **Simplicity:** Easy setup with minimal configuration once the database is integrated.
- **Durability:** Robust and reliable, with support for updates and maintenance.

## How to Get it Running
To set up Lotus-Provider, you need a working Lotus instance with a running lotus-miner process. The steps include:
1. Setting up Yugabyte DB.
2. Configuring lotus-miner to use Yugabyte DB for sector info.
3. Setting up and testing the Lotus-Provider configuration.
4. Disabling WindowPost on Miner and restarting it.
5. Starting Lotus-Provider.

### Detailed Steps
#### Setup YugabyteDB
- Download and install from [Yugabyte](http://download.yugabyte.com).
- Verify the setup with `ysqlsh`.
- Note: Avoid ZFS as the backing drive.

#### Get Lotus-Miner to Use It
- Start lotus-miner version 1.25.1 or later with the harmonydb configuration pointing to Yugabyte.

#### Setup Lotus-Provider Configuration
- Configuration is database-centric for consistency.
- Use `lotus-provider config` commands for setup and customization.

#### Test the Configuration
- Use `lotus-provider test window-post` to verify the setup.

#### Start Lotus-Provider
- Use the `lotus-provider run` command with necessary flags for database and configuration layer information.

## Developer Documentation
The Harmony toolset introduces new libraries to facilitate a harmonious environment for integration. Key components include:

### HarmonyDB
- Provides a database abstraction layer for the cluster.
- Ensures up-to-date schema and efficient database management.

### HarmonyTask
- Implements a greedy-first scheduling mechanism.
- Allows machines to pull work based on available resources.

For further details and unit tests, refer to the documentation within each package in the `<Lotus>/lib/harmony` directory.