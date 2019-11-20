/**
 * User pressed Shift+Tab in an editor:
 * Reduce indentation in the selected lines.
 */
function onShiftTab(opts, event, editor, next) {
  const { value } = editor;
  event.preventDefault();
  event.stopPropagation();

  // We dedent all selected lines
  return editor.dedentLines();
}

export default onShiftTab;
