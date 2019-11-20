import * as React from 'react';
import * as Constants from '~/common/constants';

import { css } from 'react-emotion';

const MAX_WIDTH = 768;

const STYLES_WRAP = css`
  display: block;
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 0 auto 0 auto;
`;

const STYLES_CODE = css`
  background: ${Constants.theme.codeBackground};
  color: ${Constants.colors.white};
  font-family: 'mono';
  font-size: 16px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  position: relative;
  padding: 16px;
  border-radius: 4px;
  border-top: 1px solid #343a3f;
`;

export const CODE = props => {
  return (
    <span {...props} className={STYLES_WRAP} children={null}>
      <pre className={STYLES_CODE}>{props.children}</pre>
    </span>
  );
};

const STYLES_CODE_LINE = css`
  font-family: 'mono';
  display: block;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
`;

export const CODE_LINE = props => {
  return <code {...props} className={STYLES_CODE_LINE} />;
};
