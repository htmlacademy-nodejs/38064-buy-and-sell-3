'use strict';

const express = require(`express`);
const request = require(`supertest`);
const initCategoryController = require(`./category`);
const {HttpCode} = require(`../../utils/const`);
const {CategoryService} = require(`../data-service`);
const mockData = require(`./category.e2e.test.mock.json`);


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
