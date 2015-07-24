
var makeCell = require('./makeCell');
var image = require('./image');

function randomOpacity() {
  var opacity = (Math.random() / 3) + .5;
  if (Math.random() < .15) {
    opacity = opacity * 3;
  }
  return opacity;
}

function makeWave() {
  var cells = [];

  function getCell(cell) {
    var id = cell.x + '.' + cell.y;
    if (!cells[id]) cells[id] = makeCell(randomOpacity(), image.default());
    return cells[id];
  }

  return function(grid, cell, time) {
    cell = getCell(cell);

    var rand = Math.random();

    if (rand < 0.1) {
      cell.fadeTo(0);
    } else if (Math.random() > 0.7) {
      cell.setImage(image.random());
      cell.fadeTo(randomOpacity());
    }

    return {
      backgroundImage: cell.image(),
      opacity: cell.opacity()
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
