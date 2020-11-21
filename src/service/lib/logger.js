'use strict';

const path = require(`path`);
const pino = require(`pino`);
const {Env} = require(`../../utils/const`);


const LOG_PATH = `../logs/api.log`;
const LOG_FILE = path.resolve(__dirname, LOG_PATH);
const isDevMode = process.env.NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: isDevMode,
}, isDevMode ? process.stdout : pino.destination(LOG_FILE));

const getLogger = (options = {}) => logger.child(options);


module.exports = {
  getLogger,
};
