// Configures app settings using environment variables and command-line arguments.
// Supports dev/prod modes, server hosting, and ngrok tunneling for local dev access.

const baseNgrok = require('ngrok'); // For secure tunnels to localhost
const minimist = require('minimist'); // For parsing command-line arguments

// Parse command-line arguments, omitting the first two default entries
const argv = minimist(process.argv.slice(2));

// Check if in development mode, defaulting to true if NODE_ENV isn't 'production'
const isDev = process.env.NODE_ENV !== 'production';

// Determine the host from command-line or environment, defaulting to 'localhost'
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Uses http.Server's default if null
const prettyHost = customHost || 'localhost';

// Set server port from command-line, environment, or default to 3000
const port = parseInt(argv.port || process.env.PORT || '3000', 10);

// Setup ngrok if in dev mode and tunneling is enabled via environment or command-line
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? baseNgrok : false;

// Exports the configuration for use across the application
module.exports = { isDev, host, prettyHost, port, ngrok };
