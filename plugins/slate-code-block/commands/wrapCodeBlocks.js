/**
 * Wrap a block into a code block.
 */
function wrapCodeBlocks(opts, editor, blocks) {
  if (blocks.length == 0) {
    return editor;
  }

  const { value } = editor;
  const { document } = value;

  let text = [];

  editor.withoutNormalizing(() => {
    // Remove all child
    blocks.forEach(block => {
      text.push(block.text);
      block.nodes.forEach(node => {
        editor.removeNodeByKey(node.key);
      });
    });
  });

  // Insert new text
  const toInsert = editor.deserializeCode(text.join('\n'));

  editor.withoutNormalizing(() => {
    editor.setNodeByKey(blocks.get(0).key, {
      type: opts.containerType,
    });

    let index = 0;
    blocks.forEach(block => {
      if (index != 0) {
        editor.removeNodeByKey(block.key);
      }
      index += 1;
    });
    toInsert.nodes.forEach((node, i) => {
      editor.insertNodeByKey(blocks.get(0).key, i, node);
    });
  });

  // Set node type

  return editor;
}

export default wrapCodeBlocks;
