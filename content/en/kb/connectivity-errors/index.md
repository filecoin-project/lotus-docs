---
title: "Common Connectivity Error"
description: "This article lists out the common connectivity error a user  might face when running lotus-miner"
lead: "This article lists out the common connectivity error a user  might face when running lotus-miner."
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["Connectivity", "Miner"]
---

## Common connectivity errors

| Error | What it means | How to fix |
| ----- | ------------- | ---------- |
| N/A | If you see "N/A" for deal success rate, this may be why. Once your miner seals its first sector, the dealbot will start attempting storage deals. From the moment a miner seals its first sector, you should have a storage deal result in max 48 hours (current timeout value for storage deals). For retrieval deals you should see a result in maxim 12 hours after the storage deal is reported successful (current timeout for retrieval deals ). The dashboard currently logs deal **results** only. If you have a storage or retrieval deal in progress you’ll still see “N/A” until it propagates to the chain. | No miner action needed. |
| ClientQueryAsk failed : failed to open stream to miner: dial backoff | The connection to the remote host was attempted, but failed. | This may be due to issues with porting, IPs set within the config file, or simply no internet connectivity. To fix, [establish a public IP address](https://docs.filecoin.io/mine/connectivity/#establishing-a-public-ip-address). |
| ClientQueryAsk failed : failed to open stream to miner: failed to dial | The deal-bot was unable to open a network socket to the miner. | This is likely because the miner's IP is not publicly dialable, or a port issue. To fix, [establish a public IP address](https://docs.filecoin.io/mine/connectivity/#establishing-a-public-ip-address). |
| ClientQueryAsk failed : failed to open stream to miner: routing: not found | The deal-bot was unable to locate the miners IP and/or port. | Made sure you [published your miner's multiaddresses on the chain]({{< relref "initialize#publishing-the-miner-addresses" >}}) |
| ClientQueryAsk failed : failed to read ask response: stream reset | Connectivity loss, either due to a high packet loss rate or libp2p too aggressively dropping/failing connections. | [Fix underway.] Lotus team is currently working on a change to use libp2p's connection tagging feature, which will retry connections if dropped. ([go-fil-markets/#361](https://github.com/filecoin-project/go-fil-markets/issues/361)). No action needed from miners. |
| StorageDealError PublishStorageDeals: found message with equal nonce as the one we are looking for | [Under investigation.] We suspect a chain validation error | No action needed from miners. |
| ClientMinerQueryOffer - Retrieval query offer errored: get cid info: No state for /bafk2bz... | [Under investigation.] | No action needed from miners. |
