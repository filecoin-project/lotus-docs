import * as React from 'react';
import * as Strings from '~/common/strings';
import * as Constants from '~/common/constants';

import { css } from 'react-emotion';

import GlossaryEnglish from '~/.pre-processing/en/.glossary-english.json';

const STYLES_GLOSSARY_RESULTS = css`
  flex-shrink: 0;
  width: 480px;
  padding: 6px 24px 0 48px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 4px 24px 0 24px;
  }

  @media (max-width: 1024px) {
    width: 344px;
  }
`;

const STYLES_ITEM = css`
  font-family: 'mono';
  font-size: 12px;
  margin-top: 24px;

  :first-child {
    margin-top: 0px;
  }
`;

const STYLES_ITEM_TOP = css`
  font-weight: 400;
`;

const STYLES_ITEM_BOTTOM = css`
  font-weight: 400;
  margin-top: 8px;
  color: #a2a9b0;
`;

const getResultsWithQuery = (search, language) => {
  let glossary = GlossaryEnglish;

  const query = search.toLowerCase();
  if (Strings.isEmpty(query)) {
    return Object.keys(glossary).map(each => {
      return (
        <div className={STYLES_ITEM} key={`glossary-${each}`}>
          <div className={STYLES_ITEM_TOP}>{glossary[each].title}</div>
          <div className={STYLES_ITEM_BOTTOM}>{glossary[each].value}</div>
        </div>
      );
    });
  }

  let results = [];
  let remainder = [];

  Object.keys(glossary).forEach(each => {
    const { title, value } = glossary[each];
    const hasTitle = title.toLowerCase().includes(query);

    if (hasTitle) {
      results.push({
        title,
        value,
        slug: each,
        isResult: true,
      });

      return;
    }

    remainder.push({
      title,
      value,
      slug: each,
      isResult: false,
    });
  });

  return [...results, ...remainder].map((result, i) => {
    return (
      <div className={STYLES_ITEM} key={`glossary-${result.slug}-${i}`}>
        <div
          className={STYLES_ITEM_TOP}
          style={{ color: result.isResult ? Constants.theme.action : null }}
        >
          {result.title}
        </div>
        <div
          className={STYLES_ITEM_BOTTOM}
          style={{ color: result.isResult ? '#fff' : null }}
        >
          {result.value}
        </div>
      </div>
    );
  });
};

export default props => {
  let results = getResultsWithQuery(props.search, props.language);

  return (
    <div className={STYLES_GLOSSARY_RESULTS} style={props.style}>
      {results}
    </div>
  );
};
