
var express = require('express'),
  router = express.Router();

router.get('/user', function(req, res, next) {
  res.json({
    hello: false
  });
});

router.get('/questions', function(req, res, next) {
  res.json({
    id: 'testId',
    sections: [
      {
        title: 'Brain Type',
        instructions: 'Here are Some instructions',
        scale: 5,
        questions: [
          'Are you satisfied?'
        ]
      }
    ]
  });
});

module.exports = router;