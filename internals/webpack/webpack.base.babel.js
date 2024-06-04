/* eslint-disable import/extensions */

// COMMON WEBPACK CONFIGURATION

const path = require('path');
const webpack = require('webpack');
const { envs } = require('../../utilities');

/**
 * Generates a base Webpack configuration object to be extended for different environments.
 * It configures the project's build targeting web platforms and integrates essential loaders for processing
 * various file types. This configuration serves as a foundation for development and production setups.
 *
 * @param {Object} options - Configuration options to customize the Webpack setup.
 * @returns {Object} A Webpack configuration object.
 */
module.exports = options => ({
  target: 'web', // Configures Webpack to target web browsers
  performance: options.performance || {},
  devtool: options.devtool, // Source mapping method (if any)
  entry: options.entry, // Entry points of the application
  output: {
    path: path.resolve(process.cwd(), 'dist'), // Output directory for build files
    ...options.output,
  },
  mode: options.mode, // Build mode (development or production)
  optimization: options.optimization, // Optimization settings
  plugins: options.plugins.concat([new webpack.DefinePlugin(envs)]), // Plugins, including environment variable definitions
  module: {
    rules: [
      // JS and TypeScript loader configuration
      {
        test: /\.(js|ts)x?$/i,
        use: ['babel-loader', { loader: 'ts-loader' }],
        exclude: /node_modules/,
      },
      // CSS loader configuration
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // SVG as URL loader configuration
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      // Image and asset loader configuration
      {
        test: /\.(png|jpg|jpeg|webp|gif)$/i,
        type: 'asset',
      },
      // SVG React component loader configuration
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: ['@svgr/webpack'],
      },
      // Font and file loader configuration
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      src: path.resolve(process.cwd(), 'src/'),
    },
  },
});
