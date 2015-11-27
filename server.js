/******** Requiring libraries ********/
var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('candidateList',['candidateList']);
var knox = require('knox');
var fs = require('fs');
var os = require('os');
var formidable = require('formidable');
var gm = require('gm');
var app = express();

/******** Setting ********/
app.disable('x-powered-by');
app.set('port', 8000 || process.env.PORT);
var config = require('./config/config.js');
var client = knox.createClient({
    key: config.S3AccessKey,
    secret: config.S3Secret,
    bucket: config.S3bucket
});

/******** Routing ********/
app.use(express.static(__dirname + '/public'));
require('./routes/routes.js')(app, express, db, bodyParser, mongojs, fs, os, config, formidable, gm, client);

//404
app.use(function(req,res){

});
//500
app.use(function(req, res, next){

});

app.listen(app.get('port'), function(){
	console.log('Server is listening on port ' + app.get('port') + '. Press CTRL-C to terminate.');
});