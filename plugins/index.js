// plugins/index.js

const chatgpt = require('./chatgpt').client;
//const baidu = require('./baidu'); 
const gemini = require('./gemini').client;

module.exports = {
  chatgpt,
  //baidu: baidu.client,
  gemini
};