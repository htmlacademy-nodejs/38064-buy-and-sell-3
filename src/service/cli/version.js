'use strict';

const packageJsonFile = require(`../../../package.json`);
const chalk = require(`chalk`);


const run = () => {
  const version = packageJsonFile.version;
  console.info(chalk.cyan(`App version: ${version}`));
};


module.exports = {
  name: `--version`,
  run,
};
