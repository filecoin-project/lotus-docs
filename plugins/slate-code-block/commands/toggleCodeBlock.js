import unwrapCodeBlock from './unwrapCodeBlock';

/**
 * Toggle code block / paragraph.
 */
function toggleCodeBlock(
  opts,
  editor,
  // When toggling a code block off, type to convert to
  type
) {
  if (editor.isInCodeBlock()) {
    return unwrapCodeBlock(opts, editor, type);
  }
  return editor.wrapCodeBlock(opts, editor);
}

export default toggleCodeBlock;
