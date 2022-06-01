---
title: "Market"
draft: false
menu:
    reference:
              parent: "reference-miner"
              identifier: "reference-miner-methods-market"
toc: true
---

## MarketCancelDataTransfer

MarketCancelDataTransfer cancels a data transfer with the given transfer ID and other peer

Perms: write

Inputs:

```json
[
  3,
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  true
]
```

Response: `{}`

## MarketDataTransferDiagnostics

MarketDataTransferDiagnostics generates debugging information about current data transfers over graphsync

Perms: write

Inputs:

```json
[
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf"
]
```

Response:

```json
{
  "ReceivingTransfers": [
    {
      "RequestID": {},
      "RequestState": "string value",
      "IsCurrentChannelRequest": true,
      "ChannelID": {
        "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
        "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
        "ID": 3
      },
      "ChannelState": {
        "TransferID": 3,
        "Status": 1,
        "BaseCID": {
          "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
        },
        "IsInitiator": true,
        "IsSender": true,
        "Voucher": "string value",
        "Message": "string value",
        "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
        "Transferred": 42,
        "Stages": {
          "Stages": [
            {
              "Name": "string value",
              "Description": "string value",
              "CreatedTime": "0001-01-01T00:00:00Z",
              "UpdatedTime": "0001-01-01T00:00:00Z",
              "Logs": [
                {
                  "Log": "string value",
                  "UpdatedTime": "0001-01-01T00:00:00Z"
                }
              ]
            }
          ]
        }
      },
      "Diagnostics": [
        "string value"
      ]
    }
  ],
  "SendingTransfers": [
    {
      "RequestID": {},
      "RequestState": "string value",
      "IsCurrentChannelRequest": true,
      "ChannelID": {
        "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
        "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
        "ID": 3
      },
      "ChannelState": {
        "TransferID": 3,
        "Status": 1,
        "BaseCID": {
          "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
        },
        "IsInitiator": true,
        "IsSender": true,
        "Voucher": "string value",
        "Message": "string value",
        "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
        "Transferred": 42,
        "Stages": {
          "Stages": [
            {
              "Name": "string value",
              "Description": "string value",
              "CreatedTime": "0001-01-01T00:00:00Z",
              "UpdatedTime": "0001-01-01T00:00:00Z",
              "Logs": [
                {
                  "Log": "string value",
                  "UpdatedTime": "0001-01-01T00:00:00Z"
                }
              ]
            }
          ]
        }
      },
      "Diagnostics": [
        "string value"
      ]
    }
  ]
}
```

## MarketDataTransferUpdates

Perms: write

Inputs: `null`

Response:

```json
{
  "TransferID": 3,
  "Status": 1,
  "BaseCID": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "IsInitiator": true,
  "IsSender": true,
  "Voucher": "string value",
  "Message": "string value",
  "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  "Transferred": 42,
  "Stages": {
    "Stages": [
      {
        "Name": "string value",
        "Description": "string value",
        "CreatedTime": "0001-01-01T00:00:00Z",
        "UpdatedTime": "0001-01-01T00:00:00Z",
        "Logs": [
          {
            "Log": "string value",
            "UpdatedTime": "0001-01-01T00:00:00Z"
          }
        ]
      }
    ]
  }
}
```

## MarketGetAsk

Perms: read

Inputs: `null`

Response:

```json
{
  "Ask": {
    "Price": "0",
    "VerifiedPrice": "0",
    "MinPieceSize": 1032,
    "MaxPieceSize": 1032,
    "Miner": "f01234",
    "Timestamp": 10101,
    "Expiry": 10101,
    "SeqNo": 42
  },
  "Signature": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  }
}
```

## MarketGetDealUpdates

Perms: read

Inputs: `null`

Response:

```json
{
  "Proposal": {
    "PieceCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "PieceSize": 1032,
    "VerifiedDeal": true,
    "Client": "f01234",
    "Provider": "f01234",
    "Label": "string value",
    "StartEpoch": 10101,
    "EndEpoch": 10101,
    "StoragePricePerEpoch": "0",
    "ProviderCollateral": "0",
    "ClientCollateral": "0"
  },
  "ClientSignature": {
    "Type": 2,
    "Data": "Ynl0ZSBhcnJheQ=="
  },
  "ProposalCid": {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "AddFundsCid": null,
  "PublishCid": null,
  "Miner": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  "Client": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  "State": 42,
  "PiecePath": ".lotusminer/fstmp123",
  "MetadataPath": ".lotusminer/fstmp123",
  "SlashEpoch": 10101,
  "FastRetrieval": true,
  "Message": "string value",
  "FundsReserved": "0",
  "Ref": {
    "TransferType": "string value",
    "Root": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "PieceCid": null,
    "PieceSize": 1024,
    "RawBlockSize": 42
  },
  "AvailableForRetrieval": true,
  "DealID": 5432,
  "CreationTime": "0001-01-01T00:00:00Z",
  "TransferChannelId": {
    "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "ID": 3
  },
  "SectorNumber": 9,
  "InboundCAR": "string value"
}
```

## MarketGetRetrievalAsk

Perms: read

Inputs: `null`

Response:

```json
{
  "PricePerByte": "0",
  "UnsealPrice": "0",
  "PaymentInterval": 42,
  "PaymentIntervalIncrease": 42
}
```

## MarketImportDealData

