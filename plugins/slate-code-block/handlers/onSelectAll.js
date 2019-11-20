/**
 * User is Cmd+A to select all text
 */
function onSelectAll(opts, event, editor, next) {
  const { value } = editor;
  event.preventDefault();

  const currentCode = editor.getCurrentCode();
  return editor
    .moveToStartOfNode(currentCode.getFirstText())
    .moveFocusToEndOfNode(currentCode.getLastText());
}

export default onSelectAll;
