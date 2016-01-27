var request = require('superagent');
var identityAdapter = require('../adapters/identity');
var surveyAdapter = require('../adapters/survey');
var api;

module.exports = api = {};

api.config = function (config) {
  api.host = config.api;
};

api.submitQuestions = function (data, cb) {
  if (!api.host) return cb(null, {});

  request
  .post(api.host + '/questions')
  .type('form')
  .send(surveyAdapter(data))
  // .set('Accept', 'application/json')
  .end(function (err, res) {
    try {
      cb(err, JSON.parse(res.body));
    } catch (e) {
      cb(new Error('404'), {});
    }
  });
};
