/** @jsx React.DOM */

var React = require('react/addons'),
  classnames = require('classnames'),
  Button;

module.exports = Button = React.createClass({
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
          {
            'mounted': this.state.mounted
          }
        );
    
    return (
      <div className={className} onClick={this._handleClick}>
        {this.props.children}
      </div>
    );
  }
});