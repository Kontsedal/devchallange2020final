const path = require('path');
const PATHS = require('./shared/paths');
const loaders = require('./shared/loaders');
const plugins = require('./shared/plugins');

module.exports = {
  entry: path.join(PATHS.SRC_DIR, 'index.ts'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules', PATHS.SRC_DIR],
  },
  module: {
    rules: [
      loaders.processTypescriptFiles,
      loaders.processImages,
      loaders.lintTypescript,
    ],
  },
  plugins: [plugins.processIndexHtml],
};
