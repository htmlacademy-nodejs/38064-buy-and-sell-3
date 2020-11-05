'use strict';

class CategoryService {

  /**
   * @param {Offer[]} offers
   */
  constructor(offers) {
    this._offers = offers;
  }

  /**
   * @return {string[]}
   */
  get categories() {
    const categories = this._offers.reduce((acc, offer) => {
      offer.category.forEach((category) => acc.add(category));
      return acc;
    }, new Set());
    return [...categories];
  }

}


module.exports = CategoryService;
