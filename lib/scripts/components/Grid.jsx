
var React = require('react');

module.exports = React.createClass({
  displayName: 'Grid',
  
  render: function () {
    return (
      <div className='page'>
        <div className='outer'>
          {this.props.children}
        </div>
      </div>
    );
  }
});