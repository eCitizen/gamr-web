var express = require('express'),
  path = require('path'),
  config = require('./config.json'),
  mustacheExpress = require('mustache-express'),
  app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/assets',express.static(__dirname + '/dist'));

app.use('/api', require('./dummyApi'));

app.get('*', function (req, res) {
  res.render('index', config[process.env.NODE_ENV || 'dev']);
});

var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address,
    port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});