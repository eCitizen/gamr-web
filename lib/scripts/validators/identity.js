
var required = [
  'gender',
  'birth_month',
  'birth_year',
  'country',
  'english_lvl'
];

module.exports = function validateIdentity(form) {
  console.log('================================')
  var missing = true;

  var missing = required.filter(function (field) {
    return !form[field];
  });

  if (missing.length > 0) {
    return {
      invalidFields: missing
    }
  }

  // console.log(missing);

  return false;
  return 'invalid';
}