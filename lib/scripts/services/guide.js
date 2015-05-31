
var request = require('superagent'),
  guide;

module.exports = guide = {};

guide.config = function (config) {
  guide.survey = config.survey;
  guide.identity = config.identity;
}


