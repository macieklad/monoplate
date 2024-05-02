# 🧰️ @acme/vite

This package contains presets and utils used to configure Vite for app and library development.

## Installation

```shell
pnpm install @acme/vite @vitejs/plugin-react vite-plugin-dts
```

## Presets

### Library

Can be used to set up development of vanilla JS or React libraries. It uses `@vitejs/plugin-react` and `vite-plugin-dts`
to generate TypeScript definition files. The bundled files will be outputed in the `dist` director, and the generated
declaration files follow the source structure (`src` directory is skipped).

```ts
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { library } from '@acme/vite/presets';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    library({
      // You can pass the dependencies from package.json
      // which will be marked as external and will not be bundled
      externalDependencies: pkg.peerDependencies,
    }),
  ],
  build: {
    lib: {
      name: '@acme/library',
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        react: resolve(__dirname, 'src/react/index.ts'),
        methods: resolve(__dirname, 'src/methods/index.ts'),
      },
    },
  },
});
```

**Options**

```ts
interface LibraryPresetOptions {
  externalDependencies?: Record<string, string>;
}
```
