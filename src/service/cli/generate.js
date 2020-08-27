'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);
const {ExitCode} = require(`../utils/const`);
const {
  getRandomInt,
  shuffleArray,
} = require(`../utils/utils`);


const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const Data = {
  TITLES: [
    `Продам книги Стивена Кинга.`,
    `Продам новую приставку Sony Playstation 5.`,
    `Продам отличную подборку фильмов на VHS.`,
    `Куплю антиквариат.`,
    `Куплю породистого кота.`,
    `Продам коллекцию журналов «Огонёк».`,
    `Отдам в хорошие руки подшивку «Мурзилка».`,
    `Продам советскую посуду. Почти не разбита.`,
    `Куплю детские санки.`,
  ],
  DESCRIPTIONS: [
    `Товар в отличном состоянии.`,
    `Пользовались бережно и только по большим праздникам.`,
    `Продаю с болью в сердце...`,
    `Бонусом отдам все аксессуары.`,
    `Даю недельную гарантию.`,
    `Если товар не понравится — верну всё до последней копейки.`,
    `Это настоящая находка для коллекционера!`,
    `Если найдёте дешевле — сброшу цену.`,
    `Таких предложений больше нет!`,
    `Две страницы заляпаны свежим кофе.`,
    `При покупке с меня бесплатная доставка в черте города.`,
    `Кажется, что это хрупкая вещь.`,
    `Мой дед не мог её сломать.`,
    `Кому нужен этот новый телефон, если тут такое...`,
    `Не пытайтесь торговаться. Цену вещам я знаю.`,
  ],
  CATEGORIES: [
    `Книги`,
    `Разное`,
    `Посуда`,
    `Игры`,
    `Животные`,
    `Журналы`,
  ],
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};


/**
 * @param {Number} number
 * @return {string}
 */
const getPictureFileName = (number) => {
  return number > 9 ? `item${number}.jpg` : `item0${number}.jpg`;
};

/**
 * @param {number} count
 * @return {Offer[]}
 */
const generateOffers = (count = DEFAULT_COUNT) => {
  const descriptionSentencesCount = getRandomInt(1, 5);
  const categoriesCount = getRandomInt(1, Data.CATEGORIES.length);

  return Array(count).fill({}).map(() => ({
    title: Data.TITLES[getRandomInt(0, Data.TITLES.length - 1)],
    description: shuffleArray(Data.DESCRIPTIONS).slice(0, descriptionSentencesCount).join(` `),
    category: shuffleArray(Data.CATEGORIES).slice(0, categoriesCount),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    type: Object.values(OfferType)[getRandomInt(0, 1)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }));
};

/**
 * @param {string[]} args
 */
const run = (args) => {
  const [count] = args;
  const countOffer = Number.isInteger(+count) && (+count > 0) ? +count : DEFAULT_COUNT;

  if (countOffer > 1000) {
    console.error(chalk.red(`Offers number must not exceed 1000`));
    process.exit(ExitCode.ERROR);
  }

  const content = JSON.stringify(generateOffers(countOffer));

  fs.writeFile(FILE_NAME, content, `utf-8`, (err) => {
    if (err) {
      console.error(chalk.red(`Can't write data to file...`));
      console.error(err);
      process.exit(ExitCode.ERROR);
    }

    console.info(chalk.green(`Operation success. File created.`));
  });
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
