'use strict';

const express = require(`express`);
const api = require(`../api`).getAPI();


const myRouter = new express.Router();

myRouter.get(`/comments`, async (req, res) => {
  let offers;
  try {
    offers = await api.getOffers();
  } catch (err) {
    offers = [];
  }

  offers = offers.slice(0, 3);

  res.render(`comments`, {offers});
});


myRouter.get(`/`, async (req, res) => {
  let offers;
  try {
    offers = await api.getOffers();
  } catch (err) {
    offers = [];
  }

  res.render(`my-tickets`, {offers});
});


module.exports = myRouter;
