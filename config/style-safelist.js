const { readFileSync } = require('node:fs');
const scss = require('postcss-scss');
const selectorParser = require('postcss-selector-parser');

// Keep selectors used by dynamically created UI (search, tooltips, dark mode).
// Read selectors rather than declaration values so unused CSS still gets purged.
module.exports = function styleSafelist(filenames) {
  const selectors = new Set();

  for (const filename of filenames) {
    const stylesheet = scss.parse(readFileSync(filename, 'utf8'), { from: filename });
    stylesheet.walkRules((rule) => {
      // Bootstrap interpolates breakpoint infixes. Keep the base selector;
      // concrete responsive classes are also discovered in HTML.
      const selector = rule.selector.replace(/#\{[^}]*\}/g, '');
      selectorParser((root) => {
        root.walk((node) => {
          if (['class', 'id'].includes(node.type)) selectors.add(node.value);
          if (node.type === 'tag' && !/^\d/.test(node.value)) selectors.add(node.value);
          if (node.type === 'attribute') selectors.add(node.attribute);
          if (node.type === 'pseudo' && node.value.startsWith('::-')) {
            selectors.add(node.value.slice(3));
          }
        });
      }).processSync(selector);
    });
  }

  return [...selectors].sort();
};
