module.exports = {
  extends: ['@vercel/style-guide/eslint/browser', './base', './react'].map(
    require.resolve,
  ),
  globals: {
    JSX: true,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'import/no-default-export': 'off',
  },
};
