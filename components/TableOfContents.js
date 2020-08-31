import * as React from 'react';
import * as Strings from '~/common/strings';
import * as Constants from '~/common/constants';
import * as SVG from '~/components/SVG';

import { css } from 'react-emotion';

const STYLES_TABLE_OF_CONTENTS = css`
  z-index: ${Constants.zindex.sidebar};
  position: fixed;
  top: 80px;
  left: 0;
  bottom: 0;
  width: 304px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${Constants.theme.searchBackground};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #343a3f;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${Constants.theme.action};
  }

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    border-right: 0px;
    overflow-y: hidden;
  }
`;

const STYLES_SIDEBAR = css`
  width: 100%;
  padding: 80px 24px 88px 24px;
`;

const STYLES_DOCUMENT_ITEM = css`
  display: block;
  font-size: 20px;
  margin-bottom: 16px;
  color: ${Constants.theme.sidebarText};
  text-decoration: none;
  font-family: 'medium';
  width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  transition: 200ms ease color;

  :visited {
    color: ${Constants.theme.sidebarText};
  }

  :hover {
    color: ${Constants.theme.action};
  }
`;

const STYLES_DOCUMENT_SUB_ITEM = css`
  display: block;
  font-size: 16px;
  margin-bottom: 16px;
  color: ${Constants.theme.sidebarText};
  text-decoration: none;
  width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  padding-left: 16px;
  transition: 200ms ease color;

  :last-child {
    margin-bottom: 48px;
  }

  :visited {
    color: ${Constants.theme.sidebarText};
  }

  :hover {
    color: ${Constants.theme.action};
  }
`;

const STYLES_HOVER_LOGO = css`
  margin-bottom: 48px;
  cursor: pointer;
  transition: 200ms ease color;

  :hover {
    color: ${Constants.theme.action};
  }
`;

export default props => {
  return (
    <div className={STYLES_TABLE_OF_CONTENTS}>
      <div className={STYLES_SIDEBAR}>
        <SVG.Logo
          height="88px"
          className={STYLES_HOVER_LOGO}
          style={{
            color: props.post.slug === 'en+lotus' ? '#39ff14' : null,
          }}
          onClick={() => {
            window.location.href = '/';
          }}
        />
        {props.library.posts.map(p => {
          if (p.isManuallyRendered) {
            return null;
          }

          return (
            <React.Fragment key={`post-${p}.id-${p.slug}`}>
              <a
                className={STYLES_DOCUMENT_ITEM}
                href={`${p.slug}`}
                style={{
                  color: p.slug === props.post.slug ? '#39ff14' : null,
                }}
              >
                {p.title}
              </a>

              {p.posts.map(sp => {
                return (
                  <a
                    className={STYLES_DOCUMENT_SUB_ITEM}
                    href={`${sp.slug}`}
                    key={`spost-${sp}.id-${sp.slug}`}
                    style={{
                      color: sp.slug === props.post.slug ? '#39ff14' : null,
                    }}
                  >
                    {sp.title}
                  </a>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
