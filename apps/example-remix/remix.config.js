const path = require('path');

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  watchPaths: [path.resolve('../../packages/acme-react/dist/index.js')],
  future: {
    unstable_tailwind: true,
  },
};
