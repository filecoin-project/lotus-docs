---
title: "Harmony Tasks"
description: "This guide explains the different HarmonyTasks available in Curio"
lead: "This guide explains the different HarmonyTasks available in Curio"
date: 2024-03-19T21:26:30+04:00
lastmod: 2024-03-19T21:26:30+04:00
menu:
  storage-providers:
    parent: "curio"
weight: 110
toc: true
---
Explain a little about task types and what the below table is


| Task Name | CPU | RAM(GiB) | GPU | Retry |
|-------|-----|----------|-----|-------|
|SDR| 4   | 54       | 0   | 2     |
|SDRTrees| 1   | 8        | 1   | 3     |
|PreCommitSubmit| 0   | 1        | 0   | 16    |
|PoRep| 1   | 50       | 1   | 5     |
|Finalize| 1   | 0.1      | 0   | 10    |
|MoveStorage| 1   | 0.128    | 0   | 10    |
|CommitSubmit| 0   | 0.001    | 0   | 16    |
|WdPostSubmit| 0   | 0.010    | 0   | 10    |
|WdPostRecover| 1   | 0.128    | 0   | 10    |
|WdPost| 1   | TBD      | TBD | 3     |
|WinPostTask| 1   | TBD      | TBD | 3     |
|SendMessage| 0   | 0.001    | 0   | 1000  |

Explain what each task does
Explain how they are scheduled (overlap with poller in design.md)
Explain about max values for each task and how they impact the machine




