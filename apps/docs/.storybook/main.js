const path = require('path');
const {
  packagePath,
  packages,
  storybookCustomSources,
} = require('../../../manifest');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  staticDirs: ['../public'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return {
      ...config,
      resolve: {
        alias: packages().map((package) => {
          return {
            find: package,
            replacement: path.resolve(
              packagePath(package),
              storybookCustomSources[package] || 'src',
            ),
          };
        }),
      },
    };
  },
};
