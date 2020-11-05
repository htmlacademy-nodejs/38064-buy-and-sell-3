'use strict';

const {HttpCode} = require(`../../utils/const`);


/**
 * @param {OfferService} service
 * @return {Function}
 */
const getOfferExistValidator = (service) => (req, res, next) => {
  const {id} = req.params;
  const offer = service.getById(id);

  if (!offer) {
    return res.status(HttpCode.NOT_FOUND).send(`Offer with ${id} not found`);
  }

  res.locals.offer = offer;

  return next();
};


module.exports = getOfferExistValidator;
