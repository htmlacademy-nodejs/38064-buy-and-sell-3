'use strict';

const chalk = require(`chalk`);

const express = require(`express`);
const {API_PREFIX, HttpCode} = require(`../../utils/const`);
const controller = require(`../api`);


const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());

app.use(API_PREFIX, controller);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

/**
 * @param {string[]} args
 */
const run = (args) => {
  const [customPort] = args;
  const port = Number.isInteger(+customPort) ? customPort : DEFAULT_PORT;

  app.listen(port, (err) => {
    if (err) {
      return console.error(chalk.red(`An error occurred while creating a Server:`), err);
    }

    return console.info(chalk.cyan(`Listening on port ${port} ...`));
  });
};


module.exports = {
  name: `--server`,
  run,
};
