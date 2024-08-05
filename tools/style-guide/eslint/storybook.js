module.exports = {
  extends: [
    ...['./react'].map(require.resolve),
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  overrides: [
    {
      files: ['*.stories.{js,jsx,ts,tsx}', 'tailwind.config.ts'],
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};
