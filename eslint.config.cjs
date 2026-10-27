const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: ['assets/js/index.js', 'assets/js/vendor/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      quotes: ['error', 'single'],
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      }],
    },
  },
  {
    files: ['config/**/*.{js,cjs}', 'functions/**/*.js', '*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
  },
];
