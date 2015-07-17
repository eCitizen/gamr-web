
var patterns = require('./patterns');

module.exports = function(patternId, action, frameInterval) {
  frameInterval = frameInterval || 100;
  
  if (!patterns.hasOwnProperty(patternId)) {
    throw new Error('[animator] pattern not defined: ' + patternId);
  }

  var pattern = patterns[patternId];


  
  

}

module.exports('arrow', 20)
