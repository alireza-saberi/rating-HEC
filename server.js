var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongojs = require('mongojs');
var port = 8000 | process.env.PORT;
var db = mongojs('candidateList',['candidateList']);
var knox = require('knox');
var fs = require('fs');
var os = require('os');
var formidable = require('formidable');
var gm = require('gm');
var config = require('./config/config.js');

var client = knox.createClient({
    key: config.S3AccessKey,
    secret: config.S3Secret,
    bucket: config.S3bucket
});

app.use(express.static(__dirname + '/public'));
require('./routes/routes.js')(app, express, db, bodyParser, mongojs, fs, os, config, formidable, gm, client);

app.listen(port, function(){
	console.log("Server is listening at the port: " + port + ". Press ctrl+C to exit.");
});