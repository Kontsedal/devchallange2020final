const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./common');
const plugins = require('./shared/plugins');
const loaders = require('./shared/loaders');

const OUTPUT_PATH = path.join(__dirname, '../dist');

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    path: OUTPUT_PATH,
    chunkFilename: '[name].bundle.js',
    filename: '[name].js',
  },
  module: {
    rules: [loaders.processSassFilesInFile],
  },
  plugins: [plugins.cleanDistFolder, plugins.extractCssFromBundle],
});
