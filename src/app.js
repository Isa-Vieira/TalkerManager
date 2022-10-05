// Requisito Rota 1
const express = require('express');
const bodyParser = require('body-parser');
const { String } = require('joi');
const { talker, generateToken } = require('./utils.js/fsUtils');

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

// Requisito Rota 2
app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const pessoas = await talker();
    const talkerPegaId = pessoas.find((param) => param.id === Number(id));
    if (talkerPegaId) {
       return res.status(200).json(talkerPegaId);
    } 
       return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  });
// Requisito Rota 3 e 4
const verificaEmail = (email) => String(email)
    .toLowerCase()
    .match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);

app.post('/login', async (req, res) => {
    const pessoas = await talker();
    const { email, password } = req.body;
    const novaPessoa = req.body;
    pessoas.push(novaPessoa);
    const token = generateToken();
    
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    } if (!verificaEmail(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    } if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    } if (password) {
 return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });    
    }
    return res.status(200).json({ token });
});
module.exports = app;