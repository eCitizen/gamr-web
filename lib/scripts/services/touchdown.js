
var eventListener = require('eventlistener');
var mode = !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0 ? 'touch' : 'mouse';

module.exports = function touchDown(fn, fn2) {
  if (fn2) {
    var wrapped = function () {
      fn();
      eventListener.add(document, 'mouseup', function mouseup() {
        fn2();
        eventListener.remove(document, 'mouseup', mouseup);
      });
      eventListener.add(document, 'touchend', function touchend() {
        fn2();
        eventListener.remove(document, 'touchend', touchend);
      });
    }

    return (mode === 'touch') ? 
      {onTouchStart: wrapped} : {onMouseDown: wrapped};
  }

  return (mode === 'touch') ? 
    {onTouchStart: fn} : {onMouseDown: fn};
}


// https://github.com/caolan/async/blob/master/lib/async.js
function once(fn) {
  return function() {
    if (fn === null) return;
    fn.apply(this, arguments);
    fn = null;
  };
}