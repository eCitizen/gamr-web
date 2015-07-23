
var React = require('react');
var classnames = require('classnames');
var resize = require('../services/resize');
var makeAnimator = require('../services/animator/patterns').arrow;
var assign = require('object-assign');
var CHANGE = 'change';
var MULTIPLY = 15;
var CELL_W = MULTIPLY * 16;
var CELL_H = MULTIPLY * 9;
var IMG_W = 1920
var IMG_H = 1080;
var FRAME_INTERVAL = 90;
var ANIMATION_INTERVAL = 200;

module.exports = React.createClass({
  displayName: 'Background',

  getInitialState: function () {
    return assign(this.nextImages(), this.getCells());
  },

  componentDidMount: function () {
    resize.onChange(this.resize);
    // setTimeout(this.transition, 1300);
  },

  componentWillUnmount: function () {
    resize.offChange(this.resize);
  },

  resize: function (width, height) {
    this.setState(this.getCells(width, height));
  },

  getCells: function (width, height) {
    width = width || resize.getWidth();
    height = height || resize.getHeight();
    var x = Math.floor(width / CELL_W) + 1;
    var y = Math.floor(height / CELL_H) + 1;
    var backW = x * CELL_W;
    var backH = y * CELL_H;
    var cells = [];
    var iy, ix;

    for (iy = 0; iy < y; iy += 1) {
      cells.push([]);
      for (ix = 0; ix < x; ix += 1) {
        var opacity = (Math.random() / 3) + .5;
        if (Math.random() < .15) {
          opacity = opacity * 3;
        }
        cells[iy].push([ix,iy, null, opacity]);
      }
    }

    var img = this.fitImage(backW, backH);

    return {
      cells: cells,
      shiftX: (width - backW) / 2,
      shiftY: (height - backH) / 2,
      width: backW,
      height: backH,
      imageX: (backW - img.w) / 2,
      imageY: (backH - img.h) / 2,
      imageW: img.w,
      imageH: img.h
    };
  },

  fitImage: function (back_W, back_H) {
    var back_R = back_W / back_H;
    var IMG_R = IMG_W / IMG_H;
    if (back_R > IMG_R) {
      // background is wider: stretch w
      return {
        w: back_W,
        h: back_W / IMG_R
      }
    } else {
      // background is taller: stretch h
      return {
        w: back_H * IMG_R,
        h: back_H
      }
    }
  },

  transition: function () {
    if (this.state.frame === 0) {
      this.setState(this.nextImages());
    }

    var nextFrame = this.nextFrame();

    if (nextFrame) {
      setTimeout(this.transition, FRAME_INTERVAL);  
    } else {
      this.setState({
        frame: 0
      });
      setTimeout(this.transition, ANIMATION_INTERVAL);  
    }
  },

  nextImages: function () {
    if (!this.state) {
      console.log('hey')
      return {
        imageA: 3,
        imageB: 5
      }
    } else {
      return {
        imageA: this.state.imageB,
        imageB: this.state.imageB > 0 ? this.state.imageB - 1 : 5
      }
    }
  },

  nextFrame: function() {
    var frame = this.state.frame || 1;
    var cells = this.state.cells;
    var w = cells[0].length;
    var h = cells.length;

    var transition = makeAnimator(w, h);
    var render = transition(frame);

    if (!render) {
      return;
    } else {
      cells.forEach(function (row, y) {
        row.forEach(function (col, x) {
          cells[y][x][2] = render(x, y);
        });
      });

      this.setState({
        cells: cells,
        frame: frame + 1
      });

      return true;
    }
  },

  makeCells: function () {
    var rowStyle = {
      height: (100 / this.state.cells.length) + '%'
    };

    getCellStyle = this.getCellStyle;

    return this.state.cells.map(function (row, rowIdx) {
      return (
        <div  key={rowIdx} className='cell-row' style={rowStyle}>
          {row.map(function (cell, colIdx) {
            var filled = cell[2];
            var opacity = cell[3];
            return (
              <div key={colIdx}
                className={classnames('cell', {filled: filled})}
                style={getCellStyle(rowIdx, colIdx, filled, opacity)}
              />
            );
          })}
        </div>
      );
    });
  },

  getCellStyle: function (row, col, filled, opacity) {
    var cellX = (col * -CELL_W) + this.state.imageX;
    var cellY = (row * -CELL_H) + this.state.imageY;

    var imgIdx = filled ? this.state.imageB : this.state.imageA;
    var img = 'url(\'/assets/images/backgrounds-'+imgIdx+'.jpg\')';

    var cellStyle = {
      opacity: opacity,
      backgroundImage: img,
      backgroundPosition: cellX + 'px ' + cellY + 'px',
      backgroundSize: this.state.imageW + 'px ' + this.state.imageH + 'px',
      width: (100 / this.state.cells[0].length) + '%'
    };

    return cellStyle;
  },

  render: function () {
    var backStyle = {
      left: this.state.shiftX,
      right: this.state.shiftX,
      top: this.state.shiftY,
      bottom: this.state.shiftY,
      border: '1px solid red'
    };

    return (
      <div className={classnames(this.props.className)}>
        <div className='background' style={backStyle}>
           {this.makeCells()}
        </div>
        <div className='foreground'>
          {this.props.children}
        </div>
      </div>
    );
  }
});
