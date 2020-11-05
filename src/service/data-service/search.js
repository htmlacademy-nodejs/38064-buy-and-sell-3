'use strict';

class SearchService {

  /**
   * @param {Offer[]} offers
   */
  constructor(offers) {
    this._offers = offers;
  }

  /**
   * @param {string} searchText
   * @return {Offer[]}
   */
  find(searchText) {
    return this._offers.filter((offer) => offer.title.toLowerCase().includes(searchText.toLowerCase()));
  }

}


module.exports = SearchService;
