/**
 * Unwrap a code block into a normal block.
 */
function unwrapCodeBlockByKey(opts, editor, key, type) {
  const { value } = editor;
  const { document } = value;

  // Get the code block
  const codeBlock = document.getDescendant(key);

  if (!codeBlock || codeBlock.type != opts.containerType) {
    throw new Error(
      'Block passed to unwrapCodeBlockByKey should be a code block container'
    );
  }

  // change lines into paragraph
  codeBlock.nodes.forEach(line =>
    editor.withoutNormalizing(() => {
      editor.setNodeByKey(line.key, { type }).unwrapNodeByKey(line.key);
    })
  );

  return editor;
}

export default unwrapCodeBlockByKey;
