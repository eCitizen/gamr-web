var React = require('react/addons'),
	Splitter = require('./Splitter.jsx'),
	classnames = require('classnames'),
  Title;

module.exports = Title = React.createClass({
  render: function () {
    return (
      <h2 className={classnames('title', this.props.className)}>
      	<Splitter classPrefix='t' {... this.props}>
      		{this.props.children}
      	</Splitter>
      </h2>
    );
  }
});