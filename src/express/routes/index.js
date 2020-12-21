'use strict';

const express = require(`express`);
const api = require(`../api`).getAPI();


const mainRouter = new express.Router();

mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/search`, (req, res) => res.render(`search-result`));

mainRouter.get(`/`, async (req, res) => {
  let offers;
  try {
    const response = await api.get(`/offers`);
    offers = response.data;
  } catch (err) {
    offers = [];
  }

  res.render(`main`, {offers});
});


module.exports = mainRouter;
