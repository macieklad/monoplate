import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

/**
 * @param {import("vite").UserConfigExport} config
 * @returns import("vite").UserConfigExport
 */
export function reactPackageViteConfig(config = {}) {
  return defineConfig([
    vitestConfig(),
    {
      plugins: [
        dts(),
        react({
          jsxRuntime: "classic"
        })
      ],
      build: {
        minify: false,
        lib: {
          entry: './src/index.tsx',
          fileName: 'index',
          formats: ['es']
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
            },
          },
        },
      },
    },
    config
  ]);
}

/**
 * @param {import("vite").UserConfigExport | import("vite").UserConfigExport[]} config
 * @returns import("vite").UserConfigExport
*/
export function defineConfig(config) {
  if (!Array.isArray(config)) {
    return config;
  }

  /**
   * @param {import("vite").ConfigEnv} envConfig
   */
  return async function configBuilder(envConfig) {
    let finalConfig= {};
    for (const preset of config) {
      if (typeof preset === 'function') {
        finalConfig = mergeConfig(finalConfig, await preset(envConfig));
      } else if (preset instanceof Promise) {
        finalConfig = mergeConfig(finalConfig, await preset);
      } else {
        finalConfig = mergeConfig(finalConfig, preset);
      }
    }
    return finalConfig;
  }
}

/**
 * @param {import("vite").UserConfig["test"]} config
 * @returns import("vite").UserConfigExport
 */
export function vitestConfig(config = {}) {
  return defineConfig([
    {
      test: {
        include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        globals: true,
        environment: 'happy-dom',
        coverage: {
          provider: 'v8',
        },
      },
    },
    {
      test: config
    }
  ])
}
