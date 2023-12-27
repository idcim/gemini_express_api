// gemini/client.js
const fs = require('fs');
const path = require('path');

const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai"); 

const API_KEY = process.env.GOOGLE_API_KEY;

class Client {

  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
  }

  getModel(name) {
    return this.genAI.getGenerativeModel({model: name}); 
  }
  
  hbt(){
	 return HarmBlockThreshold;
  }
  
  hc(){
	  return HarmCategory;
  }
  
  handleImageUpload(imagePath) {
    // 检查图片的MIME类型
    const mimeType = fs.readFileSync(imagePath).toString('base64').match(/^data:image\/(png|jpeg);base64,/)[1];
  
    // 根据MIME类型创建GoogleGenerativeAI.Part对象
    const imagePart = {
      inlineData: {
        data: fs.readFileSync(imagePath).toString('base64'),
        mimeType: mimeType,
      },
    };
  
    return imagePart;
  }
  
}

module.exports = new Client();