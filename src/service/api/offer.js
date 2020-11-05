'use strict';

const express = require(`express`);
const {HttpCode} = require(`../../utils/const`);
const offerValidator = require(`../middlewares/offer-validator`);


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

  offerController.get(`/:id`, (req, res) => {
    const {id} = req.params;
    const offer = offerService.getById(id);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${id}`);
    }

    return res.status(HttpCode.OK).json(offer);
  });

  offerController.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    return res.status(HttpCode.CREATED).json(offer);
  });

  offerController.put(`/:id`, offerValidator, (req, res) => {
    const {id} = req.params;
    const updatedOffer = offerService.update(id, req.body);

    if (!updatedOffer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${id}`);
    }

    return res.status(HttpCode.OK).json(updatedOffer);
  });

  offerController.delete(`/:id`, (req, res) => {
    const {id} = req.params;
    const deletedOffer = offerService.delete(id);

    if (!deletedOffer) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${id}`);
    }

    return res.status(HttpCode.OK).json(deletedOffer);
  });
};

module.exports = initOfferController;
