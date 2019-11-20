import * as React from "react";
import * as Utilities from "~/common/utilities";
import * as Strings from "~/common/strings";

import { runPluginOnReturn, runPluginOnModReturn } from "~/common/plugins";

import { Block } from "slate";
import { Editor } from "slate-react";
import { P, H1, H2 } from "~/components/Text";
import { BOLD, ITALIC, UNDERLINED, INLINE_CODE } from "~/components/Marks";
import { isKeyHotkey } from "~/vendor/is-hotkey";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isTab = isKeyHotkey("tab");

const renderBlock = ({ attributes, children, node }, editor, next) => {
  switch (node.type) {
    case "H1":
      return <H1 {...attributes} children={children} ref={null} />;
    case "H2":
      return <H2 {...attributes} children={children} ref={null} />;
    case "P":
      return <P {...attributes} children={children} ref={null} />;
    default:
      return next();
  }
};

const renderMark = ({ children, mark, attributes }, editor, next) => {
  switch (mark.type) {
    case "bold":
      return <BOLD {...attributes} children={children} />;
    case "italic":
      return <ITALIC {...attributes} children={children} />;
    case "underlined":
      return <UNDERLINED {...attributes} children={children} />;
    default:
      return next();
  }
};

const onKeyDown = (event, editor, next) => {
  if (event.key === "Enter") {
    if (event.metaKey) {
      return runPluginOnModReturn(event, editor, next);
    }

    if (event.shiftKey) {
      event.preventDefault();
      return editor.insertText("\n");
    }

    return runPluginOnReturn(event, editor, next);
  }

  if (isBoldHotkey(event)) {
    event.preventDefault();
    return editor.toggleMark("bold");
  }

  if (isItalicHotkey(event)) {
    event.preventDefault();
    return editor.toggleMark("italic");
  }

  if (isUnderlinedHotkey(event)) {
    event.preventDefault();
    return editor.toggleMark("underlined");
  }

  if (isTab(event)) {
    event.preventDefault();
    return editor.insertText("  ");
  }

  return next();
};

export default ({
  value,
  readOnly,
  spellCheck,
  autoFocus,
  onChange,
  onSave,
  onCancel,
  renderEditor
}) => (
  <Editor
    spellCheck={spellCheck}
    autoFocus={autoFocus}
    readOnly={readOnly}
    placeholder="Start typing..."
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    renderBlock={renderBlock}
    renderMark={renderMark}
    renderEditor={renderEditor}
  />
);
