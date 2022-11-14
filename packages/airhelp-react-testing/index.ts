/// <reference types="vitest" />
import { defineConfig } from 'vite';

export const createConfig = () =>
  defineConfig({
    test: {
      globals: true,
      environment: 'happy-dom',
      coverage: {
        provider: 'c8',
      },
    },
  });
