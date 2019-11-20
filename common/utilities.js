import * as Strings from "~/common/strings";

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

    if (node.type === "H1") {
      return node.text;
    }

    if (node.type === "H2") {
      return node.text;
    }
  }

  return "Untitled";
};

export const findFirstParagraph = editorStateValue => {
  const { document } = editorStateValue;

  for (let i = 0; i < document.nodes.size; i++) {
    const node = document.nodes.get(i);

    if (Strings.isEmpty(node.text)) {
      continue;
    }

    if (node.type === "P") {
      return node.text;
    }
  }

  return "";
};
