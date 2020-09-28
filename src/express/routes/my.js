'use strict';

const {Router} = require(`express`);


const myRouter = new Router();

myRouter.get(`/comments`, (req, res) => res.send(`/my/comments `));
myRouter.get(`/`, (req, res) => res.send(`/my`));


module.exports = myRouter;
