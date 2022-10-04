// Requisito Rota requisito 1
const express = require('express');
const bodyParser = require('body-parser');
const { talker } = require('./utils.js/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
app.get('/', (_request, response) => {
    response.status(HTTP_OK_STATUS).send();
  });
  app.get('/talker', async (req, res) => {
    const pessoas = await talker();
    res.status(200).json(pessoas);
});
module.exports = app;