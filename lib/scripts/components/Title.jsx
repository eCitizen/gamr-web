var React = require('react/addons'),
  Title;

module.exports = Title = React.createClass({
  render: function () {
    return (
      <h2 className='title'>{this.props.children}</h2>
    );
  }
});