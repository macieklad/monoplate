module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/browser',
    './base',
    './react',
    '@vercel/style-guide/eslint/next',
  ].map(require.resolve),
  globals: {
    React: true,
    JSX: true,
  },
  rules: {
    'import/no-default-export': 'off',
  },
};
