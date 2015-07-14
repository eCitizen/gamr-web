
var React = require('react');
var classnames = require('classnames');
var resize = require('../services/resize');
var CHANGE = 'change';
var CELL_W = 7 * 16;
var CELL_H = 7 * 9;
var IMG_W = 1920
var IMG_H = 1080;

module.exports = React.createClass({
  displayName: 'Background',

  getInitialState: function () {
    return this.getCells(resize.getWidth(), resize.getHeight())
  },

  componentDidMount: function () {
    resize.onChange(this.resize);
  },

  componentWillUnmount: function () {
    resize.offChange(this.resize);
  },

  resize: function (width, height) {
    this.setState(this.getCells(width, height));
  },

  getCells: function (width, height) {
    var x = Math.floor(width / CELL_W) + 1;
    var y = Math.floor(height / CELL_H) + 1;
    var backW = x * CELL_W;
    var backH = y * CELL_H;
    var rows = [];
    var iy, ix;
    var cells;

    for (iy = 0; iy < y; iy += 1) {
      cells = [];
      for (ix = 0; ix < x; ix += 1) {
        cells.push([ix,iy]);  
      }
      rows.push(cells);
    }

    return {
      cellRows: rows,
      shiftX: (width - backW) / 2,
      shiftY: (height - backH) / 2,
      width: backW,
      height: backH,
      imageX: (backW - IMG_W) / 2,
      imageY: (backH - IMG_H) / 2
    };
  },

  makeCells: function () {
    var rowStyle = {
      height: (100 / this.state.cellRows.length) + '%'
    };

    getCellStyle = this.getCellStyle;

    return this.state.cellRows.map(function (row, rowIdx) {
      return (
        <div  key={rowIdx} className='cell-row' style={rowStyle}>
          {row.map(function (cell, cellIdx) {
            return (
              <div key={cellIdx} className='cell' style={getCellStyle(rowIdx, cellIdx)}/>
            );
          })}
        </div>
      );
    });
  },

  getCellStyle: function (row, cell) {
    var cellX = (cell * -CELL_W) + this.state.imageX;
    var cellY = (row * -CELL_H) + this.state.imageY;

    var cellStyle = {
      backgroundImage: 'url(\'assets/images/backgrounds-5.jpg\')',
      backgroundPosition: cellX + 'px ' + cellY + 'px',
      width: (100 / this.state.cellRows[0].length) + '%'
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
        <div className='foreground' ref='background'>
          {this.props.children}
        </div>
      </div>
    );
  }
});
