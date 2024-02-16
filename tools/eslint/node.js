const { ignorePatterns, sharedOverrides } = require('./shared');

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    'eslint:recommended',
    require.resolve('@vercel/style-guide/eslint/node'),
    'eslint-config-turbo',
    'prettier',
  ],
  plugins: [
    "check-file"
  ],
  ignorePatterns,
  overrides: [...sharedOverrides],
};

module.exports = config;
