'use strict';

class OfferService {

  constructor(offers) {
    this._offers = offers;
  }

  get offers() {
    return this._offers;
  }

}


module.exports = OfferService;
