/// <reference types="vitest" />
import { defineConfig } from 'vite';

export const createConfig = () =>
  defineConfig({
    test: {
      include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      globals: true,
      environment: 'happy-dom',
      coverage: {
        provider: 'c8',
      },
    },
  });
