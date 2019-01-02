var express = require("express");
var router = express.Router();
const xsenv = require("@sap/xsenv");

router.get('/', (req, res, next) => {
	console.log("[SUCCESS] calling /");
	res.send('leonardo');
});

router.post('/url', (req, res, next) => {
	console.log("[SUCCESS] calling /url ");
	
	// can't get user-provided service through xsenv?
	console.log(xsenv.readCFServices());
	const services = xsenv.getServices({
		query1: {
			name: "LEONARDO",
			label: "user-provided"
		}
	});
	// console.log(xsenv.getServices({
	// 	LEONARDO: {
	// 		name:"LEONARDO",
	// 		tag:"user-provided"
	// 	}
	// }));
	// console.log(req.body.files);
	// console.log(req.headers);
	// console.log(req.body);
	// console.log(req.files);
	// console.log(req.file);
	// res.send('post');

	// switch(req.body.option){
	// 	case "option1":
	// 		res.send('https://sandbox.api.sap.com/ml/facedetection/face-detection');
	// 		break;
	// 	case "option2":
	// 		res.send('https://sandbox.api.sap.com/ml/humandetection/human-detection');
	// 		break;
	// 	case "option3":
	// 		res.send('https://sandbox.api.sap.com/ml/imageclassification/classification');
	// 		break;
	// }
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