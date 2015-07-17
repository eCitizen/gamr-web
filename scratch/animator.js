
var w = 5;
var h = 4;
var cells = makeCells(w, h);


function makeArrowAnimator(w, h, action) {
  var centerRight = Math.floor(w / 2);
  var centerLeft = w % 2 === 0 ? centerRight - 1 : centerRight;
  var duration = Math.floor((w-1) / 2) + h;
  
  return function arrow(time) {
    if (time >= duration) return;

    return function renderCell(x, y) {
      var spread = time - y;
      var left = centerLeft - spread;
      var right = centerRight + spread;
      var filled = (y <= time) && (x >= left && x <= right);

      if (filled && action) action(x, y);
      return filled ? true : false;
    }
  }
}

var arrow = makeArrowAnimator(w, h);

var time;
var on = '\\/';
var off = '--';

for (time = 0; time <= 700; time += 1) {
  var render = arrow(time);
  if (!render) break;

  cells.forEach(function (row, y) {
    var rowStr = [];
    row.forEach(function (cell, x) {
      rowStr.push(render(x,y) ? on : off);
    });
    console.log(rowStr.join(''));
  });
  console.log('');
}

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