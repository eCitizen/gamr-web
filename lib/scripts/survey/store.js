var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var inputStore = require('../input/store');

var profileSvc = require('../services/profile');

var _surveys = {};

function answerQuestion(id, qIdx, answer) {
  var survey = _surveys[id];
  var question = survey.questions[qIdx];
  var scale = question.inverted ? survey.scaleValues.slice().reverse() : survey.scaleValues;
  
  survey.lastAnswerd = qIdx;
  question.answer = answer;
  question.answerIdx = survey.scale.indexOf(answer);
  question.answerValue = scale[survey.scale.indexOf(answer)];

  if (qIdx === survey.questions.length - 1) {
    survey.complete = true;
  }
  
  // console.log('[%s] %s {%s: %s}', id, question.text, answer, question.answerValue);
}

var InputStore = assign({}, EventEmitter.prototype, {
  getAllSurveys: function (id) {
    return _surveys;
  },

  getSurvey: function (id) {
    return _surveys[id];
  },

  isComplete: function (id) {
    return !!_surveys[id].complete;
  },

  getQuestion: function (id, qIdx) {
    var survey = _surveys[id];
    var question = survey.questions[qIdx];
    return assign({
      choices: survey.scale
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
    // console.info('Get Form Data');
    var form = {};
    for (surveyName in _surveys) {
      var survey = _surveys[surveyName];
      var id = survey.id;
      survey.questions.forEach(function (question, idx) {
        var qId = (question.surveyId || id) + idx;
        form[qId] = question.answer;
        // console.log('[Form Data] %s: %s', qId, question.answer);
        
      });
    }
    return form;
  },

  getPlainFormData: function() {
    var data = { surveys: [] };

    data.surveys.push({
      title: 'Identity',
      form: inputStore.getForm('identity')
    });

    data.surveys.push({
      title: 'Consent',
      form: inputStore.getForm('consent')
    });

    // todo: this order should be tied to user experience
    ['brainType', 'personality', 'gamerType'].forEach(function (key) {
      data.surveys.push({
        title: _surveys[key].title,
        statements: _surveys[key].questions.map(function (q) {
          return {
            statement: q.text,
            response: q.answer || null
          }
        })
      })
    });

    return data;
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
