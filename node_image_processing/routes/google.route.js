var express = require("express");
var router = express.Router();
const xsenv = require("@sap/xsenv");
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

router.get('/', (req, res, next) => {
	console.log("[SUCCESS] calling /");
	res.send('google');
});

router.post('/url', async(req, res, next) => {
	try {
		console.log("[SUCCESS] calling /url ");
		// Creates a client

		/**
		 * TODO(developer): Uncomment the following line before running the sample.
		 */
		const fileName = '../img/test.png';

		// Performs text detection on the local file
		const [result] = await client.textDetection(fileName);
		const detections = result.textAnnotations;
		console.log('Text:');
		detections.forEach(text => console.log(text));
	} catch (e) {
		next(e);
	}
});

module.exports = router;