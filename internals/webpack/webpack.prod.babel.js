/* eslint-disable import/extensions */

// PRODUCTION WEBPACK CONFIGURATION

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const reports = require('../../server/reports/index.js');

// Log environment variables at the start
reports.log(reports.envs());

/**
 * Configures Webpack for production builds.
 * Includes optimizations like asset minification, image optimization,
 * and code splitting. Utilizes plugins for HTML template generation,
 * bundle analysis, and cleaning the output directory before builds.
 */
module.exports = require('./webpack.base.babel')({
  mode: 'production',
  entry: {
    index: path.join(process.cwd(), './src/index.tsx'),
  },
  output: {
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    asyncChunks: true,
    path: path.resolve(process.cwd(), '../../html'),
    publicPath: `/`,
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          parse: {
            html5_comments: false,
          },
          ecma: 5,
          sourceMap: true,
          format: {
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
        generator: [
          {
            preset: 'webp',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ['imagemin-webp'],
            },
          },
        ],
      }),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'public/index.html'),
      favicon: path.join(process.cwd(), 'public/favicon.ico'),
      manifest: path.join(process.cwd(), 'public/manifest.json'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: 'head',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.STATS || 'disabled',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!index.php'],
    }),
  ],
});
