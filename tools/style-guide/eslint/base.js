const { resolve } = require('node:path');
const {
  TYPESCRIPT_FILES,
  TYPESCRIPT_RULES,
  BASE_RULES,
  NODE_CONFIG_FILES,
} = require('./constants');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: ['eslint-config-turbo'].map(require.resolve),
  rules: BASE_RULES,
  ignorePatterns: ['node_modules/', 'dist/', 'build/'],
  overrides: [
    {
      files: TYPESCRIPT_FILES,
      extends: [require.resolve('@vercel/style-guide/eslint/typescript')],
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
      rules: TYPESCRIPT_RULES,
    },
    {
      // Make sure that config files such as .eslintrc.js or .prettierrc.js
      // are linted using Node style-guide instead of the package specific one
      files: NODE_CONFIG_FILES,
      extends: [require.resolve('@vercel/style-guide/eslint/node')],
    },
  ],
};
