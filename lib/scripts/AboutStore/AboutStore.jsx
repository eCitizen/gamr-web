
// ACTIONS

var AppDispatcher = require('../dispatcher/AppDispatcher');
var OPEN = 'OPEN';
var CLOSE = 'CLOSE';

module.exports.Actions = {
  open: function() {
    AppDispatcher.dispatch({
      actionType: OPEN
    });
  },
  close: function() {
    AppDispatcher.dispatch({
      actionType: CLOSE
    });
  }
};

// STORE

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var isOpen = false;

var AboutStore = assign({}, EventEmitter.prototype, {
  get: function () {
    return isOpen;
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

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case OPEN:
      isOpen = true;
      AboutStore.emitChange();
      break;

    case CLOSE:
      isOpen = false;
      AboutStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports.Store = AboutStore;

