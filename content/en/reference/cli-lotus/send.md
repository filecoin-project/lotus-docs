---
title: "Send"
draft: false
menu:
    reference:
             parent: "reference-cli-lotus"
toc: true
---

```plaintext
NAME:
   lotus send - Send funds between accounts

USAGE:
   lotus send [command options] [targetAddress] [amount]

CATEGORY:
   BASIC

OPTIONS:
   --from value         optionally specify the account to send funds from
   --gas-premium value  specify gas price to use in AttoFIL (default: "0")
   --gas-feecap value   specify gas fee cap to use in AttoFIL (default: "0")
   --gas-limit value    specify gas limit (default: 0)
   --nonce value        specify the nonce to use (default: 0)
   --method value       specify method to invoke (default: 0)
   --params-json value  specify invocation parameters in json
   --params-hex value   specify invocation parameters in hex
   --force              Deprecated: use global 'force-send' (default: false)
   --help, -h           show help (default: false)
   
```
