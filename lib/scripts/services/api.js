
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
  .post(api.host + '/submit')
  .send(surveyAdapter(data))
  .end(function (err, res) {
    try {
      cb(err, JSON.parse(res.text));    
    } catch (e) {
      cb(new Error('404'), {});
    }
  });
};

api.getUser = function (data, cb) {
  if (!api.host) return cb(null, {});

  getJson(api.host + '/user', identityAdapter(data), function(err, user) {
    cb((user.error || err), user);
  });
};

function getJson(path, query, cb) {
  if (arguments.length === 2) {
    cb = query;
    query = {};
  }
  request
  .get(path)
  .query(query)
  .end(function (err, res) {
    try {
      cb(err, JSON.parse(res.text));    
    } catch (e) {
      cb(new Error('404'), {});
    }
  });
}
