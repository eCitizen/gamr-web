
var React = require('react');
var classnames = require('classnames');
var resize = require('../services/resize');
var CHANGE = 'change';
var CELL_W = 7 * 16;
var CELL_H = 7 * 9;
var IMG_R = 1920 / 1080;

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
      height: backH
    };
  },

  makeCells: function () {
    var rowStyle = {
      height: (100 / this.state.cellRows.length) + '%'
    };

    var cellStyle = {
      width: (100 / this.state.cellRows[0].length) + '%'
    };

    return this.state.cellRows.map(function (row, idx) {
      return (
        <div  key={idx} className='cell-row' style={rowStyle}>
          {row.map(function (cell, idx) {
            return (
              <div key={idx} className='cell' style={cellStyle}/>
            );
          })}
        </div>
      );
    });
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
