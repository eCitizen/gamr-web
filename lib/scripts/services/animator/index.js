
var LOCK = 400; // about how long are the css transitions

var images = [
  'url(\'/assets/images/backgrounds-0.jpg\')',
  'url(\'/assets/images/backgrounds-1.jpg\')',
  'url(\'/assets/images/backgrounds-2.jpg\')',
  'url(\'/assets/images/backgrounds-3.jpg\')',
  'url(\'/assets/images/backgrounds-5.jpg\')'
];

var defaultImg = images[3];

function randomOpacity() {
  var opacity = (Math.random() / 3) + .5;
  if (Math.random() < .15) {
    opacity = opacity * 3;
  }
  return opacity;
}

function randomImage() {
  return images[Math.floor(Math.random() * (images.length-1))];
}

function Cell(opacity, image) {
  this.opacity = opacity || 0;
  this.image = image || defaultImg;
  this.lastUpdate = Date.now();

  function canUpdate() {
    return Date.now() - this.lastUpdate > LOCK;
  }

  this.fadeTo = function (opac) {
    if (canUpdate()) {

    }
  }
}

function makeWave() {
  var cells = [];

  function getCell(c) {
    var id = c.x + '.' + c.y;
    if (!cells[id]) cells[id] = new Cell(0.5, defaultImg);
    return cells[id];
  }

  return function(grid, cell, time) {
    cell = getCell(cell);

    if (time < 1) {
      console.log(cell);
    }

    return {
      backgroundImage: cell.image,
      opacity: cell.opacity
    }
  }
}

module.exports = {
  default: function (grid, cell, time) {
    var op = (time / 20) - (cell.y / 10);
    return {
      backgroundImage: images[3],
      opacity: op < 1 ? op : 1
    }
  },

  wave: makeWave(),

  static: function (grid, cell, time) {
    return {
      backgroundImage: images[3]
    }
  }
};
