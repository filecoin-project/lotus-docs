import * as React from 'react';
import * as Strings from '~/common/strings';

// NOTE(jim)
// https://github.com/EfogDev/react-process-string/blob/master/index.js
export const insertMentionsIntoString = (text, options = [], Component) => {
  return Strings.clientInsertElements([...options])(text);
};
