import type { PluginOption } from 'vite';
import dtsPlugin, { type PluginOptions as DtsOptions } from 'vite-plugin-dts';
import reactPlugin, {
  type Options as ReactOptions,
} from '@vitejs/plugin-react';
import nodeExternalsPlugin, {
  type ExternalsOptions,
} from 'rollup-plugin-node-externals';

interface LibraryPresetOptions {
  externals?: ExternalsOptions;
  react?: ReactOptions;
  dts?: DtsOptions;
}

export function library({
  externals: externalsOptions,
  react: reactOptions,
  dts: dtsOptions,
}: LibraryPresetOptions = {}): PluginOption[] {
  return [
    {
      name: 'acme-library-presets',
      enforce: 'pre',
      config: () => ({
        build: {
          minify: false,
          sourcemap: true,
          lib: {
            entry: {},
            formats: ['es'],
          },
          rollupOptions: {
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'react/jsx-runtime',
              },
            },
          },
        },
      }),
    },
    nodeExternalsPlugin(externalsOptions),
    reactPlugin(reactOptions),
    dtsPlugin({
      rollupTypes: true,
      ...dtsOptions,
      exclude: [
        'dist',
        'build',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.{test,spec}.{js,jsx,ts,tsx}',
        'vite.config.ts',
        ...(typeof dtsOptions?.exclude === 'string'
          ? [dtsOptions.exclude]
          : (dtsOptions?.exclude ?? [])),
      ],
      async afterDiagnostic(diagnostics) {
        await dtsOptions?.afterDiagnostic?.(diagnostics);
        if (diagnostics.length) {
          throw new Error(
            'Failed to generate declaration files, there was some typescript issues, see logs above.',
          );
        }
      },
    }),
  ];
}
