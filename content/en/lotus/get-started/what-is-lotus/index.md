---
title: "What is Lotus"
description: "The surface-level answer to the question 'what is Lotus' often leaves people with more questions than they originally had. This page attempts to explain what Lotus is, without using any industry buzzwords or complicated jargon."
draft: false
menu:
    lotus:
        parent: "lotus-get-started"
aliases:
    - /docs/getting-started/what-is-lotus/
    - /docs/set-up/about/
    - /docs/
weight: 105
toc: true
---

This sounds like a simple question; what is Lotus? And the surface-level answer is:

> Lotus is the reference node implementation for the Filecoin network.

![High Level Lotus Suite](High-Level-Lotus-Suite.png)

At a high level the Lotus Suite consists of the `Lotus`, `Lotus-Miner` and `Lotus-Worker` programs. This section of the docs will focus on the `Lotus` programs.

If you understood all that, great! You can leave this page and start diving into the rest of the documentation. However, if that sentence left you with more questions, then fear not! We're going to cover everything you need to know _without_ assuming you know anything about crypto, blockchain, web3. By the end of this page you should understand each word in that surface-level answer. 

## The Filecoin network

Let's start at the end.

### Network

A **network** is a group of computers that talk to each other and exchange information. The internet is the biggest network in the world, and you're using it right now. But a network can also be very small, all you need is at least two computers that can communicate with each other.

### Filecoin

**Filecoin** is a protocol. That means that it's a collection of rules and processes that computers need to follow to be part of the network. If a computer does not follow the rules, then they are ignored by the rest of the computers on the network. 

You might have heard of HTTP before; it's the thing right at the start of a website link:

```plaintext
http://example.com
```

HTTP is a set of rules that computers need to follow so that they can share websites with each other. If a computer doesn't know what HTTP is then it won't know what to do when you ask it to go to a website.

The Filecoin protocol lets users store data on any of the computers in the network. Once the data has been stored, users can retrieve the data from the computers on the network. That data can be anything; pictures, music, videos, research data, encrypted archives, anything! If it can be stored digitally then it can be stored using Filecoin.

So let's review. _The Filecoin network_ is:

- A group of computers that are all following the same set of rules to allow users to store pretty much anything on the computers

## A reference node implementation

Again, let's start at the end. 

### Implementation

An **implementation** is _one way_ to do _something_. Take this table from Ikea as an example:

![A wooden table from Ikea.](ingo-table.png)

It's called Ingo, because Ikea likes to give their products fun names. Ingo is not the only table in the world; there are many more tables that exist. However, Ingo serves the primary functions of a table: it's flat, has legs to keep the surface off the floor, and you can put things on top of it. It's one implementation, or application, of the table idea.

- _Ingo_ is an _object_ that you can use as a _table_.
- _Lotus_ is an _application_ that a computer can use to do _Filecoin stuff_.

### Node

A **node** is a computer that can talk to other computers on a network. In your home network there's probably a computer, a TV, and maybe a printer.

Each node on your home network has programs that tell it how to talk to the other nodes on the network. Without these programs, the nodes wouldn't be able to understand each other, and would be pretty useless.

In the case of Lotus, a _Lotus node_ is a computer on a network that is running the Lotus application.

### Reference

Other computers refer to this node for how to talk to other computers.

So let's review. A _node implementation_ is:

- An application that tells computers how to talk to other computers on the Filecoin network

## In summary 

Hopefully that all made sense, so let's put all this together.

> Lotus is the reference node implementation for the Filecoin network.

To translate, Lotus is:

- An application that tells computers how to talk to other computers that are all following the same set of rules to allow users to store pretty much anything on the computers

## Why Filecoin

This page should have cleared things up regarding what Lotus is. But you may still have questions about Filecoin itself, like:

- why do we need Filecoin?
- what's wrong with the normal way of storing things?
- how can I store my stuff on Filecoin?
- how much does it cost to store things on Filecoin?

To get the answers to these questions, head on over to the [Filecoin documentation website](https://docs.filecoin.io). This website is specific to Lotus documentation only.
