'use strict';

const express = require(`express`);
const api = require(`../api`).getAPI();


const offersRouter = new express.Router();

offersRouter.get(`/add`, (req, res) => res.render(`offers/new-ticket`));

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const response = await Promise.all([
    await api.get(`/offers/${id}`),
    await api.get(`/category`),
  ]);
  const [offerResponse, categoriesResponse] = response;
  const offer = offerResponse.data;
  const categories = categoriesResponse.data;

  res.render(`offers/ticket-edit`, {offer, categories});
});

offersRouter.get(`/category/:id`, (req, res) => res.render(`offers/category`));
offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));


module.exports = offersRouter;
