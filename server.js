var fs = require('fs');
var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var app = express();


app.post('/fileupload', upload.any(), function (req, res, next) {
  var ans = {
    file_size: req.files[0].size
  };
  res.json(ans);
  
  // Delete the file so the disk doesn't fill up
  fs.unlink(req.files[0].path, (err) => {
    if (err) throw err;
    console.log('Received and deleted '+ req.files[0].path + ' (was ' + req.files[0].size + ' bytes)');
  });
})

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

