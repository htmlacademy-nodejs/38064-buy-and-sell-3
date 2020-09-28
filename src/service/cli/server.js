'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const express = require(`express`);
const {HttpCode} = require(`../../utils/const`);


const DEFAULT_PORT = 3000;
const FILE_NAME = `./mocks.json`;

const app = express();
app.use(express.json());

app.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME, `utf-8`);
    /** @type {Offer[]} */
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

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
