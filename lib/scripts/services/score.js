
function getResults(forms, surveyKey, guide) {
  var formName;
  
  for (formName in forms) {
    var formGuide = guide[formName];

    if (formGuide) {
      var responses = forms[formName];
      
      for (r in responses) {
        var answer = responses[r];
        var question = r.replace(formGuide.id, '');

        console.log(parseInt(response.replace(formGuide.id, '')));
      }
    }
    
    // console.log(guide[formName])
    // console.log(formName);
  }
}

function getProfile(results, surveyKey, guide) {

}

module.exports.makeResultsFn = function (surveyKey, guide) {
  return function (forms) {
    getResults(forms, surveyKey, guide);
  }
}

module.exports.makeProfileFn = function (surveyKey, guide) {
  return function (results) {
    getProfile(results, surveyKey, guide);
  }
}


// TODO: get this dynamically

var surveyKey = require('./surveyKey');
var guide = require('../../../stubs/survey.json');
var get = module.exports.makeResultsFn(surveyKey, guide);

get({
  gamerType: {
    LOTR0: 2,
    LOTR1: 1,
    LOTR2: 4
  }
});