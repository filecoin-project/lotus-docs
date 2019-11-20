import React from 'react';

import { Mark, Node, Decoration } from 'slate';
import { Editor } from 'slate-react';
import { Record } from 'immutable';

import TOKEN_MARK from './TOKEN_MARK';

/**
 * Default filter for code blocks
 */
function defaultOnlyIn(node) {
  return node.object === 'block' && node.type === 'CODE';
}

/**
 * Default getter for syntax
 */
function defaultGetSyntax(node) {
  return 'bash';
}

/**
 * Default rendering for decorations
 */
function defaultRenderDecoration(props, editor, next) {
  const { decoration } = props;
  if (decoration.type !== TOKEN_MARK) {
    return next();
  }

  const className = decoration.data.get('className');
  return <span className={className}>{props.children}</span>;
}

/**
 * The plugin options
 */
class Options extends Record({
  onlyIn: defaultOnlyIn,
  getSyntax: defaultGetSyntax,
  renderDecoration: defaultRenderDecoration,
}) {}

export default Options;
