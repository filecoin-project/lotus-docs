---
title: "Chain linked to block marked previously as bad"
description: "This is a solution to the block marked previously as bad error"
date: 2022-09-22T12:00:35+01:00
lastmod: 2022-09-22T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["Lotus Node"]
---

## Problem

You may encounter error messages that prompts `block marked previously as bad`. There are generally two types of these errors, one that may indicated that you are following a bad fork, similar to this:

```sh
{"level":"error","ts":"2022-08-27T09:35:00.408+0800","logger":"chain","caller":"chain/sync_manager.go:253","msg":"error during sync in [bafy2bzaceaqkpdwcfdygig4736fohmftkjk6yfthgvjopbcp6vtzpo75dtvum]: collectChain failed: chain linked to block marked previously as bad ([bafy2bzaceaqkpdwcfdygig4736fohmftkjk6yfthgvjopbcp6vtzpo75dtvum], bafy2bzacedtp46ivpr75n5z5culnx2cnhvgfvtizjxzpx6zu5uh4hrl4sveai) (reason: linked to bafy2bzacedra54fsmpkpcab426swxodzmpxdud6hcxcaxpkvswzuqkyb4wg5w caused by: [bafy2bzacebnoo5yjetazelgof3emmwdbndbj7pubzfoj45qj7jlokvubgxuj4 bafy2bzacecwxsgvjvtcyelox7jjjgkz4qcsxnvsivbmt62n24d5gotjhwue5i bafy2bzacedwudc2vmxg3lm7i4rku726k5rce2j6j5eq4oinyfti5lvhtqffmo] fork past finality)"}
```

The other error that also prompts that a block was previously marked as bad also outputs that the `parent state root did not match the computed state`, similar to this:

```shell
07T09:30:30.355Z","logger":"chain","caller":"chain/sync_manager.go:254","msg":"error during sync in [bafy2bzacec6s4imaxzqfcinevrtlrvssynq6aytgahcm6zfoj2uvktm53v4ma]: collectChain failed: chain linked to block marked previously as bad ([bafy2bzacec6s4imaxzqfcinevrtlrvssynq6aytgahcm6zfoj2uvktm53v4ma], bafy2bzacebwhvvd54665mw44asdid2qlupxq7u7facqbahbtqhjl7zdl654j6) (reason: linked to bafy2bzaceacp7f7r4cmfkxmrfzfgtcqux2pgaxryld3p4ejywhqyjgliu24gq caused by: [bafy2bzacec75osxwx7hkpgjiltinf25ugzw7pzgcsae77w5a3byez5w6zx3ww] 1 error occurred:\n\t* parent state root did not match computed state
```

## Environment 

- Mainnet
- Calibnet
- Butterflynet
- Local network

## Resolution

For the error message indicating that you are on a fork, there are two ways to try to resolve it.

The first solution is to:

- unmark all bad blocks
- reset the head to a known good epoch
- restart the lotus node

```sh
lotus sync unmark-bad --all
lotus chain sethead --epoch <epochNumber>
```

The other solution is to re-import a new lightweight snapshot and restart Lotus.

For the error message indicating that `parent state root did not match the computed state`, this is often related to a build-error, or that the ffi-submodule was not properly updated during an upgrade. To prevent these errors you must rebuild Lotus, and during the build it is important that `git submodule update` is called.