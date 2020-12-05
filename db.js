const fs = require('fs');
const { resolve } = require('path');

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

const writeFile = (data) => {
    fs.appendFile('memes.txt',data,(err)=>{
      if(err){
        console.log('dbye ekleme başarısız!!');
        throw err;
      }
    })
}

module.exports = {readFile,writeFile};
