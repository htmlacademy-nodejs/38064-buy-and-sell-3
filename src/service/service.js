'use strict';

const {Cli} = require(`./cli`);
const {Const} = require(`./utils/const`);


const userArguments = process.argv.slice(Const.USER_ARGV_INDEX);
const [userCommand] = userArguments;

Cli[userCommand].run(userCommand);
