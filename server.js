var express = require('express'),
  path = require('path'),
  mustacheExpress = require('mustache-express'),
  app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
  res.render('index', {
    script: process.env.NODE_ENV === 'prod' ? 'bundle.min.js' : 'bundle.js'
  });
});

var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address,
    port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});