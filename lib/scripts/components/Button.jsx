
var React = require('react');
var classnames = require('classnames');
var touchdown = require('../services/touchdown');

module.exports = React.createClass({
  displayName: 'Button',

  getInitialState: function () {
    return {
      mounted: false
    };
  },

  setMount: function () {
    this.setState({
      mounted: true
    });
  },

  componentDidMount: function () {
    process.nextTick(this.setMount);
  },

  _handleClick: function () {
    if (this.props.action) {
      this.setState({
        depressed: false
      });
      this.props.action();
    }
  },

  _handleDown: function () {
    this.setState({
      depressed: true
    });
  },

  render: function () {
    var className = classnames(
      'button', 
      this.props.className,
      {
        'mounted': this.state.mounted,
        'depressed': this.state.depressed,
        'no-touch': !(!!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0)
      }
    );
    
    return (
      <div className={className} {... touchdown(this._handleDown, this._handleClick)}>
        {this.props.children}
      </div>
    );
  }
});