---
title: "Wallet"
draft: false
menu:
    reference:
             parent: "reference-cli-lotus"
toc: true
---

Manage your wallet.

Usage:

```shell
lotus wallet command [command options] [arguments...]
```

Commands:

- `new`           Generate a new key of the given type
- `list`         List wallet address
- `balance`      Get account balance
- `export`       export keys
- `import`       import keys
- `default`      Get default wallet address
- `set-default`  Set default wallet address
- `sign`         sign a message
- `verify`       verify the signature of a message
- `delete`       Soft delete an address from the wallet - hard deletion needed for permanent removal
- `market`       Interact with market balances
- `help`, `h`      Shows a list of commands or help for one command

```plaintext
NAME:
   lotus wallet - Manage wallet

USAGE:
   lotus wallet command [command options] [arguments...]

COMMANDS:
   new          Generate a new key of the given type
   list         List wallet address
   balance      Get account balance
   export       export keys
   import       import keys
   default      Get default wallet address
   set-default  Set default wallet address
   sign         sign a message
   verify       verify the signature of a message
   delete       Soft delete an address from the wallet - hard deletion needed for permanent removal
   market       Interact with market balances
   help, h      Shows a list of commands or help for one command

OPTIONS:
   --help, -h  show help (default: false)
```

### new

```plaintext
NAME:
   lotus wallet new - Generate a new key of the given type

USAGE:
   lotus wallet new [command options] [bls|secp256k1 (default secp256k1)]

OPTIONS:
   --help, -h  show help (default: false)
```

### list

```plaintext
NAME:
   lotus wallet list - List wallet address

USAGE:
   lotus wallet list [command options] [arguments...]

OPTIONS:
   --addr-only, -a  Only print addresses (default: false)
   --id, -i         Output ID addresses (default: false)
   --market, -m     Output market balances (default: false)
   --help, -h       show help (default: false)
```

### balance

```plaintext
NAME:
   lotus wallet balance - Get account balance

USAGE:
   lotus wallet balance [command options] [address]

OPTIONS:
   --help, -h  show help (default: false)
```

### export

```plaintext
NAME:
   lotus wallet export - export keys

USAGE:
   lotus wallet export [command options] [address]

OPTIONS:
   --help, -h  show help (default: false)
```

### import

```plaintext
NAME:
   lotus wallet import - import keys

USAGE:
   lotus wallet import [command options] [<path> (optional, will read from stdin if omitted)]

OPTIONS:
   --format value  specify input format for key (default: "hex-lotus")
   --as-default    import the given key as your new default key (default: false)
   --help, -h      show help (default: false)
```

### default

```plaintext
NAME:
   lotus wallet default - Get default wallet address

USAGE:
   lotus wallet default [command options] [arguments...]

OPTIONS:
   --help, -h  show help (default: false)
```

### set-default

```plaintext
NAME:
   lotus wallet set-default - Set default wallet address

USAGE:
   lotus wallet set-default [command options] [address]

OPTIONS:
   --help, -h  show help (default: false)
```

### sign

```plaintext
NAME:
   lotus wallet sign - sign a message

USAGE:
   lotus wallet sign [command options] <signing address> <hexMessage>

OPTIONS:
   --help, -h  show help (default: false)
```

### verify

```plaintext
NAME:
   lotus wallet verify - verify the signature of a message

USAGE:
   lotus wallet verify [command options] <signing address> <hexMessage> <signature>

OPTIONS:
   --help, -h  show help (default: false)
```

### delete

```plaintext
NAME:
   lotus wallet delete - Soft delete an address from the wallet - hard deletion needed for permanent removal

USAGE:
   lotus wallet delete [command options] <address> 

OPTIONS:
   --help, -h  show help (default: false)
```

### market

```plaintext
NAME:
   lotus wallet market - Interact with market balances

USAGE:
   lotus wallet market command [command options] [arguments...]

COMMANDS:
   withdraw  Withdraw funds from the Storage Market Actor
   add       Add funds to the Storage Market Actor
   help, h   Shows a list of commands or help for one command

OPTIONS:
   --help, -h  show help (default: false)
```

#### withdraw

```plaintext
NAME:
   lotus wallet market withdraw - Withdraw funds from the Storage Market Actor

USAGE:
   lotus wallet market withdraw [command options] [amount (FIL) optional, otherwise will withdraw max available]

OPTIONS:
   --wallet value, -w value   Specify address to withdraw funds to, otherwise it will use the default wallet address
   --address value, -a value  Market address to withdraw from (account or miner actor address, defaults to --wallet address)
   --confidence value         number of block confirmations to wait for (default: 5)
   --help, -h                 show help (default: false)
```

#### add

```plaintext
NAME:
   lotus wallet market add - Add funds to the Storage Market Actor

USAGE:
   lotus wallet market add [command options] <amount>

OPTIONS:
   --from value, -f value     Specify address to move funds from, otherwise it will use the default wallet address
   --address value, -a value  Market address to move funds to (account or miner actor address, defaults to --from address)
   --help, -h                 show help (default: false)
   
```
