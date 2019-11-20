// Return the index of the first character that differs between both string, or
// the smallest string length otherwise.
function firstDifferentCharacter(a, b) {
  if (a.length > b.length) {
    return firstDifferentCharacter(b, a);
  }

  const indexes = Array(a.length)
    .fill()
    .map((v, i) => i);
  const index = indexes.find(i => a[i] !== b[i]);

  return index == null ? a.length : index;
}

/**
 * Dedent all lines in selection
 */
function dedentLines(
  opts,
  editor,
  // Indent to remove
  indent
) {
  const { value } = editor;
  const { document, selection } = value;
  const lines = document
    .getLeafBlocksAtRange(selection)
    .filter(node => node.type === opts.lineType);
  indent = indent || editor.getCurrentIndent();

  return lines.reduce((editor, line) => {
    // Remove a level of indent from the start of line
    const textNode = line.nodes.first();
    const lengthToRemove = firstDifferentCharacter(textNode.text, indent);
    return editor.removeTextByKey(textNode.key, 0, lengthToRemove);
  }, editor);
}

export default dedentLines;
