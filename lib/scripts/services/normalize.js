
var EQ_MIN = 0;
var EQ_MAX = 32;
var SQ_MIN = 0;
var SQ_MAX = 32;

function scaleto100(min, max) {
  return function (v) {
    return (v - min) / (max - min) * 100;  
  }
}

var scaleEQ = scaleto100(EQ_MIN, EQ_MAX);
var scaleSQ = scaleto100(SQ_MIN, SQ_MAX);

module.exports = {
  personality: function(dimension, value) {
    return value * 2;
  },
  brainType: function(dimension, value) {
    return {
      score: (dimension === 'Empathizing') ? scaleEQ(value) : scaleSQ(value),
      raw: value
    }
  }
}
