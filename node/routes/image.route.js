var express = require("express");
var router = express.Router();
var formidable = require('formidable');

router.get('/box', (req, res, next) => {
	res.send("Box get");	
});
router.post('/box', (req, res, next) => {
	console.log("[INFO] Box called.");
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		res.write('File uploaded');
		res.end();
		// console.log(files);
	});
});

module.exports = router;