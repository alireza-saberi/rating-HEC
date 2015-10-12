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

// update has problem
app.put('/condidateslist/:indx', function (req, res) {
	console.log('I received a PUT request');
  var index = req.params.indx;
  console.log(req.body.name);
  candidateList[index].name = req.body.name;
  res.json(candidateList);
 //  db.contactlist.findAndModify({
 //    query: {_id: mongojs.ObjectId(id)},
 //    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
 //    new: true}, function (err, doc) {
 //      res.json(doc);
 //    }
  // );

});
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

// updating candiate rating
app.put('/candide/:id', function(req, res){
  console.log('I received a PUT request to update a candide');
  var id = req.params.id;
  candidateList[id] = req.body;
  res.json(candidateList);
});

app.listen(port, function(){
	console.log("Server is listening at the port: " + port);
});