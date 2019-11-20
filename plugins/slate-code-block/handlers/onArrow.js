import { Block, Text } from 'slate';
import { isKeyHotkey } from '~/vendor/is-hotkey';

const isArrowDown = isKeyHotkey('arrowdown');
const isArrowUp = isKeyHotkey('arrowup');

/**
 * User pressed arrow down or up in an editor and on last or first line of code
 * block respectively:
 * Append or prepend an exit block
 */
function onArrow(opts, event, editor, next) {
  const { value } = editor;
  if (value.selection.isExpanded) {
    return next();
  }

  const { selection, startText, document } = value;

  const currentLine = value.startBlock;
  const nextBlock = document.getNextBlock(currentLine.key);
  const prevBlock = document.getPreviousBlock(currentLine.key);
  if (isArrowUp(event) && currentLine.type === opts.lineType && !prevBlock) {
    event.preventDefault();
    editor
      .moveToStartOfDocument()
      .splitBlock(10)
      .setBlocks({
        type: opts.exitBlockType,
        text: '',
        isVoid: false,
      });
    editor.moveToStartOfDocument();
    return editor.unwrapCodeBlock(opts.exitBlockType);
  } else if (
    isArrowDown(event) &&
    currentLine.type === opts.lineType &&
    !nextBlock
  ) {
    event.preventDefault();
    return opts.resolvedOnExit(editor);
  }

  return next();
}

export default onArrow;
