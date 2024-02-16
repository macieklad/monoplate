import { fileURLToPath } from 'node:url';

/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  singleQuote: true,
  tabWidth: 2,
  tailwindConfig: fileURLToPath(
    new URL('../../tooling/tailwind/index.ts', import.meta.url),
  ),
  tailwindFunctions: ['clsx', 'cn', 'cva', 'tv'],
  plugins: ['prettier-plugin-tailwindcss'],
};

// eslint-disable-next-line import/no-default-export -- Prettier export
export default config;
