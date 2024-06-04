const chalk = require('chalk');
const ip = require('ip');

const TEXT_ICON = chalk.green('✓');
const TEXT_SERVER_STARTED = `${TEXT_ICON} Server started`;
const TEXT_ACCESS_URLS = chalk.bold('Access URLs:');
const TEXT_TUNNEL_INITIALIZED = `${TEXT_ICON} Tunnel initialised`;

/**
 * Generates server startup status report.
 *
 * Includes local, LAN, and tunnel access URLs if a tunnel is established.
 *
 * @param {number} port - Server's port.
 * @param {string} host - Local hostname or IP.
 * @param {string|false} tunnelStarted - Tunnel URL or false.
 * @returns {Object} Contains formatted title and access URLs.
 */
function reportStartupStatus(port, host, tunnelStarted) {
  const tunnelText = tunnelStarted ? `${TEXT_TUNNEL_INITIALIZED}\n` : '';
  const localhost = chalk.magenta(`http://${host}:${port}`);
  const lan = chalk.magenta(`http://${ip.address()}:${port}`);
  const proxy = tunnelStarted ? chalk.magenta(tunnelStarted) : chalk.grey('-');

  return {
    title: `${TEXT_SERVER_STARTED}\n${tunnelText}${TEXT_ACCESS_URLS}`,
    text: `  Localhost: ${localhost}\n  LAN: ${lan}\n  Proxy: ${proxy}`,
  };
}

module.exports = { reportStartupStatus };
