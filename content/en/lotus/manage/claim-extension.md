---
title: "Claim Extension"
date: 2024-03-08T18:40:56+04:00
description: "This page explains verified deal terminologies and how to extend a verified claim"
menu:
  lotus:
    parent: "lotus-management"
weight:
toc: true
draft: false
---

With the introduction of [FIP-0045: De-couple verified registry from markets](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0045.md), the terms of DataCap allocations are independent of market storage deals.
The DataCap is now represented as a fungible token. These changes provide a foundation for user-programmed market actors to broker Filecoin Plus verified deals in the future.

## What is an Allocation?
An allocation specifies a range of terms for which the provider may commit the data, between some minimum and maximum. An allocation's maximum term must be at least as large as its minimum term.
An allocation can be removed by any party once its expiration epoch has elapsed, provided it has not been converted into a claim. When removed, the DataCap tokens are transferred back to the client.

| Terminology                         | Definition                                                                                            |
|-------------------------------------|-------------------------------------------------------------------------------------------------------|
| MinimumVerifiedAllocationTerm       | The minimum allowed value for TermMinimum is 6 months                                                 |
| MaximumVerifiedAllocationTerm       | The maximum allowed value for TermMaximum is 5 years (can be increased by a future FIP)               |
| MaximumVerifiedAllocationExpiration |  The maximum difference between Expiration and the epoch at which an allocation is created is 60 days |

{{< alert icon="tip" >}}
Since DataCap is independent of the time for which data is stored, it is recommended to set TermMaximum as MaximumVerifiedAllocationTerm to store your data for the maximum possible period.
This was chosen by the deal `EndEpoch` in verified deals before [DDO](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0076.md) but can be set by the client for allocation after DDO.
{{< /alert >}}

## What is a verified claim?
An allocation is claimed when a storage miner actor proves the corresponding piece of data is committed to a sector. Upon converting an allocation to a claim, the verified registry actor burns the associated data cap tokens from its balance.
A claim represents a provider's obligation to store a piece of data, and corresponding benefit of incentivized storage power. A claim's ID is inherited from the allocation that created it.

## Extending a claim
A verified client can extend the term for a claim. The cost of extension depends on which client is requesting this extension.

If the original client who created the allocation requests the extension, the TermMax can be set to MaximumVerifiedAllocationTerm without spending any further Datacap by the client.
The cost is the gas fee required to send the message requesting the extension.

The client extending the claim need not be the one that made the original allocation, they can extend the term for a claim beyond the initial maximum term by spending new DataCap. The claim's term maximum can be extended up to MaximumVerifiedAllocationTerm beyond the current epoch.
This is similar to issuing a new allocation/claim for the same data, but avoids overheads of re-sealing.

### Example
1. Client A makes an allocation with TermMax 4 years against a provider. The provider seals the data and claims the allocation. The claim term starts and 4 years pass.
Just before TermMax is reached, the client requests an extension to MaximumVerifiedAllocationTerm and the claim's TermMax is updated. The claim will now expire after 1 year thus making the total duration of claim to be 5 years.

2. Client A makes an allocation with TermMax 4 years against a provider. The provider seals the data and claims the allocation. The claim term starts and 4 years pass.
Just before TermMax is reached, a new verified client B requests an extension to MaximumVerifiedAllocationTerm. Client B will spend the DataCap required for this claim, and the claim will be extended to MaximumVerifiedAllocationTerm from now.
Thus, the total duration of this claim will become 9 years and provider will enjoy 10x power without having to reseal the data for 5 years as the sector lifetime is currently limited to 5 years maximum.

3. If a verified deal was made by client A before DDO was implemented and the allocation was created by Market Actor (old verified deal), then client A can extend the claim for this deal to MaximumVerifiedAllocationTerm without paying any further Datacap.

4. If a verified deal was made by client A before DDO was implemented and the allocation was created by Market Actor (old verified deal), then client B can extend the claim for this deal by spending the Datacap required for this claim and claim will be extended to MaximumVerifiedAllocationTerm from now.

## How to extend the claim
1. Extend all verified claims made with a storage provider
    ```sh
    lotus filplus extend-claim --client <original client Address> --provider <miner address> --all
    ```
2. Extend all verified claims made with multiple storage providers
    ```sh
    lotus filplus extend-claim --client <original client Address> --provider <miner address1> <miner address2>... --all
    ```
3. Extend specific claims made with a single storage provider
    ```sh
    lotus filplus extend-claim --client <original client Address> --provider <miner address> <claim ID1> <claimID2>....
    ```
4. Extend specific claims made with specific storage providers
    ```sh
    lotus filplus extend-claim --client <original client Address> <miner1=claim1> <miner2=claim2> <miner3=claim3> ...
    ```
5. Extend all verified claims made by a different client with a storage provider. This will use Datacap.
    ```sh
    lotus filplus extend-claim --client <new client Address> --provider <miner address> --all
    ```
6. Extend all verified claims made by a different client with multiple storage providers. This will use Datacap.
    ```sh
    lotus filplus extend-claim --client <new client Address> --provider <miner address1> <miner address2>... --all
    ```
7. Extend specific claims made by a different client with a single storage provider. This will use Datacap.
    ```sh
    lotus filplus extend-claim --client <new client Address> --provider <miner address> <claim ID1> <claimID2>....
    ```
8. Extend specific claims made by a different client with specific storage providers. This will use Datacap.
    ```sh
    lotus filplus extend-claim --client <new client Address> <miner1=claim1> <miner2=claim2> <miner3=claim3> ...
    ```



