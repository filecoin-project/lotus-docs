---
title: "Developer components"
description: "In-depth explanation of the core components of Lotus-Provider"
lead: "This page provides a detailed overview of the core concepts and components that make up Lotus-Provider, including HarmonyDB, HarmonyTask, and more."
draft: false
menu:
    storage-providers:
        parent: "lotus-provider"
weight: 115
toc: true
---

# Core Components of Lotus-Provider

Lotus-Provider has developer tools collectively known as the "harmony toolset". These tools aim to create a harmonious, cooperative environment for integration that remains simple and "low-touch" for end users. They can be found in [lotus/lib/harmony](https://github.com/filecoin-project/lotus/tree/master/lib/harmony). 

## HarmonyDB

HarmonyDB is a database abstraction layer that spans an entire cluster. Its goals include ensuring the schema is up-to-date, avoiding connection/cursor leaks, and providing schema-based isolation for unit testing and schema boxing for production. 

### Schema

Each schema update should be a file in `sql/YYYYMMDD-<comment>.sql` for the date the file is first written. This allows in-order SQL so that newer steps follow older steps, while highly reducing merge issues as 2 developers of different features will be working in different files and don’t depend on each other so merge order isn’t strictly important. 

The schema updater runs every file that has never been run, in date order.

### Integration Tests

Starting with a random ITestID will isolate changes into a new schema, and allows the closing DeleteAll() function to clean up the results. This, of course, requires a Yugabyte db. Parallel tests against the same DB are acceptable, with different ITestIDs.

## HarmonyTask

HarmonyTask introduces a greedy-first scheduling mechanism that does not depend on a "master node". Machines hungry for work will attain it from the database through transactions to ensure claims are unique. 

### TaskInterface

TaskInterface includes several functions such as `TypeDetails()`, `Adder()`, `CanAccept()`, and `Do()`. 

## API

The API provides several functions including `New()`, `GracefullyTerminate()`, and `ResourcesAvailable()`. 

### New()

The only configuration available. Takes Task Interfaces, machine host-and-port as a string identifier, and db object. It establishes a resources object & db entries.

### GracefullyTerminate()

This function is used to terminate the process gracefully.

### ResourcesAvailable()

This function is used to check the resources available.

For more an even more detailed information, please refer to each package's documentation.