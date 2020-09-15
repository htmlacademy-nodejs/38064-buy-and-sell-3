'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {ExitCode} = require(`../../utils/const`);
const {getRandomInt, shuffleArray} = require(`../../utils/common`);


const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const DescriptionRestrict = {
  MIN: 1,
  MAX: 5,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const ContentFile = {
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
};


/**
 * @param {Number} number
 * @return {string}
 */
const getPictureFileName = (number) => {
  return `item${number > 9 ? `` : `0`}${number}.jpg`;
};

/**
 * @param {number} count
 * @param {string[]} titles
 * @param {string[]} sentences
 * @param {string[]} categories
 * @return {Offer[]}
 */
const generateOffers = (count = DEFAULT_COUNT, titles, sentences, categories) => {
  return Array(count).fill({}).map(() => {
    const descriptionSentencesCount = getRandomInt(DescriptionRestrict.MIN, DescriptionRestrict.MAX);
    const categoriesCount = getRandomInt(1, categories.length);

    return {
      title: titles[getRandomInt(0, titles.length - 1)],
      description: shuffleArray(sentences).slice(0, descriptionSentencesCount).join(` `),
      category: shuffleArray(categories).slice(0, categoriesCount),
      picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
      type: Object.values(OfferType)[getRandomInt(0, 1)],
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    };
  });
};

/**
 * @param {string} filePath
 * @return {Promise<string[]>}
 */
const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

/**
 * @param {string[]} args
 */
const run = async (args) => {
  const [titles, sentences, categories] = await Promise.all([
    readContent(ContentFile.TITLES),
    readContent(ContentFile.SENTENCES),
    readContent(ContentFile.CATEGORIES),
  ]);

  const [count] = args;
  const countOffer = Number.isInteger(+count) && (+count > 0) ? +count : DEFAULT_COUNT;

  if (countOffer > MAX_COUNT) {
    console.error(chalk.red(`Offers number must not exceed ${MAX_COUNT}`));
    process.exit(ExitCode.ERROR);
  }

  const content = JSON.stringify(generateOffers(countOffer, titles, sentences, categories));

  try {
    await fs.writeFile(FILE_NAME, content, `utf-8`);
    console.info(chalk.green(`Operation success. File created.`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file...`));
    console.error(err);
    process.exit(ExitCode.ERROR);
  }
};


module.exports = {
  name: `--generate`,
  run,
};


/**
 * @typedef {Object} Offer
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} picture
 * @property {OfferType.OFFER|OfferType.SALE} type
 * @property {number} sum
 */
