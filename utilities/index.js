const dotenv = require('dotenv');
const packageJSON = require('../package.json');

const config = dotenv.config();

const envs = Object.entries(config.parsed || {}).reduce(
  (environments, [key, env]) =>
    Object.assign(environments, {
      [`process.env.${key}`]: JSON.stringify(env),
    }),
  {
    'process.env.REACT_APP_VERSION': JSON.stringify(`v${packageJSON.version}`),
    'process.env.REACT_APP_BUILD_TIMESTAMP': JSON.stringify(Date.now()),
  },
);

module.exports = { envs };
