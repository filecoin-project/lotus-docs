/**
 * User pressed Mod+Enter in an editor
 * Exit the current code block
 */
function onModEnter(opts, event, editor, next) {
  const { value } = editor;
  if (!value.selection.isCollapsed) {
    return next();
  }

  event.preventDefault();

  // Exit the code block
  return opts.resolvedOnExit(editor);
}

export default onModEnter;
