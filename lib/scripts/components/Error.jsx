
var React = require('react');
var errorSvc = require('../services/error');

module.exports = React.createClass({
  displayName: 'Error',

  getInitialState: function() {
    return { error: null };
  },

  componentDidMount: function () {
    errorSvc.onCreate(this.open);
    errorSvc.onDismiss(this.close);
  },

  componentWillUnmount: function () {
    errorSvc.offCreate(this.open);
    errorSvc.offDismiss(this.close);
  },

  open: function (title, message) {
    this.setState({
      error: {
        title: title,
        message: message
      }
    })
  },

  close: function () {
    this.setState({
      error: null
    });
  },

  render: function () {
    if (this.state.error) {
      return (
        <div className='gamr-error-wrap'>
          <div className='gamr-error' onClick={errorSvc.dismiss}>
            <h4>{this.state.error.title}</h4>
            <p>{this.state.error.message}</p>
            <span className='gamr-error-dismiss fa fa-times'/>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
});