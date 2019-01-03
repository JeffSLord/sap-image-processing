var express = require("express");
var router = express.Router();
const xsenv = require("@sap/xsenv");
var formidable = require('formidable');
var request = require('request');
var FormData = require('form-data');
var fs = require('fs');

router.get('/', (req, res, next) => {
	console.log("[SUCCESS] calling /");
	res.send('leonardo');
});

router.post('/url', (req, res, next) => {
	console.log("[SUCCESS] calling /url ");
	var form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if (err) {
			console.error("[ERROR]", err);
			res.end();
		}
		var option = fields.option;
		var url = "";
		var ftype = "";
		// console.log("dirname", __dirname);
		// var newPath = "../temp/img.jpg";
		// fs.rename(files.file.path, newPath, (err) => {
		// 	if (err) {
		// 		return console.error(err);
		// 	}

		switch (option) {
		case "option1":
			url = 'https://sandbox.api.sap.com/ml/facedetection/face-detection';
			ftype = 'files';
			break;
		case "option2":
			url = 'https://sandbox.api.sap.com/ml/humandetection/human-detection/';
			ftype = 'file';
			break;
		case "option3":
			url = 'https://sandbox.api.sap.com/ml/imageclassification/classification';
			ftype = 'files';
			break;
		}
		const services = xsenv.getServices({
			leonardo: {
				name: "LEONARDO",
				label: "user-provided"
			}
		});
		var uploadFilePath = files.file.path;
		var uploadFileName = files.file.name;
		console.log("path", uploadFilePath);
		console.log("name", uploadFileName);
		console.log("ftype", ftype);
		
		var formData = new FormData();
		fs.readFile(uploadFilePath, (err, data) => {
			if (err) {
				return console.error(err);
			}
			fs.writeFile("temp.jpg",data, (err) => {
				if(err){
					console.log(err);
				}
			});
			console.log(data);
			formData.append(ftype, data);
			var headers = {
				'apiKey': services.leonardo.api_key,
				'Accept': 'application/json'
			};
			// console.log(options);
			request.post({
				url: url,
				form: JSON.stringify(formData),
				headers: headers
			}, (err, res, body) => {
				if (err) {
					return console.error("[ERROR]", err);
				}
				// console.log("res", res);
				console.log("body", body);
			});
			res.send({
				url: url,
				api_key: services.leonardo.api_key,
				ftype: ftype
			});
		});
		// formData.append(ftype, fs.readFile(newPath), uploadFileName);
		// formData.append(ftype, fs.readFileSync(files.file.path), {filename:files.file.name});
		// var newForm = {
		// 	ftype: fs.readFile(files.file.path)
		// };

		// console.log("formdata", formData);
		// form.append(ftype, files.file, files.file.name);
		// var headers = {
		// 	'apiKey': services.leonardo.api_key,
		// 	'Accept': 'application/json'
		// };
		// // console.log(options);
		// request.post({
		// 	url: url,
		// 	formData: formData,
		// 	headers: headers
		// }, (err, res, body) => {
		// 	if (err) {
		// 		return console.error("[ERROR]", err);
		// 	}
		// 	// console.log("res", res);
		// 	console.log("body", body);
		// });
		// console.log("[INFO] ftype", ftype);
		// console.log("[INFO] files", files.file.name);
		// res.send({
		// 	url: url,
		// 	api_key: services.leonardo.api_key,
		// 	ftype: ftype
		// });
		// });
	});
	// form.on('file', function (name, file) {
	// 	console.log('Uploaded ' + file.name);
	// 	console.log(file);
	// });
	// Use the following command to get all services, and info required for the .getServices function to work correctly.
	// console.log(xsenv.readCFServices());
	// const services = xsenv.getServices({
	// 	leonardo: {
	// 		name: "LEONARDO",
	// 		label: "user-provided"
	// 	}
	// });
	// console.log(services.leonardo.api_key);

	// var url = "";
	// var ftype = "";
	// switch (req.body.option) {
	// case "option1":
	// 	url = 'https://sandbox.api.sap.com/ml/facedetection/face-detection';
	// 	ftype = 'files';
	// 	break;
	// case "option2":
	// 	url = 'https://sandbox.api.sap.com/ml/humandetection/human-detection/';
	// 	ftype = 'file';
	// 	break;
	// case "option3":
	// 	url = 'https://sandbox.api.sap.com/ml/imageclassification/classification';
	// 	ftype = 'files';
	// 	break;
	// }
	// res.send({
	// 	url: url,
	// 	api_key: services.leonardo.api_key,
	// 	ftype: ftype
	// });
});
// classification = (req, res, next) =>{
// 	var url = 'https://sandbox.api.sap.com/ml/imageclassification/classification';
// };
// exports.human = (req, res, next) =>{
// 	var url = 'https://sandbox.api.sap.com/ml/humandetection/human-detection';
// };
// exports.face = (req, res, next) =>{
// 	var url = 'https://sandbox.api.sap.com/ml/facedetection/face-detection';
// };

module.exports = router;