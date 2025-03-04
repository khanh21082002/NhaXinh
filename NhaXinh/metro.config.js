const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = wrapWithReanimatedMetroConfig(getDefaultConfig(__dirname));

module.exports = mergeConfig(config, {
    resolver: {
      assetExts: [
        ...getDefaultConfig(__dirname).resolver.assetExts,
        'obj', 
        'mtl', 
      ],
    },
  });