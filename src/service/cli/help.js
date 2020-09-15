'use strict';

const chalk = require(`chalk`);


const run = () => {
  const text = `${chalk.cyan(`Help`)}
${chalk.green(`
FAQ:
service.js ${chalk.blue(`<command>`)}

Commands:
--version               ${chalk.white(`display program version`)}
--help                  ${chalk.white(`display this faq`)}
--generate ${chalk.blue(`<count>`)}      ${chalk.white(`generate file mocks.json`)}
--server ${chalk.blue(`<port>`)}         ${chalk.white(`starts http server listening on port`)}`)}`;

  console.log(text);
};


module.exports = {
  name: `--help`,
  run,
};
