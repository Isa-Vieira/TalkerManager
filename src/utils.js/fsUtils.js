// Função requisito 1
const fs = require('fs');
const path = require('path');

 async function talker() {
   try {
    const data = await fs.readFileSync(path.resolve(__dirname, '../talker.json'));
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

module.exports = {
  talker,
  generateToken,
};
