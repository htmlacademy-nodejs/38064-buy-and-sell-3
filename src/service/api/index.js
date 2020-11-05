'use strict';

const express = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const initOfferController = require(`./offer`);
const initCategoryController = require(`./category`);
const {OfferService, CategoryService} = require(`../data-service`);


const controller = new express.Router();

(async () => {
  const mockOffers = await getMockData();

  initOfferController(controller, new OfferService(mockOffers));
  initCategoryController(controller, new CategoryService(mockOffers));
})();


module.exports = controller;
