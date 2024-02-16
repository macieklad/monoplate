const { resolve } = require('node:path');
const {
  sharedRules,
  sharedReactRules,
  ignorePatterns,
  sharedOverrides,
} = require('./shared');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
    'eslint-config-turbo',
    'prettier',
  ],
  plugins: [
    "check-file"
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns,
  rules: {
    ...sharedRules,
    ...sharedReactRules,
    'import/no-default-export': 'off',
  },
  overrides: [...sharedOverrides],
};
