
module.exports = function (Component, roadblocks) {
  roadblocks = roadblocks || [];

  Component.willTransitionTo = function (transition, params, query, callback) {
    var valid = true;
    roadblocks.forEach(function (fn) {
      valid = fn() ? valid : false;
    });

    console.log('[Roadblocks] valid:', valid);

    if (valid) {
      callback();
    } else {
      transition.redirect('/consent');
      callback();
    }
  }
  return Component;
}