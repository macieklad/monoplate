const packageFilter = (ignoredPrefixes) => {
  return `^${ignoredPrefixes.map((prefix) => `(?!${prefix})`).join('')}.*$`;
};

module.exports = {
  workspace: false,
  source: ['package.json', 'packages/*/package.json', 'apps/*/package.json'],
};
