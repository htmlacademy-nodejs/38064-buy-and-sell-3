'use strict';

const chalk = require(`chalk`);


const run = () => {
  const title = `Help`;
  const text = `
FAQ:
service.js <command>

Commands:
--version               display program version
--help                  display this faq
--generate <count>      generate file mocks.json`;

  console.log(chalk.cyan(title));
  console.log(chalk.green(text));
};


module.exports = {
  name: `--help`,
  run,
};
