const packageFilter = (ignoredPrefixes) => {
  return `^${ignoredPrefixes.map((prefix) => `(?!${prefix})`).join('')}.*$`;
};

module.exports = {
  filter: packageFilter(['@airhelp\\/', 'eslint-config-airhelp-react']),
  source: ['package.json', 'packages/*/package.json', 'apps/*/package.json'],
};
