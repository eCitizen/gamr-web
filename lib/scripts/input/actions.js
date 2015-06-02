
var AppDispatcher = require('../dispatcher/AppDispatcher'),
  Constants = require('./constants'),
  InputActions;

module.exports = InputActions = {
  test: function(text) {
    AppDispatcher.dispatch({
      actionType: Constants.TEST,
      text: text
    });
  }
};
