import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";

import { css } from "react-emotion";

import ReactDOM from "react-dom";

const STYLES_MENU = css`
  z-index: ${Constants.zindex.editor.menu};
  padding: 24px;
  position: absolute;
  background-color: #ececec;
  opacity: 0;
  visibility: hidden;
  transition: all 200ms;
  transition-property: opacity, left, top;
`;

const STYLES_BUTTON = css`
  display: inline-block;
  vertical-align: middle;
  margin-right: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  :last-child {
    margin-right: 0;
  }
`;

const BlockButton = ({ editor, type, children }) => {
  const { value } = editor;
  const isBlock = value.blocks.some(b => b.type == type);

  return (
    <span
      className={STYLES_BUTTON}
      onMouseDown={event => {
        event.preventDefault();
        editor.setBlocks(isBlock ? "P" : type);
      }}
    >
      {children}
    </span>
  );
};

const MarkButton = ({ editor, type, children }) => {
  const { value } = editor;
  const isActive = value.activeMarks.some(m => m.type === type);

  return (
    <span
      className={STYLES_BUTTON}
      onMouseDown={event => {
        event.preventDefault();
        editor.toggleMark(type);
      }}
    >
      {children}
    </span>
  );
};

export default ({ editor, onSetMenuReference }) => {
  if (!process.browser) {
    return null;
  }

  const root = window.document.getElementById("root");

  return ReactDOM.createPortal(
    <div className={STYLES_MENU} ref={onSetMenuReference}>
      <BlockButton editor={editor} type="H1">
        H1
      </BlockButton>
      <BlockButton editor={editor} type="H2">
        H2
      </BlockButton>
      <MarkButton editor={editor} type="bold">
        BOLD
      </MarkButton>
      <MarkButton editor={editor} type="italic">
        ITALIC
      </MarkButton>
      <MarkButton editor={editor} type="underlined">
        UNDERLINED
      </MarkButton>
    </div>,
    root
  );
};
