
var express = require('express'),
	assign = require('lodash').assign,
  isEmpty = require('lodash').isEmpty,
  router = express.Router();
  
router.get('/user', function(req, res, next) {
  var q = req.query;
  var profiles = {};

  if (q.LOL_id) profiles.LOL = {id: q.LOL_id};
  if (q.WOW_id) profiles.WOW = {id: q.WOW_id};
  if (q.BF4_id) profiles.BF4 = {id: q.BF4_id};
  if (q.BFHD_id) profiles.BFHD = {id: q.BFHD_id};

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