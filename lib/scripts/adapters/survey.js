
module.exports = function adaptSurvey(formData) {
  return {surveys: JSON.stringify(formData.surveys)};
}