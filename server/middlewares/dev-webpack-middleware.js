// CommonJS imports for necessary modules and middleware
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

/**
 * Creates and configures the webpack development middleware.
 * This middleware enables webpack's compiler to process and serve assets directly.
 *
 * @param {Object} compiler - The webpack compiler.
 * @param {string} publicPath - The public path to serve the assets from.
 * @returns The configured webpack development middleware.
 */
function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    publicPath,
    stats: 'errors-only',
  });
}

/**
 * Adds development-specific webpack middleware to the Express application.
 * This setup includes both the webpack development middleware and the
 * webpack hot middleware for hot module replacement (HMR). It also configures
 * a fallback to serve the index.html for any unmatched routes, supporting SPA routing.
 *
 * @param {Object} app - The Express application instance.
 * @param {Object} webpackConfig - The webpack configuration object.
 */
function addDevWebpackMiddleware(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(
    compiler,
    webpackConfig.output.publicPath,
  );

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Use webpack's in-memory file system for reading build artifacts
  const fs = compiler.outputFileSystem;

  app.get('*', (req, res) => {
    // Ensure the file system is available
    if (!fs || !fs.readFile) {
      console.error('Filesystem not available or missing readFile method.');
      res.sendStatus(500); // Internal Server Error;
      return;
    }

    // Serve the index.html file for SPA routing
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404); // Not Found for any errors
      } else {
        res.send(file.toString()); // Serve the file content
      }
    });
  });
}

// Export the addDevWebpackMiddleware function
module.exports = addDevWebpackMiddleware;
