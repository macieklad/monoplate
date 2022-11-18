const packageFilter = (ignoredPrefixes) => {
  return `^${ignoredPrefixes.map((prefix) => `(?!${prefix})`).join('')}.*$`;
};

module.exports = {
  filter: packageFilter(['@acme\\/', 'eslint-config-acme']),
  source: ['package.json', 'packages/*/package.json', 'apps/*/package.json'],
};
