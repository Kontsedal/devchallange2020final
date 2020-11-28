const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./common');
const loaders = require('./shared/loaders');

const OUTPUT_PATH = path.join(__dirname, '../dist_dev');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: OUTPUT_PATH,
    compress: true,
    port: 9000,
  },
  output: {
    path: OUTPUT_PATH,
    chunkFilename: '[name].bundle.js',
    filename: '[name].js',
  },
  module: {
    rules: [loaders.processSassFilesInMemory],
  },
});
