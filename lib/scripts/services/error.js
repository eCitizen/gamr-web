

var EventEmitter = require('events').EventEmitter;
var errorEvents = new EventEmitter();

module.exports.create = function (config) {
  errorEvents.emit('create', config);
}

module.exports.dismiss = function () {
  console.log('hey')
  errorEvents.emit('dismiss');
}

module.exports.onCreate = function (fn) {
  errorEvents.on('create', fn);
};

module.exports.offCreate = function (fn) {
  resize.removeListener('create', fn);
};

module.exports.onDismiss = function (fn) {
  errorEvents.on('dismiss', fn);
};

module.exports.offDismiss = function (fn) {
  resize.removeListener('dismiss', fn);
};
