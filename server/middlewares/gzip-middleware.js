/**
 * Middleware to serve gzipped JavaScript files.
 * Checks if the request URL ends with '.js', modifies the request URL to end with '.js.gz',
 * and sets the 'Content-Encoding' header to 'gzip'. This enables serving pre-compressed
 * JavaScript files for improved performance.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const gzipMiddleware = (req, res, next) => {
  if (req.url.endsWith('.js')) {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
  }
  next();
};

/**
 * Adds the gzip middleware to the Express application for serving gzipped JavaScript files.
 * This function should be used in a development environment where JavaScript assets are served
 * directly by the Express server.
 *
 * @param {Object} app - The Express application instance.
 */
function addGzipMiddleware(app) {
  app.use('*.js', gzipMiddleware);
}

// Export the addGzipMiddleware function as the module's default export in CommonJS syntax
module.exports = addGzipMiddleware;
