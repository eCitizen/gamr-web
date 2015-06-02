
var AppDispatcher = require('../dispatcher/AppDispatcher'),
  Constants = require('./constants'),
  InputActions;

module.exports = InputActions = {
  test: function(text) {
    AppDispatcher.dispatch({
      actionType: Constants.TEST,
      text: text
    });
  },

  updateField: function(formId, fieldId, value, valid) {
  	AppDispatcher.dispatch({
      actionType: Constants.UPDATE_FIELD,
      formId: formId,
      fieldId: fieldId,
      value: value,
      valid: valid || true
    });
  }
};
