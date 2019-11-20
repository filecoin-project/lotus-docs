import * as Strings from "~/common/strings";
import * as Utilities from "~/common/utilities";

import { EMPTY_PARAGRAPH_BLOCK } from "~/common/fixtures";
import { Block } from "slate";

export const runPluginOnReturn = (event, editor, next) => {
  const { value } = editor;
  const { document, selection, startBlock, texts, focusBlock } = value;

  if (!Strings.isEmpty(focusBlock.text)) {
    const isFocusedEnd = selection.focus.isAtEndOfNode(focusBlock);
    const isFocusedStart = selection.focus.isAtStartOfNode(focusBlock);

    // NOTE(jim):
    // You're at the start of a non empty block

    if (isFocusedStart) {
      event.preventDefault();
      return editor
        .moveToStartOfNode(focusBlock)
        .insertBlock(Block.create(EMPTY_PARAGRAPH_BLOCK))
        .moveToStartOfNode(focusBlock);
    }

    // NOTE(jim):
    // You're at the end of a non empty block.

    if (isFocusedEnd) {
      event.preventDefault();
      return editor
        .moveToEndOfNode(focusBlock)
        .insertBlock(Block.create(EMPTY_PARAGRAPH_BLOCK))
        .command(editor => Utilities.removeAllMarks(editor));
    }

    return next();
  }

  // NOTE(jim):
  // You're at a empty line.
  // You hit enter.
  // A new block forms.

  event.preventDefault();
  return editor
    .moveToEndOfNode(focusBlock)
    .insertBlock(Block.create(EMPTY_PARAGRAPH_BLOCK))
    .command(editor => Utilities.removeAllMarks(editor));
};

// NOTE(jim):
// Anywhere in a paragraph, CMD+Enter will create
// and focus a new block.
export const runPluginOnModReturn = (event, editor, next) => {
  const { value } = editor;
  if (!value.selection.isCollapsed) {
    return next();
  }

  event.preventDefault();
  const { startBlock } = value;

  const blockToInsert = Block.create(EMPTY_PARAGRAPH_BLOCK);

  return editor.moveToEndOfNode(startBlock).insertBlock(blockToInsert);
};
