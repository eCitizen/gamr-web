
var request = require('superagent');
var surveyActions = require('../survey/actions');
var guide;

module.exports = guide = {};

guide.config = function (config) {
  guide.identity = config.identity;
  guide.assets = config.assets;
  guide.survey = config.survey;
  guide.gamerTypes = config.gamerTypes;
  guide.socialAssets = config.socialAssets;
  guide.socialDescription = config.socialDescription;

  // set up survey store
  surveyActions.createSurveys(config.survey);
}


