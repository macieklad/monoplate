module.exports = {
  extends: ['./node', '@vercel/style-guide/eslint/playwright-test'].map(
    require.resolve,
  ),
};
