module.exports = {
  extends: ['./react'].map(require.resolve),
  ignorePatterns: ['storybook-static'],
  overrides: [
    {
      files: ['*.stories.{js,jsx,ts,tsx}'],
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};
