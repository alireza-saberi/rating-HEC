module.exports = function(app, express, db, bodyParser, mongojs, fs, os, config, formidable, gm, client){

app.use(bodyParser.json());

// GET candiates list
app.get('/condidateslist', function (req, res) {
	console.log('Server: I get a GET request');
	db.candidateList.find(function (err, docs) {
    //console.log(docs);
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
                    },
      totalVote: req.body.totalVote
                  }

    },
    new: true}, function (err, doc) {
      res.json(doc);
    });
});

// uploading an image
app.post('/image/:id', function(req, res, next){
     var id = req.params.id;
     console.log('Server: I get a PUT request to update an image for candide');
     var form = new formidable.IncomingForm();
     form.keepExtensions = true;
     var temp, filename, extn, nFileName, nFile;
     form.parse(req, function(err, fields, files){
         temp = files.file.path;
         filename = files.file.name;
         //console.log("file name is ",  filename);
         //console.log("temp is ",  temp);
         extn = filename.split(".").pop();
         //console.log("extension  is ",  extn);
         nFileName = id + '.' + extn;
         // nFile = os.tmpDir() + '/' + nFileName;
         nFile = nFileName;
         //console.log('nFile is ', nFile)
         res.writeHead(200, {'Content-type' : 'text/plain'});
         res.end();
      });
     form.on('end', function(){
        fs.rename(temp, nFile, function(err){
          if (err) throw err; 
          // resize this image and send it to S3 bucket
          gm(nFile).resize(150).write(nFile, function(err){
            if (!err) console.log('Resizing is done');
            // uploading to S3 bucket
            fs.readFile(nFile, function(error, buffer){
              if (err) throw err;
              var req = client.put(nFile, {
                                                      'Content-Length': buffer.length,
                                                      'Content-Type': 'image/jpeg'
                                                      });

              req.on('response', function(res){
                                                if (200 == res.statusCode) {
                                                                            // This means that file has successfully upload to S3 bucket
                                                                            //console.log('Image is saved on s3 bucket'); 
                                                                             db.candidateList.findAndModify({
                                                                                query: {_id: mongojs.ObjectId(id)},
                                                                                update:{ $set: {
                                                                                    imageName: nFileName
                                                                                }
                                                                                },
                                                                                new : true
                                                                             }, function (err, doc) {
                                                                              //res.json(doc);
                                                                              });
                                                                            }
                    });
              req.end(buffer);
            });
            })
        });
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

//404
   app.use(function(req, res, next){
    res.status(404);
    res.redirect('404.html');
   });
//500


}