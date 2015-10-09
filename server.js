var express = require('express');
var app = express();
var port = 8000 | process.env.PORT;

app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
	console.log("Server is listening at the port: " + port);
});