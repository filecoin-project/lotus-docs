import getIndent from '../utils/getIndent';

/**
 * Detect indentation in the current code block
 */
function getCurrentIndent(opts, editor) {
  if (opts.getIndent) {
    return opts.getIndent(value);
  }

  const currentCode = editor.getCurrentCode();
  if (!currentCode) {
    return '';
  }

  const text = currentCode
    .getTexts()
    .map(t => t.text)
    .join('\n');
  return getIndent(text);
}

export default getCurrentIndent;
