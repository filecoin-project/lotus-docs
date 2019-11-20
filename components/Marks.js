import * as React from 'react';
import * as Constants from '~/common/constants';
import * as SVG from '~/components/SVG';

import { css } from 'react-emotion';

const addTooltip = detail => {
  const event = new CustomEvent('add-tooltip', {
    detail,
  });

  window.dispatchEvent(event);
};

const STYLES_STRONG = css`
  font-weight: 400;
  color: ${Constants.theme.bold};
  position: relative;
`;

const STYLES_ITALIC = css``;

const STYLES_INLINE_CODE = css`
  font-family: 'mono';
  color: ${Constants.theme.action};
  padding: 4px;
  font-size: 0.88rem;
`;

const STYLES_UNDERLINED = css``;

const STYLES_LINK = css`
  font-weight: 400;
  color: ${Constants.theme.action};
  transition: 200ms ease color;
  outline: 0;

  :visited {
    color: ${Constants.theme.action};
  }

  :hover {
    color: #6fdc8c;
  }
`;

const STYLES_QUESTION = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -12px;
  top: -8px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 200ms ease transform;
  color: ${Constants.theme.action};

  :hover {
    transform: scale(1.2);
  }
`;

class GlossaryHook extends React.Component {
  _handleAdd = e => {
    e.preventDefault();

    addTooltip(this.props.query);
  };

  render() {
    return (
      <span className={STYLES_QUESTION} onClick={this._handleAdd}>
        <SVG.Info height="16px" />
      </span>
    );
  }
}

export const BOLD = props => {
  return (
    <strong {...props} children={null} className={STYLES_STRONG}>
      {props.children}
      <GlossaryHook query={props.children.props.text} />
    </strong>
  );
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

export const LINK = props => {
  return <a {...props} className={STYLES_LINK} />;
};
