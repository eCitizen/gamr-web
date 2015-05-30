var express = require('express'),
  path = require('path'),
  mustacheExpress = require('mustache-express'),
  app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/dist'));

app.use('/api', require('./dummyApi'));

app.get('/', function (req, res) {
  var env = process.env.NODE_ENV;
  res.render('index', {
    script: env === 'prod' ? 'gamr.min.js' : 'gamr.js',
    style: env === 'prod' ? 'gamr.min.css' : 'gamr.css'
  });
});

var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address,
    port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});