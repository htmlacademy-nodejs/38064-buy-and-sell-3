'use strict';

const express = require(`express`);
const path = require(`path`);
const mainRoutes = require(`./routes/index`);
const myRoutes = require(`./routes/my`);
const offersRoutes = require(`./routes/offers`);


const DEFAULT_PORT = 8080;
const Dir = {
  PUBLIC: `public`,
  TEMPLATES: `templates`,
};

const app = express();

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

app.use(express.static(path.resolve(__dirname, Dir.PUBLIC)));

app.set(`views`, path.resolve(__dirname, Dir.TEMPLATES));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT);
