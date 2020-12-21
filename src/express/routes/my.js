'use strict';

const express = require(`express`);
const api = require(`../api`).getAPI();


const myRouter = new express.Router();

myRouter.get(`/comments`, async (req, res) => {
  let offers;
  try {
    const response = await api.get(`/offers`);
    offers = response.data;
  } catch (err) {
    offers = [];
  }

  res.render(`comments`, {offers: offers.slice(0, 3)});
});

myRouter.get(`/`, async (req, res) => {
  let offers;
  try {
    const response = await api.get(`/offers`);
    offers = response.data;
  } catch (err) {
    offers = [];
  }

  res.render(`my-tickets`, {offers});
});


module.exports = myRouter;
