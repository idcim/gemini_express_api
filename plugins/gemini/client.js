// gemini/client.js

const { GoogleGenerativeAI } = require("@google/generative-ai"); 

const API_KEY = process.env.GOOGLE_API_KEY;

class Client {

  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
  }

  getModel(name) {
    return this.genAI.getGenerativeModel({model: name}); 
  }

}

module.exports = new Client();