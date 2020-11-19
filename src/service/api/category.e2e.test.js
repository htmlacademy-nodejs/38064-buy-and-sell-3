'use strict';

const express = require(`express`);
const request = require(`supertest`);
const initCategoryController = require(`./category`);
const {HttpCode} = require(`../../utils/const`);
const {CategoryService} = require(`../data-service`);


const mockData = [{
  "id": `ki3YlO`,
  "title": `Продам отличную подборку фильмов на VHS.`,
  "description": `Не пытайтесь торговаться. Цену вещам я знаю. Бонусом отдам все аксессуары. Кому нужен этот новый телефон, если тут такое... Продаю с болью в сердце... Товар в отличном состоянии.`,
  "category": [`Игры`, `Книги`],
  "picture": `item03.jpg`,
  "type": `offer`,
  "sum": 85773,
  "comments": [{
    "id": `yyNWg6`,
    "text": `А где блок питания? С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?`
  }, {
    "id": `8_2dDB`,
    "text": `Оплата наличными или перевод на карту? Почему в таком ужасном состоянии? Совсем немного... С чем связана продажа? Почему так дешёво?`
  }, {
    "id": `loonsV`,
    "text": `Продаю в связи с переездом. Отрываю от сердца. А где блок питания? Почему в таком ужасном состоянии? Вы что?! В магазине дешевле.`
  }]
}, {
  "id": `W1TdkM`,
  "title": `Продам отличную подборку фильмов на VHS.`,
  "description": `Продаю с болью в сердце... Кажется тут что-то новое? А то! Кому нужен этот новый телефон, если тут такое... Кажется, что это хрупкая вещь.`,
  "category": [`Разное`, `Игры`, `Книги`, `Журналы`, `Новинки`, `Животные`, `Посуда`],
  "picture": `item06.jpg`,
  "type": `offer`,
  "sum": 10298,
  "comments": [{
    "id": `vDd2XT`,
    "text": `Почему в таком ужасном состоянии?`
  }, {
    "id": `ARn5T2`,
    "text": `Вы что?! В магазине дешевле.`
  }, {
    "id": `uaUEqt`,
    "text": `Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво? А сколько игр в комплекте? Неплохо, но дорого. Вы что?! В магазине дешевле. А где блок питания? Оплата наличными или перевод на карту?`
  }]
}];

const app = express();
app.use(express.json());
initCategoryController(app, new CategoryService(mockData));


describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/category`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 7`, () => expect(response.body.length).toBe(7));

  test(`Category names are "Разное", "Игры", "Книги", "Журналы", "Новинки", "Животные", "Посуда"`, () => expect(response.body).toEqual(
      expect.arrayContaining([`Разное`, `Игры`, `Книги`, `Журналы`, `Новинки`, `Животные`, `Посуда`])
  ));
});
