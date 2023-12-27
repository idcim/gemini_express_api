// /routes/v1.js
var express = require('express');
var router = express.Router();
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

// aiModel
const gemini = require('../plugins').gemini; 
const chatgpt = require('../plugins').chatgpt; 


router.all('/', function(req, res, next) {
	var data = {
		'code':404,
		'msg':'你真是的……'
	}
  res.json(data);
});

router.post('/text', upload.array(), async function(req, res, next) {
	const type = req.body.type || 'gemini';
	const model = req.body.model || false;
	const prompt = req.body.prompt;
	let result = '';
	
	if(prompt=='' || prompt==undefined){
		return ({
			'code':500,
			'data':'',
			'msg':'你应该知道自己什么也没说吧！'
		});
	}
	
	switch (type){
		case 'chatgpt':
			// openai
			result = model? await chatgpt.chat(prompt,model):await chatgpt.chat(prompt); 
			if (!result) {  
			    return res.status(500).send('An error occurred'); // 将错误发送给客户端  
			}
			break;
		default:
			// gemini
			const history = req.body.history || [];
			result =await gemini.text(prompt,history); 
			break;
	}
	
	var data = {
		'code':2001,
		'data':result
	}
	res.json(data);
});

router.post('/chat', upload.array(), async function(req, res, next) {
	const type = req.body.type || 'gemini';
	const model = req.body.model || false;
	const prompt = req.body.prompt;
	let result = '';
	
	if(prompt=='' || prompt==undefined){
		return ({
			'code':500,
			'data':'',
			'msg':'你应该知道自己什么也没说吧！'
		});
	}
	
	switch (type){
		case 'chatgpt':
			// openai
			result = model? await chatgpt.chat(prompt,model):await chatgpt.chat(prompt); 
			if (!result) {  
			    return res.status(500).send('An error occurred'); // 将错误发送给客户端  
			}
			break;
		default:
			// gemini
			const history = req.body.history || [];
			if(upload.length>0){
				result =await gemini.chat(prompt,history,upload); 
			}else{
				result =await gemini.chat(prompt,history); 
			}
			
			break;
	}
	
	var data = {
		'code':2002,
		'data':result
	}
	res.json(data);
});

module.exports = router;
