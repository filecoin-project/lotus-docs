import * as React from 'react';
import * as Constants from '~/common/constants';

import { css } from 'react-emotion';

const STYLES_AUTHOR = css`
  display: inline-flex;
  max-width: 152px;
  width: 100%;
  flex-direction: column;
  font-size: 12px;
`;

const STYLES_AUTHOR_TOP = css`
  flex-shrink: 0;
  background-size: cover;
  background-position: 50% 50%;
  height: 152px;
  width: 100%;
`;

const STYLES_AUTHOR_BOTTOM = css`
  min-width: 10%;
  width: 100%;
  text-align: left;
  padding: 16px;
  background-color: #f3f3f3;
`;

const STYLES_AUTHOR_NAME = css`
  font-weight: 600;
  margin-bottom: 2px;
`;

const STYLES_AUTHOR_DESCRIPTION = css``;

export default props => {
  return (
    <div className={STYLES_AUTHOR} style={props.style}>
      <div
        className={STYLES_AUTHOR_TOP}
        style={{
          backgroundImage: `url('${props.src}')`,
        }}
      />
      <div className={STYLES_AUTHOR_BOTTOM}>
        <div className={STYLES_AUTHOR_NAME}>{props.name}</div>
        <div className={STYLES_AUTHOR_DESCRIPTION}>{props.children}</div>
      </div>
    </div>
  );
};
