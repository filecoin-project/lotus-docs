import { Value, Block, Text } from 'slate';
import { Editor } from 'slate-react';
import { Record } from 'immutable';

const DEFAULTS = {
  // Type of the code containers
  containerType: 'CODE',
  // Type of the code lines
  lineType: 'CODE_LINE',
  // Mod+Enter will exit the code container, into the given block type.
  // Backspace at start of empty code container, will turn it into the given block type.
  exitBlockType: 'P',
  // Should the plugin handle the select all inside a code container
  selectAll: true,
  // Allow marks inside code blocks
  allowMarks: false,
  // Returns the indent unit to use at the given selection, as a string
  getIndent: null,
  // Custom exit handler
  // exitBlockType option is useless if onExit is provided
  onExit: null,
};

/**
 * The plugin options container
 */
class Options extends Record(DEFAULTS) {
  resolvedOnExit(editor) {
    if (this.onExit) {
      // Custom onExit option
      return this.onExit(editor);
    }

    const exitBlock = Block.create({
      type: this.exitBlockType,
      nodes: [Text.create()],
    });

    editor.withoutNormalizing(() => {
      editor.moveToEndOfBlock().insertBlock(exitBlock);
      editor.unwrapNodeByKey(exitBlock.key);
    });

    return editor.moveToStartOfNode(exitBlock);
  }
}

export default Options;
