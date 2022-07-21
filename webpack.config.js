/* eslint-disable no-undef */
const DotEnvWebpack = require('dotenv-webpack');
module.exports = (config) => {
  /**
   * Customize the webpack by modifying the config object.
   * Consult https://webpack.js.org/configuration for more information
   */
  // We dynamically change the path to the .env that contains the file corresponding to our profile
  config.plugins.push(
    new DotEnvWebpack({
      path: '.env',
    }),
  );
  return config;
};
