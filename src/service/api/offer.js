'use strict';

const express = require(`express`);
const {HttpCode} = require(`../../utils/const`);


/**
 * @param {Router} controller
 * @param {OfferService} offerService
 */
const initOfferController = (controller, offerService) => {
  const offerController = new express.Router();

  controller.use(`/offers`, offerController);

  offerController.get(`/`, (req, res) => {
    const offers = offerService.offers;
    res.status(HttpCode.OK).json(offers);
  });
};

module.exports = initOfferController;
