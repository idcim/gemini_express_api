// chatgpt/index.js

const client = require('./client');

async function chat(prompt,model='text-davinci-003',max_tokens=100) {
  const response = await client.createCompletion({
    model: model,
    prompt: prompt, 
    max_tokens: max_tokens,
  });

  return response.data.choices[0].text;
}

// 导出客户端接口
module.exports.client = {
  chat
};