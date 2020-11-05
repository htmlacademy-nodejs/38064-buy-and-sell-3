'use strict';

const express = require(`express`);
const {HttpCode} = require(`../../utils/const`);
const offerValidator = require(`../middlewares/offer-validator`);
const commentValidator = require(`../middlewares/comment-validator`);
const getOfferExistValidator = require(`../middlewares/offer-exists`);


/**
 * @param {Router} controller
 * @param {OfferService} offerService
 * @param {CommentService} commentService
 */
const initOfferController = (controller, offerService, commentService) => {
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

  offerController.get(`/:id/comments`, getOfferExistValidator(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.getAll(offer);

    res.status(HttpCode.OK).json(comments);
  });

  offerController.delete(`/:id/comments/:commentId`, getOfferExistValidator(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.delete(offer, commentId);

    if (!deletedComment) {
      res.statusCode(HttpCode.NOT_FOUND).send(`Not found comment with id: ${commentId}`);
    }

    return res.status(HttpCode.OK).json(deletedComment);
  });

  offerController.post(`/:id/comments`, [getOfferExistValidator(offerService), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const newComment = commentService.create(offer, req.body);

    return res.status(HttpCode.CREATED).json(newComment);
  });
};


module.exports = initOfferController;
