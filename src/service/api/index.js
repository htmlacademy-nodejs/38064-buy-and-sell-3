'use strict';

const express = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const initOfferController = require(`./offers`);
const initCategoryController = require(`./category`);
const initSearchController = require(`./search`);
const {OfferService, CategoryService, CommentService, SearchService} = require(`../data-service`);


const controller = new express.Router();

(async () => {
  const mockOffers = await getMockData();

  initOfferController(controller, new OfferService(mockOffers), new CommentService());
  initCategoryController(controller, new CategoryService(mockOffers));
  initSearchController(controller, new SearchService(mockOffers));
})();


module.exports = controller;
