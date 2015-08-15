
var mode = !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0 ? 'touch' : 'mouse';

module.exports = function touchDown(fn, fn2) {
  if (fn2) {
    return (mode === 'touch') ? 
      {onTouchStart: fn, onTouchStart: fn2} : {onMouseDown: fn, onMouseUp: fn2};
  }

  return (mode === 'touch') ? 
    {onTouchStart: fn} : {onMouseDown: fn};
}
