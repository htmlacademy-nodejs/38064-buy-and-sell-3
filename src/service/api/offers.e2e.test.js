'use strict';

const express = require(`express`);
const request = require(`supertest`);
const initOfferController = require(`./offers`);
const {HttpCode} = require(`../../utils/const`);
const {OfferService, CommentService} = require(`../data-service`);
const mockData = require(`./offers.e2e.test.mock.json`);


/**
 * @return {Express}
 */
const createAPI = () => {
  const app = express();
  app.use(express.json());
  const cloneData = JSON.parse(JSON.stringify(mockData));
  initOfferController(app, new OfferService(cloneData), new CommentService());
  return app;
};


describe(`API returns offers`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 3 offers`, () => expect(response.body.length).toBe(3));

  test(`First offer's id equals "JImQFL"`, () => expect(response.body[0].id).toBe(`JImQFL`));
});


describe(`API returns an offer with given id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/JImQFL`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Продам книги Стивена Кинга."`, () => expect(response.body.title).toBe(`Продам книги Стивена Кинга.`));
});

test(`API returns code 404 if there is no offer with given id`, () => {
  const app = createAPI();

  return request(app)
    .get(`/offers/NO_EXIST`)
    .expect(HttpCode.NOT_FOUND);
});


describe(`API creates an offer if data is valid`, () => {
  const app = createAPI();
  let response;

  /** @type {LocalOffer} */
  const newOffer = {
    title: `Научу программировать`,
    description: `Большой опыт разработки. Дружеское отношение. Духовное наставничество`,
    category: `Обучение`,
    picture: `item03.jpg`,
    type: `offer`,
    sum: 10000,
  };

  beforeAll(async () => {
    response = await request(app).post(`/offers`).send(newOffer);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns the created offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`The offers number has changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

describe(`API refuses to create an offer if data is invalid`, () => {
  const app = createAPI();

  const badOffer = {
    title: `Научу программировать`,
  };

  test(`Without all required property code is 400`, () => request(app)
    .post(`/offers`)
    .send(badOffer)
    .expect(HttpCode.BAD_REQUEST)
  );
});


describe(`API changes existent offer`, () => {
  const app = createAPI();
  let response;

  /** @type {LocalOffer} */
  const newOffer = {
    title: `Продам отличную подборку фильмов на VHS и DVD!`,
    description: `Это настоящая находка для коллекционера!`,
    category: [`Игры`, `Книги`, `Новинки`, `Посуда`, `Разное`],
    picture: `item08.jpg`,
    type: `sale`,
    sum: 33515,
  };

  beforeAll(async () => {
    response = await request(app).put(`/offers/-TrAHG`).send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () => request(app)
    .get(`/offers/-TrAHG`)
    .expect((res) => expect(res.body.title).toBe(`Продам отличную подборку фильмов на VHS и DVD!`))
  );
});

test(`API returns status code 400 if data is not valid`, () => {
  const app = createAPI();

  const badOffer = {
    title: 0,
  };

  return request(app)
    .put(`/offers/-TrAHG`)
    .send(badOffer)
    .expect(HttpCode.BAD_REQUEST);
});

test(`API returns status code 404 when trying to change non-existent offer`, () => {
  const app = createAPI();

  /** @type {LocalOffer} */
  const newOffer = {
    title: `Продам отличную подборку фильмов на VHS и DVD в несуществующем объявлении!`,
    description: `Это настоящая находка для коллекционера!`,
    category: [`Игры`, `Книги`, `Новинки`, `Посуда`, `Разное`],
    picture: `item08.jpg`,
    type: `sale`,
    sum: 33515,
  };

  return request(app)
    .put(`/offers/NO_EXIST`)
    .send(newOffer)
    .expect(HttpCode.NOT_FOUND);
});


describe(`API correctly deletes an offer`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/offers/AuTBEB`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`AuTBEB`));

  test(`Offer count is 2 after delete`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to delete non-existent offer`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/NO_EXIST`)
    .expect(HttpCode.NOT_FOUND);
});


describe(`API returns a list of comments to given offer`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/JImQFL/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list with 3 comments`, () => expect(response.body.length).toBe(3));

  test(`First comment's id is "7rwCb3"`, () => expect(response.body[0].id).toBe(`7rwCb3`));
});


describe(`API correctly deletes a comment`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/offers/-TrAHG/comments/y3BSTM`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted comment`, () => expect(response.body.id).toBe(`y3BSTM`));

  test(`Comments number after delete is 2`, () => request(app)
    .get(`/offers/-TrAHG/comments`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/-TrAHG/comments/NO_EXIST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent offer`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/NO_EXIST/comments/ovj4b1`)
    .expect(HttpCode.NOT_FOUND);
});


describe(`API creates a comment if data is valid`, () => {
  const app = createAPI();
  let response;

  /** @type {LocalComment} */
  const newComment = {
    text: `Новый комментарий :)`
  };

  beforeAll(async () => {
    response = await request(app).post(`/offers/JImQFL/comments`).send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns created comment`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
    .get(`/offers/JImQFL/comments`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {
  const app = createAPI();

  /** @type {LocalComment} */
  const newComment = {
    text: `Новый комментарий :)`
  };

  return request(app)
    .post(`/offers/NO_EXIST/comments`)
    .send(newComment)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {
  const app = createAPI();

  const badComment = {};

  return request(app)
    .post(`/offers/JImQFL/comments`)
    .send(badComment)
    .expect(HttpCode.BAD_REQUEST);
});
