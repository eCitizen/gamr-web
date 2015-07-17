
var w = 5;
var h = 4;
var cells = makeCells(w, h);


function animator(cells) {
  var h = cells.length;
  var w = cells[0].length;
  var centerRight = Math.floor(w / 2);
  var centerLeft = w % 2 === 0 ? centerRight - 1 : centerRight;
  var duration = Math.floor((w-1) / 2) + h;
  
  return function animate(time) {
    if (time >= duration) return; // no more animation

    return function renderCell(x, y) {
      var left = centerLeft - (h - time - y);
      var right = centerRight + (h - time - y);
      var inY = y <= time;
      var inX = (x >= left && x <= right);
      if (inX && inY) {
        return true;
      } else {
        return false;
      }
    }
  }
}

var a = animator(cells);


var time = 2;
var render = a(time);

cells.forEach(function (row, y) {
  row.forEach(function (cell, x) {
    var isOn = render(x,y);
    if (isOn) {
      console.log('x');  
    } else {
      console.log('.')
    }
  });
  console.log('\n');
});




function makeCells(w, h) {
  var cells = [];
  var x, y;
  for (y = 0; y < h; y += 1) {
    var row = [];
    for (x = 0; x < w; x += 1) {
      row.push({x:x, y:y});
    }
    cells.push(row);
  }
  return cells;
}