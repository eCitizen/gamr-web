var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _input = {};

var InputStore = assign({}, EventEmitter.prototype, {
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

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  console.log(action);
  switch(action.actionType) {
    case Constants.TEST:
      var text = action.text.trim();
      if (text !== '') {
        console.log('Text:', text);
        InputStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = InputStore;