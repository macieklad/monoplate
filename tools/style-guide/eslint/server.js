module.exports = {
  extends: ['@vercel/style-guide/eslint/node', './base'].map(require.resolve),
  env: {
    node: true,
    es6: true,
  },
};
