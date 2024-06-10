---
title: "Legacy lotus-miner markets connectivity"
description: "This guide shows connectivity tips and tricks for the legacy lotus-miner markets"
date: 2023-05-16T12:00:35+01:00
lastmod: 2023-05-16T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
aliases:
    - /docs/storage-providers/connectivity/
    - /storage-providers/operate/connectivity/
toc: false
pinned: false
types: ["article"]
areas: ["Deprecated"]
---

{{< alert icon="warning" >}}
The Legacy Lotus/Lotus-Miner Markets sub-system reached EOL at the [end of the 31st January 2023](https://github.com/filecoin-project/lotus/releases/tag/v1.18.0). It has been fully removed from the Lotus/Lotus-Miner codebase as of 10th June 2024. We recommend our users to use the [Boost markets sub-system](https://github.com/filecoin-project/boost) instead.
{{< /alert >}}

Filecoin miners, like participants in all peer-to-peer protocols, require a steady and quality pool of peers to communicate with in order to perform their various functions. This complements the [connectivity section]({{< relref "initialize#connectivity-to-the-miner" >}}) in the setup instructions and the [seal workers]({{< relref "seal-workers" >}}) guide.

## Finding your public IP address

Usually, you can find your public IP address using a service like ifconfig.me. Running the following command from the miner machine shows which IP is seen by others:

```sh
curl ifconfig.me
```

{{< alert icon="warning">}}
The returned IP will not be the right one in some setups in which outgoing traffic is routed through a different exit point (i.e. a NAT gateway), than incoming traffic, and thus, presents a different IP. You should be familiar with your own network setup!
{{< /alert >}}

## Testing connectivity to your an IP address/port

There are different methods to test this:

- For checking publicly-accessible IPs, you can use one of the many online checkers like [this](https://www.yougetsignal.com/tools/open-ports/), or [this](https://ping.eu/port-chk).
- For LANs (but also for public IPs), you use the netcat tool from a different computer: `ncat -w 5 <PUBLIC_IP> <PORT>` (if it returns with a non-zero exit code or an error it means that a connection cannot be stablished.
- Also Telnet: `telnet <PUBLIC_IP> <PORT>`.
- You can use your favourite search engine for more ways specifically related to your setup and environment.

## Lotus miner reachability

When the lotus miner is running and reachable, it should report it with:

```shell
$ lotus-miner net reachability
```
```output
AutoNAT status:  Public
Public address:  /ip4/<IP>/tcp/<port>
```

Verify that the Public address corresponds to what you expect. `AutoNAT status: Private` means that the Lotus Miner is not reachable on any of the announced addresses.

## Checking peer count

To ensure storage and retrieval deals operate smoothly, it is recommended to check how many peers a miner is connected to after each start-up:

```shell
lotus-miner net peers
```
```output
QmUhB2wFQb4qsLZyoqVczMs6CgxSzQqij6gzmJ33Qeq8yn, [/ip4/<IP>/tcp/<port>]
12D3KooWSVkZMoALKwWQpnkZoAHyPV1jYpciJ5ngwFSRv5LgWkwU, [/ip4/<IP>/tcp/<port>]
```

The peer count should increase soon after starting the miner. You can also manually connect to peers with:

```sh
lotus-miner net connect <address1> <address2>...
```

An list of bootstrap peers is available for [mainnet](https://github.com/filecoin-project/lotus/blob/master/build/bootstrap/mainnet.pi) Bootstrap peers are unique per network, so be sure to use the list corresponding to your desired network.  Other bootstrap lists are located [here](https://github.com/filecoin-project/lotus/blob/master/build/bootstrap/).

## Port forwarding

If you are running on a NAT'ed environment (i.e. the usual case in a home setup, where there is a router that controls access from and to the internet), sometimes it is necessary to enable port forwarding from an external port to the miner's port.

{{< alert icon="tip">}}
Instructions vary wildy depending on brand model. Please use your favourite search engine to discover how to enable port forwarding for your router
{{< /alert >}}

## Obtaining a public IP

If you do not control the NAT/Firewall that your device is behind (such as within enterprise networks and other firewalls), there is an alternative solution for you. You can set up a **relay endpoint** so that your miner can relay its internet traffic through an external, publicly dialable endpoint.

There are multiple ways to achieve this:

- Using A VPN service. We recommend Wireguard-powered IPv6 VPN services which will provide you with a publicly routable IPv6 address.
- Using an [SSH Reverse Tunnel](https://www.howtogeek.com/428413/what-is-reverse-ssh-tunneling-and-how-to-use-it) to set up a proxy between a machine with a public IP and the miner.

## Common errors

The [troubleshooting page]({{< relref "connectivity-errors" >}}) has a list of common connectivity errors.
