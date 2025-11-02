/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import { library } from '@acme/vite/presets';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  plugins: [library()],
  build: {
    lib: {
      name: '@acme/components',
      entry: {
        index: resolve(__dirname, 'src/index.tsx'),
        tailwind: resolve(__dirname, 'src/tailwind.ts'),
      },
    },
  },
});
