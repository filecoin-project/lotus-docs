/**
 * Wrap a block into a code block.
 */
function wrapCodeBlockByKey(opts, editor, key) {
  const { value } = editor;
  const { document } = value;

  const startBlock = document.getDescendant(key);
  const text = startBlock.text;

  editor.withoutNormalizing(() => {
    // Remove all child
    startBlock.nodes.forEach(node => {
      editor.removeNodeByKey(node.key);
    });
  });

  // Insert new text
  const toInsert = editor.deserializeCode(text);

  editor.withoutNormalizing(() => {
    toInsert.nodes.forEach((node, i) => {
      editor.insertNodeByKey(startBlock.key, i, node);
    });
  });

  // Set node type
  editor.setNodeByKey(startBlock.key, {
    type: opts.containerType,
  });

  return editor;
}

export default wrapCodeBlockByKey;
