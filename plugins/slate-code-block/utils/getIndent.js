import detectIndent from '~/vendor/detect-indent';

const DEFAULT_INDENTATION = '  ';

/**
 * Detect indentation in a text
 */
function getIndent(text, defaultValue = DEFAULT_INDENTATION) {
  return detectIndent(text).indent || defaultValue;
}

export default getIndent;
