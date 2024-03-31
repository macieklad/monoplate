/*
 * Based on Microsoft FluidFramework syncpack config:
 * https://github.com/microsoft/FluidFramework/blob/main/syncpack.config.cjs
 */
module.exports = {
  // We use prettier to format package.json files
  lintFormatting: false,

  // Custom types are used to define additional fields in package.json that contain versions that should be
  // checked/synced. See https://jamiemason.github.io/syncpack/config/custom-types for more details.
  customTypes: {
    engines: {
      path: 'engines',
      strategy: 'versionsByName',
    },
    packageManager: {
      path: 'packageManager',
      strategy: 'name@version',
    },
  },

  /**
   * SemverGroups are used to ensure that groups of packages use the same semver range for dependencies.
   *
   * semverGroup rules are applied in order to package/dep combinations. First matching rule applies. When running
   * `syncpack lint-semver-ranges`, the output is grouped by label.
   */
  semverGroups: [
    {
      label: 'engines.node should always use >= ranges',
      dependencyTypes: ['engines'],
      dependencies: ['node'],
      packages: ['**'],
      range: '>=',
    },

    {
      label: 'engines.npm should always use caret ranges',
      dependencyTypes: ['engines'],
      dependencies: ['npm'],
      packages: ['**'],
      range: '^',
    },

    {
      label: 'packageManager should always use exact dependency ranges',
      dependencyTypes: ['packageManager'],
      dependencies: ['**'],
      packages: ['**'],
      range: '',
    },

    {
      label:
        'Deps in pnpm overrides can use whatever dependency ranges they need',
      dependencyTypes: ['pnpmOverrides'],
      dependencies: ['**'],
      packages: ['**'],
      isIgnored: true,
    },

    // Some dependencies, like typescript and eslint, recommend to use tilde deps because minors introduce
    // changes that may break linting
    {
      label: 'Must use tilde dependency ranges',
      dependencies: [
        'eslint-plugin-*',
        'eslint-config-prettier',
        'eslint',
        'prettier',
        'typescript',
      ],
      packages: ['**'],
      range: '~',
    },

    // All deps should use caret ranges unless previously overridden
    {
      label: 'Dependencies should use caret dependency ranges',
      dependencies: ['**'],
      dependencyTypes: ['dev', 'peer', 'prod'],
      packages: ['**'],
      range: '^',
    },
  ],

  /**
   *  VersionGroups are used to ensure that groups of packages use the same version of dependencies.
   *
   * versionGroup rules are applied in order to package/dep combinations. First matching rule applies. When running
   * `syncpack list-mismatches`, the output is grouped by label.
   */
  versionGroups: [
    {
      label: 'Versions in engines field should all match',
      dependencyTypes: ['engines'],
      dependencies: ['**'],
      packages: ['**'],
    },

    {
      label: 'Versions in packageManager field should all match',
      dependencyTypes: ['packageManager'],
      dependencies: ['**'],
      packages: ['**'],
    },

    {
      label: 'Use workspace protocol for local packages',
      dependencies: ['$LOCAL'],
      dependencyTypes: ['!local'],
      pinVersion: 'workspace:*',
    },
  ],
};
