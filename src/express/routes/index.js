'use strict';

const express = require(`express`);
const api = require(`../api`).getAPI();


const mainRouter = new express.Router();

mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));


mainRouter.get(`/search`, async (req, res) => {
  const {search: searchQuery} = req.query;

  let offers;
  try {
    offers = await api.searchForOffers(searchQuery);
  } catch (error) {
    offers = [];
  }

  res.render(`search-result`, {offers});
});


mainRouter.get(`/`, async (req, res) => {
  let offers;
  try {
    offers = await api.getOffers();
  } catch (err) {
    offers = [];
  }

  res.render(`main`, {offers});
});


module.exports = mainRouter;
