
var makeCell = require('./makeCell');
var image = require('./image');

function randomOpacity() {
  var opacity = (Math.random() / 3) + .5;
  if (Math.random() < .15) {
    opacity = opacity * 3;
  }
  return opacity;
}

function makeRandom() {
  var cells = [];

  function getCell(cell) {
    var id = cell.x + '.' + cell.y;
    if (!cells[id]) cells[id] = makeCell(0, image.byTime(0));
    return cells[id];
  }

  return function(grid, cell, time) {
    cell = getCell(cell);

    var rand = Math.random();

    if (rand < 0.1) {
      cell.fadeTo(0);
    } else if (Math.random() > 0.9) {
      cell.setImage(image.byTime(time));
      cell.fadeTo(randomOpacity());
    }

    return {
      backgroundImage: cell.image(),
      opacity: cell.opacity()
    }
  }
}

function makeEasy() {
  var cells = {};

  function getCell(cell) {
    var id = cell.x + '.' + cell.y;
    if (!cells[id]) {
      cells[id] = makeCell(0, image.random(0));
      cells[id].defaultOpacity = randomOpacity();
    }

    return cells[id];
  }

  return function(grid, cell, time) {
    cell = getCell(cell);
    
    if (Math.random() > 0.5) {
      cell.setImage(image.random(time));
      cell.fadeTo(cell.defaultOpacity);
    }

    return {
      backgroundImage: cell.image(),
      opacity: cell.opacity()
    }
  }
}

module.exports = {
  random: makeRandom,
  easy: makeEasy
};
