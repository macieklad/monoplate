# 🧰️ @acme/vite

This package contains presets and utils used to configure Vite for app and library development.

## Installation

```shell
pnpm install @acme/vite @vitejs/plugin-react vite-plugin-dts
```

## Presets

### Library

Can be used to set up development of vanilla JS or React libraries. It uses `@vitejs/plugin-react` and `vite-plugin-dts`
to generate TypeScript definition files.

Preset does the following things for you:

- It externalises (doesn't process imports and leaves them as is in your files) common dependencies from your bundle so they won't be bundled by default. Your libraries should not have React or react-dom in their bundles (unless you have a good reason for it).
- It will also not process any node native imports **but they must use node:module** imports i.e. `import { resolve } from 'node:path'` instead of `import { resolve } from 'path'`. There is an eslint rule that will catch this for you in the monorepo.
- `React`, `react-dom`, and `jsx-runtime` imports are [globalised](https://rollupjs.org/configuration-options/#output-globals) under `React`, `ReactDOM` and `react/jsx-runtime` objects/imports.
- While outputting types, we will rollup them into a single types file. This helps with the overall type performance
- You are able to pass the external dependencies map to the preset, which will mark them as external and they will not be bundled too. This is useful as you can import your `package.json` directly and pass whole `peerDependencies` object to the preset. It also ensures that any child exports are not bundled too, i.e. `import x from 'externalDep/child'`.

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

#### Understanding externalisation in the library preset

Tldr:

- If you want to build publishable browser/react library, use the library preset.
- If you want to build a pure node library, use `tsc` (possibly in watch mode) to transpile your packages

Vite bundles your code in library mode as if it was something that will be consumed by a browser. It has a separate `--ssr` mode that you can use to bundle your code for server-side rendering. Therefore, all modules that you import will be processed by vite, which results in problems like the double bundling mentioned above.

**You still want to process dependencies when preparing for the browser usage**, but in the case of monorepo, your final bundle will most likely be created by the Vite instance that builds your app which consumes your libraries. We want to leave final optimisations to the app bundler, our goal is to go from typescript -> javascript while still being able to extend our build process and be better prepared for publishing to code registries.

If you just want to use typescript in your project, or build a pure node library, our recommendation is to go with pure `tsc` setup (that's how we build this package).
