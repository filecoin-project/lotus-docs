---
title: "This Week in Lotus - Week 35"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-09-02T00:00:55+00:00
lastmod: 2022-09-02T00:00:55+00:00
draft: false
images: []
---

:wave: **Hey everyone and welcome to This Week in Lotus!**

:rocket: **Upcoming features/enhancements:**

- *Sealing-as-a-service:* A lot of work towards [supporting partially sealed sectors imports](https://github.com/filecoin-project/lotus/pull/9210) happened this week, but there are still quite a lot to do. So by end of next week something mergeable that can be reviewed might be ready.
- A `lotus info` command is [currently in review](https://github.com/filecoin-project/lotus/pull/9233), it gathers a lot of nice high level node status and metrics in one place.

**Bug fixes:**
- A PR to ensure that connections between `Boost` and `lotus-workers` computing [DataCids is closed correctly](https://github.com/filecoin-project/lotus/pull/9230) has been merged.
- A fix to ensure that the `MAX_CONCURRENT` environment variable for [DataCid tasks is being enforced](https://github.com/filecoin-project/lotus/issues/9213) has been fixed.
- Some smaller UX-improvements where also merged, like adding a better Ledger rejection error, and [ability to specify the message sender](https://github.com/filecoin-project/lotus/pull/9237) in the `lotus-miner actor set-addrs` command.

**Protocol development:**
- In Lotus we are getting ready to implement `FIP0029 - Beneficiary address for SPs`, you can [track the open work items here](https://github.com/filecoin-project/lotus/issues?q=is%3Aopen+is%3Aissue+label%3AFIP-0029). The TL;DR for FIP0029 is introducing a separation of node control and financial control, to allow for more flexible Filecoin lending markets. [You can read the full FIP here](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0029.md).

**SplitStoreV2:** We are tracking a [potential issue](https://github.com/filecoin-project/lotus/issues/9236) where no automatic pruning is happening when `ColdStoreType` is set to `universal` and  `EnableColdStoreAutoPrune = true`.

[FIL Lisbon now has a website](https://fil-lisbon.io), it will take place from Oct 30 - Nov 4, and the Lotus team will host a **Lotus & Friends** *(Boost, FIL-Crypto, FVM and so on)* day on the 2nd of November. We will come back with an exact agenda and place later :smile:

That´s it for the week! **Have a great weekend!** :sunny: