'use strict';

const {HttpCode} = require(`../../utils/const`);


const offerKeys = [`title`, `description`, `category`, `picture`, `type`, `sum`];

const validateOffer = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const isKeysExists = offerKeys.every((key) => keys.includes(key));

  if (!isKeysExists) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. The Data is not valid`);
  }

  return next();
};


module.exports = validateOffer;
