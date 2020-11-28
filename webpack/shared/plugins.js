const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const PATHS = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cleanDistFolder = new CleanWebpackPlugin();

const processIndexHtml = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.join(PATHS.SRC_DIR, 'index.html'),
});

const extractCssFromBundle = new MiniCssExtractPlugin();

module.exports = {
  cleanDistFolder,
  processIndexHtml,
  extractCssFromBundle,
};
