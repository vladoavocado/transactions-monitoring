/* eslint-disable import/extensions */

// DEVELOPMENT WEBPACK CONFIGURATION

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const WebpackBarPlugin = require('progress-webpack-plugin');

/**
 * Extends the base Webpack configuration for development purposes.
 * It sets up hot module replacement for faster development cycles,
 * source mapping for easier debugging, and optimizes module loading.
 */
module.exports = require('./webpack.base.babel')({
  mode: 'development',
  entry: {
    index: [
      'webpack-hot-middleware/client',
      path.join(process.cwd(), './src/index.tsx'),
    ],
  },
  devtool: 'eval-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: 'http://localhost:3000/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },
  plugins: [
    new WebpackBarPlugin({}), // Enhances the visual representation of build progress
    new HtmlWebpackPlugin({
      // Generates an HTML file with the bundle included
      filename: 'index.html',
      template: path.join(process.cwd(), 'src/template.ejs'),
      favicon: path.join(process.cwd(), 'public/favicon.ico'),
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(), // Activates HMR
    new CircularDependencyPlugin({
      // Detects circular dependencies in the project
      exclude: /node_modules/,
      failOnError: false,
    }),
  ],
});
