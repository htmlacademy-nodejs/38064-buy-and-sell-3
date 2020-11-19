'use strict';

const pino = require(`pino`);
const {Env} = require(`../../utils/const`);


const isDevMode = process.env.NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: isDevMode,
});

const getLogger = (options = {}) => logger.child(options);


module.exports = {
  getLogger,
};
