---
title: "This Week in Lotus - Week 4 - 2023"
description: "Stay up to date with what has happened in Lotus this week"
date: 2023-01-27T08:49:55+00:00
lastmod: 2023-01-27T08:49:55+00:00
draft: false
images: []
---

After many weeks of being all hands on FVM integration and Hyperspace work, we are now moving slowly back to being more hands-on with Lotus specific work and goals.

**FILFIL/PeSto:**

Going forward we are aiming to create the tooling needed for Storage Providers to subscribe to a contract, make deals and seal the deal (either through a new sector or snap) fully unchain, and have the deal activated.

- This week we have been working on refining the deal protocol and lotus-miner to enable deal client contract MVPs to make storage deals with an SP on the Hyperspace network.

**Bugfixes and enhancements :bug::**

- We have seen some issue reports where sectors are stuck in the `Adding to sector` state on Boost, or `AddPiece/SnapDealsAddPiece` on the `Lotus-Miner`. We have uncovered what the underlying issue for these are. It happens when deals on Boost are in `Adding to sector` state but not yet assigned due a full sealing pipeline/config limits, and if Boost is restarted or down when the Lotus-Miner schedules the AddPiece the rpcreader redirection logic got stuck. [We have opened a PR](https://github.com/filecoin-project/lotus/pull/10116) that is currently in review, which should mitigate these issues.
- One of the trickier parts of debugging certain windowPoSt challenge reading issues is narrowing down where a failed sector is and getting detailed enough error logs to find it. We [have added more detailed error outputs](https://github.com/filecoin-project/lotus/pull/10121) so that these failures will be easier to find.
- For quite some time now published docker containers has contained lotus binaries that return `.dirty` as part of `lotus --version` even though the git state was clean. [A PR has now been merged](https://github.com/filecoin-project/lotus/pull/10125) to fix this issues, so going forward docker images will have a clean git state.
- A PR to [clean up some CLI-commands](https://github.com/filecoin-project/lotus/pull/10114) that was missing argument checks and print the help text if the wrong arguments where passed has been merged.

That’s it for the week! **Have a great weekend!** :sunny: