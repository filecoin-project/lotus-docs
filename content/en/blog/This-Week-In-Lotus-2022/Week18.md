---
title: "This Week in Lotus - Week 18"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-05-06T08:49:55+00:00
lastmod: 2022-05-06T08:49:55+00:00
draft: false
images: []
---

Happy Friday :wave: I hope you all had a great week. For those who are new, welcome to the Lotus announcement channel. The Lotus team has had their first ever colocation week which has been great for aligning and hacking of Lotusy things!

**Bugfixes for common issues**
- Have you seen this error message before: `could not read from path="p_aux"` when doing SnapDeals? You should not see that anymore on the stable v1.15.2. SnapDeal-sectors will now get [moved to the long term storage before submitting the proofs to the chain](https://github.com/filecoin-project/lotus/pull/8582), which should mitigate that issue.
- Having `%Y-%m-%dT%H:%M:%S%` printed as a timestamp is not very convenient, and it has been fixed now. The RUST_LOGS in v1.15.2 should print nice meaningful timestamps now.

:eyes: **Issues we have seen frequently this week:**
- We have seen a lot of retrieval issues being discovered because there are now a lot more retrieval attempts due to the Evergreen program. We are aware of them and are keeping track of them.

**New features:**
- **v1.15.2** is out as a stable release! It includes a [some awesome new features](https://github.com/filecoin-project/lotus/releases/tag/v1.15.2) like PoSt-workers, Scheduler- and Snap Deal enhancement. You will need to have a **working installation of Go 1.17.9 or higher** to be able to build and install this version, so check which Go version you currently are on before upgrading.

The storage provider community is sharing some [valuable benchmarks and hardware for different tasks in this Github discussion](https://github.com/filecoin-project/lotus/discussions/8605). Feel free to add your benchmarks and hardware in the discussion :slightly_smiling_face:

That’s it for the week! **Have a great weekend!**