Perms: write

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  },
  "string value"
]
```

Response: `{}`

## MarketListDataTransfers

Perms: write

Inputs: `null`

Response:

```json
[
  {
    "TransferID": 3,
    "Status": 1,
    "BaseCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "IsInitiator": true,
    "IsSender": true,
    "Voucher": "string value",
    "Message": "string value",
    "OtherPeer": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Transferred": 42,
    "Stages": {
      "Stages": [
        {
          "Name": "string value",
          "Description": "string value",
          "CreatedTime": "0001-01-01T00:00:00Z",
          "UpdatedTime": "0001-01-01T00:00:00Z",
          "Logs": [
            {
              "Log": "string value",
              "UpdatedTime": "0001-01-01T00:00:00Z"
            }
          ]
        }
      ]
    }
  }
]
```

## MarketListDeals

Perms: read

Inputs: `null`

Response:

```json
[
  {
    "Proposal": {
      "PieceCID": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "PieceSize": 1032,
      "VerifiedDeal": true,
      "Client": "f01234",
      "Provider": "f01234",
      "Label": "string value",
      "StartEpoch": 10101,
      "EndEpoch": 10101,
      "StoragePricePerEpoch": "0",
      "ProviderCollateral": "0",
      "ClientCollateral": "0"
    },
    "State": {
      "SectorStartEpoch": 10101,
      "LastUpdatedEpoch": 10101,
      "SlashEpoch": 10101
    }
  }
]
```

## MarketListIncompleteDeals

Perms: read

Inputs: `null`

Response:

```json
[
  {
    "Proposal": {
      "PieceCID": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "PieceSize": 1032,
      "VerifiedDeal": true,
      "Client": "f01234",
      "Provider": "f01234",
      "Label": "string value",
      "StartEpoch": 10101,
      "EndEpoch": 10101,
      "StoragePricePerEpoch": "0",
      "ProviderCollateral": "0",
      "ClientCollateral": "0"
    },
    "ClientSignature": {
      "Type": 2,
      "Data": "Ynl0ZSBhcnJheQ=="
    },
    "ProposalCid": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "AddFundsCid": null,
    "PublishCid": null,
    "Miner": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "Client": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "State": 42,
    "PiecePath": ".lotusminer/fstmp123",
    "MetadataPath": ".lotusminer/fstmp123",
    "SlashEpoch": 10101,
    "FastRetrieval": true,
    "Message": "string value",
    "FundsReserved": "0",
    "Ref": {
      "TransferType": "string value",
      "Root": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "PieceCid": null,
      "PieceSize": 1024,
      "RawBlockSize": 42
    },
    "AvailableForRetrieval": true,
    "DealID": 5432,
    "CreationTime": "0001-01-01T00:00:00Z",
    "TransferChannelId": {
      "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "ID": 3
    },
    "SectorNumber": 9,
    "InboundCAR": "string value"
  }
]
```

## MarketListRetrievalDeals

Perms: read

Inputs: `null`

Response:

```json
[
  {
    "PayloadCID": {
      "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
    },
    "ID": 5,
    "Selector": {
      "Raw": "Ynl0ZSBhcnJheQ=="
    },
    "PieceCID": null,
    "PricePerByte": "0",
    "PaymentInterval": 42,
    "PaymentIntervalIncrease": 42,
    "UnsealPrice": "0",
    "StoreID": 42,
    "ChannelID": {
      "Initiator": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "Responder": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
      "ID": 3
    },
    "PieceInfo": {
      "PieceCID": {
        "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
      },
      "Deals": [
        {
          "DealID": 5432,
          "SectorID": 9,
          "Offset": 1032,
          "Length": 1032
        }
      ]
    },
    "Status": 0,
    "Receiver": "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
    "TotalSent": 42,
    "FundsReceived": "0",
    "Message": "string value",
    "CurrentInterval": 42,
    "LegacyProtocol": true
  }
]
```

## MarketPendingDeals

Perms: write

Inputs: `null`

Response:

```json
{
  "Deals": [
    {
      "Proposal": {
        "PieceCID": {
          "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
        },
        "PieceSize": 1032,
        "VerifiedDeal": true,
        "Client": "f01234",
        "Provider": "f01234",
        "Label": "string value",
        "StartEpoch": 10101,
        "EndEpoch": 10101,
        "StoragePricePerEpoch": "0",
        "ProviderCollateral": "0",
        "ClientCollateral": "0"
      },
      "ClientSignature": {
        "Type": 2,
        "Data": "Ynl0ZSBhcnJheQ=="
      }
    }
  ],
  "PublishPeriodStart": "0001-01-01T00:00:00Z",
  "PublishPeriod": 60000000000
}
```

## MarketPublishPendingDeals

Perms: admin

Inputs: `null`

Response: `{}`

## MarketRestartDataTransfer

MarketRestartDataTransfer attempts to restart a data transfer with the given transfer ID and other peer

Perms: write

Inputs:

```json
[
  3,
  "12D3KooWGzxzKZYveHXtpG6AsrUJBcWxHBFS2HsEoGTxrMLvKXtf",
  true
]
```

Response: `{}`

## MarketRetryPublishDeal

Perms: admin

Inputs:

```json
[
  {
    "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
  }
]
```

Response: `{}`

## MarketSetAsk

Perms: admin

Inputs:

```json
[
  "0",
  "0",
  10101,
  1032,
  1032
]
```

Response: `{}`

## MarketSetRetrievalAsk

Perms: admin

Inputs:

```json
[
  {
    "PricePerByte": "0",
    "UnsealPrice": "0",
    "PaymentInterval": 42,
    "PaymentIntervalIncrease": 42
  }
]
```

Response: `{}`
