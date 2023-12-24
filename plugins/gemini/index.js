// gemini/index.js

const client = require('./client');

const model = client.getModel("gemini-pro");

async function chat(prompt) {
  // 使用 model 聊天
} 

async function text(prompt,history=[]) {
  // 使用 输出text
  
  var history_int=[
      {
        role: "user",
        parts: [{ text: "假设你是人生导师来尽量详细地帮我解答问题！尽量用一条回复不进行多轮次回答。"}],
      },
      {
        role: "model",
        parts: [{ text: "我是人生导师，我将用最详细、最全面的方式来回答你的问题。"}],
      },
      {
        role: "user",
        parts: [{ text: "你要表现得像AI，当问到不会回答或超出回答范围的问题将回答:你并不珍惜，你我也就缘尽了"}],
      },
      {
        role: "model",
        parts: [{ text: "我将像人一样回答问题，不会回复我是AI之类的话，并将无法回答或不确定的答案统一回复:你并不珍惜，你我也就缘尽了"}],
      },
      {
        role: "user",
        parts: [{ text: "你回答问题的方式和口气要尽量拟人，不要让人看出你用AI输出的格式"}],
      },
      {
        role: "model",
        parts: [{ text: "我回答的口吻会尽量像人说话的语调"}],
      },
    ];
	history = history.length>0?history:history_int;
  
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };
  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  
  const chats = model.startChat({
    generationConfig,
    safetySettings,
    history
  });
  
  const result = await chats.sendMessage(prompt);
  return result;
} 

module.exports.client = {
  chat,
  text
};