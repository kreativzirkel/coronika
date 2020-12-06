const { assetExts: defaultAssetExts, sourceExts: defaultSourceExts } = require('metro-config/src/defaults/defaults');

module.exports = {
  resolver: {
    assetExts: defaultAssetExts.filter((ext) => ext !== 'svg'),
    extraNodeModules: require('node-libs-react-native'),
    sourceExts: [...defaultSourceExts, 'jsx', 'svg'],
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
