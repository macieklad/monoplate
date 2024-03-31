module.exports = {
  BASE_RULES: {
    // TODO: consider enforcing a consistent file naming convention
    'unicorn/filename-case': 'off',
  },
  NODE_CONFIG_FILES: ['.*rc.{js,cjs,mjs}'],
  REACT_RULES: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  REACT_IGNORED_FILES: ['**/vite.config.ts', '**/vitest.config.ts'],
  TYPESCRIPT_FILES: ['**/*.{ts,tsx,mts,cts}'],
  TYPESCRIPT_RULES: {
    // https://typescript-eslint.io/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    'no-undef': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
  },
};
