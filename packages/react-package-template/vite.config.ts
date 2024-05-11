/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import { library } from '@acme/vite/presets';

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [library()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.tsx'),
      },
    },
  },
});
