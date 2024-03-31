/**
 * You'll need to use require.resolve to provide ESLint with absolute paths,
 * due to an issue around ESLint config resolution.
 * https://github.com/eslint/eslint/issues/9188
 */
module.exports = {
    root: true,
    extends: [
        "@acme/style-guide/eslint/node"
    ].map(require.resolve)
}
