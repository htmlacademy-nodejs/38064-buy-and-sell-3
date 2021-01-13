'use strict';

const axios = require(`axios`);
const {HttpMethod} = require(`../utils/const`);


const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultURL = `http://localhost:${port}/api/`;


class API {

  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  /**
   * @param {string} url
   * @param {AxiosRequestConfig?} options
   * @return {any}
   * @private
   */
  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  /**
   * @return {Offer[]}
   */
  getOffers() {
    return this._load(`/offers`);
  }

  /**
   * @param {string} id
   * @return {Offer}
   */
  getOfferById(id) {
    return this._load(`/offers/${id}`);
  }

  /**
   * @param {LocalOffer} newOffer
   * @return {Offer}
   */
  createOffer(newOffer) {
    return this._load(`/offers`, {
      method: HttpMethod.POST,
      data: newOffer,
    });
  }

  /**
   * @return {string[]}
   */
  getCategories() {
    return this._load(`/category`);
  }

  /**
   * @param {string} query
   * @return {Offer[]}
   */
  searchForOffers(query) {
    return this._load(`/search`, {
      params: {query},
    });
  }

}


const defaultAPI = new API(defaultURL, TIMEOUT);


module.exports = {
  getAPI: () => defaultAPI,
};
