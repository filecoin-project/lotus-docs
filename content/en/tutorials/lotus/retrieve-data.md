---
title: "Retrieve data"
description: "There are multiple ways to fetch data from a storage provider. This pages covers some of the most popular methods."
lead: "There are multiple ways to fetch data from a storage provider. This pages covers some of the most popular methods."
draft: false
menu:
    tutorials:
        parent: "tutorials-lotus"
aliases:
    - /tutorials/store-and-retrieve/retrieve-data/
    - /tutorials/lotus/store-and-retrieve/retrieve-data/
    - /docs/developers/retrieve-data/
weight: 115
toc: true
---

## Lassie

Lassie is a simple retrieval client for Filecoin. It finds and fetches your data over the best retrieval protocols available.

### Prerequisites

Make sure that you have [Go](https://go.dev) installed and that your `GOPATH` is set up. By default, your `GOPATH` will be set to `~/go`.

### Install Lassie

1. Download and install Lassie using the Go package manager:

```shell with-output
go install github.com/filecoin-project/lassie/cmd/lassie@latest
```
```
go: downloading github.com/filecoin-project/lassie v0.3.1
go: downloading github.com/libp2p/go-libp2p v0.23.2
go: downloading github.com/filecoin-project/go-state-types v0.9.9
...
```

2. Install the [go-car](https://github.com/ipld/go-car) package using the Go package manager:

```shell with-output
go install github.com/ipld/go-car/cmd/car@latest
```
```
go: downloading github.com/ipld/go-car v0.6.0
go: downloading github.com/ipld/go-car/cmd v0.0.0-20230215023242-a2a8d2f9f60f
go: downloading github.com/ipld/go-codec-dagpb v1.6.0 
...
```
The go-car package makes it easier to work with content-addressed archive (CAR) files.

### Retrieve

To retrieve data from Filecoin using Lassie, all you need is the CID of the content you want to download. You can use the following CIDs to test the process:

1. The format for retrieving data using Lassie is:

```shell
lassie fetch -o <OUTFILE_FILE_NAME> -p <CID>
```

For example:

```shell with-output
lassie fetch -o output.car -p bafykbzacecjedcvniq5wylq7cqre7la6diaxwsue5ssy3f3rzftwu3ielspru
```
```
Fetching bafykbzacecjedcvniq5wylq7cqre7la6diaxwsue5ssy3f3rzftwu3ielspru
Querying indexer for bafykbzacecjedcvniq5wylq7cqre7la6diaxwsue5ssy3f3rzftwu3ielspru...
Found 4 storage providers candidates from the indexer, querying all of them:
        12D3KooWPNbkEgjdBNeaCGpsgCrPRETe4uBZf1ShFXStobdN18ys
        12D3KooWNHwmwNRkMEP6VqDCpjSZkqripoJgN7eWruvXXqC2kG9f
        12D3KooWKGCcFVSAUXxe7YP62wiwsBvpCmMomnNauJCA67XbmHYj
        12D3KooWLDf6KCzeMv16qPRaJsTLKJ5fR523h65iaYSRNfrQy7eU
Querying [12D3KooWLDf6KCzeMv16qPRaJsTLKJ5fR523h65iaYSRNfrQy7eU] (started)...
Querying [12D3KooWKGCcFVSAUXxe7YP62wiwsBvpCmMomnNauJCA67XbmHYj] (started)...

...
```

2. This will create an `output.car` file within your current directory:

```shell with-output
ls -l
```
```
total 143M
-rw-rw-r-- 1 user user 143M Feb 16 11:21 output.car
```

### Extract data

Now that we’ve downloaded a CAR file, we need to find out what’s inside it.

1. The format for extracting a .car file using Go-car is:

```
car extract --file <INPUT_FILE>
```

2. Extract the output.car file we just downloaded using Lassie:

```
car extract --file output.car
```

This command does not output anything on success.

3. You can list the output of the `car` command with `ls`:

```shell with-output
ls -lh
```
```
-rw-rw-r-- 1 user user 143M Feb 16 11:21 output.car
-rw-rw-r-- 1 user user 143M Feb 16 11:36 moon-data.tar.gz
```

4. You can then manage the data as you need.

And there we have it! Downloading and managing data from Filecoin is super simple when you use Lassie and Go-car!
