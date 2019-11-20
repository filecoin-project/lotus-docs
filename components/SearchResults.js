import * as StringUtilities from '~/common/string-utilities';
import * as Constants from '~/common/constants';

import { P, H1 } from '~/components/Text';
import { CODE } from '~/components/Code';

import { css } from 'react-emotion';

const STYLES_ITEM = css`
  max-width: 768px;
  width: 100%;
  margin: 0 auto 0 auto;
  padding: 0 24px 32px 24px;

  :hover {
    a {
      color: ${Constants.theme.action};
    }
  }
`;

const STYLES_ACTION = css`
  color: ${Constants.theme.pageText};
  display: block;
  margin-top: 12px;
  font-weight: 400;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: 200ms ease color;

  :visited {
    color: ${Constants.theme.pageText};
  }

  :hover {
    color: ${Constants.theme.action};
  }
`;

const STYLES_HIGHLIGHT = css`
  background-color: ${Constants.theme.action};
  font-weight: 400;
`;

const STYLES_QUERY = css`
  background-color: ${Constants.theme.action};
  color: ${Constants.colors.black};
`;

export default props => {
  if (!props.searchResults.length) {
    return (
      <div className={STYLES_ITEM}>
        <P style={{ padding: 0 }}>
          Nothing found for{' '}
          <strong className={STYLES_QUERY}>“{props.search}”</strong>.
        </P>
        <span className={STYLES_ACTION} onClick={props.onClearSearch}>
          Clear search
        </span>
      </div>
    );
  }

  let regex;
  try {
    regex = new RegExp(props.search.trim(), 'gi');
  } catch (e) {}

  return (
    <React.Fragment>
      {props.searchResults.map(p => {
        if (!p.text) {
          return (
            <div className={STYLES_ITEM} key={`result-${p.post.id}-${p.id}`}>
              <H1 style={{ padding: 0 }}>{p.post.title}</H1>
              <a href={`/${p.post.slug}`} className={STYLES_ACTION}>
                Read
              </a>
            </div>
          );
        }

        const text = StringUtilities.insertMentionsIntoString(p.text, [
          {
            regex: regex,
            fn: (key, result) => {
              return (
                <mark key={key} className={STYLES_HIGHLIGHT}>
                  {result[0]}
                </mark>
              );
            },
          },
        ]);

        if (p.post.isCode) {
          return (
            <div className={STYLES_ITEM} key={`result-${p.post.id}-${p.id}`}>
              <CODE style={{ margin: 0, padding: 0 }}>{text}</CODE>
              <a href={`/${p.post.slug}`} className={STYLES_ACTION}>
                Read <strong>{p.post.title}</strong>
              </a>
            </div>
          );
        }

        return (
          <div className={STYLES_ITEM} key={`result-${p.post.id}-${p.id}`}>
            <P style={{ padding: 0 }}>“{text}”</P>
            <a href={`/${p.post.slug}`} className={STYLES_ACTION}>
              Read <strong>{p.post.title}</strong>
            </a>
          </div>
        );
      })}
    </React.Fragment>
  );
};
