import * as React from 'react';
import * as Constants from '~/common/constants';
import * as SVG from '~/components/SVG';

import PackageInfo from '~/package.json';

import { css } from 'react-emotion';

const STYLES_TOP = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const STYLES_TITLE_BAR = css`
  height: 32px;
  width: 100%;
  color: #fff;
  background: ${Constants.theme.headerBackground};
  padding: 0 24px 0 24px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const STYLES_LEFT = css`
  min-width: 10%;
  width: 100%;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
`;

const STYLES_SEARCH = css``;

const STYLES_SEARCH_INPUT = css`
  height: 48px;
  margin: 0;
  border: 0;
  outline: 0;
  font-size: 12px;
  border-radius: 0;
  font-family: 'mono';
  text-transform: uppercase;
  padding: 0 24px 0 24px;
  width: 100%;
  transition: 200ms ease background;
  overflow: hidden;
  color: ${Constants.theme.pageText};
  background: ${Constants.theme.searchBackground};

  ::placeholder {
    color: ${Constants.theme.placeholderText};
  }

  :focus {
    color: ${Constants.theme.action};
    border: 0;
    outline: 0;
  }
`;

const STYLES_ITEM = css`
  font-weight: 600;
  transition: 200ms ease color;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${Constants.theme.pageText};

  :visited {
    color: ${Constants.theme.pageText};
  }

  :hover {
    color: ${Constants.theme.action};
  }
`;

const CHINESE_COMPONENT = (
  <a
    href="/cn+getting-started"
    style={{ marginLeft: 24 }}
    className={STYLES_ITEM}
  >
    中文
  </a>
);

const STYLES_GHOST_ELEMENT = css`
  height: 16px;
  width: 1px;
  display: inline-flex;
`;

export default props => {
  return (
    <nav className={STYLES_TOP}>
      <div className={STYLES_TITLE_BAR}>
        <div className={STYLES_LEFT}>
          <a
            href="https://github.com/filecoin-project/lotus/tree/master/documentation"
            className={STYLES_ITEM}
            style={{ marginRight: 24 }}
          >
            <span className={STYLES_GHOST_ELEMENT} />
            Lotus Documentation {PackageInfo.version}
          </a>
          <a
            className={STYLES_ITEM}
            href="https://github.com/filecoin-project/lotus"
          >
            <SVG.GitHub height="16px" style={{ marginRight: 8 }} /> GitHub
          </a>
        </div>
        <div className={STYLES_RIGHT}>
          {props.language === 'cn' ? (
            <a href="/en+getting-started" className={STYLES_ITEM}>
              English
            </a>
          ) : null}
        </div>
      </div>
      <div className={STYLES_SEARCH}>
        <input
          ref={props.getSearchInputRef}
          className={STYLES_SEARCH_INPUT}
          onChange={props.onChange}
          value={props.value}
          placeholder="Type to search..."
        />
      </div>
    </nav>
  );
};
