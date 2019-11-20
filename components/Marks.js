import * as React from "react";
import { css } from "react-emotion";

const STYLES_STRONG = css`
  font-weight: 600;
`;

const STYLES_ITALIC = css``;

const STYLES_INLINE_CODE = css`
  font-family: monaco;
`;

const STYLES_UNDERLINED = css``;

export const BOLD = props => {
  return <strong {...props} className={STYLES_STRONG} />;
};

export const ITALIC = props => {
  return <em {...props} className={STYLES_ITALIC} />;
};

export const INLINE_CODE = props => {
  return <code {...props} className={STYLES_INLINE_CODE} />;
};

export const UNDERLINED = props => {
  return <u {...props} className={STYLES_UNDERLINED} />;
};
