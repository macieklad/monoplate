module.exports = {
  extends: [
    'plugin:astro/recommended',
    ...['@vercel/style-guide/eslint/browser', './base'].map(require.resolve),
  ],
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
