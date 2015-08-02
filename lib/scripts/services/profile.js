
var makePack = require('./packer').makePack;
var makeUnpack = require('./packer').makeUnpack;

module.exports.createHash = function (forms) {
  return 'abc123';
}

var surveyKey = {
  personality: [
    {
      title: 'Openness to Experience',
      total: 100
    },{
      title: 'Conscientiousness',
      total: 100
    },{
      title: 'Extraversion',
      total: 100
    },{
      title: 'Agreeableness',
      total: 100
    },{
      title: 'Emotional Stability',
      total: 100
    }
  ],
  brainType: [
    {
      title: 'Empathizing',
      total: 100
    },{
      title: 'Systematizing',
      total: 100
    }
  ],
  gamerType: [
    {
      title: 'Achievement',
      options: ['G', 'X']
    },{
      title: 'Social',
      options: ['M', 'S']
    },{
      title: 'Immersion',
      options: ['F', 'Y'] 
    },{
      title: 'Arousal',
      options: ['E', 'R']
    }
  ]
}

function randomV() {
  return Math.floor(Math.random() * 100);
}

function randomA(a , b) {
  return Math.random() < 0.5 ? a : b;
}

var profile = {
  personality: [randomV(), randomV(), randomV(), randomV(), randomV()],
  gamerType: [randomA('G', 'X'), randomA('M', 'S'), randomA('F', 'Y'), randomA('E', 'R')],
  brainType: [randomV(), randomV()]
};

var packResults = makePack(surveyKey);
var unpackResults = makeUnpack(surveyKey); 

var packed = packResults(profile);
var unpacked = unpackResults(packed);
var confirm = packResults(unpacked);
var unPackedAgain = unpackResults(confirm);

console.log('No side effects:', packed === confirm)
console.log('Hash:', packed);
console.log('Profile:', profile);
