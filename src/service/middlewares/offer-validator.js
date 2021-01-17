'use strict';

const {HttpCode} = require(`../../utils/const`);


const offerKeys = [`title`, `description`, `categories`, `picture`, `type`, `sum`];

const offerValidator = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const isKeysExists = offerKeys.every((key) => keys.includes(key));

  if (!isKeysExists) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. The offer data is not valid`);
  }

  return next();
};


module.exports = offerValidator;
