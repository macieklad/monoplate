const config = {
  '*.{js,mjs,ts,tsx,jsx}': ['prettier --write', 'eslint --quiet --fix'],
  '*.{json,md,html}': ['prettier --write'],
};

export default config;
