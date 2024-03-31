const { REACT_RULES, REACT_IGNORED_FILES } = require('./constants');

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/browser',
    './base',
    '@vercel/style-guide/eslint/react',
  ].map(require.resolve),
  ignorePatterns: ['node_modules/', 'dist/', 'build/', ...REACT_IGNORED_FILES],
  rules: REACT_RULES,
};
