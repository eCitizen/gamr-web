
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('./constants');
var surveyActions;

module.exports = surveyActions = {
  createSurveys: function(surveys) {
    AppDispatcher.dispatch({
      actionType: Constants.SURVEY_INIT,
      surveys: surveys
    });
  },

  answerQuestion: function(id, questionIdx, answer) {
    AppDispatcher.dispatch({
      actionType: Constants.SURVEY_UPDATE,
      surveyId: id,
      question: questionIdx,
      answer: answer
    });
  }
};
