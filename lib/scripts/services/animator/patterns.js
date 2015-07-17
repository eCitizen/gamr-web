
module.exports.arrow = function makeArrowTransition(w, h, renderAction) {
  var centerRight = Math.floor(w / 2);
  var centerLeft = w % 2 === 0 ? centerRight - 1 : centerRight;
  var duration = Math.floor((w-1) / 2) + h + 1;
  
  return function transition(time) {
    if (time >= duration) return;

    return function render(x, y) {
      // reverse
      y = h - y -1;
      var spread = time - y;
      var left = centerLeft - spread;
      var right = centerRight + spread;
      var filled = (y <= time) && (x > left && x < right);

      if (filled && renderAction) renderAction(x, y);
      return filled ? true : false;
    }
  }
}
