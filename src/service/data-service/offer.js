'use strict';

const {nanoid} = require(`nanoid`);
const {ID_LENGTH} = require(`../../utils/const`);


class OfferService {

  /**
   * @param {Offer[]} offers
   */
  constructor(offers) {
    this._offers = offers;
  }

  get offers() {
    return this._offers;
  }

  /**
   * @param {string} id
   * @return {Offer|undefined}
   */
  getById(id) {
    return this._offers.find((offer) => offer.id === id);
  }

  /**
   * @param {LocalOffer} offer
   * @return {Offer}
   */
  create(offer) {
    /** @type {Offer} */
    const newOffer = Object.assign({id: nanoid(ID_LENGTH), comments: []}, offer);
    this._offers.push(newOffer);
    return newOffer;
  }

  /**
   * @param {string} id
   * @param {LocalOffer} newOffer
   * @return {Offer|null}
   */
  update(id, newOffer) {
    const oldOffer = this._offers.find((offer) => offer.id === id);
    if (!oldOffer) {
      return null;
    }
    return Object.assign(oldOffer, newOffer);
  }

  /**
   * @param {string} id
   * @return {Offer|null}
   */
  delete(id) {
    const offerToDelete = this._offers.find((offer) => offer.id === id);
    if (!offerToDelete) {
      return null;
    }
    this._offers = this._offers.filter((offer) => offer.id !== id);
    return offerToDelete;
  }

}


module.exports = OfferService;
