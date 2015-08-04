
var surveyKey = require('./surveyKey');
var packResults = require('./packer').makePack(surveyKey);
var unpackResults = require('./packer').makeUnpack(surveyKey);

module.exports.getScores = function (surveys) {
  var scores = {};

  for (surveyName in surveys) {
    if (surveyKey[surveyName]) {
      var survey = surveys[surveyName];
      var dimensions = {};
      var categories = {};

      survey.questions.forEach(function (question) {
        var d = survey.dimensions[question.dimension];
        var c = survey.categories ? survey.categories[question.category] : null;
        var a = question.answer || 2; // TODO: 2 is for testing
        
        if (d) dimensions[d] = dimensions[d] ? dimensions[d] + a : a;
        if (c) categories[c] = categories[c] ? categories[c] + a : a;
      });

      for (d in dimensions) {
        console.log('[Scores:dimension] (%s) %s: %s', surveyName, d, dimensions[d]);  
      }

      for (c in categories) {
        console.log('[Scores:category] (%s) %s: %s', surveyName, c, categories[c]);  
      }      

      scores[surveyName] = {
        dimensions: dimensions,
        categories: categories
      };
    }
  }

  return scores;
}

module.exports.getProfile = function (scores) {
  var profile = {};

  for (surveyName in scores) {
    if (surveyKey[surveyName]) {
      data = [];
      surveyKey[surveyName].forEach(function (dimension) {
        var value;
        var missing;
        if (dimension.total) {
          value = scores[surveyName].dimensions[dimension.title];
          missing = !!!value;
        } else {
          missing = !!!scores[surveyName].categories[dimension.title];
          value = scores[surveyName].categories[dimension.title] > dimension.threshold ? 
                    dimension.options[1] : dimension.options[0];
        }

        if (missing) {
          // throw new Error('[bad value] ' + dimension.title);
          console.error('[Undefined value] ' + dimension.title);
          value = dimension.total ? 0 : dimension.options[0];
        }
        
        console.log('[Profile] (%s) %s: %s', surveyName, dimension.title, value);
        
        data.push(value);
      });
      profile[surveyName] = data;
    }
  }
  return profile;
}

module.exports.encodeProfile = function (profile) {
  var encoded = packResults(profile);
  console.log('[Encoded Profile]', encoded, packResults(unpackResults(encoded)) === encoded);
  return encoded;
}

// function randomV() {
//   return Math.floor(Math.random() * 100);
// }

// function randomA(a , b) {
//   return Math.random() < 0.5 ? a : b;
// }

// var profile = {
//   personality: [randomV(), randomV(), randomV(), randomV(), randomV()],
//   gamerType: [randomA('G', 'X'), randomA('M', 'S'), randomA('F', 'Y'), randomA('E', 'R')],
//   brainType: [randomV(), randomV()]
// };

// var packed = packResults(profile);
// var unpacked = unpackResults(packed);
// var confirm = packResults(unpacked);
// var unPackedAgain = unpackResults(confirm);

// console.log('No side effects:', packed === confirm)
// console.log('Hash:', packed);
// console.log('Profile:', profile);




