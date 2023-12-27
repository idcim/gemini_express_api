// chatgpt/client.js
const OpenAIApi = require("openai");

const apiKey = process.env.OPENAI_API_KEY || '';
const baseURL = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';

const openai = new OpenAIApi({
  apiKey,
  baseURL
});

module.exports = {
  openai  
};