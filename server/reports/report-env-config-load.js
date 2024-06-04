// Disable ESLint rule for importing extensions
/* eslint-disable import/extensions */

// Require the chalk library for styling console output
const chalk = require('chalk');

// Require environment variables utility
const { envs } = require('../../utilities');

/**
 * Reports loaded environment configurations.
 * Generates a formatted report of all environment variables
 * currently loaded into the application, using chalk to
 * enhance readability.
 *
 * @returns {Object} An object containing a formatted title and text listing all environment variables.
 */
function reportEnvConfigLoad() {
  return {
    title: chalk.bold('Environment Variables: '),
    text: Object.entries(envs)
      .map(([key, value]) => `  ${key}: ${chalk.italic(value)}`)
      .join('\n'),
  };
}

// Export the reportEnvConfigLoad function
module.exports = { reportEnvConfigLoad };
