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

  render: function () {
    var className = classnames(
          'button', 
          this.props.className,
          {
            'mounted': this.state.mounted
          }
        );
    
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
});