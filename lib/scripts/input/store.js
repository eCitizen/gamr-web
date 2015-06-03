var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _input = {};

var InputStore = assign({}, EventEmitter.prototype, {
  getField: function (form, field) {
    return _input[form] && _input[form][field];
  },

  getForm: function (form, field) {
    return _input[form] || {};
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

function updateField(form, field, value, valid) {
  if (!_input[form]) {
    _input[form] = {};
  }
  _input[form][field] = value;
  _input[form].valid = valid === false ? false : (_input[form].valid || true);
}

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case Constants.CREATE_FORM:
      if (!_input[action.formId]) {
        _input[action.formId] = {};
      }
      break;

    case Constants.RESET_FORM:
      _input[action.formId] = {};
      InputStore.emit(action.formId);
      break;

    case Constants.SET_FIELD:
      updateField(action.formId, 
          action.fieldId, 
          action.value);
      break;

    case Constants.UPDATE_FIELD:
      updateField(action.formId, 
          action.fieldId, 
          action.value, 
          action.valid);
      InputStore.emit(action.formId);
      break;

    default:
      // no op
  }
});

module.exports = InputStore;