---
title: "Getting logs for hard to solve issues"
description: "This article provides some instructions that can potentially help us find the root cause of an issue faster"
date: 2022-03-18T12:00:35+01:00
lastmod: 2022-03-18T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["Lotus Node", "Lotus Miner"]
---

## Deadlocks

Deadlocks can happen when two different parts of a program both need access to a resource (like a file or a piece of memory), but neither one will give it up until they get access to another resource that the other part of the program is using. They both end up waiting for the other to give up what they need, and the program gets stuck and can't continue. This can happen in Lotus as well, and in such scenarios it is really helpful to get stack traces to investigate the underlying issue.

Stack traces shows the sequence of functions or methods that were called before the error occurred, starting from the most recent function and working backwards through the code. By following the stack trace, it can usually pinpoint the exact line of code where the error occurred and it will be easier for the developers to start figuring out how to fix it.

You can export the lotus stacktraces with this command:

```
lotus pprof goroutines > goroutines.txt
```

If the suspected deadlock is related to the Lotus-Miner you can use the:

```
lotus-miner pprof goroutines > minergoroutines.txt
```

Please attach these traces to any Github bug report where you suspect a deadlock.