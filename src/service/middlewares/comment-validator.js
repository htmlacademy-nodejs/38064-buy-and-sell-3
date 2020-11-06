'use strict';

const {HttpCode} = require(`../../utils/const`);


const commentKeys = [`text`];

const commentValidator = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const isKeysExists = commentKeys.every((key) => keys.includes(key));

  if (!isKeysExists) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request. The comment data is not valid`);
  }

  return next();
};


module.exports = commentValidator;
