'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {HttpCode} = require(`../../utils/const`);


const DEFAULT_PORT = 3000;
const FILE_NAME = `./mocks.json`;

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @return {Promise<void>}
 */
const onClientConnect = async (req, res) => {
  const notFoundMessage = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_NAME, `utf-8`);
        /** @type {Offer[]} */
        const mocks = JSON.parse(fileContent);
        const message = `<ul>${mocks.map((offer) => `<li>${offer.title}</li>`).join(``)}</ul>`;
        sendResponse(res, HttpCode.OK, message);

      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessage);
      }
      break;

    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessage);
      break;
  }
};

/**
 * @param {ServerResponse} res
 * @param {HttpCode} statusCode
 * @param {string} message
 */
const sendResponse = (res, statusCode, message) => {
  const template = (
    `<!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Buy and sell</title>
    </head>
    <body>${message}</body>
    </html>`
  );

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

/**
 * @param {string[]} args
 */
const run = (args) => {
  const [customPort] = args;
  const port = Number.isInteger(+customPort) ? customPort : DEFAULT_PORT;

  http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, (err) => {
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
