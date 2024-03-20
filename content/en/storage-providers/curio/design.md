---
title: "Curio Design"
description: "In-depth explanation of the Curio's design and core components"
lead: "This page provides a detailed overview of the core concepts and components that make up Curio, including HarmonyDB, HarmonyTask, and more."
draft: false
menu:
    storage-providers:
        parent: "curio"
weight: 115
toc: true
---

# Curio
The core component of Curio are HarmonyDB, HarmonyTask, Local Worker and some abstraction of configuration & storage.

## HarmonyDB
HarmonyDB is a simple SQL database abstraction layer used by HarmonyTask and other components of the Curio stack to store and retrieve information from YugabyteDB.

### Key Features:
- **Resilience:** Automatically fails over to secondary databases if the primary connection fails.
- **Security:** Protects against SQL injection vulnerabilities.
- **Convenience:** Offers helper functions for common Go + SQL operations.
- **Monitoring:** Provides insights into database behavior through Prometheus stats and error logging.

## HarmonyTask

The HarmonyTask is pure (no task logic) distributed task manager.

### Design Overview

- Task-Centric: HarmonyTask focuses on managing tasks as small units of work, relieving developers from scheduling and management concerns.
- Distributed: Tasks are distributed across machines for efficient execution.
- Greedy Workers: Workers actively claim tasks they can handle.
- Round Robin Assignment: After a worker claims a task, HarmonyDB attempts to distribute remaining work among other machines.

### Model

- **Blocked Tasks:** Tasks can be blocked due to:
    - Missing registration on running servers
    - Reaching specified maximum task limits
    - Resource exhaustion
    - CanAccept() function (task-specific) rejecting the task

- **Task Initiation:** Tasks can be initiated through:
    - Periodic database reads (every 3 seconds)
    - Addition to the database by the current process

- **Task Addition Methods:**
    - Asynchronous listener tasks (e.g., for blockchains)
    - Follower tasks triggered by task completion

- **Follower Task Handling:**
   - Local process execution if both sides reside within the same process
   - HTTP endpoint invocation for registered tasks
   - Discovery and execution during database scans if not registered

- **Duplicate Task Prevention:**
    - The mechanism for avoiding duplicate tasks is left to the task definition, most likely using a unique key.

### Basic Database Details
- The Postgres DB schema is called "curio" and all the harmony DB tables reside under this schema.
- Table `harmony_task` stores a list of pending tasks.
- Table `harmony_task_history` stores completed tasks, retried tasks exceeding limits, and serves as input for triggering follower tasks (potentially on different machines).
- Table `harmony_task_machines` is managed by lib/harmony/resources. This table references registered machines for task distribution. Registration does not imply obligation, but facilitates discovery.


## Poller
explain how poller works
explain how poller works for different tasks
explain how poller is tied to greedy worker with numbers

