const path = require('path');
const { tailwindNext } = require('@airhelp/react-styles');

const generator = tailwindNext(
  __dirname,
  path.resolve(__dirname, '../../packages'),
);

/** @type {import('tailwindcss').Config} */
module.exports = generator({});
