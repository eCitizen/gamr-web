// http://www.html5rocks.com/en/tutorials/speed/animations/

var raf = require('raf');
var eventListener = require('eventlistener');
var EventEmitter = require('events').EventEmitter;
var CHANGE = 'change';

var ticking = false;
var width = Infinity;
var height = Infinity;
var resize = new EventEmitter();

function update() {
  resize.emit('change', width, height);
  ticking = false; // allow further rAFs to be called
}

function requestTick() {
  if(!ticking) {
    raf(update);
    ticking = true;
  }
}

function onResize() {
  getWindowSize();
  requestTick();
}

// http://stackoverflow.com/a/11744120
function getWindowSize() {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];

  width = w.innerWidth || e.clientWidth || g.clientWidth,
  height = w.innerHeight|| e.clientHeight|| g.clientHeight;
}

eventListener.add(window, 'resize', onResize);

getWindowSize();

module.exports.getWidth = function () { return width; };
module.exports.getHeight = function () { return height; };

module.exports.onChange = function (fn) {
  resize.on(CHANGE, fn);
};

module.exports.offChange = function (fn) {
  resize.removeListener(CHANGE, fn);
};
