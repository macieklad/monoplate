const path = require('path');

const packageRoot = path.resolve(__dirname, 'packages');

const packageMap = {
  '@acme/react': 'acme-react',
  '@acme/react-styles': 'acme-react-styles',
  '@acme/tsconfig': 'acme-tsconfig',
  '@acme/react-testing': 'acme-react-testing',
  '@acme/react-package-template': 'acme-react-package-template',
  'eslint-config-acme': 'eslint-config-acme',
};

const storybookCustomSources = {
  '@acme/react-styles': 'dist',
};

function packages() {
  return Object.keys(packageMap);
}

function packagePath(package) {
  return path.resolve(packageRoot, packageMap[package]);
}

function validate() {
  for (let package of packages()) {
    checkPackage(package);
  }

  console.log('Packages validated, their names and directories match.');
}

function checkPackage(package) {
  let packageJson;
  const directory = packages[package];
  try {
    packageJson = require(path.resolve(
      packageRoot,
      packageMap[package],
      'package.json',
    ));
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      throw new Error(
        `Package ${package} does not have package.json file inside ${directory} directory. Please check the mapping of the package name to its directory in the manifest.`,
      );
    }
    throw e;
  }
  if (packageJson['name'] !== package) {
    throw new Error(
      `Package ${package} "name" field does not match the definition, wanted ${package}, got ${packageJson['name']}`,
    );
  }
}

module.exports = {
  packageRoot,
  packageMap,
  storybookCustomSources,
  packages,
  packagePath,
  validate,
};
