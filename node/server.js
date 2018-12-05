/*eslint no-console: 0*/
"use strict";

// var http = require("http");
var express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Image Processing Application'));

app.listen(port, ()=>{
	console.log(`Application listening on port ${port}`);
});

// http.createServer(function (req, res) {
//   res.writeHead(200, {"Content-Type": "text/plain"});
//   res.end("Hello World\n");
// }).listen(port);

console.log("Server listening on port %d", port);
