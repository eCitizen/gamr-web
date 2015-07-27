
var express = require('express'),
	assign = require('lodash').assign,
  router = express.Router();
  
router.get('/user', function(req, res, next) {
  var q = req.query;
  var profiles = {};

  if (q.LOL_id) profiles.LOL = {id: q.LOL_id};
  if (q.WOW_id) profiles.WOW = {id: q.WOW_id};
  if (q.BF4_id) profiles.BF4 = {id: q.BF4_id};
  if (q.BFHD_id) profiles.BFHD = {id: q.BFHD_id};

	setTimeout(function () {
		res.json(profiles);
	}, Math.random() < .3 ? 1000 : 0);
});

module.exports = router;