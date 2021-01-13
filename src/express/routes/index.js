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
    const response = await api.get(`/search`, {
      params: {
        query: searchQuery,
      }
    });
    offers = response.data;
  } catch (error) {
    offers = [];
  }

  res.render(`search-result`, {offers});
});


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
