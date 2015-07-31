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

  getAllForms: function () {
    return _input;
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

InputStore.setMaxListeners(0);

function updateField(form, field, value, valid) {
  if (_input[form]) {
    // console.log('[%s] %s: %s', form, field, value)
    _input[form][field] = value;
  } else {
    console.error('[form] undefined form', form);
  }
}

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {

    case Constants.CREATE_FORM:
      if (!action.formId) {
        console.error('[form] mising formid', action.formId);
      } else if (_input[action.formId]) {
        // noop
      } else {
        _input[action.formId] = {};
      }
      break;

    case Constants.RESET_FORM:
      _input[action.formId] = {};
      InputStore.emit(action.formId);
      break;

    case Constants.SET_FIELD:
      if (InputStore.getField(action.formId, action.fieldId)) {
        return;
      } else {
        updateField(action.formId, 
          action.fieldId, 
          action.value);
      }
      break;

    case Constants.UPDATE_FIELD:
      updateField(action.formId, 
          action.fieldId, 
          action.value);
      InputStore.emit(action.formId);
      break;

    case Constants.SUBMIT_FORM:
      // hack to trigger validation
      InputStore.emit(action.formId+'submit');
      break;

    default:
      // no op
  }
});

module.exports = InputStore;