const { packages } = require('./manifest');

module.exports = {
  source: ['package.json', 'packages/*/package.json', 'apps/*/package.json'],
  semverGroups: [
    {
      range: '*',
      dependencies: packages(),
      packages: ['**'],
    },
  ],
};
