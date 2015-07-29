
var React = require('react');

module.exports = React.createClass({
  displayName: 'Error',

  render: function () {
    return (
      <div className='gamr-error-wrap'>
        <div className='gamr-error'>
          <h4>Uh oh!</h4>
          <p>Looks like this account has already been used</p>
          <span className='gamr-error-dismiss fa fa-times'/>
        </div>
      </div>
    );
  }
});