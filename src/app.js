// Requisito Rota 1
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const { talker, generateToken, writeTalker } = require('./utils.js/fsUtils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
app.get('/', (_request, response) => {
    response.status(HTTP_OK_STATUS).send();
  });
  app.get('/talker', async (req, res) => {
    const pessoas = await talker();
    return res.status(200).json(pessoas);
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
const verificaEmail = (email) => email
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
    } if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });    
    }
    return res.status(200).json({ token });
});

// Requisito 5
const { auth } = require('./middlewars.js/valitedToken');
const { valitedName } = require('./middlewars.js/valitedName');
const { valitedAge } = require('./middlewars.js/valitedAge');
const { valitedTalk } = require('./middlewars.js/valitedTalk');
const { valitedRate } = require('./middlewars.js/valitedRate');
const { stringify } = require('querystring');

app.post('/talker', 
auth,
valitedName,
valitedAge,
valitedTalk,
valitedRate,
async (req, res) => {
const dadosName = req.body;
const recebebanco = await talker();
dadosName.id = recebebanco.length + 1;
await writeTalker(dadosName);
return res.status(201).json(dadosName);
});

// Requisito 6
/* app.put('/talker/:id', async (req, res) => {
const { id } = req.params;
const bancoAtual = req.body;
const recebebanco = await talker();
let updateInfo;

}) */
// Requisito 7
app.delete('/talker/:id/', auth, async (req, res) => {
const { id } = req.params;
const pessoas = await talker();
const arrayPosition = await pessoas.findIndex((elem) => elem.id === Number(id));
pessoas.splice(arrayPosition, 1);
 await fs.writeFile(path.resolve(__dirname, './talker.json'), JSON.stringify(pessoas)); 
 return res.status(204).end();
});
module.exports = app;