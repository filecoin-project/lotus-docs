---
title: "Lotus Node Clusters (Deprecated)"
description: "Lotus node clusters were an experimental feature introduced in version 1.19.0 that provided redundant Lotus node cluster raft consensus, but this feature has been removed as of v1.27.0."
draft: false
aliases:
    - /lotus/manage/chain-management
weight: 325
toc: true
---

{{< alert icon="warning" >}}
**DEPRECATED FEATURE**: Lotus node clusters were an experimental feature that was removed from the codebase in version 1.27.0. The information below is kept for historical reference only.
{{< /alert >}}

Version 1.19.0 introduced redundant Lotus node cluster raft consensus as an experimental feature to maintain consistent state for nonces and messages being published in the event of Lotus node failure. This feature was later removed in version 1.27.0.