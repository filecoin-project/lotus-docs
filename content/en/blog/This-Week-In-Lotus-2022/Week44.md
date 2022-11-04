---
title: "This Week in Lotus - Week 44"
description: "Stay up to date with what has happened in Lotus this week"
date: 2022-11-04T00:00:55+00:00
lastmod: 2022-11-04T00:00:55+00:00
draft: false
images: []
---

The Protocol Labs Network has been gathering in Lisbon the past two weeks for both **LabWeek22** :microscope:, **IPFS Camp** :ipfs: and **FIL-Lisbon** :filecoin:. A lot of the presentations and sessions that happened during these two weeks has been recorded and is going to be being published in the [Filecoin YouTube-channel](https://www.youtube.com/c/FilecoinProject/featured), [Lotus YouTube-channel](https://www.youtube.com/channel/UCVzDFZ_pF9fjzzbml8dv7_w), [Procotol Labs YouTube-channel](https://www.youtube.com/c/ProtocolLabs) or the [IPFS YouTube-channel](https://www.youtube.com/channel/UCdjsUXJ3QawK4O5L1kqqsew).

**SplitStore V2 updates**:
- We have has been diving back into known SplitStore issue this week, and will continue to work on SplitStore related issues going forward to bring it out of its beta stage. A [new PR changes some previous functionality](https://github.com/filecoin-project/lotus/pull/9571), namely the `EnableColdStoreAutoPrune` config, and instead adds a third `messages mode` to the SplitStore coldstore which should simplify the setup a bit. This PR should also fix the previously posted issues with regards to AutoPrune not compacting the coldstore!

**Calibration Network** :test_tube::
- The calibration network has now been reset with fixes for the [bug found here](https://filecoinproject.slack.com/archives/C01AC6999KQ/p1666376583449089). The calibration network will upgrade to network 17 on Monday the 7th of November at epoch `16800` - **approximately 14:10 UTC.**
- To run the calibration network on your node you will need to checkout the [v1.18.0-rc5 branch](https://github.com/filecoin-project/lotus/releases/tag/v1.18.0-rc5) and build for calibnet.

**A big thanks** for everybody that attended `Lotus, Data onboarding and Friends` this week! It was the first time we hosted our own event and we really enjoyed it. :raised_hands: Thanks for all the great conversations and presentations!

You can view recordings of the live streams from the Lotus, Data onboarding and Friends day here:
- [Track 1](https://www.youtube.com/watch?v=TD-LsOpFeMU)
- [Track 2](https://www.youtube.com/watch?v=Y3F8Rf3ekXw)

That’s it for the week! **Have a great weekend!** :sunny: