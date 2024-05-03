/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import { library } from '@acme/vite/presets';
import pkg from './package.json';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  plugins: [
    library({
      // You can pass the dependencies from package.json
      // which will be marked as external and will not be bundled
      externalDependencies: pkg.peerDependencies,
    }),
  ],
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
