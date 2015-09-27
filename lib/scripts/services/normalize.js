
module.exports = {
  personality: function(dimension, value) {

    // between 10 and 50 and stretched to 100
    return Math.floor(((value - 10) / 40) * 100);
    // return value * 2;
  },
  brainType: function(dimension, value) {
    return value;
  }
}
