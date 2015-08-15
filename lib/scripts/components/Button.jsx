
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
      this.props.action();
    }
  },

  render: function () {
    var className = classnames(
      'button', 
      this.props.className,
      {'mounted': this.state.mounted}
    );
    
    return (
      <div className={className} {... touchdown(this._handleClick)}>
        {this.props.children}
      </div>
    );
  }
});