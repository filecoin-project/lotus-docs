import getIndent from '../utils/getIndent';

/**
 * User pressed Enter in an editor:
 * Insert a new code line and start it with the indentation from previous line
 */
function onEnter(opts, event, editor, next) {
  const { value } = editor;
  if (!value.selection.isCollapsed) {
    return next();
  }

  event.preventDefault();

  const { startBlock } = value;
  const currentLineText = startBlock.text;
  const indent = getIndent(currentLineText, '');

  return editor
    .splitBlock()
    .insertText(indent)
    .focus();
}

export default onEnter;
