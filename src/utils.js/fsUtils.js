// Função requisito 1
const fs = require('fs').promises;
const path = require('path');

 async function talker() {
   try {
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error}`);
  }
}
// Função requisito 3
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

// Função requisito 5
const DATA_PATH = '../talker.json';
async function writeTalker(dadosNovos) {
    try {
     const pegaBancoAnterior = await talker();
     const bancoAtual = JSON.stringify([...pegaBancoAnterior, dadosNovos]); 
     await fs.writeFile(path.resolve(__dirname, DATA_PATH), bancoAtual);  
   } catch (error) {
     console.error(`Erro ao escrever o arquivo: ${error}`);
   }
 }
module.exports = {
  talker,
  generateToken,
  writeTalker,
};
