
module.exports.makeScoresFn = function (surveyKey) {
  return function (surveyState) {
    return getScores(surveyState, surveyKey);
  }
}

function getScores (state, key) {
  var scores = {};

  for (surveyName in state) {
    if (key[surveyName]) {
      var survey = state[surveyName];
      var dimensions = {};
      var categories = {};

      survey.questions.forEach(function (question) {
        var d = survey.dimensions[question.dimension];
        var c = survey.categories ? survey.categories[question.category] : null;
        var a = question.answer || 2; // TODO: 2 is for testing
        
        if (d) dimensions[d] = dimensions[d] ? dimensions[d] + a : a;
        if (c) categories[c] = categories[c] ? categories[c] + a : a;
      });

      scores[surveyName] = {
        dimensions: dimensions,
        categories: categories
      };
    }
  }

  console.log(scores);
}
