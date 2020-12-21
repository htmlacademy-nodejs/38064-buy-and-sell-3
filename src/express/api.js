'use strict';

const axios = require(`axios`);


const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
console.log(port);
const defaultURL = `http://localhost:${port}/api/`;

const _http = axios.create({
  baseURL: defaultURL,
  timeout: TIMEOUT,
});

const defaultAPI = _http;


module.exports = {
  getAPI: () => defaultAPI,
};
