/**
 * Convert a code block to a normal block.
 */
function unwrapCodeBlock(opts, editor, type) {
  const codeBlock = editor.getCurrentCode();

  if (!codeBlock) {
    return editor;
  }

  // Convert to paragraph
  editor.unwrapCodeBlockByKey(codeBlock.key, type);
}

export default unwrapCodeBlock;
