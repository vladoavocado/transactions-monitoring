// Requires chalk library for colored console output
const chalk = require('chalk');

/**
 * Formats and returns an error report.
 *
 * @param {Error|string} error - Error object or message to report.
 * @returns {Object} Contains styled 'title' and 'text' for console output.
 */
function reportError(error) {
  return {
    title: chalk.bold('Error stack trace: '),
    text: chalk.red(error instanceof Error ? error.stack : error),
  };
}

// Export the reportError function
module.exports = { reportError };
