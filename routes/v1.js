// /routes/v1.js
var express = require('express');
var router = express.Router();
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

// gemini
const gemini = require('../plugins').gemini; 


router.all('/', function(req, res, next) {
	var data = {
		'code':404,
		'msg':'你真是的……'
	}
  res.json(data);
});

router.post('/text', upload.array(), async function(req, res, next) {
	const prompt = req.body.prompt;
	const result = await gemini.text(prompt); 
	console.log(result)
	var data = {
		'code':2001,
		'data':result
	}
	res.json(data);
});

module.exports = router;
