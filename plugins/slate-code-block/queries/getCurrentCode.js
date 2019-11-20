/**
 * Return the current code block, from current selection or from a node key.
 */
function getCurrentCode(opts, editor, key) {
  let currentBlock;
  if (key) {
    currentBlock = editor.value.document.getDescendant(key);
  } else {
    if (!editor.value.selection.start.key) return null;
    currentBlock = editor.value.startBlock;
  }

  // The structure is always code_block -> code_line -> text
  // So the parent of the currentBlock should be the code_block
  const parent = editor.value.document.getParent(currentBlock.key);
  if (parent && parent.type === opts.containerType) {
    return parent;
  }
  return null;
}

export default getCurrentCode;
