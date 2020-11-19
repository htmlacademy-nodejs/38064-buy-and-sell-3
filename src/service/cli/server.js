'use strict';

const express = require(`express`);
const {API_PREFIX, HttpCode, ExitCode} = require(`../../utils/const`);
const {getLogger} = require(`../lib/logger`);
const controller = require(`../api`);


const DEFAULT_PORT = 3000;

const app = express();
const logger = getLogger({name: `api`});

app.use(express.json());

// Логирование всех входящих запросов
app.use((req, res, next) => {
  logger.debug(`Request on route '${req.url}'`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use(API_PREFIX, controller);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err}`);
});

/**
 * @param {string[]} args
 */
const run = (args) => {
  const [customPort] = args;
  const port = Number.isInteger(+customPort) ? customPort : DEFAULT_PORT;

  app.listen(port, (err) => {
    if (err) {
      logger.error(`An error occurred while creating a Server: ${err}`);
      return process.exit(ExitCode.ERROR);
    }

    return logger.info(`Listening on port ${port} ...`);
  });
};


module.exports = {
  name: `--server`,
  run,
};
