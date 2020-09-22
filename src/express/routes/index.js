'use strict';

const {Router} = require(`express`);


const mainRouter = new Router();

mainRouter.get(`/login`, (req, res) => res.send(`/login`));
mainRouter.get(`/register`, (req, res) => res.send(`/register`));
mainRouter.get(`/search`, (req, res) => res.send(`/search`));
mainRouter.get(`/`, (req, res) => res.send(`/`));


module.exports = mainRouter;
