const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const processTypescriptFiles = {
  test: /\.ts?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
};

const processSassFilesInMemory = {
  test: /scss$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    'sass-loader',
  ],
};

const processSassFilesInFile = {
  test: /scss$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
};

const processImages = {
  test: /\.(png|jpg|gif|webp)$/,
  use: ['file-loader'],
};

const lintTypescript = {
  test: /\.(js|tsx?)$/,
  enforce: 'pre',
  use: [
    {
      options: {
        eslintPath: require.resolve('eslint'),
      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  exclude: /node_modules/,
};

module.exports = {
  processTypescriptFiles,
  processSassFilesInMemory,
  processSassFilesInFile,
  processImages,
  lintTypescript,
};
