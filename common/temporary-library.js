const documentOne = `# Getting Started

## Install from binary

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.


## Install from source

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.

## Test connection

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.

## Manually connect to testnet

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.

## Retrieve funds from Lotus Testnet Faucet

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.

## Additional links

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.

`.trim();

const documentTwo = `# Storing Data

## Steps for a successful storage deal

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.

## Troubleshooting

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.


`.trim();

const documentThree = `# Retrieving Data

## Successfully retrieving files

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.

`.trim();

const documentFour = `# Mining

## How to start mining?

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.

100 Terabytes

## Troubleshooting

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.
`.trim();

const documentFive = `# API

## How to develop and contribute

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.

## API

Lorem Ipsum simply wishes to make a little clearer to itself the notions that it has received from others or that, like others, it has formed for itself — notions that everyone uses for thinking about human groups, their relations and difficulties with one another. The effort to clarify such matters is assuredly not the business of those men who practice or mix in them. This collection is the work of an amateur.

`.trim();

export default {
  posts: [
    {
      id: 1,
      title: "Getting started",
      slug: "getting-started",
      value: documentOne
    },
    { id: 2, title: "Storing Data", slug: "storing-data", value: documentTwo },
    {
      id: 3,
      title: "Retrieving Data",
      slug: "retrieving-data",
      value: documentThree
    },
    { id: 4, title: "Mining", slug: "mining", value: documentFour },
    { id: 5, title: "API", slug: "api", value: documentFive }
  ]
};
