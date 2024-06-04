/**
 * This script sets up and starts an Express server, handling situations where the server's
 * designated port is already in use. It integrates several external libraries for process
 * management, user interaction, and server functionality.
 */

const findProcess = require('find-process');
const kill = require('tree-kill');
const inquirer = require('inquirer');
const chalk = require('chalk');
const express = require('express');
const setupMiddlewares = require('./middlewares');
const reports = require('./reports');
const config = require('./config');

const { blue, italic } = chalk;
const app = express();

/**
 * Attempts to connect to ngrok if in development mode and ngrok is configured.
 * @returns {Promise<string|undefined>} The ngrok tunnel URL or undefined if not applicable.
 */
const getTunnelUrl = async () => {
  if (config.isDev && config.ngrok) {
    return config.ngrok.connect(config.port);
  }
  return Promise.resolve(undefined);
};

/**
 * Starts the Express server and configures middlewares and reporting.
 */
const startExpressServer = async () => {
  try {
    app.listen(config.port, config.host, async () => {
      try {
        const tunnelUrl = await getTunnelUrl();

        setupMiddlewares(app);

        reports.log(
          reports.startup(config.port, config.prettyHost, tunnelUrl),
          reports.envs(),
          {
            text: blue(`Press ${italic('CTRL-C')} to stop`),
          },
        );
      } catch (err) {
        reports.log(reports.error(err));
      }
    });
  } catch (error) {
    reports.log(
      reports.error(new Error(`Failed to start the server: ${error.message}`)),
    );
  }
};

/**
 * Kills a process by its PID.
 * @param {number} pid - The PID of the process to kill.
 * @returns {Promise<void>} A promise that resolves when the process is killed.
 */
const killProcess = (pid) =>
  new Promise((resolve, reject) => {
    kill(pid, 'SIGKILL', (err) => (err ? reject(err) : resolve()));
  });

/**
 * Logs detailed information about a process to the console.
 * @param {Object} proc - The process object containing details to log.
 */
const printProcess = (proc) =>
  console.log(`- PID: ${proc.pid}, Name: ${proc.name}, Command: ${proc.cmd}`);

/**
 * Handles the situation where the designated port is already in use.
 * Prompts the user for how to proceed.
 * @param {number} port - The port that is in use.
 * @param {Array<Object>} list - The list of processes using the port.
 * @returns {Promise<string>} The user's decision on how to proceed.
 */
const handlePortInUse = async (port, list) => {
  console.log(`Port ${port} is in use by the following process(es):\n`);
  list.forEach(printProcess);

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: "The port is in use. What's next?",
      choices: [
        { name: 'Free up the port and retry', value: 'fixAndRetry' },
        { name: 'Exit', value: 'exit' },
      ],
    },
  ]);

  return action;
};

/**
 * Attempts to start the server after killing the processes that were using its port.
 * @param {Array<Object>} list - The list of processes to kill.
 */
const attemptServerStartAfterKill = async (list) => {
  await Promise.all(list.map((proc) => killProcess(proc.pid)));

  console.log('Attempting to start the server...\n');

  setTimeout(async () => {
    await startExpressServer();
  }, 1000);
};

/**
 * Checks if the designated port is in use and decides on the next steps based on user input.
 * @param {number} port - The designated port for the server.
 */
// eslint-disable-next-line consistent-return
const checkPortAndDecide = async (port) => {
  const list = await findProcess('port', port);

  if (list.length === 0) {
    return startExpressServer();
  }

  const action = await handlePortInUse(port, list);

  if (action === 'fixAndRetry') {
    return attemptServerStartAfterKill(list);
  }

  if (action === 'exit') {
    console.log('Exiting without starting the server.');
  }
};

checkPortAndDecide(config.port);
