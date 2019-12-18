import * as MarkdownDeserializer from '~/vendor/markdown-deserializer';

import { Value } from 'slate';

export const isEmpty = string => {
  return !string || !string.toString().trim();
};

export const pluralize = (text, count) => {
  return count > 1 || count === 0 ? `${text}s` : text;
};

export const parseMD = markdown => {
  return MarkdownDeserializer.deserialize(markdown);
};

export const toDate = data => {
  const date = new Date(data);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

export const elide = (string, length = 140, emptyState = '...') => {
  if (isEmpty(string)) {
    return emptyState;
  }

  if (string.length < length) {
    return string.trim();
  }

  return `${string.substring(0, length)}...`;
};

// NOTE(jim): Source: https://gist.github.com/mathewbyrne/1280286
export const createSlug = text => {
  if (isEmpty(text)) {
    return 'untitled';
  }

  const a = 'æøåàáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const b = 'aoaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const clientInsertElements = options => {
  let key = 0;

  function processInputWithRegex(option, input) {
    if (!option.fn || typeof option.fn !== 'function') return input;

    if (!option.regex || !(option.regex instanceof RegExp)) {
      return input;
    }

    if (typeof input === 'string') {
      let regex = option.regex;
      let result = null;
      let output = [];

      while ((result = regex.exec(input)) !== null) {
        let index = result.index;
        let match = result[0];

        output.push(input.substring(0, index));
        output.push(option.fn(++key, result));

        input = input.substring(index + match.length, input.length + 1);
        regex.lastIndex = 0;
      }

      output.push(input);
      return output;
    } else if (Array.isArray(input)) {
      return input.map(chunk => processInputWithRegex(option, chunk));
    } else return input;
  }

  return function(input) {
    if (!options || !Array.isArray(options) || !options.length) return input;

    options.forEach(option => (input = processInputWithRegex(option, input)));

    return input;
  };
};
