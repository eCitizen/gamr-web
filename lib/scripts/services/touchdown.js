
var eventListener = require('eventlistener');
var mode = !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0 ? 'touch' : 'mouse';

module.exports = function touchDown(fn, fn2) {
  // just bind both and prevent default in touch

  if (fn2) {
    var wrapped = function () {
      fn();
      eventListener.add(document, 'mouseup', function mouseup() {
        fn2();
        eventListener.remove(document, 'mouseup', mouseup);
      });
      eventListener.add(document, 'touchend', function touchend(event) {
        if (event && event.preventDefault) event.preventDefault();
        fn2();
        eventListener.remove(document, 'touchend', touchend);
      });
    }

    var events = {onMouseDown: wrapped};

    if (mode === 'touch') {
      events.onTouchStart = function (event) {
        wrapped();
      }
    }

    return events;

  } else { // just one event...
    var events = {onMouseDown: fn};

    if (mode === 'touch') {
      events.onTouchStart = function (event) {
        if (event && event.preventDefault) event.preventDefault();
        fn();
      }
    }

    return events;
  }
}


// https://github.com/caolan/async/blob/master/lib/async.js
function once(fn) {
  return function() {
    if (fn === null) return;
    fn.apply(this, arguments);
    fn = null;
  };
}