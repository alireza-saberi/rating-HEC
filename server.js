var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongojs = require('mongojs');
var port = 8000 | process.env.PORT;
var db = mongojs('candidateList',['candidateList']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// update candidate name
app.put('/condidateslist/:id', function (req, res) {
	console.log('Server: I received a PUT request');
  var id = req.params.id;
  db.candidateList.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );

});
app.get('/condidateslist', function (req, res) {
  console.log('Server: I get a GET request');
  db.candidateList.find(function (err, docs) {
     res.json(docs);
  })
  });

app.post('/condidateslist', function (req, res) {
  console.log('Server: I get a POST request to add a new candidate');
  db.candidateList.insert(req.body, function(err, doc) {
      res.json(doc);
    });
  });

app.delete('/condidateslist/:id', function (req, res) {
  var id = req.params.id;
  console.log('Server: I get a DELETE request for a user');
  db.candidateList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

// updating candiate rating
app.put('/candide/:id', function(req, res){
  var id = req.params.id;
  console.log('Server: I get a PUT request to update a candide' + id);
  //candidateList[id] = req.body;
  db.candidateList.findAndModify(
    {
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {
      overAllRate: req.body.overAllRate,
      subrates : { item1: req.body.subrates.item1,
                   item2: req.body.subrates.item2,
                   item3: req.body.subrates.item3,
                   item4: req.body.subrates.item4
                    }
                  }
    },
    new: true}, function (err, doc) {
      res.json(doc);
    });
});

app.listen(port, function(){
	console.log("Server is listening at the port: " + port);
});