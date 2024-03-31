module.exports = {
  extends: ['@vercel/style-guide/eslint/browser', './base'].map(
    require.resolve,
  ),
};
