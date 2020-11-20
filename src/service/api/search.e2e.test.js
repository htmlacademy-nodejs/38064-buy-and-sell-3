'use strict';

const express = require(`express`);
const request = require(`supertest`);
const initSearchController = require(`./search`);
const {HttpCode} = require(`../../utils/const`);
const {SearchService} = require(`../data-service`);
const mockData = require(`./search.e2e.test.mock.json`);


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
