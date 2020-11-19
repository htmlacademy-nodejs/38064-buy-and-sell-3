'use strict';

const express = require(`express`);
const request = require(`supertest`);
const initSearchController = require(`./search`);
const {HttpCode} = require(`../../utils/const`);
const {SearchService} = require(`../data-service`);


const mockData = [{
  "id": `AuTBEB`,
  "title": `Куплю породистого кота.`,
  "description": `При покупке с меня бесплатная доставка в черте города. Продаю с болью в сердце... Две страницы заляпаны свежим кофе.`,
  "category": [`Посуда`, `Журналы`, `Игры`, `Новинки`, `Разное`, `Книги`],
  "picture": `item01.jpg`,
  "type": `offer`,
  "sum": 60038,
  "comments": [{
    "id": `7vOOM5`,
    "text": `Вы что?! В магазине дешевле. А сколько игр в комплекте?`,
  }, {
    "id": `CfAVOw`,
    "text": `Совсем немного... Вы что?! В магазине дешевле. А где блок питания? Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?`,
  }, {
    "id": `CFy-JL`,
    "text": `Совсем немного... Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого.`,
  }],
}, {
  "id": `-TrAHG`,
  "title": `Продам отличную подборку фильмов на VHS.`,
  "description": `Это настоящая находка для коллекционера!`,
  "category": [`Игры`, `Книги`, `Новинки`, `Посуда`, `Разное`],
  "picture": `item08.jpg`,
  "type": `sale`,
  "sum": 33515,
  "comments": [{
    "id": `DJtnTw-`,
    "text": `Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. Неплохо, но дорого. С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? А сколько игр в комплекте? А где блок питания? Совсем немного...`
  }, {
    "id": `ovj4b1`,
    "text": `Почему в таком ужасном состоянии? Оплата наличными или перевод на карту? А сколько игр в комплекте? А где блок питания? Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого. Совсем немного... Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво?`
  }, {
    "id": `y3BSTM`,
    "text": `С чем связана продажа? Почему так дешёво? А где блок питания? Оплата наличными или перевод на карту? Совсем немного... Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца.`
  }],
}];

const app = express();
app.use(express.json());
initSearchController(app, new SearchService(mockData));


describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: `Куплю породистого кота`,
    });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`1 offer found`, () => expect(response.body.length).toBe(1));

  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`AuTBEB`));
});

test(`API returns code 404 if nothing is found`, () => {
  return request(app)
    .get(`/search`)
    .query({
      query: `Куплю породистого тигра`,
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns code 400 when query string is absent`, () => {
  return request(app)
    .get(`/search`)
    .expect(HttpCode.BAD_REQUEST);
});
