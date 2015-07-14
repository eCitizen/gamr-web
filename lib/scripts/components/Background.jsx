
var React = require('react');
var classnames = require('classnames');
var resize = require('../services/resize');
var CHANGE = 'change';
var RATIO = 1920 / 1080;

module.exports = React.createClass({
  displayName: 'Background',

  componentDidMount: function () {
    resize.on(CHANGE, this._setup);
  },

  componentWillUnmount: function () {
    resize.removeListener(CHANGE, this._setup);
  },

  _setup: function (width, height) {
    console.log(width, height);
    // console.log(this.refs.background);
  },

  render: function () {
    return (
      <div className={classnames(this.props.className)}>
        <div className='background'/>
        <div className='foreground' ref='background'>
          {this.props.children}
        </div>
      </div>
    );
  }
});
