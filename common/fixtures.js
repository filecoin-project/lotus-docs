export const EMPTY_PARAGRAPH_BLOCK = {
  object: "block",
  type: "P",
  nodes: [
    {
      object: "text",
      leaves: [
        {
          object: "leaf",
          text: ""
        }
      ]
    }
  ]
};

export const EMPTY_EXAMPLE_POST = {
  object: "value",
  document: {
    object: "document",
    nodes: [
      {
        object: "block",
        type: "H1",
        nodes: [
          {
            object: "text",
            text: "Work Plan"
          }
        ]
      },
      {
        object: "block",
        type: "P",
        nodes: [
          {
            object: "text",
            text: ""
          }
        ]
      },
      {
        object: "block",
        type: "P",
        nodes: [
          {
            object: "text",
            text: "Filecoin Testnet Docs (2019-Q4)"
          }
        ]
      },
      {
        object: "block",
        type: "P",
        nodes: [
          {
            object: "text",
            text: ""
          }
        ]
      },
      {
        object: "block",
        type: "H2",
        nodes: [
          {
            object: "text",
            text: "Motivation"
          }
        ]
      },
      {
        object: "block",
        type: "P",
        nodes: [
          {
            object: "text",
            text: ""
          }
        ]
      },
      {
        object: "block",
        type: "P",
        nodes: [
          {
            object: "text",
            text:
              "The Filecoin testnet launch is on Wednesday, December 11, 2019. This moment represents a big milestone for the Filecoin Project. Just 3 months away from our main network launch, the testnet launch signals to the Filecoin community and user base that we’re close to launch -- if ever they were to start engaging with the project, now would be the time to really dive in. We anticipate significant engagement with the Filecoin testnet from our users, developers, and community members."
          }
        ]
      },
      {
        object: "block",
        type: "P",
        nodes: [
          {
            object: "text",
            text: ""
          }
        ]
      },
      {
        object: "block",
        type: "P",
        nodes: [
          {
            object: "text",
            text:
              "To ensure that the experience of engaging with the Filecoin testnet is as smooth, straightforward, and enjoyable as possible, it is extremely important that we launch testnet with stellar Filecoin documentation. Ideally, these docs are visually beautiful, well-written, cover key user workflows, and enjoyed by all. In this work plan, we describe the scope for this project in more detail."
          }
        ]
      },
      {
        object: "block",
        type: "P",
        nodes: [
          {
            object: "text",
            text: ""
          }
        ]
      },
      {
        object: "block",
        type: "H2",
        nodes: [
          {
            object: "text",
            text: "Context"
          }
        ]
      },
      {
        object: "block",
        type: "P",
        nodes: [
          {
            object: "text",
            text: ""
          }
        ]
      },
      {
        object: "block",
        type: "P",
        nodes: [
          {
            object: "text",
            text:
              "The Filecoin testnet will launch with the lotus software client. As a result, the majority of the testnet docs project will focus on improving documentation for lotus. There is a set of comparable docs for go-filecoin available here."
          }
        ]
      }
    ]
  }
};
