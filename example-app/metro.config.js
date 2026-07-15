const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList =
  require('metro-config/private/defaults/exclusionList').default;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const projectRoot = __dirname;
const monoPackagesRoot = path.resolve(projectRoot, '../mono/packages');

const config = {
  // Watch the app AND the mono folder
  watchFolders: [
    path.resolve(projectRoot),
    path.resolve(monoPackagesRoot),
  ],
  resolver: {
    // Ensure Metro looks in both the app and the root node_modules
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monoPackagesRoot, 'node_modules'),
    ],
    // Force all packages to use the version of React inside the example app
    extraNodeModules: new Proxy({}, {
      get: (target, name) => path.join(projectRoot, `node_modules/${name}`),
    }),
    // Exclude any nested node_modules inside your local packages
    // to prevent Metro from seeing multiple versions of the same code.
    blocklist: exclusionList([/mono\/packages\/.*\/node_modules\/.*/]),
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
