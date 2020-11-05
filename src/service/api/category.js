'use strict';

const express = require(`express`);
const {HttpCode} = require(`../../utils/const`);


/**
 * @param {Router} controller
 * @param {CategoryService} categoryService
 */
const initCategoryController = (controller, categoryService) => {
  const categoryController = new express.Router();

  controller.use(`/category`, categoryController);

  categoryController.get(`/`, (req, res) => {
    const categories = categoryService.categories;
    res.status(HttpCode.OK).json(categories);
  });
};


module.exports = initCategoryController;
