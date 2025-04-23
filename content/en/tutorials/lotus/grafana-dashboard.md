---
title: "Grafana dashboard for Lotus"
description: "This tutorial shows how to set up Prometheus and Grafana for monitoring your Lotus node with the pre-configured dashboards provided in the Lotus repository."
lead: "Lotus supports exporting a wide range of metrics that can be visualized with Grafana. This tutorial guides you through setting up Prometheus and Grafana to monitor your Lotus node."
draft: false
menu:
    tutorials:
        parent: "tutorials-lotus"
weight: 150
toc: true
---

## Overview

Lotus nodes export metrics that can be collected and visualized to gain insights into node performance and behavior. This tutorial will show you how to:

1. Set up Prometheus to collect metrics from your Lotus node
2. Set up Grafana to visualize these metrics
3. Import the pre-configured dashboards from the Lotus repository

## Prerequisites

- A Linux or macOS system with a running Lotus node
- Administrative/root access to install software
- The Lotus repository cloned on your system (for config files and dashboards)

## Setting up monitoring

The Lotus repository includes detailed instructions for setting up Prometheus and Grafana, along with pre-configured dashboards in its [metrics documentation](https://github.com/filecoin-project/lotus/blob/master/metrics/README.md).

Follow these steps:

1. Clone the Lotus repository if you haven't already:
   ```
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus
   ```

2. Follow the instructions in the [Lotus metrics README](https://github.com/filecoin-project/lotus/blob/master/metrics/README.md) to:
   - Install and configure Prometheus
   - Install and configure Grafana
   - Import the pre-configured dashboards

## Available Dashboards

The Lotus repository includes several pre-configured dashboards:

- **F3Dashboard.json**: Monitors F3 metrics like GPBFT instance completion rates, error counts, phase transitions, and encoding performance.
- **MessageExecution.json**: Provides insights into message execution metrics, focusing on ApplyBlocks timing data.
- **Node system health**: When using node_exporter, you can monitor system-level metrics like CPU, memory, disk, and network usage.

## Troubleshooting

If you encounter issues:

1. Make sure your Lotus node is running and exporting metrics
2. Verify Prometheus is configured to scrape your Lotus node endpoint
3. Check that Grafana can connect to your Prometheus instance
4. Ensure you're importing the dashboard JSON files correctly

For more detailed troubleshooting, refer to the [Lotus metrics documentation](https://github.com/filecoin-project/lotus/blob/master/metrics/README.md).

## Additional Resources

- [Prometheus documentation](https://prometheus.io/docs/introduction/overview/)
- [Grafana documentation](https://grafana.com/docs/)
- [Lotus metrics documentation](https://github.com/filecoin-project/lotus/blob/master/metrics/README.md)