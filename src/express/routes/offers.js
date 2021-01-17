'use strict';

const path = require(`path`);
const express = require(`express`);
const multer = require(`multer`);
const {nanoid} = require(`nanoid`);
const api = require(`../api`).getAPI();


const UPLOAD_DIR = `../upload/img/`;

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueName = nanoid(12);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});
const uploadFormData = multer({storage});

const offersRouter = new express.Router();


offersRouter.get(`/add`, async (req, res) => {
  let categories;
  try {
    categories = await api.getCategories();
  } catch (error) {
    categories = [];
  }

  res.render(`offers/new-ticket`, {categories});
});


offersRouter.post(`/add`, uploadFormData.single(`avatar`), async (req, res) => {
  const {body, file} = req;

  /** @type {LocalOffer} */
  const newOffer = {
    title: body.title,
    description: body.comment,
    categories: body.category,
    picture: file && file.filename,
    type: body.action,
    sum: body.price,
  };

  try {
    await api.createOffer(newOffer);
    res.redirect(`/my`);
  } catch (error) {
    let categories;
    try {
      categories = await api.getCategories();
    } catch (err) {
      categories = [];
    }

    res.render(`offers/new-ticket`, {categories, offerWithErrors: newOffer});
  }
});


offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;

  try {
    const [offer, categories] = await Promise.all([
      await api.getOfferById(id),
      await api.getCategories(),
    ]);

    res.render(`offers/ticket-edit`, {offer, categories});
  } catch (error) {
    // TODO написать обработку ошибки запроса данных для страницы /offers/edit/:id
  }
});


offersRouter.get(`/category/:id`, (req, res) => res.render(`offers/category`));
offersRouter.get(`/:id`, (req, res) => res.render(`offers/ticket`));


module.exports = offersRouter;
