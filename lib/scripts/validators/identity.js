
var required = [
  'gender',
  'birth_month',
  'birth_year',
  'country',
  'english_lvl'
];

var prefixes = ['BF4', 'BFHD', 'LOL', 'WOW'];
var preRE = /^([^\_]+)/;

module.exports = function getFormErrors(form) {
  var grouped = {};

  for (var k in form) {
    if (form.hasOwnProperty(k)) {
      var pre = k.match(preRE)[1];
      grouped[pre] = grouped[pre] || [];
      grouped[pre].push(form[k]);
    }
  }

  return {
    invalidGamerProfiles: prefixes.filter(function (game) {
      var missing = grouped[game].filter(function(v) {
        return !v;
      }).length;
      return missing > 0;
    }),
    invalidFields: required.filter(function (field) {
      return !form[field];
    })
  }

  return false;
}