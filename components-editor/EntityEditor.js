import * as React from 'react';
import * as Utilities from '~/common/utilities';
import * as Strings from '~/common/strings';

import PluginCodeBlock from '~/plugins/slate-code-block';
import PluginPrism from '~/plugins/slate-prism';

import { Block } from 'slate';
import { Editor } from 'slate-react';
import { P, H1, H2, H3, UL, OL, LI, BLOCKQUOTE } from '~/components/Text';
import { CODE, CODE_LINE } from '~/components/Code';
import {
  BOLD,
  ITALIC,
  UNDERLINED,
  INLINE_CODE,
  LINK,
} from '~/components/Marks';

const plugins = [PluginCodeBlock(), PluginPrism()];

const renderBlock = ({ attributes, children, node }, editor, next) => {
  switch (node.type) {
    case 'H1':
      return <H1 {...attributes} children={children} ref={null} />;
    case 'H2':
      return <H2 {...attributes} children={children} ref={null} />;
    case 'H3':
      return <H3 {...attributes} children={children} ref={null} />;
    case 'P':
      return <P {...attributes} children={children} ref={null} />;
    case 'CODE':
      return <CODE {...attributes} children={children} ref={null} />;
    case 'CODE_LINE':
      return <CODE_LINE {...attributes} children={children} ref={null} />;
    case 'UL':
      return <UL {...attributes} children={children} ref={null} />;
    case 'OL':
      return <OL {...attributes} children={children} ref={null} />;
    case 'LI':
      return <LI {...attributes} children={children} ref={null} />;
    case 'BLOCKQUOTE':
      return <BLOCKQUOTE {...attributes} children={children} ref={null} />;
    default:
      return next();
  }
};

const renderInline = (props, editor, next) => {
  const { attributes, children, node } = props;

  switch (node.type) {
    case 'link': {
      const { data } = node;
      const href = data.get('href');
      return (
        <LINK {...attributes} href={href} ref={null}>
          {children}
        </LINK>
      );
    }

    default: {
      return next();
    }
  }
};

const renderMark = ({ children, mark, attributes }, editor, next) => {
  switch (mark.type) {
    case 'bold':
      return <BOLD {...attributes} children={children} />;
    case 'italic':
      return <ITALIC {...attributes} children={children} />;
    case 'underlined':
      return <UNDERLINED {...attributes} children={children} />;
    case 'code':
      return <INLINE_CODE {...attributes} children={children} />;
    default:
      return next();
  }
};

export default ({
  value,
  readOnly,
  spellCheck,
  autoFocus,
  onChange,
  onSave,
  onCancel,
  renderEditor,
}) => (
  <Editor
    readOnly
    spellCheck={spellCheck}
    autoFocus={autoFocus}
    plugins={plugins}
    placeholder=""
    value={value}
    onChange={onChange}
    renderBlock={renderBlock}
    renderMark={renderMark}
    renderInline={renderInline}
    renderEditor={renderEditor}
  />
);
