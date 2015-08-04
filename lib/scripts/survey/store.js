var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var profileSvc = require('../services/profile');

var _surveys = {};

function answerQuestion(id, qIdx, answer) {
  var survey = _surveys[id];
  var question = survey.questions[qIdx];
  survey.lastAnswerd = qIdx;
  question.answer = answer;
  console.log('[%s] %s {%s}', id, question.text, answer);
}

var InputStore = assign({}, EventEmitter.prototype, {
  getSurvey: function (id) {
    return _surveys[id];
  },

  getQuestion: function (id, qIdx) {
    var survey = _surveys[id];
    var question = survey.questions[qIdx];

    // if the question is phrased negatively
    // we invert the answer scale
    return assign({
      choices: question.inverted ? survey.scaleValues.slice().reverse() : survey.scaleValues
    }, question);
  },

  getScores: function () {
    return profileSvc.getScores(_surveys);
  },

  getProfile: function() {
    return profileSvc.getProfile(profileSvc.getScores(_surveys));
  },

  getProfileHash: function() {
    return profileSvc.encodeProfile(profileSvc.getProfile(profileSvc.getScores(_surveys)));
  },

  decodeProfile: function (encoded) {
    return profileSvc.decodeProfile(encoded);
  },

  getFormData: function() {
    console.info('Get Form Data');
    var form = {};
    for (surveyName in _surveys) {
      var survey = _surveys[surveyName];
      var id = survey.id;
      survey.questions.forEach(function (question, idx) {
        console.log('[Form Data] %s: %s', (id + idx), question.answer);
        form[id + idx] = question.answer;
      });
    }
    return form;
  },

  getLength: function (id) {
    return _surveys[id].questions.length;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

InputStore.setMaxListeners(0);

AppDispatcher.register(function(action) {
  switch(action.actionType) {

    case Constants.SURVEY_INIT:
      _surveys = action.surveys;
      InputStore.emitChange();
      break;

    case Constants.SURVEY_UPDATE:
      answerQuestion(action.surveyId, action.question, action.answer);
      InputStore.emit(action.surveyId);
      break;

    default:
      // no op
  }
});

module.exports = InputStore;
