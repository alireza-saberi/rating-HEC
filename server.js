var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8000 | process.env.PORT;


// initial moving of contact list ot back-end
candidateList = [
		{name:'Ali Saberi', overAllRate: 7, subrates:{item1:1, item2:2, item3:3, item4:4}},
		{name:'Mostafa Purmehdi', overAllRate: 5, subrates:{item1:3, item2:3, item3:3, item4:3}},
		{name:'Sina Sheikh', overAllRate: 2, subrates:{item1:3, item2:3, item3:3, item4:3}},
		{name:'Mirza Abbass', overAllRate: 0, subrates:{item1:3, item2:3, item3:3, item4:3}}
		];

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/condidateslist', function (req, res) {
  console.log('I received a GET request');
  res.json(candidateList);
  // db.contactlist.find(function (err, docs) {
  //   console.log(docs);
  //   res.json(docs);
  });

app.post('/condidateslist', function (req, res) {
  console.log('I received a POST request to add a new candidate');
  candidateList.push(req.body);
  res.json(candidateList);
  // console.log(req.body);
  // db.contactlist.insert(req.body, function(err, doc) {
  // res.json(doc);
  });

app.delete('/condidateslist/:id', function (req, res) {
  var id = req.params.id;
  candidateList.splice(id, 1);
  console.log(candidateList);
  res.json(candidateList);
  // db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
  //   res.json(doc);
  // });
});

app.listen(port, function(){
	console.log("Server is listening at the port: " + port);
});