// Disable ESLint rule for importing extensions
/* eslint-disable import/extensions */

// Require the chalk library for terminal string styling
const chalk = require('chalk');

// Import reporting functions from local modules
const { reportError } = require('./report-error.js');
const { reportEnvConfigLoad } = require('./report-env-config-load.js');
const { reportStartupStatus } = require('./report-startup-status.js');

// Define a visual divider for the log output
const divider = chalk.gray('-----------------------------------');

/**
 * Exported reporting functions wrapped for direct use.
 * Allows for concise and consistent reporting across the application.
 */
exports.error = reportError;
exports.envs = reportEnvConfigLoad;
exports.startup = reportStartupStatus;

/**
 * Logs formatted reports to the console.
 * Accepts multiple report objects, formats them, and logs them with visual dividers.
 *
 * @param {...Object} reports - Multiple report objects to log.
 */
exports.log = (...reports) => {
  const toLog = reports
    .map(({ title, text }) => {
      // Formats the report based on the presence of title and text
      if (title && text) {
        return `${title}\n${divider}\n${text}\n${divider}`;
      }

      if (title) {
        return `${title}\n${divider}`;
      }

      return `${divider}\n${text}\n${divider}`;
    })
    .join('\n\n');

  // Logs the formatted string to the console
  console.log(`${toLog}\n`);
};
