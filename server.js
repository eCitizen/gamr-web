var express = require('express'),
  path = require('path'),
  config = require('./config.json'),
  mustacheExpress = require('mustache-express'),
  assign = require('lodash').assign,
  app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/assets',express.static(__dirname + '/dist'));

app.use('/api', require('./dummyApi'));

app.get('*', function (req, res) {
	var pageData = assign({
		identity: require('./stubs/identity.json'),
		survey: require('./stubs/survey.json'),
	}, config[process.env.NODE_ENV || 'dev']);

  res.render('index', pageData);
});

var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address,
    port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});