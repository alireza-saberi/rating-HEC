module.exports = function(app, express, db, bodyParser, mongojs){

app.use(bodyParser.json());

// GET candiates list
app.get('/condidateslist', function (req, res) {
	console.log('Server: I get a GET request');
	db.candidateList.find(function (err, docs) {
    res.json(docs);
  })
  });

// GET a candiate
app.get('/candide/:id', function (req, res) {
  var id = req.params.id;
  console.log('Server: I get a DELETE request for a user');
  db.candidateList.find({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

// Adding a new candiate
app.post('/condidateslist', function (req, res) {
  console.log('Server: I get a POST request to add a new candidate');
  db.candidateList.insert(req.body, function(err, doc) {
      res.json(doc);
    });
  });

// Deleting a candiate
app.delete('/condidateslist/:id', function (req, res) {
  var id = req.params.id;
  console.log('Server: I get a DELETE request for a user');
  db.candidateList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

// Updating a candiate rating
app.put('/candide/:id', function(req, res){
  var id = req.params.id;
  console.log('Server: I get a PUT request to update a candide' + id);
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

// Updating a candidate name
app.put('/condidateslist/:id', function (req, res) {
	console.log('Server: I received a PUT request');
  	var id = req.params.id;
  	db.candidateList.findAndModify({
    	query: {_id: mongojs.ObjectId(id)},
    	update: {$set: {name: req.body.name}},
    	new: true},
    	 function (err, doc) {
      							res.json(doc);
    }
  );

});
}