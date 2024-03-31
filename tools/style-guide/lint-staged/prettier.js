function getConfig() {
  return {
    '*.{js,cjs,mjs,jsx,ts,mts,cts,tsx,json,md,html,css,yml,yaml}': [
      'prettier --write',
    ],
  };
}

module.exports = getConfig;
