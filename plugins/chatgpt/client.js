// chatgpt/client.js
const OpenAIApi = require("openai");


const baseURL = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';

const openai = new OpenAIApi({
  apiKey:process.env.OPENAI_API_KEY,
  baseURL
});

module.exports = {
  openai  
};