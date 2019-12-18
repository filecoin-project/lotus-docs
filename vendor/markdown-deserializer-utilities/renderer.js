import { EMPTY_PARAGRAPH_NODES } from '~/common/fixtures';

function flatten(array) {
  return [].concat.apply([], array);
}

function decode(href) {
  try {
    return decodeURI(href);
  } catch (e) {
    return decodeSafe(href);
  }
}

function decodeSafe(uri) {
  const components = uri.split(/(%(?:d0|d1)%.{2})/);
  return components
    .map(component => {
      try {
        return decodeURIComponent(component);
      } catch (e) {
        return component.replace(/%(?!\d+)/g, '%25');
      }
    })
    .join('');
}

function applyMark(childNode, type) {
  return childNode.map(node => {
    if (node.object === 'inline') {
      node.nodes = applyMark(node.nodes, type);
    } else if (node.marks) {
      node.marks.push({ type });
    } else {
      node.marks = [{ type }];
    }
    return node;
  });
}

function Renderer() {}

Renderer.prototype.formatLegacyNodes = function(childNode) {
  let node = flatten(childNode);

  const output = node.reduce((a, current) => {
    if (current.text) {
      a.push({
        ...current,
        object: 'text',
      });

      return a;
    }

    if (current instanceof Array) {
      return a.concat(this.formatLegacyNodes(current));
    }

    a.push(current);
    return a;
  }, []);

  if (!output.length) {
    return EMPTY_PARAGRAPH_NODES;
  }

  return output;
};

Renderer.prototype.code = function(childNode, language) {
  var data = {};

  if (language) {
    data.language = language;
  }

  return {
    object: 'block',
    type: 'CODE',
    data,
    nodes: this.formatLegacyNodes(childNode),
  };
};

Renderer.prototype.blockquote = function(childNode) {
  return {
    object: 'block',
    type: 'BLOCKQUOTE',
    nodes: this.formatLegacyNodes(childNode),
  };
};

Renderer.prototype.heading = function(childNode, level) {
  return {
    object: 'block',
    type: 'H' + level,
    nodes: this.formatLegacyNodes(childNode),
  };
};

Renderer.prototype.hr = function() {
  return {
    object: 'block',
    type: 'HR',
    isVoid: true,
    nodes: EMPTY_PARAGRAPH_NODES,
  };
};

Renderer.prototype.list = function(childNode, style) {
  return {
    object: 'block',
    type: style,
    nodes: childNode,
  };
};

Renderer.prototype.listitem = function(childNode, flags = {}) {
  let data;
  if (flags.checked !== undefined) {
    data = { checked: flags.checked };
  }

  return {
    object: 'block',
    type: 'LI',
    data,
    nodes: this.formatLegacyNodes(childNode),
  };
};

Renderer.prototype.paragraph = function(childNode) {
  return {
    object: 'block',
    type: 'P',
    nodes: this.formatLegacyNodes(childNode),
  };
};

Renderer.prototype.table = function(childNode) {
  return {
    object: 'block',
    type: 'TABLE',
    nodes: childNode,
  };
};

Renderer.prototype.tablerow = function(childNode) {
  return {
    object: 'block',
    type: 'TR',
    nodes: childNode,
  };
};

Renderer.prototype.tablecell = function(childNode, flags) {
  const align = flags.align;

  return {
    object: 'block',
    data: { align },
    type: 'TD',
    nodes: [this.paragraph(childNode)],
  };
};

// span level renderer
Renderer.prototype.underlined = function(childNode) {
  return applyMark(childNode, 'underlined');
};

Renderer.prototype.strong = function(childNode) {
  return applyMark(childNode, 'bold');
};

Renderer.prototype.em = function(childNode) {
  return applyMark(childNode, 'italic');
};

Renderer.prototype.codespan = function(text) {
  return {
    text,
    marks: [{ type: 'code' }],
  };
};

Renderer.prototype.br = function() {
  return {
    text: ' ',
  };
};

Renderer.prototype.del = function(childNode) {
  return applyMark(childNode, 'deleted');
};

Renderer.prototype.ins = function(childNode) {
  return applyMark(childNode, 'inserted');
};

Renderer.prototype.link = function(href, title, childNode) {
  var data = {
    href: decode(href),
  };
  if (title) {
    data.title = title;
  }
  return {
    object: 'inline',
    type: 'link',
    nodes: this.formatLegacyNodes(childNode),
    data: data,
  };
};

Renderer.prototype.image = function(href, title, alt) {
  var data = {
    src: decode(href),
  };

  if (title) {
    data.title = title;
  }
  if (alt) {
    data.alt = alt;
  }

  return {
    object: 'block',
    type: 'IMG',
    nodes: EMPTY_PARAGRAPH_NODES,
    isVoid: true,
    data: data,
  };
};

Renderer.prototype.textVariant = function(childNode) {
  return {
    object: 'block',
    type: 'LIST_P_VARIANT',
    nodes: this.formatLegacyNodes(childNode),
  };
};

Renderer.prototype.text = function(childNode) {
  return {
    text: childNode,
  };
};

export default Renderer;
