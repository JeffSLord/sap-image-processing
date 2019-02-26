var express = require("express");
var router = express.Router();
const xsenv = require("@sap/xsenv");
const vision = require('@google-cloud/vision');


router.get('/', (req, res, next) => {
	console.log("[SUCCESS] calling /");
	res.send('leonardo');
});

router.post('/url', (req, res, next) => {
	console.log("[SUCCESS] calling /url ");
	
	// Use the following command to get all services, and info required for the .getServices function to work correctly.
	// console.log(xsenv.readCFServices());
	const leonardo_service = xsenv.getServices({
		leonardo: {
			name: "LEONARDO",
			label: "user-provided"
		}
	});
	// console.log(services.leonardo.api_key);
	
	var url = "";
	var ftype = "";
	var api_key=leonardo_service.leonardo.api_key;
	var api_type = "sap";
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
		case "option4":
			url = 'https://vision.googleapis.com/v1/images:annotate?key='+process.env.GOOGLE_API;
			api_key=process.env.GOOGLE_API;
			api_type="google";
			break;
	}
	res.send({
		url: url,
		api_type: api_type,
		api_key: api_key,
		ftype: ftype
	});
});

module.exports = router;