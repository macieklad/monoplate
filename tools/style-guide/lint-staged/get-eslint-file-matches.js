const micromatch = require('micromatch');
const { REACT_IGNORED_FILES } = require('../eslint/constants');

/**
 * @param files {string[]}
 * @param ignoredFiles {string[]}
 */
function getESLintFileMatches({ files, ignoredFiles }) {
  const match = micromatch.not(files, [
    // Ignore files starting with a "." to match ESLint default:
    // https://github.com/eslint/eslint/issues/10341
    '**/.*',
    ...REACT_IGNORED_FILES,
    ...ignoredFiles,
  ]);

  return match.join(' ');
}

module.exports = { getESLintFileMatches };
