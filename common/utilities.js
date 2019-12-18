import * as Strings from '~/common/strings';

export const removeAllMarks = editor => {
  const { value } = editor;
  if (value.marks) {
    value.marks.forEach(mark => {
      editor.removeMark(mark);
    });
  }

  return editor;
};

export const findFirstHeading = editorStateValue => {
  const { document } = editorStateValue;

  for (let i = 0; i < document.nodes.size; i++) {
    const node = document.nodes.get(i);

    if (Strings.isEmpty(node.text)) {
      continue;
    }

    if (node.type === 'H1') {
      return node.text;
    }

    if (node.type === 'H2') {
      return node.text;
    }
  }

  return 'Untitled';
};

export const findFirstParagraph = editorStateValue => {
  const { document } = editorStateValue;

  for (let i = 0; i < document.nodes.size; i++) {
    const node = document.nodes.get(i);

    if (Strings.isEmpty(node.text)) {
      continue;
    }

    if (node.type === 'P') {
      return node.text;
    }
  }

  return '';
};

// NOTE(jim): https://gist.github.com/romanonthego/223d2efe17b72098326c82718f283adb
export const scrollToTop = () => {
  try {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
    window.scrollTo(0, 0);
  }
};
