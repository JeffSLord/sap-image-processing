var express = require("express");
var router = express.Router();
const xsenv = require("@sap/xsenv");

router.get('/', (req, res, next) => {
	console.log("[SUCCESS] calling /");
	res.send('leonardo');
});

router.post('/url', (req, res, next) => {
	console.log("[SUCCESS] calling /url ");
	
	// Use the following command to get all services, and info required for the .getServices function to work correctly.
	// console.log(xsenv.readCFServices());
	const services = xsenv.getServices({
		leonardo: {
			name: "LEONARDO",
			label: "user-provided"
		}
	});
	// console.log(services.leonardo.api_key);
	
	var url = "";
	var ftype = "";
	switch(req.body.option){
		case "option1":
			url = 'https://sandbox.api.sap.com/ml/facedetection/face-detection';
			ftype='files';
			break;
		case "option2":
			url = 'https://sandbox.api.sap.com/ml/humandetection/human-detection/';
			ftype='file';
			break;
		case "option3":
			url = 'https://sandbox.api.sap.com/ml/imageclassification/classification';
			ftype='files';
			break;
	}
	res.send({
		url: url,
		api_key: services.leonardo.api_key,
		ftype: ftype
	});
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