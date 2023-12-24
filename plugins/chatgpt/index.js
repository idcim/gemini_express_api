// chatgpt/index.js

const client = require('./client');


async function chat(prompt, model = 'gpt-3.5-turbo') {  
    try {  
        const messages = Array.isArray(prompt) ? prompt : [{ role: "user", content: prompt }];  
        const completion = await client.openai.chat.completions.create({  
            messages,  
            model,  
            logprobs: true,  
            top_logprobs: 2,  
        });
		
        return completion.choices[0];  
    } catch (error) {  
        console.error("Error during API call:", error);  
        // 根据需要处理错误，例如返回一个错误消息或抛出错误  
		return false;
    }  
}

async function text(prompt,model='text-davinci-003',max_tokens=100) {
	const response = await client.openai.chat.completions.create({
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