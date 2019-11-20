/**
 * Test if current selection is in a code block.
 */
function isInCodeBlock(opts, editor) {
  const { document, selection } = editor.value;
  const codeBlock = document.getClosest(
    selection.start.key,
    block => block.type === opts.containerType
  );

  return Boolean(codeBlock);
}

export default isInCodeBlock;
