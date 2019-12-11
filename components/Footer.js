import * as React from 'react';
import * as Constants from '~/common/constants';

import { css } from 'react-emotion';

const MAX_WIDTH = 768;

const STYLES_WRAP = css`
  display: block;
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 88px 24px;
  margin: 0 auto 0 auto;
`;

const STYLES_FOOTER = css`
  padding-top: 48px;
  margin-top: 48px;
  border-top: ${Constants.theme.footerText} 1px solid;
`;

const STYLES_ITEM = css`
  margin-bottom: 16px;
  color: ${Constants.theme.footerText};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  text-decoration: none;
  transition: 200ms ease all;
  transition-property: color;

  :visited {
    color: ${Constants.theme.footerText};
  }

  :hover {
    color: ${Constants.theme.action};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const STYLES_ITEM_LEFT = css`
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 400;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  flex-shrink: 0;
  width: 188px;

  @media (max-width: ${MAX_WIDTH}px) {
    width: 100%;
    display: block;
  }
`;

const STYLES_ITEM_RIGHT = css`
  font-size: 1rem;
  line-height: 1.5;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  min-width: 10%;
  width: 100%;

  @media (max-width: ${MAX_WIDTH}px) {
    display: block;
  }
`;

export default props => {
  const documentationURL = `https://github.com/filecoin-project/lotus/tree/master/documentation/${
    props.post.github
  }`;

  return (
    <div className={STYLES_WRAP}>
      <footer className={STYLES_FOOTER}>
        <a className={STYLES_ITEM} href={documentationURL} target="_blank">
          <span className={STYLES_ITEM_LEFT}>View Markdown</span>
          <span className={STYLES_ITEM_RIGHT}>
            Our documentation lives on GitHub. You can submit a pull request to
            help us keep this document up to date.
          </span>
        </a>
        <a
          className={STYLES_ITEM}
          href="https://github.com/filecoin-project/lotus/issues"
          target="_blank"
        >
          <span className={STYLES_ITEM_LEFT}>Issues</span>
          <span className={STYLES_ITEM_RIGHT}>
            All of our team's work is tracked on the GitHub issues page. Please
            go there if you would like to keep up with development updates.
          </span>
        </a>
        <a
          className={STYLES_ITEM}
          href="https://discuss.filecoin.io/c/lotus-help"
          target="_blank"
        >
          <span className={STYLES_ITEM_LEFT}>Forums</span>
          <span className={STYLES_ITEM_RIGHT}>
            Ask your questions about the Lotus implementation of Filecoin here.
          </span>
        </a>
        <a
          className={STYLES_ITEM}
          href="https://github.com/filecoin-project/community#chat"
          target="_blank"
        >
          <span className={STYLES_ITEM_LEFT}>Chat</span>
          <span className={STYLES_ITEM_RIGHT}>
            Our primary chat channels are bridged across Matrix, IRC, and Slack.
          </span>
        </a>
        <a
          className={STYLES_ITEM}
          href="https://faucet.testnet.filecoin.io/"
          target="_blank"
        >
          <span className={STYLES_ITEM_LEFT}>Faucet</span>
          <span className={STYLES_ITEM_RIGHT}>
            Do you need Filecoin for testing? Get some from the TestNet faucet.
          </span>
        </a>
      </footer>
    </div>
  );
};
