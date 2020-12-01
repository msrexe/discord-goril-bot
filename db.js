const fs = require('fs')

const readFile = () => {
  return new Promise((resolve) => {
    fs.readFile('memes.txt','utf-8', (err,data) => {
      if(err) {
        console.log('db açamadım');
        throw err;
      }
      resolve(data);
    });
  });
}

module.exports = readFile
