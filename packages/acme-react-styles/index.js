const path = require('path');
const baseConfig = require('./talwind.base.config');

const mergeConfigs = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeConfigs(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeConfigs(target, ...sources);
};

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

const tailwindNext = (appDir, packageDir) => (localConfig) =>
  mergeConfigs(
    baseConfig,
    {
      content: [
        path.resolve(appDir, 'pages', '**/*.{tsx,mdx,jsx,js,ts,md}'),
        path.resolve(appDir, 'app', '**/*.{tsx,mdx,jsx,js,ts,md}'),
        path.resolve(appDir, 'src', '**/*.{tsx,mdx,jsx,js,ts,md}'),
        path.resolve(packageDir, '*/src', '**/*.{tsx,mdx,jsx,js,ts,md}'),
        path.resolve(packageDir, '*/dist', '**/*.{tsx,mdx,jsx,js,ts,md}'),
      ],
    },
    localConfig,
  );

module.exports = {
  mergeConfigs,
  tailwindNext,
};
