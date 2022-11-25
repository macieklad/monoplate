const path = require('path');
const { tailwindRemix } = require('@acme/react-styles');

const generator = tailwindRemix(
  __dirname,
  path.resolve(__dirname, '../../packages'),
);

/** @type {import('tailwindcss').Config} */
module.exports = generator({});
