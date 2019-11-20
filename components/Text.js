import * as React from 'react';
import * as Constants from '~/common/constants';

import { css } from 'react-emotion';

const MAX_WIDTH = 768;

const STYLES_HEADING = css`
  font-family: 'medium';
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 3.375rem;
  position: relative;
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 0 auto 0 auto;
`;

export const H1 = props => {
  return <h1 {...props} className={STYLES_HEADING} />;
};

const STYLES_HEADING_TWO = css`
  font-family: 'medium';
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 2.074rem;
  position: relative;
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 48px auto 0 auto;
`;

export const H2 = props => {
  return <h2 {...props} className={STYLES_HEADING_TWO} />;
};

const STYLES_HEADING_THREE = css`
  font-family: 'medium';
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 1.728rem;
  position: relative;
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 16px auto 0 auto;
`;

export const H3 = props => {
  return <h3 {...props} className={STYLES_HEADING_THREE} />;
};

const STYLES_PARAGRAPH = css`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 1.44rem;
  line-height: 1.5;
  position: relative;
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 0 auto 0 auto;
`;

export const P = props => {
  return <p {...props} className={STYLES_PARAGRAPH} />;
};

const STYLES_BODY_TEXT = css`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  position: relative;
`;

export const BODY = props => {
  return <div {...props} className={STYLES_BODY_TEXT} />;
};

const STYLES_LIST = css`
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 0 auto 0 auto;
`;

export const UL = props => {
  return <ul {...props} className={STYLES_LIST} />;
};

const STYLES_ORDERED_LIST = css`
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 0 auto 0 auto;
`;

export const OL = props => {
  return <ol {...props} className={STYLES_LIST} />;
};

const STYLES_LIST_ITEM = css`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 1.44rem;
  line-height: 1.5;
  position: relative;
  margin-left: 24px;
`;

export const LI = props => {
  return <li {...props} className={STYLES_LIST_ITEM} />;
};

const STYLES_WRAP = css`
  display: block;
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 0 auto 0 auto;
`;

const STYLES_BLOCKQUOTE = css`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 1.44rem;
  line-height: 1.5;
  position: relative;
  padding-left: 24px;
  border-left: 4px solid ${Constants.theme.footerText};
`;

export const BLOCKQUOTE = props => {
  return (
    <span {...props} className={STYLES_WRAP} children={null}>
      <blockquote className={STYLES_BLOCKQUOTE}>{props.children}</blockquote>
    </span>
  );
};

