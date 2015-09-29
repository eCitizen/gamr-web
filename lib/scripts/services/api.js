
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

api.getUser = function (data, cb) {
  if (!api.host) return cb(null, {});

  request
  .post(api.host + '/user')
  .type('form')
  .send(identityAdapter(data))
  // .set('Accept', 'application/json')
  .end(function (err, user) {
    try {
      var data = JSON.parse(user.text);
      cb((data.error || err), data);
    } catch (e) {
      console.log(e);
      cb(new Error('404'), {});
    }
  });
};
