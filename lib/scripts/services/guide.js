
var api = require('./api');

module.exports = new Guide();

var pages = {
  intro: 'intro',
  consent: 'consent',
  info: 'id',
  survey: 'survey',
  profile: 'profile'
};

function Guide () {
  var component,
    data = {},
    answers = {},
    state = {
      waiting: true,
      section: 0,
      question: 0
    };

  this.state = state;

  this.handle = function (c) {
    component = c;
  };

  this.start = function () {
    api.getQuestions(function (questions) {
      data.form = questions;
      component.setState({
        waiting: false
      });
    });
  };
}


