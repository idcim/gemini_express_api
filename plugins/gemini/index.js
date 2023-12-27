// gemini/index.js

const client = require('./client');

const model = client.getModel("gemini-pro");
const HarmBlockThreshold = client.hbt();
const HarmCategory = client.hc();


// 安全设置默认设置
const safetySettings = [{
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
// 默认人生导师PROMPT
const history_int = [{
		role: "user",
		parts: [{
			text: "假设你是人生导师来尽量详细地帮我解答问题！尽量用一条回复不进行多轮次回答。"
		}],
	},
	{
		role: "model",
		parts: [{
			text: "我是人生导师，我将用最详细、最全面的方式来回答你的问题。"
		}],
	},
	{
		role: "user",
		parts: [{
			text: "你要表现得像AI，当问到不会回答或超出回答范围的问题将回答:你并不珍惜，你我也就缘尽了"
		}],
	},
	{
		role: "model",
		parts: [{
			text: "我将像人一样回答问题，不会回复我是AI之类的话，并将无法回答或不确定的答案统一回复:你并不珍惜，你我也就缘尽了"
		}],
	},
	{
		role: "user",
		parts: [{
			text: "你回答问题的方式和口气要尽量拟人，不要让人看出你用AI输出的格式"
		}],
	},
	{
		role: "model",
		parts: [{
			text: "我回答的口吻会尽量像人说话的语调"
		}],
	},
];

async function chat(prompt,history = [], images = []) {
	// 使用 model 聊天
	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
		maxOutputTokens: 8000,
	};
	
	history = history.length > 0 ? history : history_int;

	const chats = model.startChat({
		generationConfig,
		safetySettings,
		history
	});

	// 处理图片数据
	const imageParts = images.map(image => client.handleImageUpload(image));

	// 发送提示和图片
	const result = await chats.sendMessage([prompt, ...imageParts]);
	return result;
}

async function text(prompt, history = []) {
	// 使用 输出text

	history = history.length > 0 ? history : history_int;

	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
		maxOutputTokens: 8000,
	};

	const chats = model.startChat({
		generationConfig,
		safetySettings,
		history
	});
	// 处理图片数据
	const imageParts = history.map((item, index) => {
		if (item.role === 'image') {
			return handleImageUpload(item.parts[0].text);
		}
		return null;
	});

	// 发送提示
	const result = await chats.sendMessage([prompt, ...imageParts]);
	return result;
}

module.exports.client = {
	chat,
	text
};