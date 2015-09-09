
var express = require('express'),
	assign = require('lodash').assign,
  isEmpty = require('lodash').isEmpty,
  router = express.Router();
  
router.get('/user', function(req, res, next) {
  var q = req.query;
  var profiles = {};

  if (q.LOL_id) profiles.LOL = {
    name: q.LOL_id,
    status: 'good'
  };
  if (q.WOW_id) profiles.WOW = {
    name: q.WOW_id,
    status: 'good'
  };
  if (q.BF4_id) profiles.BF4 = {
    name: q.BF4_id,
    status: 'taken'
  };
  if (q.BFHD_id) profiles.BFHD = {
    name: q.BFHD_id,
    status: 'missing'
  };

  if (isEmpty(profiles)) {
    return res.json({
      error: {
        title: 'Sorry',
        message: 'notFound'
      }
    });
  }

	setTimeout(function () {
		res.json(profiles);
	}, Math.random() < .9 ? 1500 : 200);
});

router.post('/submit', function(req, res, next) {
  setTimeout(function () {
    res.json(JSON.parse(req.query.survey));
  }, Math.random() < .9 ? 1500 : 200);
});

module.exports = router;