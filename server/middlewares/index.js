// Disable ESLint rule for importing extensions
/* eslint-disable import/extensions */

// Use require to import modules and middleware in CommonJS syntax
const addDevWebpackMiddleware = require('./dev-webpack-middleware');
const addGzipMiddleware = require('./gzip-middleware');
const webpackConfig = require('../../internals/webpack/webpack.dev.babel');

/**
 * Sets up and configures middleware for the Express application.
 * This includes development-specific middleware for Webpack and compression middleware for serving gzipped assets.
 *
 * @param {Object} app - The Express application instance to which the middleware will be added.
 * @returns {Object} The updated Express application instance with middleware configured.
 */
function setupMiddlewares(app) {
  // Add Webpack middleware for development environment
  addDevWebpackMiddleware(app, webpackConfig);
  // Add middleware to enable gzip compression
  addGzipMiddleware(app);

  // Return the modified app instance
  return app;
}

// Export the setupMiddlewares function as the module's default export
module.exports = setupMiddlewares;
