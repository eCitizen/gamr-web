
var React = require('react');
var classnames = require('classnames');
var resize = require('../services/resize');
var assign = require('object-assign');
var CHANGE = 'change';
var MULTIPLY = 15;
var CELL_W = MULTIPLY * 16;
var CELL_H = MULTIPLY * 9;
var IMG_W = 1920
var IMG_H = 1080;
var FRAME_INTERVAL = 90;
var ANIMATION_INTERVAL = 200;
var raf = require('raf');
var animators = require('../services/animator');

module.exports = React.createClass({
  displayName: 'Background',

  getDefaultProps: function () {
    return {
      renderCell: animators.default
    }
  },

  getInitialState: function () {
    return assign({
      time: 0
    }, this.getCells());
  },

  componentDidMount: function () {
    resize.onChange(this.resize);
    this.startAnimation();
  },

  componentWillUnmount: function () {
    resize.offChange(this.resize);
    this.stopAnimation();
  },

  resize: function (width, height) {
    this.setState(this.getCells(width, height));
  },

  startAnimation: function () {
    this.timer = setInterval(this.nextFrame, 1300)
  },

  stopAnimation: function () {
    clearInterval(this.timer);
  },

  nextFrame: function () {
    raf(function () {
      this.setState({
        time: this.state.time + 1
      });    
    }.bind(this))
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
        cells[iy].push({
          x: ix,
          y: iy
        });
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

  makeCells: function () {
    var rowStyle = {
      height: (100 / this.state.cells.length) + '%'
    };

    var getCellStyle = this.getCellStyle;
    var grid = {
      x: this.state.cells[0].length,
      y: this.state.cells.length
    }

    return this.state.cells.map(function (row, rowIdx) {
      return (
        <div  key={rowIdx} className='cell-row' style={rowStyle}>
          {row.map(function (cell, colIdx) {
            return (
              <div key={colIdx}
                className='cell'
                style={getCellStyle(grid, cell)}
              />
            );
          })}
        </div>
      );
    });
  },

  getCellStyle: function (grid, cell) {
    var col = cell.x;
    var row = cell.y;
    var cellX = (col * -CELL_W) + this.state.imageX;
    var cellY = (row * -CELL_H) + this.state.imageY;

    var cellStyle = assign({
      backgroundPosition: cellX + 'px ' + cellY + 'px',
      backgroundSize: this.state.imageW + 'px ' + this.state.imageH + 'px',
      width: (100 / this.state.cells[0].length) + '%'
    }, this.props.renderCell(grid, cell, this.state.time));

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
