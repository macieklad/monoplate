import type { Config } from 'tailwindcss';

// eslint-disable-next-line import/no-default-export -- Tailwind export
export default {
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Omit<Config, 'content'>;
