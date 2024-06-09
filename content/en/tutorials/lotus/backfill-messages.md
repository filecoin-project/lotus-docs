---
title: "Backfilling Messages in Lotus"
description: "This tutorial guides you through the process of backfilling messages in Lotus."
lead: "This tutorial guides you through the process of backfilling messages in Lotus, ensuring your Lotus node is up-to-date with the blockchain's history."
draft: false
menu:
    tutorials:
        parent: "tutorials-lotus"
weight: 120
toc: true
---

## Overview
This tutorial guides you through the process of **backfilling FEVM indexes (i.e., to serve Filecoin Ethereum JSON RPC queries of Filecoin’s EVM.** 

## Prerequisites
- Lotus version 1.25.1 or higher installed.
- Basic understanding of Lotus configuration and command-line tools.

## Configuration Settings
Update Lotus `config.toml`: Ensure your `config.toml` file includes the following settings:

```toml
EnableEthRPC = true
EthTxHashMappingLifetimeDays = 0
DisableRealTimeFilterAPI = false
DisableHistoricFilterAPI = false
EnableMsgIndex = true
```

## Backfill Process
### Step 1: Verify or Adjust Configuration
Ensure the `config.toml` settings are correctly set as described above.

### Step 2: Initiate Backfill
Run the backfill command via `lotus-shed`. For a comprehensive backfill, use a high epoch number:

```shell
lotus-shed indexes backfill-msgindex --epochs=9999999
```
In the output of the backfill command, the `nrRowsAffected` metric indicates how many messages have been backfilled. A value of 0 means no new messages were backfilled, as they already exist in the database.

By default, `backfill-msgindex` starts from the current head and processes back through the chain for the specified number of epochs. If necessary, you can stop the backfill process and restart it from an earlier point in the chain by using the `--from option` to ensure thorough coverage. This can be verified if `nrRowsAffected` remains 0, indicating no missed messages.

{{< alert icon="tip" >}}
Optional Database Location Override: For complex setups, use `--repo=/path/to/repo` to specify the database location
{{< /alert >}}

{{< alert icon="warning">}}
Continued running of backfill process beyong the specified FEVM epoch yields no additional benefit
{{< /alert >}}

### Step 3: Check Database Index Size
Use `ls -l /data/node/sqlite/` to inspect the size of your indexes, indicating the backfill's extent.

### Step 4: Additional Backfill Steps
Repeat the backfill process for transaction hashes and events using similar commands, ensuring comprehensive coverage of all blockchain data.
```shell
lotus-shed indexes backfill-txhash --epochs=9999999
lotus-shed indexes backfill-events --epochs=9999999
```

## Performance Considerations
Backfilling can be resource-intensive. Consider hardware requirements and possibly setting up additional nodes for load balancing.

## Conclusion
Following these steps ensures your Lotus node is fully synchronized with the network's history, enhancing performance and reliability.

## Troubleshooting

If backfilling results in the error "failed to load events for tipset," then those events may not exist in the chainstore. The FEVM backfilling script in Lotus only indexes the events but cannot get the events themselves. In this case, please recompute those missing events by running:

```shell
lotus state --tipset @2849740 compute-state
```

Where `2849740` represents the height of a tipset for which you are missing events.

## Related Resources
GitHub issues and pull requests related to backfilling and performance improvements.
- [PR #10932](https://github.com/filecoin-project/lotus/pull/10932)
- [PR #11088](https://github.com/filecoin-project/lotus/pull/11088)
- [PR #10941](https://github.com/filecoin-project/lotus/pull/10941)
- [Issue #11007](https://github.com/filecoin-project/lotus/issues/11007)
- [Issue #10178](https://github.com/filecoin-project/lotus/issues/10178)
- [Issue #10807](https://github.com/filecoin-project/lotus/issues/10807)