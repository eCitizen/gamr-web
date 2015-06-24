var assign = require('lodash').assign,
  config = require('../config.json');

module.exports = function () {
  return assign({
    identity: require('../stubs/identity.json'),
    survey: require('../stubs/survey.json'),
  }, config[process.env.NODE_ENV || 'dev']);
}