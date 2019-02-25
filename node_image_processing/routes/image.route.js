var express = require("express");
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var PImage = require('pureimage');
const path = require('path');



router.get('/box', (req, res, next) => {
	res.send("Box get");
});
router.post('/box', (req, res, next) => {
	console.log("[INFO] Box called.");
	// var form = new formidable.IncomingForm();
	// if (!fs.existsSync(__dirname + "/tmp")) {
	// 	fs.mkdirSync(__dirname + "/tmp");
	// }
	// form.uploadDir = __dirname + "/tmp";
	// form.keepExtensions = true;
	// form.parse(req, function (err, fields, files) {
	// 	res.write('File uploaded');
	// 	var file_path = files.files.path;
	// 	console.log(file_path);
	// 	PImage.decodeJPEGFromStream(fs.createReadStream(file_path)).then((img) => {
	// 		console.log("size is", img.width, img.height);
	// 		var img2 = PImage.make(50, 50);
	// 		var c = img2.getContext('2d');
	// 		c.drawImage(img,
	// 			0, 0, img.width, img.height, // source dimensions
	// 			0, 0, 50, 50 // destination dimensions
	// 		);
	// 		var pth = path.join(file_path.name, "_edited", file_path.ext);
	// 		console.log(pth);
	// 		// PImage.encodeJPEGToStream(img2, fs.createWriteStream(pth)).then(() => {
	// 		// 	console.log("done writing");
	// 		// });
	// 	});
	// 	res.end();
	// 	// console.log(files);
	// });
});

module.exports = router;