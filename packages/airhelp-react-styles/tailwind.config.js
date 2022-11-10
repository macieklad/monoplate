const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.resolve(__dirname, "../../packages/**/src/**/*.{tsx,ts,js,html,mdx}"),
    path.resolve(__dirname, "../../apps/docs/stories/**/*.{tsx,ts,js,html,mdx}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
