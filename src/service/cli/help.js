'use strict';

const chalk = require(`chalk`);


const TITLE = `Help`;

const run = () => {
  const text = `
FAQ:
service.js <command>

Commands:
--version               display program version
--help                  display this faq
--generate <count>      generate file mocks.json`;

  console.log(chalk.cyan(TITLE));
  console.log(chalk.green(text));
};


module.exports = {
  name: `--help`,
  run,
};
