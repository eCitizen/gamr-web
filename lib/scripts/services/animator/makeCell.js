
var LOCK = 2000 + 100; // about how long are the css transitions
var INITIAL_LOCK = 100;

function Cell(opacity, image) {
  var opacity = opacity || 0;
  var image = image || '';
  var lastUpdate = Date.now() + INITIAL_LOCK - LOCK;

  function canUpdate() {
    return Date.now() - lastUpdate > LOCK;
  }

  this.fadeTo = function (nextOpacity) {
    if (canUpdate()) {
      opacity = nextOpacity;
      lastUpdate = Date.now();
    }
  }

  this.setImage = function (nextImage) {
    if (opacity === 0 && canUpdate()) {
      image = nextImage;
    }
  }

  this.opacity = function () {
    return opacity;
  }

  this.image = function () {
    return image;
  }
}

module.exports = function makeCell(opacity, image) {
  return new Cell(opacity, image);
}
