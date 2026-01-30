const globals = require('globals');
const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');

module.exports = [
  // JavaScript recommended rules
  js.configs.recommended,

  // Ignore build output directory
  {
    ignores: ['_site/**/*'],
  },

  // Configuration for ESLint config file itself
  {
    files: ['eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Configuration for Node.js files (Eleventy config)
  {
    files: ['eleventy.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Node.js specific rules
      'no-console': 'off', // Allow console in build scripts
    },
  },

  // Configuration for browser JavaScript
  {
    files: ['src/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        GLightbox: 'readonly', // GLightbox library global
      },
    },
    rules: {
      // Browser-specific rules
      'no-console': 'warn', // Warn on console usage in browser code
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // Prettier compatibility - must be last to override formatting rules
  prettier,
];
