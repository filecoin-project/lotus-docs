/**
 * Indent all lines in selection
 */
function indentLines(
  opts,
  editor,
  // Indent to add
  indent
) {
  const { value } = editor;
  const { document, selection } = value;
  const lines = document
    .getLeafBlocksAtRange(selection)
    .filter(node => node.type === opts.lineType);
  indent = indent || editor.getCurrentIndent();

  return lines.reduce((editor, line) => {
    // Insert an indent at start of line
    const text = line.nodes.first();
    return editor.insertTextByKey(text.key, 0, indent);
  }, editor);
}

export default indentLines;
