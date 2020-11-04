'use strict';

const express = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const initOfferController = require(`./offer`);
const {OfferService} = require(`../data-service`);


const controller = new express.Router();

(async () => {
  const mockOffers = await getMockData();

  initOfferController(controller, new OfferService(mockOffers));
})();


module.exports = controller;
