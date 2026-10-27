const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");
const postcss = require("postcss");
const purgecss = require("@fullhuman/postcss-purgecss");
const styleSafelist = require("../config/style-safelist");

test("purging preserves dynamic dark mode, search, and dropdown styles without safelisting declaration text", async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "lotus-style-safelist-"));
  try {
    const sources = {
      "dark.scss": `
        [data-dark-mode] {
          body {
            .btn-menu {
              &:hover { background: #333; }
            }
          }
        }
      `,
      "search.scss": `
        #suggestions {
          a {
            span:first-child { font-weight: bold; }
          }
          div:not(:first-child) { border-top: 1px solid; }
        }
        .content-marker {
          content: ".declaration-only #declaration-id [data-declaration-only] declaration-tag";
        }
      `,
      "dropdown.scss": `
        @each $breakpoint in map-keys($grid-breakpoints) {
          .dropdown-menu#{$infix}-end {
            --bs-position: end;
            &[data-bs-popper] { right: 0; left: auto; }
          }
        }
      `,
    };
    const filenames = Object.entries(sources).map(([name, source]) => {
      const filename = path.join(directory, name);
      fs.writeFileSync(filename, source);
      return filename;
    });
    const markup = path.join(directory, "page.html");
    // These dynamic selectors do not appear in the rendered static markup.
    fs.writeFileSync(markup, '<main class="page-content"><p>Documentation</p></main>');

    // Representative compiled CSS: the SCSS above contributes dynamic UI styles,
    // while the rest of the theme also contains rules unused by this page.
    const css = `
      .page-content { display: block; }
      [data-dark-mode] body .btn-menu:hover { background: #333; }
      #suggestions a span:first-child { font-weight: bold; }
      #suggestions div:not(:first-child) { border-top: 1px solid; }
      .dropdown-menu-end { --bs-position: end; }
      .dropdown-menu-end[data-bs-popper] { right: 0; left: auto; }
      .content-marker { content: ".declaration-only #declaration-id [data-declaration-only] declaration-tag"; }
      .unused-theme-rule { color: red; }
      .declaration-only { color: red; }
      #declaration-id { color: red; }
      [data-declaration-only] { color: red; }
      declaration-tag { color: red; }
    `;
    const result = await postcss([
      purgecss({ content: [markup], safelist: styleSafelist(filenames) }),
    ]).process(css, { from: undefined });
    const retained = new Set();
    result.root.walkRules((rule) => retained.add(rule.selector));

    for (const selector of [
      ".page-content",
      "[data-dark-mode] body .btn-menu:hover",
      "#suggestions a span:first-child",
      "#suggestions div:not(:first-child)",
      ".dropdown-menu-end",
      ".dropdown-menu-end[data-bs-popper]",
      ".content-marker",
    ]) {
      assert.ok(retained.has(selector), `dynamic or visible style was purged: ${selector}`);
    }
    for (const selector of [
      ".unused-theme-rule",
      ".declaration-only",
      "#declaration-id",
      "[data-declaration-only]",
      "declaration-tag",
    ]) {
      assert.ok(!retained.has(selector), `unused style was retained: ${selector}`);
    }
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
