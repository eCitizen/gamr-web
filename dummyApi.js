
var express = require('express'),
  router = express.Router();

router.get('/user', function(req, res, next) {
  res.json({
    hello: false
  });
});

router.get('/questions', function(req, res, next) {
  res.json(require('./stubs/survey.json'));
});

module.exports = router;