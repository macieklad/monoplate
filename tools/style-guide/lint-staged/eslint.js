const { getESLintFileMatches } = require('./get-eslint-file-matches');

/**
 * Generate lint-staged configuration
 * @param {string[]} ignoredFiles - Additional files that should be ommited by lint-staged
 */
function getConfig({ ignoredFiles } = { ignoredFiles: [] }) {
  return {
    '*.{js,cjs,mjs,jsx,ts,mts,cts,tsx}': (files) => {
      const matchedFiles = getESLintFileMatches({ files, ignoredFiles });
      const hasFiles = matchedFiles.trim().length > 0;
      return hasFiles ? [`eslint --fix --max-warnings 0 ${matchedFiles}`] : [];
    },
  };
}

module.exports = getConfig;
