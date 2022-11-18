const path = require('path');
const base = require('./talwind.base.config');

module.exports = {
  content: [
    path.resolve(__dirname, '../../packages/**/src/**/*.{tsx,ts,js,html,mdx}'),
    path.resolve(
      __dirname,
      '../../apps/docs/stories/**/*.{tsx,ts,js,html,mdx}',
    ),
  ],
  ...base,
};
