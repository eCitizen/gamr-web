
var w = 5;
var h = 4;
var cells = makeCells(w, h);


function animator(w, h) {
  var centerRight = Math.floor(w / 2);
  var centerLeft = w % 2 === 0 ? centerRight - 1 : centerRight;
  var duration = Math.floor((w-1) / 2) + h;
  
  return function animate(time) {
    if (time >= duration) return; // no more animation

    return function renderCell(x, y) {
      y = h - y - 1;
      var spread = time - y;
      var left = centerLeft - spread;
      var right = centerRight + spread;
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

var a = animator(w, h);
var time;

for (time = 0; time <= 7; time += 1) {
  console.log('t =', time);
  console.log('');

  var render = a(time);

  if (!render) {
    break;
  }

  cells.forEach(function (row, y) {
    var rowStr = [];
    row.forEach(function (cell, x) {
      var isOn = render(x,y);
      if (isOn) {
        rowStr.push('/\\');  
      } else {
        rowStr.push('--')
      }
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