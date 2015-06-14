
var AppDispatcher = require('../dispatcher/AppDispatcher'),
  Constants = require('./constants'),
  InputActions;

module.exports = InputActions = {
  createForm: function(formId) {
    AppDispatcher.dispatch({
      actionType: Constants.CREATE_FORM,
      formId: formId
    });
  },

  resetForm: function(formId) {
    AppDispatcher.dispatch({
      actionType: Constants.RESET_FORM,
      formId: formId
    });
  },

  setField: function(formId, fieldId, value) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_FIELD,
      formId: formId,
      fieldId: fieldId,
      value: value
    });
  },

  updateField: function(formId, fieldId, value, valid) {
    AppDispatcher.dispatch({
      actionType: Constants.UPDATE_FIELD,
      formId: formId,
      fieldId: fieldId,
      value: value
    });
  }
};
