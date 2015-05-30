
var request = require('superagent'),
  api;

module.exports = api = {};

api.config = function (config) {
  api.host = config.api;
  api.path = {
    questions: api.host + '/questions'
  };
};

api.getQuestions = function (cb) {
  getJson(api.path.questions);
};

function getJson(path) {
  request
  .get(path)
  .end(handleError(function (res) {
    console.log(JSON.parse(res.text));
  }));
}

function handleError(cb) {
  return function (err, res) {
    if (err) {
      console.error('[api]', err.message);
    } else {
      cb(res);
    }
  };
}