
var surveyKey = require('./surveyKey');
var packResults = require('./packer').makePack(surveyKey);
var unpackResults = require('./packer').makeUnpack(surveyKey);
var getResults = require('./score').makeScoresFn(surveyKey);
// var getProfile = require('./score').makeProfileFn(surveyKey);

module.exports.getScores = function (surveys) {
  return getResults(surveys);
}

module.exports.createHash = function (forms) {
  console.log(forms);
  return 'abc123';
}

function randomV() {
  return Math.floor(Math.random() * 100);
}

function randomA(a , b) {
  return Math.random() < 0.5 ? a : b;
}

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




