
// inspired by 
// https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery

var raf = require('raf');

function smoothStep(start, end, point) {
  if(point <= start) { return 0; }
  if(point >= end) { return 1; }
  var x = (point - start) / (end - start);
  return x*x*(3 - 2*x);
}

module.exports = function scrollTo(target, duration, cb) {
  cb = cb || function () {};
  target = Math.round(target);
  duration = Math.round(duration);

  var element = document.body;
  var start_time = Date.now();
  var end_time = start_time + duration;
  var start_top = element.scrollTop;
  var distance = target - start_top;
  var previous_top = element.scrollTop;
  var ticking = false;
  var timer;

  function update() {
    ticking = false; // allow further rAFs to be called
  }

  function requestTick() {
    if(!ticking) {
      raf(update);
      ticking = true;
    }
  }

  function complete() {
    if (timer) clearInterval(timer);
    cb();
  }

  function update() {
    console.log('update');
    if (element.scrollTop !== previous_top) return cb();
    var now = Date.now();
    var point = smoothStep(start_time, end_time, now);
    var frameTop = Math.round(start_top + (distance * point));
    element.scrollTop = frameTop;

    if (now >= end_time) return cb();
    if (element.scrollTop === previous_top && element.scrollTop !== frameTop) {
      return cb();
    }
    previous_top = element.scrollTop;
    ticking = false;
  }

  requestTick();
  timer = setInterval(requestTick, 10);
}
