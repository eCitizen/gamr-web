
var express = require('express'),
	assign = require('lodash').assign,
  router = express.Router();
  
router.get('/user', function(req, res, next) {
	setTimeout(function () {
    console.log(req.query)
		res.json(assign(
			{}, 
			require('./stubs/survey.json'), 
			require('./stubs/user.json')[req.query.name]
		));
	}, 500);
});

router.get('/questions', function(req, res, next) {
	setTimeout(function () {
  	res.json(require('./stubs/survey.json'));
  }, 500);
});

module.exports = router;