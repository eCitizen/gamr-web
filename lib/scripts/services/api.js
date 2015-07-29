
var request = require('superagent'),
  api;

module.exports = api = {};

api.config = function (config) {
  api.host = config.api;
};

api.getQuestions = function (cb) {
  getJson(api.host + '/questions', cb);
};

api.getUser = function (data, cb) {
  getJson(api.host + '/user', data, cb);
};

function getJson(path, query, cb) {
  if (arguments.length === 2) {
    cb = query;
    query = {};
  }
  request
  .get(path)
  .query(query)
  .end(handleError(function (res) {
    try {
      cb(null, JSON.parse(res.text));    
    } catch (e) {
      cb(new Error('Bad Data'), {});
    }
  }));
}

function handleError(cb) {
  return function (err, res) {
    if (err) {
      console.error('[api]', err.message);
      cb({});
    } else {
      cb(res);
    }
  };
}