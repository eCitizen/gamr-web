
var mode = ('ontouchstart' in document.documentElement) ? 'touch' : 'mouse';

module.exports = function touchDown(fn) {
  return (mode === 'touch') ? 
    {onTouchStart: fn} : {onMouseDown: fn};
}
