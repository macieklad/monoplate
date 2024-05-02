import type { PluginOption } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

interface LibraryPresetOptions {
  externalDependencies?: Record<string, string>;
}

export function library({
  externalDependencies,
}: LibraryPresetOptions = {}): PluginOption[] {
  return [
    {
      name: 'acme-library-preset',
      enforce: 'pre',
      config: () => ({
        build: {
          minify: false,
          sourcemap: true,
          lib: {
            entry: {},
            fileName: '[name]',
            formats: ['es'],
          },
          rollupOptions: {
            external: [
              'react',
              'react-dom',
              'react/jsx-runtime',
              ...Object.keys(externalDependencies ?? []).map(
                // Match peer dependency and all of its sub-paths
                // i.e. @acme/package and @acme/package/react
                (dep) => new RegExp(`^${dep}(?:\\/.*)*`),
              ),
            ],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'react/jsx-runtime',
              },
            },
            onwarn(warning, warn) {
              // Cleanup log for RSC, we do not use them - Module level directives cause errors when bundled, "use client"
              if (
                warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
                warning.message.includes('use client')
              ) {
                return;
              }
              warn(warning);
            },
          },
        },
      }),
    },
    react(),
    dts({ rollupTypes: true }),
  ];
}
