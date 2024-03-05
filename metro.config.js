const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
...transformer
}

config.resolver = {
    ...resolver,
    assetExts: [
        ...resolver.assetExts.filter((ext) => ext !== 'svg'), // keep from prev solution found
        'db', 'mp3', 'ttf', 'glb', 'fbx', 'mtl', 'obj', 'png', 'jpg', // support for .glb files
      ],
    sourceExts: [...resolver.sourceExts, "svg"],
  };

module.exports = config;