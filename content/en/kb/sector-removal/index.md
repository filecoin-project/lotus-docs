---
title: "Troubleshooting Sector Removal"
description: "This is a solution issues with sector removals and terminations."
date: 2022-04-04T12:00:35+01:00
lastmod: 2022-04-04T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["OS", "Linux", "Lotus Node", "Lotus Miner"]
---

## Problem

Sector sealing can fail for a number of reasons and may cause various issues. Whilst it is always suggested that storage provider admin or system maintenance be performed with an empty sealing queue, it is not always possible. Disruptions to the sealing pipeline can cause sector removal or termination difficulties which may in turn negatively impact windowPoSts.

Depending on the nature of the failure you may find that `lotus-miner sectors remove` or `lotus-miner sectors terminate` commands do not result in successful removal or termination of the sector in question.

Detailed below are a few methods that may help finalize the removal or termination of failed sectors. Please apply the methods in the order listed in order to minimize further disruption to active sealing tasks that you may wish to retain. 

## Environment

- Mainnet
- Calibnet
- Butterflynet

## Resolution

### Step 1: Initiate a Scheduler Update

It may initially appear that running `lotus-miner sectors remove` or `lotus-miner sectors terminate` command fails to have any immediate effect. 

Just like any other sealing step transition (e.g. PC1 to PC2), remove and terminate requests are queued by the lotus scheduler (FSM). If the sector in question is still actively trying to complete sealing, the remove/terminate command will not actually trigger until the current task has been completed. 

#### Example 

You experienced an unscheduled disruption to your sealing tasks and now sector `1237` is persistently failing to complete PC2. It is continuously looping back to PC1 which takes several hours to complete. In this example your miner ID is `f01234`.

```plaintext
lotus-miner sealing jobs

ID        Sector  Worker    Hostname      Task  State    Time
2e62c170  1234    1abc2abc  SERVER-1  PC1   running  2h35.5s
e87a6d1c  1235    2cde3cde  SERVER-1  PC2   running  23m48.9s
80509f7d  1236    2cde3cde  SERVER-1  C2   running  22m42.4s
4680f2f0  1237    1abc2abc  SERVER-1  PC1   running  30m54.6s
```

Rather than restarting your worker or miner which will disrupt the other sealing sectors, you can simply run:

`lotus-miner sealing remove 1237`
`lotus-miner sealing abort 1237`

This will prompt the Lotus scheduler to cancel the current PC1 job and apply the `lotus-miner sealing remove' request that you have just issued.

### Step 2: Terminate With Lotus Shed

Lotus Shed is not installed by default when installing Lotus. [Please follow the steps detailed here]({{< relref "lotus-shed-not-installed" >}}).

Lotus Shed includes a function to terminate sectors. Using the example data above the correct command to run would be:

`lotus-shed sectors terminate --really-do-it 1237`

### Step 3: Create Dummy Sector Data

You may encounter a sector removal situation where the `sealed`,`unsealed` and/or `cache` sector files have been deleted but the sector remains in your `lotus-miner sectors list` and/or on-chain.

You can repopulate the missing data by either duplicating an existing sector's data and renaming the folder/files or by creating empty files/folders to act as placeholders using `touch`.

In the event that the sector **successfully completed** sealing, you will need to create the dummy data in your long-term storage folder as follows:

```plaintext
/long-term-storage-folder/sealed/s-t01234-1237
/long-term-storage-folder/unsealed/s-t01234-1237
/long-term-storage-folder/cache/s-t01234-1237   #  s-t01234-1237 refers to a folder here
```

In the event that the sector **failed to complete** sealing,  you will need to create the dummy data in your sealing folder as follows:

```plaintext
/sealing-folder/sealed/s-t01234-1237
/sealing-folder/unsealed/s-t01234-1237
/sealing-folder/cache/s-t01234-1237   #  s-t01234-1237 refers to a folder here
```

NOTE: your miner ID is specified with  a `t` prefix for sector asset naming convention and not the familiar `f`.

Having created the dummy data you will then need to restart your miner (and worker if applicable) and then run the `lotus-miner sectors remove` or `lotus-miner sectors terminate` command again.

NOTE: restarting your miner will also restart all other sealing tasks that may be active.

## Extras

If you are unable to remove/terminate your sector after following all three steps, please reach out to the Lotus Team in Slack.
